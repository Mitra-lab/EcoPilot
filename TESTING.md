# Testing Strategy

## Testing Levels

### Unit Testing

Framework:

Jest

Coverage:

- Carbon calculations
- Score generation
- Challenge validation
- Verification logic

---

### Integration Testing

Coverage:

- API endpoints
- Database interactions
- AI services

---

### E2E Testing

Framework:

Playwright

Coverage:

- Assessment flow
- Challenge flow
- Verification flow
- Dashboard updates

---

# Test Cases

## Assessment

✓ Valid assessment

✓ Missing fields

✓ Negative values

✓ Extreme values

---

## Challenge Submission

✓ Valid text evidence

✓ Valid image evidence

✓ Missing evidence

✓ Unsupported file

---

## Authentication

✓ Login success

✓ Invalid credentials

✓ Session expiry

---

## Security

✓ XSS attempts

✓ SQL injection attempts

✓ File upload restrictions

✓ Unauthorized access

---

## Performance

✓ Dashboard load

✓ Assessment submission

✓ AI response timeout handling

---

## Accessibility

✓ Keyboard navigation

✓ Contrast validation

✓ Responsive layouts
