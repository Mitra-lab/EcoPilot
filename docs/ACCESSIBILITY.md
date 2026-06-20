# EcoPilot Accessibility Report

Accessibility is a core priority of the EcoPilot behavior-change platform. We design and build components to ensure that everyone, regardless of physical or cognitive abilities, can participate in their sustainability journey.

## Accessibility Goals

Our goal is to build an inclusive sustainability platform. By adhering to WCAG 2.1 accessibility standards, we ensure that:
- Core forms (Carbon Assessment) are clear and structured.
- Interactive elements (Habits checklist, Verification modals) are easy to navigate.
- Visual elements (charts, dashboard statistics) present information clearly.

## Semantic HTML

EcoPilot uses semantic HTML5 tags to outline pages:
- **Heading Hierarchy**: Each page contains a single structural `<h1>` tag, with sub-sections correctly nested using `<h2>` and `<h3>` tags.
- **Interactive Controls**: Buttons, anchors, and form elements use native HTML controls (e.g. `<button>`, `<input>`, `<a>`) rather than un-mapped interactive `<div>` blocks.
- **Form Association**: Every form element is programmatically linked to a descriptive tag using `<label htmlFor="...">`.

## Keyboard Accessibility

Every interactive feature is designed to support keyboard-only navigation:
- **Focus Indicators**: Focused controls display high-visibility outline rings.
- **Logical Tab Order**: Forms, cards, and modal dialogs follow a natural layout flow.
- **Escape Key Handlers**: Dialog popups and modals (such as the verification details screen) can be dismissed by pressing the `Escape` key.

## Form Accessibility

Onboarding assessments and verification wizards enforce accessible input flows:
- **Input Labels**: Clear descriptions indicate required inputs and expected units (e.g., family size, monthly bills, travel distance).
- **Validation Feedback**: Invalid form fields are immediately highlighted with descriptive text.
- **Accessible Error Statuses**: Status and error states are announced programmatically.

## Responsive Design

EcoPilot is responsive and accessible across all device form factors:
- **Desktop**: Grid layouts group dashboard statistics, charts, and habits panels.
- **Tablet**: Columns scale to double-column stacks to maximize screen width.
- **Mobile**: UI controls stack vertically to allow easy tap interactions.

## Visual Accessibility

Visual features ensure readability:
- **Color Contrast**: Backgrounds and text elements use CSS variables mapped to high-contrast dark theme colors (e.g., readable text contrast against slate backgrounds).
- **Readable Typography**: Employs clean, modern sans-serif fonts with relative sizing (`rem`/`em`) to support browser font zoom settings.
- **Clear Information Hierarchy**: Core metrics (footprint metrics, Green Points balance, streak days) are presented using distinct visual hierarchy.

## Future Accessibility Enhancements

To build on this foundation, we plan to implement:
1. **Screen Reader Audits**: Test page navigation using NVDA and VoiceOver screen readers.
2. **Lighthouse Accessibility Reviews**: Address minor color contrast warnings in dark charts and verify markup structures.
3. **Enhanced ARIA Attributes**: Map custom chart tooltips with descriptive screen reader announcements.

## Conclusion

EcoPilot is committed to inclusive design. By structuring semantic layouts, ensuring complete keyboard operability, and maintaining high color contrast, we make sustainability guidance accessible to all users.
