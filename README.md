# Static Loan Calculator

A modern, fast, and responsive static web application for calculating and analyzing various types of loans with comprehensive amortization schedules, financial charts, and bilingual localization (English & Khmer).

## Features

- **Multiple Loan Types**:
  - **Amortized / Reducing Balance**: Standard bank loan where interest decreases with principal repayments.
  - **Flat Rate Loan**: Fixed total interest distributed evenly across the term.
  - **Interest-Only Loan**: Periodic interest payments with principal due at maturity.
  - **Bullet Loan**: Periodic interest with lump-sum principal repayment at maturity.
  - **Simple Interest Loan**: Calculated using `Principal × Rate × Time`.
  - **Custom / Manual Loan**: Configurable periods and rate schedules.
- **Flexible Payment Frequencies**:
  - Daily (365/year)
  - Weekly (52/year)
  - Bi-weekly (26/year)
  - Monthly (12/year)
  - Quarterly (4/year)
  - Semi-annually (2/year)
  - Annually (1/year)
- **Advanced Options**:
  - Extra payments per period with early payoff calculation and interest savings analytics.
  - Upfront fee accounting (Processing fee, Origination fee, Insurance fee).
  - Grace period (interest-only initial periods).
  - Balloon payments at maturity.
- **Dynamic Payment Schedule**:
  - Detailed period-by-period table showing Date, Payment, Principal, Interest, Extra Payment, and Remaining Balance.
  - Clamped calendar dates maintaining original payment days (e.g. Jan 31 -> Feb 28 -> Mar 31).
  - Zero-balance termination guarantee on final period.
  - Toggle visibility (Show / Hide) for compact view.
- **Visual Analytics**:
  - Donut chart: Principal vs. Interest proportion.
  - Line chart: Amortization curve showing remaining balance over time.
  - Chart theme dynamically updates with Dark / Light mode switching.
- **Localization (i18n)**:
  - English (`en`) and Khmer (`km`).
  - Instant language switching without page reload.
  - Styled with Khmer-optimized typography (`Kantumruy Pro`).
- **Multi-Currency Support**:
  - US Dollar (USD `$`) with two decimal places.
  - Cambodian Riel (KHR `៛`) with integer formatting.
  - Currency conversion formatting powered by `Intl.NumberFormat`.
- **Persistent Form State**:
  - Automatically saves all input values (loan parameters, start date, advanced options, and accordion visibility) to `localStorage`.
  - Seamlessly restores state upon page refresh and resets to defaults via the Reset button.
- **Theming**:
  - Light mode, Dark mode, and System mode detection (`prefers-color-scheme`).
  - Preference saved in `localStorage`.
- **Export & Print**:
  - Download PDF report with loan summary and complete schedule powered by `html2pdf.js`.
  - CSV export generated directly in the browser (`loan-schedule-YYYY-MM-DD.csv`).
  - Enhanced print stylesheet (`@media print`) rendering clean, unclipped tabular reports.
- **Zero Dependencies / No Build Step**:
  - Runs in any modern browser by directly opening `index.html`.

## Technology Stack

- **HTML5**: Semantic and accessible markup.
- **CSS / Styling**: [Tailwind CSS](https://tailwindcss.com) (via CDN) with dark mode class strategy.
- **Typography**: Google Fonts ([Inter](https://fonts.google.com/specimen/Inter) and [Kantumruy Pro](https://fonts.google.com/specimen/Kantumruy+Pro)).
- **JavaScript**: Pure Vanilla ES6+ without frameworks.
- **Charting**: [Chart.js](https://www.chartjs.org) (via CDN).

## Project Structure

```text
loan-calc/
├── index.html          # Main HTML structure and UI layout
├── js/
│   ├── app.js          # DOM manipulation, theme, and event orchestration
│   ├── calculations.js # Mathematical calculation engine
│   ├── localization.js # Translation dictionaries (EN & KM) and i18n helpers
│   └── utils.js        # Formatting, dates, CSV export, and utilities
├── Makefile            # Project helper targets
├── README.md           # Documentation
└── task.md             # Specification document
```

## How to Run

### Option 1: Direct File Open
Open `index.html` directly in your browser:
```bash
xdg-open index.html # On Linux
open index.html     # On macOS
```

### Option 2: Using the Makefile
```bash
make run
```
This runs a local static HTTP server at `http://localhost:8000` using `python3` (or `npx serve`).

### Available Makefile Targets
- `make setup`: Verify local environment.
- `make install`: Check required CLI tools.
- `make run`: Launch local static HTTP server.
- `make update`: Refresh or check assets.
- `make clean`: Clean temporary files.

## How Calculations Work

### 1. Reducing Balance (Amortized)
For principal $P$, periodic interest rate $r = \frac{\text{Annual Rate}}{100 \times \text{Periods Per Year}}$, and total periods $n$:
$$PMT = P \times \frac{r(1+r)^n}{(1+r)^n - 1}$$
When $r = 0$, $PMT = \frac{P}{n}$.
In each period:
$$\text{Interest}_k = \text{Balance}_{k-1} \times r$$
$$\text{Principal}_k = PMT - \text{Interest}_k + \text{Extra Payment}$$
$$\text{Balance}_k = \text{Balance}_{k-1} - \text{Principal}_k$$

### 2. Flat Rate Loan
Total interest is fixed:
$$\text{Total Interest} = P \times \frac{\text{Annual Rate}}{100} \times \text{Term in Years}$$
$$\text{Total Repayment} = P + \text{Total Interest}$$
$$\text{Periodic Payment} = \frac{\text{Total Repayment}}{n}$$

### 3. Interest-Only Loan
For periods $1$ through $n-1$:
$$\text{Payment}_k = P \times r$$
At maturity ($k = n$):
$$\text{Payment}_n = (P \times r) + P$$

### 4. Bullet Loan
Periodic payments cover interest ($P \times r$), while full principal is repaid as a single balloon at maturity.

### 5. Simple Interest Loan
$$\text{Total Interest} = P \times \frac{\text{Annual Rate}}{100} \times \text{Term in Years}$$
Repayment is divided evenly into $n$ installments.

## Customization

### Adding a New Currency
1. Add the currency option to `<select id="currency-selector">` in `index.html`.
2. Update `formatCurrency()` in [js/utils.js](file:///home/phanun/Personal/Static/loan-calc/js/utils.js) with currency formatting rules (e.g. currency code and fraction digits).

### Adding a New Loan Type
1. Add the calculation routine in [js/calculations.js](file:///home/phanun/Personal/Static/loan-calc/js/calculations.js).
2. Register the option in `<select id="loan-type">` in `index.html`.
3. Add English and Khmer labels and descriptions in [js/localization.js](file:///home/phanun/Personal/Static/loan-calc/js/localization.js).
