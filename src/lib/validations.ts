import { z } from "zod";
import { DietPreference, VehicleType } from "./constants";

// Assessment Form Schema
export const assessmentSchema = z.object({
  familySize: z
    .number({ required_error: "Family size is required" })
    .int("Family size must be a whole number")
    .min(1, "Family size must be at least 1"),
  monthlyElectricityBill: z
    .number({ required_error: "Monthly electricity bill is required" })
    .nonnegative("Electricity bill cannot be negative"),
  vehicleType: z.nativeEnum(VehicleType, {
    errorMap: () => ({ message: "Invalid vehicle type selected" }),
  }),
  weeklyTravelDistance: z
    .number({ required_error: "Weekly travel distance is required" })
    .nonnegative("Travel distance cannot be negative"),
  dietPreference: z.nativeEnum(DietPreference, {
    errorMap: () => ({ message: "Invalid diet preference selected" }),
  }),
});

// Challenge Submission Schema
export const challengeSubmissionSchema = z.object({
  challengeId: z.string().uuid("Invalid challenge ID format"),
  evidenceText: z
    .string()
    .max(1000, "Evidence text must not exceed 1000 characters")
    .optional(),
  evidenceFileUrl: z.string().url("Invalid evidence file URL").optional(),
}).refine(data => data.evidenceText || data.evidenceFileUrl, {
  message: "Either text description or uploaded evidence file must be provided",
  path: ["evidenceText"],
});

// File Upload Metadata Schema
export const fileUploadMetadataSchema = z.object({
  contentType: z.enum(["image/jpeg", "image/png", "application/pdf"], {
    errorMap: () => ({
      message: "Unsupported file type. Only JPG, PNG, and PDF are allowed.",
    }),
  }),
  fileSize: z
    .number()
    .max(5 * 1024 * 1024, "File size must not exceed 5 MB"),
});

export type AssessmentFormInput = z.infer<typeof assessmentSchema>;
export type ChallengeSubmissionInput = z.infer<typeof challengeSubmissionSchema>;
export type FileUploadMetadataInput = z.infer<typeof fileUploadMetadataSchema>;
