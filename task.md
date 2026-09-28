# Static Loan Calculator Web App — Codex Prompt

Act as a senior frontend engineer specializing in **HTML, JavaScript, Tailwind CSS, UX/UI, financial calculators, accessibility, and responsive web applications**.

Build a complete **static loan calculator web app**.

The application must run entirely in the browser with **no backend, no database, no API, and no build step required**.

---

## 1. Core Technology

Use only:

- HTML5
- Vanilla JavaScript
- Tailwind CSS
- CSS only where necessary
- No React
- No Vue
- No Angular
- No backend
- No database
- No API
- No authentication

The app should be possible to run simply by opening:

```text
index.html
```

If Tailwind is loaded through CDN, use the Tailwind CDN.

Keep the application lightweight and fast.

---

# 2. Main Goal

Create a modern and easy-to-use **Loan Calculator** that allows users to calculate different types of loans.

The interface should make financial calculations easy for normal users without requiring financial knowledge.

The user should be able to:

1. Select a loan type
2. Enter loan amount
3. Enter interest rate
4. Select loan term
5. Select payment frequency
6. Calculate the loan
7. See payment schedule
8. See total interest
9. See total repayment
10. See useful financial summaries

---

# 3. Loan Types

Support multiple common loan calculation methods.

At minimum include:

### 1. Amortized / Reducing Balance Loan

Typical bank loan.

Formula should calculate interest based on the remaining principal.

Example:

```text
Principal = $10,000
Annual Interest = 12%
Term = 12 months
```

Calculate:

- Periodic payment
- Total principal
- Total interest
- Total repayment
- Remaining balance

---

### 2. Flat Rate Loan

Interest is calculated using the original principal for the entire loan term.

Formula:

```text
Total Interest = Principal × Interest Rate × Years
```

Then:

```text
Total Repayment = Principal + Total Interest
```

Calculate periodic payments based on the selected frequency.

---

### 3. Interest-Only Loan

The borrower pays interest periodically and principal at maturity.

Calculate:

- Periodic interest payment
- Total interest
- Final principal payment
- Total repayment

Show clearly that the principal remains outstanding until the final payment.

---

### 4. Bullet Loan

Periodic payments consist of interest, with the full principal due at the end.

Calculate:

- Periodic interest
- Final payment
- Total interest
- Total repayment

---

### 5. Simple Interest Loan

Use:

```text
Interest = Principal × Rate × Time
```

Calculate the total repayment and periodic payment.

---

### 6. Custom / Manual Loan

Allow users to enter:

- Principal
- Interest rate
- Number of periods
- Payment frequency

Calculate based on the selected configuration.

---

# 4. Payment Frequencies

Support:

- Daily
- Weekly
- Bi-weekly
- Monthly
- Quarterly
- Semi-annually
- Annually

The calculation engine must correctly convert:

- Annual interest rate
- Loan term
- Number of payment periods

based on the selected payment frequency.

Do not simply divide the monthly payment unless mathematically appropriate.

Use clear financial formulas for each loan type.

---

# 5. Loan Inputs

Create a clean input section.

Inputs should include:

### Loan Amount

Example:

```text
$10,000
```

Allow decimal values.

---

### Interest Rate

Example:

```text
12%
```

Annual interest rate.

---

### Loan Term

Allow users to select:

```text
Months
Years
```

and enter the value.

Example:

```text
12 Months
```

or

```text
5 Years
```

---

### Payment Frequency

Dropdown:

```text
Daily
Weekly
Bi-weekly
Monthly
Quarterly
Semi-annually
Annually
```

---

### Start Date

Allow the user to select a start date.

Default to today's date.

Use JavaScript to calculate payment dates.

---

# 6. Optional Inputs

Support optional:

- Processing fee
- Origination fee
- Insurance fee
- Extra payment
- First payment date
- Grace period
- Balloon payment

Optional fields should be hidden under:

```text
Advanced Options
```

Keep the default interface simple.

---

# 7. Results Dashboard

After clicking:

```text
Calculate Loan
```

show a modern results dashboard.

Display:

### Main Payment

```text
Monthly Payment

$888.49
```

The label should dynamically change according to payment frequency.

For example:

```text
Weekly Payment
Daily Payment
Monthly Payment
Quarterly Payment
```

---

### Summary Cards

Show:

```text
Loan Amount
Interest Rate
Loan Term
Payment Amount
Total Interest
Total Repayment
```

Use clean cards with icons.

---

# 8. Payment Schedule

Create a complete amortization/payment schedule.

Columns:

```text
#
Date
Payment
Principal
Interest
Extra Payment
Remaining Balance
```

Example:

```text
1 | Jan 01, 2027 | $888.49 | $788.49 | $100.00 | $0 | $9,211.51
2 | Feb 01, 2027 | $888.49 | $796.06 | $92.43 | $0 | $8,415.45
```

The schedule must be calculated dynamically.

Do not hardcode values.

---

# 9. Schedule Controls

Add:

```text
Show Schedule
Hide Schedule
```

For large loans, keep the schedule inside a scrollable table.

Desktop:

```text
overflow-x-auto
```

Mobile:

Make the schedule usable on small screens.

---

# 10. Charts

Use lightweight JavaScript charts if possible.

If a chart library is used, load it through CDN.

Display:

### Principal vs Interest

A simple visual comparison showing:

```text
Principal
Interest
```

Also display:

### Remaining Balance

A line chart showing the balance decreasing over time.

Charts must automatically update after recalculation.

If avoiding external libraries, create simple charts using HTML/CSS/SVG.

---

# 11. Currency

Support a currency selector.

At minimum:

```text
USD
KHR
```

Format values appropriately.

Examples:

```text
$10,000.00
៛40,000,000
```

Use JavaScript `Intl.NumberFormat` where appropriate.

Do not hardcode currency formatting everywhere.

---

# 12. English + Khmer

The application must support:

```text
English
Khmer
```

Default language:

```text
English
```

Add a language switcher:

```text
EN
ខ្មែរ
```

The language selector should change the entire UI without reloading the page.

Translate:

- Navigation
- Headings
- Buttons
- Form labels
- Placeholders
- Loan types
- Payment frequencies
- Results
- Schedule headers
- Validation messages
- Error messages
- Advanced options
- Chart labels
- Empty states
- Help text

Do NOT mix English and Khmer in the same UI after a language is selected.

---

# 13. Localization Structure

Keep translations organized in JavaScript.

Example:

```javascript
const translations = {
  en: {
    app_name: "Loan Calculator",
    loan_amount: "Loan Amount",
    interest_rate: "Interest Rate",
    loan_term: "Loan Term",
    payment_frequency: "Payment Frequency",
    calculate: "Calculate Loan",
    total_interest: "Total Interest",
    total_repayment: "Total Repayment",
  },

  km: {
    app_name: "ម៉ាស៊ីនគណនាប្រាក់កម្ចី",
    loan_amount: "ចំនួនប្រាក់កម្ចី",
    interest_rate: "អត្រាការប្រាក់",
    loan_term: "រយៈពេលកម្ចី",
    payment_frequency: "ភាពញឹកញាប់នៃការទូទាត់",
    calculate: "គណនាប្រាក់កម្ចី",
    total_interest: "ការប្រាក់សរុប",
    total_repayment: "ការទូទាត់សរុប",
  },
};
```

Use a centralized translation function:

```javascript
t("loan_amount");
```

Do not scatter translated strings throughout the JavaScript.

---

# 14. Dark Mode / Light Mode

Support:

```text
Light Mode
Dark Mode
```

Add a theme toggle.

Use Tailwind's dark mode.

Example:

```html
<html class="dark"></html>
```

Persist the user's preference using:

```javascript
localStorage;
```

On first visit:

- Detect system preference
- Use system dark/light preference
- Allow the user to override it

---

# 15. Design

The design should be:

- Modern
- Clean
- Minimal
- Professional
- Easy to understand
- Mobile-first
- Responsive
- Fast

Avoid an overly complicated dashboard.

Use a layout similar to a modern SaaS calculator.

---

# 16. Suggested Layout

Desktop:

```text
┌─────────────────────────────────────────────┐
│ Logo              Language   Dark/Light     │
├─────────────────────────────────────────────┤
│                                             │
│          Loan Calculator                    │
│          Calculate your loan easily         │
│                                             │
├───────────────────┬─────────────────────────┤
│                   │                         │
│ Loan Inputs       │ Results                 │
│                   │                         │
│ Loan Type         │ Payment                 │
│ Loan Amount       │ $888.49                 │
│ Interest Rate     │                         │
│ Loan Term         │ Total Interest          │
│ Frequency         │ $661.88                 │
│ Start Date        │                         │
│                   │ Total Repayment         │
│ Advanced Options  │ $10,661.88              │
│                   │                         │
│ Calculate         │                         │
│                   │                         │
└───────────────────┴─────────────────────────┘

Payment Schedule
───────────────────────────────────────────────
```

On mobile:

```text
Header

Loan Calculator

Loan Type
Loan Amount
Interest Rate
Loan Term
Payment Frequency
Start Date

Calculate Loan

Payment
Total Interest
Total Repayment

Payment Schedule
```

Everything should stack naturally.

---

# 17. Loan Type Selector

Create a visually clear selector.

Example:

```text
Loan Type

[ Reducing Balance ▼ ]
```

When the user changes loan type:

- Update the description
- Update relevant inputs
- Update calculation behavior
- Explain the calculation method briefly

Example:

```text
Reducing Balance

Interest is calculated based on the remaining loan balance.
```

---

# 18. Validation

Validate all user inputs.

Examples:

```text
Loan amount must be greater than 0.

Interest rate cannot be negative.

Loan term must be greater than 0.

Please select a payment frequency.
```

Do not allow:

```text
NaN
Infinity
negative loan amount
negative term
invalid dates
```

Show validation errors clearly near the relevant input.

---

# 19. Calculation Engine

Separate calculation logic from UI logic.

Recommended structure:

```javascript
calculateReducingBalance();
calculateFlatRate();
calculateInterestOnly();
calculateBulletLoan();
calculateSimpleInterest();
calculateCustomLoan();

generatePaymentSchedule();
calculatePaymentDate();
formatCurrency();
formatNumber();
```

The calculation engine should return structured data.

Example:

```javascript
{
    paymentAmount,
    totalPrincipal,
    totalInterest,
    totalRepayment,
    schedule: []
}
```

Do not mix DOM manipulation with mathematical formulas.

---

# 20. Accuracy

Financial calculations must be handled carefully.

Use full precision internally.

Only round values for display.

For money:

```javascript
Number(value.toFixed(2));
```

or an equivalent safe approach.

Make sure the final payment adjusts for rounding so that:

```text
Remaining Balance = 0
```

rather than leaving:

```text
$0.01
```

or:

```text
-$0.02
```

---

# 21. Payment Date Calculation

Generate payment dates based on the selected frequency.

Examples:

Monthly:

```text
Jan 01
Feb 01
Mar 01
Apr 01
```

Weekly:

```text
Jan 01
Jan 08
Jan 15
Jan 22
```

Bi-weekly:

```text
Jan 01
Jan 15
Jan 29
```

Handle month-end dates reasonably.

For example, if the starting date is:

```text
January 31
```

the next monthly payment should not become an invalid date.

Use robust JavaScript date handling.

---

# 22. Extra Payment

If the user enters an extra payment:

```text
$50
```

apply it to principal every payment period.

The schedule should update:

- Principal paid
- Remaining balance
- Number of payments
- Total interest

Clearly show the effect of extra payments.

---

# 23. Reset Button

Add:

```text
Reset
```

Reset the calculator to sensible defaults.

Example defaults:

```text
Loan Type: Reducing Balance
Loan Amount: 10000
Interest Rate: 12
Term: 12
Term Unit: Months
Frequency: Monthly
Currency: USD
```

---

# 24. Print / Export

Add:

```text
Print
```

Use the browser's native:

```javascript
window.print();
```

Create print-specific CSS so that the payment schedule prints cleanly.

Do not require a backend.

If practical, also add:

```text
Export CSV
```

Generate the CSV completely in the browser.

---

# 25. Accessibility

Follow basic accessibility standards.

Use:

- Semantic HTML
- Proper `<label>` elements
- Keyboard navigation
- Focus states
- ARIA labels where needed
- Good color contrast
- Accessible buttons
- Accessible form validation

Do not rely only on color to communicate errors.

---

# 26. Responsive Design

Must work well on:

- Mobile phones
- Tablets
- Laptops
- Desktop monitors

Test approximately:

```text
360px
390px
768px
1024px
1280px
1440px
1920px
```

Do not create horizontal page scrolling.

---

# 27. Performance

Keep the application lightweight.

Avoid:

- Large frameworks
- Unnecessary libraries
- Heavy animations
- Excessive DOM manipulation

Use efficient JavaScript.

Calculations should feel instant.

---

# 28. UX Details

Add subtle animations:

- Button hover
- Card transitions
- Theme transition
- Result appearance

Do not overdo animations.

Use clear empty states.

Before calculation:

```text
Enter your loan details and click Calculate Loan.
```

After calculation:

Show the complete result.

---

# 29. Error Handling

The application must never crash because of invalid user input.

Handle:

```text
empty input
NaN
Infinity
negative numbers
invalid dates
zero interest
zero term
very large values
```

For zero interest rate, correctly calculate:

```text
Payment = Principal / Number of Payments
```

without dividing by zero.

---

# 30. File Structure

Use a simple structure:

```text
loan-calculator/
│
├── index.html
├── js/
│   ├── app.js
│   ├── calculations.js
│   ├── localization.js
│   └── utils.js
│
└── README.md
```

If keeping everything in fewer files makes the application simpler, that is acceptable.

Prioritize maintainability.

---

# 31. Code Quality

Write clean production-quality code.

Use:

- Meaningful variable names
- Small reusable functions
- Comments for financial formulas
- No duplicated calculation logic
- No unnecessary global variables
- No inline JavaScript where avoidable

Do not use placeholder functionality.

Everything visible in the UI should actually work.

---

# 32. README

Create a README explaining:

- What the application does
- Supported loan types
- Supported payment frequencies
- How calculations work
- How to run the application
- How localization works
- How dark mode works
- How to customize currencies
- How to add another loan type

---

# 33. Important Requirements

The final application must:

- Be fully static
- Work without a backend
- Work without an API
- Work offline after required CDN assets are cached, where applicable
- Be responsive
- Support English
- Support Khmer
- Support dark mode
- Support light mode
- Support multiple loan types
- Generate payment schedules
- Calculate interest correctly
- Support USD and KHR
- Support extra payments
- Support printing
- Support CSV export
- Have no broken buttons
- Have no placeholder calculations
- Have no console errors

---

# 34. Final Verification

Before finishing:

1. Open the application.
2. Test every loan type.
3. Test zero interest.
4. Test monthly payments.
5. Test weekly payments.
6. Test yearly payments.
7. Test USD.
8. Test KHR.
9. Test English.
10. Test Khmer.
11. Test dark mode.
12. Test light mode.
13. Test mobile layout.
14. Test invalid inputs.
15. Test extra payments.
16. Test payment schedule.
17. Test print.
18. Test CSV export.
19. Check browser console for errors.
20. Verify that reducing-balance calculations produce a final balance of zero.

Do not finish until the application is functional and polished.

## Development Principle

Prioritize:

```text
Accuracy
> Usability
> Simplicity
> Performance
> Visual polish
```

The application should feel like a **real professional loan calculator**, not a basic demo.
