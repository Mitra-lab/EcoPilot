"use client";

import React, { useState } from "react";
import { DietPreference, VehicleType } from "@/lib/constants";
import { assessmentSchema, AssessmentFormInput } from "@/lib/validations";

interface AssessmentFormProps {
  onSubmit: (data: AssessmentFormInput) => void;
  isLoading?: boolean;
}

export function AssessmentForm({ onSubmit, isLoading = false }: AssessmentFormProps) {
  const [formData, setFormData] = useState<Partial<AssessmentFormInput>>({
    familySize: 1,
    monthlyElectricityBill: 0,
    vehicleType: VehicleType.NONE,
    weeklyTravelDistance: 0,
    dietPreference: DietPreference.BALANCED,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    let parsedValue: any = value;

    if (type === "number") {
      parsedValue = value === "" ? "" : Number(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));

    // Clear error for field on change
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    const result = assessmentSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    onSubmit(result.data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Family Size */}
      <div>
        <label
          htmlFor="familySize"
          className="block text-sm font-semibold text-[hsl(var(--foreground))] mb-2"
        >
          Family Size
        </label>
        <input
          type="number"
          id="familySize"
          name="familySize"
          value={formData.familySize ?? ""}
          onChange={handleChange}
          min={1}
          placeholder="e.g. 2"
          className={`w-full px-4 py-2 border rounded-md bg-[hsl(var(--card))] text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] ${
            errors.familySize ? "border-[hsl(var(--destructive))]" : "border-[hsl(var(--border))]"
          }`}
          disabled={isLoading}
        />
        {errors.familySize && (
          <p className="text-xs text-[hsl(var(--destructive))] mt-1">
            {errors.familySize}
          </p>
        )}
      </div>

      {/* Monthly Electricity Bill */}
      <div>
        <label
          htmlFor="monthlyElectricityBill"
          className="block text-sm font-semibold text-[hsl(var(--foreground))] mb-2"
        >
          Monthly Electricity Bill ($ / Currency Units)
        </label>
        <input
          type="number"
          id="monthlyElectricityBill"
          name="monthlyElectricityBill"
          value={formData.monthlyElectricityBill ?? ""}
          onChange={handleChange}
          min={0}
          placeholder="e.g. 100"
          className={`w-full px-4 py-2 border rounded-md bg-[hsl(var(--card))] text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] ${
            errors.monthlyElectricityBill
              ? "border-[hsl(var(--destructive))]"
              : "border-[hsl(var(--border))]"
          }`}
          disabled={isLoading}
        />
        {errors.monthlyElectricityBill && (
          <p className="text-xs text-[hsl(var(--destructive))] mt-1">
            {errors.monthlyElectricityBill}
          </p>
        )}
      </div>

      {/* Vehicle Type */}
      <div>
        <label
          htmlFor="vehicleType"
          className="block text-sm font-semibold text-[hsl(var(--foreground))] mb-2"
        >
          Vehicle Type
        </label>
        <select
          id="vehicleType"
          name="vehicleType"
          value={formData.vehicleType}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md bg-[hsl(var(--card))] text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] ${
            errors.vehicleType ? "border-[hsl(var(--destructive))]" : "border-[hsl(var(--border))]"
          }`}
          disabled={isLoading}
        >
          <option value={VehicleType.NONE}>No Vehicle (Public Transport/Walk)</option>
          <option value={VehicleType.ELECTRIC}>Electric Vehicle (EV)</option>
          <option value={VehicleType.HYBRID}>Hybrid Vehicle</option>
          <option value={VehicleType.GASOLINE_SMALL}>Gasoline Vehicle (Small / Compact)</option>
          <option value={VehicleType.GASOLINE_LARGE}>Gasoline Vehicle (Large / SUV)</option>
          <option value={VehicleType.DIESEL}>Diesel Vehicle</option>
        </select>
        {errors.vehicleType && (
          <p className="text-xs text-[hsl(var(--destructive))] mt-1">
            {errors.vehicleType}
          </p>
        )}
      </div>

      {/* Weekly Travel Distance */}
      <div>
        <label
          htmlFor="weeklyTravelDistance"
          className="block text-sm font-semibold text-[hsl(var(--foreground))] mb-2"
        >
          Weekly Travel Distance (km)
        </label>
        <input
          type="number"
          id="weeklyTravelDistance"
          name="weeklyTravelDistance"
          value={formData.weeklyTravelDistance ?? ""}
          onChange={handleChange}
          min={0}
          placeholder="e.g. 150"
          className={`w-full px-4 py-2 border rounded-md bg-[hsl(var(--card))] text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] ${
            errors.weeklyTravelDistance
              ? "border-[hsl(var(--destructive))]"
              : "border-[hsl(var(--border))]"
          }`}
          disabled={isLoading}
        />
        {errors.weeklyTravelDistance && (
          <p className="text-xs text-[hsl(var(--destructive))] mt-1">
            {errors.weeklyTravelDistance}
          </p>
        )}
      </div>

      {/* Diet Preference */}
      <div>
        <label
          htmlFor="dietPreference"
          className="block text-sm font-semibold text-[hsl(var(--foreground))] mb-2"
        >
          Diet Preference
        </label>
        <select
          id="dietPreference"
          name="dietPreference"
          value={formData.dietPreference}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md bg-[hsl(var(--card))] text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] ${
            errors.dietPreference ? "border-[hsl(var(--destructive))]" : "border-[hsl(var(--border))]"
          }`}
          disabled={isLoading}
        >
          <option value={DietPreference.BALANCED}>Balanced (Meat & Veggies)</option>
          <option value={DietPreference.MEAT_LOVER}>Meat Lover (High meat consumption)</option>
          <option value={DietPreference.PESCATARIAN}>Pescatarian (Fish & Veggies)</option>
          <option value={DietPreference.VEGETARIAN}>Vegetarian (No meat)</option>
          <option value={DietPreference.VEGAN}>Vegan (Plant-based only)</option>
        </select>
        {errors.dietPreference && (
          <p className="text-xs text-[hsl(var(--destructive))] mt-1">
            {errors.dietPreference}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-[hsl(var(--primary-foreground))] bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[hsl(var(--primary))] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {isLoading ? (
          <span className="flex items-center space-x-2">
            <svg className="animate-spin h-5 w-5 text-current" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Calculating footprint...</span>
          </span>
        ) : (
          "Calculate Carbon Score"
        )}
      </button>
    </form>
  );
}
