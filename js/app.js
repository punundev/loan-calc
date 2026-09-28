let breakdownChart = null;
let balanceChart = null;
let currentCalculation = null;

const defaultState = {
  loanType: "reducing",
  loanAmount: 10000,
  interestRate: 12,
  loanTerm: 12,
  termUnit: "months",
  frequency: "monthly",
  processingFee: 0,
  originationFee: 0,
  insuranceFee: 0,
  extraPayment: 0,
  gracePeriod: 0,
  balloonPayment: 0,
  currency: "USD"
};

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initLanguage();
  initCurrency();
  initDefaultDates();
  setupEventListeners();
  handleLoanTypeChange();
  calculateAndRender();
});

function initTheme() {
  const savedTheme = localStorage.getItem("preferred_theme") || "system";
  applyTheme(savedTheme);

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (localStorage.getItem("preferred_theme") === "system") {
      applyTheme("system");
    }
  });
}

function applyTheme(theme) {
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  localStorage.setItem("preferred_theme", theme);

  const themeSelect = document.getElementById("theme-selector");
  if (themeSelect) {
    themeSelect.value = theme;
  }

  updateChartsTheme();
}

function initLanguage() {
  const lang = getLanguage();
  const langSelect = document.getElementById("lang-selector");
  if (langSelect) {
    langSelect.value = lang;
  }
  applyTranslations();
}

function initCurrency() {
  const saved = localStorage.getItem("preferred_currency") || "USD";
  const currencySelect = document.getElementById("currency-selector");
  if (currencySelect) {
    currencySelect.value = saved;
  }
}

function getSelectedCurrency() {
  const currencySelect = document.getElementById("currency-selector");
  return currencySelect ? currencySelect.value : "USD";
}

function initDefaultDates() {
  const startDateInput = document.getElementById("start-date");
  if (startDateInput && !startDateInput.value) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    startDateInput.value = `${yyyy}-${mm}-${dd}`;
  }
}

function setupEventListeners() {
  const form = document.getElementById("loan-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      calculateAndRender();
    });
  }

  const loanTypeSelect = document.getElementById("loan-type");
  if (loanTypeSelect) {
    loanTypeSelect.addEventListener("change", () => {
      handleLoanTypeChange();
      calculateAndRender();
    });
  }

  const termUnitSelect = document.getElementById("term-unit");
  if (termUnitSelect) {
    termUnitSelect.addEventListener("change", () => {
      calculateAndRender();
    });
  }

  const frequencySelect = document.getElementById("payment-frequency");
  if (frequencySelect) {
    frequencySelect.addEventListener("change", () => {
      calculateAndRender();
    });
  }

  const currencySelect = document.getElementById("currency-selector");
  if (currencySelect) {
    currencySelect.addEventListener("change", (e) => {
      localStorage.setItem("preferred_currency", e.target.value);
      renderResults();
    });
  }

  const langSelect = document.getElementById("lang-selector");
  if (langSelect) {
    langSelect.addEventListener("change", (e) => {
      setLanguage(e.target.value);
    });
  }

  const themeSelect = document.getElementById("theme-selector");
  if (themeSelect) {
    themeSelect.addEventListener("change", (e) => {
      applyTheme(e.target.value);
    });
  }

  const resetBtn = document.getElementById("reset-btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", resetCalculator);
  }

  const toggleScheduleBtn = document.getElementById("toggle-schedule-btn");
  if (toggleScheduleBtn) {
    toggleScheduleBtn.addEventListener("click", toggleScheduleVisibility);
  }

  const exportCsvBtn = document.getElementById("export-csv-btn");
  if (exportCsvBtn) {
    exportCsvBtn.addEventListener("click", handleExportCsv);
  }

  const printBtn = document.getElementById("print-btn");
  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }

  const advancedToggle = document.getElementById("advanced-toggle");
  if (advancedToggle) {
    advancedToggle.addEventListener("click", () => {
      const advancedBody = document.getElementById("advanced-options-body");
      const icon = document.getElementById("advanced-icon");
      if (advancedBody) {
        const isHidden = advancedBody.classList.toggle("hidden");
        if (icon) {
          icon.style.transform = isHidden ? "rotate(0deg)" : "rotate(180deg)";
        }
      }
    });
  }

  document.addEventListener("languageChanged", () => {
    handleLoanTypeChange();
    renderResults();
  });
}

function handleLoanTypeChange() {
  const loanTypeSelect = document.getElementById("loan-type");
  const type = loanTypeSelect ? loanTypeSelect.value : "reducing";
  const descEl = document.getElementById("loan-type-desc");
  const balloonGroup = document.getElementById("balloon-payment-group");
  const graceGroup = document.getElementById("grace-period-group");
  const termUnitSelect = document.getElementById("term-unit");

  if (descEl) {
    descEl.textContent = t(`desc_${type}`);
  }

  if (type === "custom") {
    if (termUnitSelect) {
      termUnitSelect.value = "months";
    }
  }

  if (balloonGroup) {
    balloonGroup.style.display = (type === "reducing") ? "block" : "none";
  }

  if (graceGroup) {
    graceGroup.style.display = (type === "reducing") ? "block" : "none";
  }
}

function validateInputs() {
  let isValid = true;

  const clearError = (id) => {
    const errorEl = document.getElementById(`${id}-error`);
    const inputEl = document.getElementById(id);
    if (errorEl) {
      errorEl.textContent = "";
      errorEl.classList.add("hidden");
    }
    if (inputEl) {
      inputEl.classList.remove("border-rose-500", "focus:ring-rose-500");
    }
  };

  const showError = (id, messageKey) => {
    const errorEl = document.getElementById(`${id}-error`);
    const inputEl = document.getElementById(id);
    if (errorEl) {
      errorEl.textContent = t(messageKey);
      errorEl.classList.remove("hidden");
    }
    if (inputEl) {
      inputEl.classList.add("border-rose-500", "focus:ring-rose-500");
    }
    isValid = false;
  };

  ["loan-amount", "interest-rate", "loan-term", "extra-payment", "start-date"].forEach(clearError);

  const amountVal = parseFloat(document.getElementById("loan-amount").value);
  if (isNaN(amountVal) || amountVal <= 0) {
    showError("loan-amount", "err_amount_positive");
  }

  const rateVal = parseFloat(document.getElementById("interest-rate").value);
  if (isNaN(rateVal) || rateVal < 0) {
    showError("interest-rate", "err_rate_negative");
  }

  const termVal = parseFloat(document.getElementById("loan-term").value);
  if (isNaN(termVal) || termVal <= 0) {
    showError("loan-term", "err_term_positive");
  }

  const extraVal = parseFloat(document.getElementById("extra-payment").value || "0");
  if (isNaN(extraVal) || extraVal < 0) {
    showError("extra-payment", "err_extra_negative");
  }

  const startDateVal = document.getElementById("start-date").value;
  if (!startDateVal || isNaN(new Date(startDateVal).getTime())) {
    showError("start-date", "err_start_date_invalid");
  }

  return isValid;
}

function getFormValues() {
  const dateStr = document.getElementById("start-date").value;
  const parts = dateStr.split("-");
  const parsedDate = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));

  return {
    loanType: document.getElementById("loan-type").value,
    principal: parseFloat(document.getElementById("loan-amount").value) || 0,
    annualRate: parseFloat(document.getElementById("interest-rate").value) || 0,
    termValue: parseFloat(document.getElementById("loan-term").value) || 1,
    termUnit: document.getElementById("term-unit").value,
    frequency: document.getElementById("payment-frequency").value,
    startDate: parsedDate,
    processingFee: parseFloat(document.getElementById("processing-fee").value) || 0,
    originationFee: parseFloat(document.getElementById("origination-fee").value) || 0,
    insuranceFee: parseFloat(document.getElementById("insurance-fee").value) || 0,
    extraPayment: parseFloat(document.getElementById("extra-payment").value) || 0,
    gracePeriod: parseFloat(document.getElementById("grace-period").value) || 0,
    balloonPayment: parseFloat(document.getElementById("balloon-payment").value) || 0
  };
}

function calculateAndRender() {
  if (!validateInputs()) {
    return;
  }
  const params = getFormValues();
  currentCalculation = calculateLoan(params);
  renderResults();
}

function renderResults() {
  if (!currentCalculation) return;

  const currency = getSelectedCurrency();
  const lang = getLanguage();
  const res = currentCalculation;
  const frequency = document.getElementById("payment-frequency").value;

  const freqLabel = t(`freq_${frequency}`).split(" ")[0];
  const periodicLabelEl = document.getElementById("periodic-payment-label");
  if (periodicLabelEl) {
    periodicLabelEl.textContent = t("summary_periodic_payment", { frequency: freqLabel });
  }

  const periodicAmountEl = document.getElementById("periodic-payment-amount");
  if (periodicAmountEl) {
    periodicAmountEl.textContent = formatCurrency(res.initialPeriodicPayment || res.paymentAmount, currency, lang);
  }

  const principalEl = document.getElementById("summary-principal");
  if (principalEl) {
    principalEl.textContent = formatCurrency(res.totalPrincipal, currency, lang);
  }

  const interestEl = document.getElementById("summary-interest");
  if (interestEl) {
    interestEl.textContent = formatCurrency(res.totalInterest, currency, lang);
  }

  const repaymentEl = document.getElementById("summary-repayment");
  if (repaymentEl) {
    repaymentEl.textContent = formatCurrency(res.totalRepayment, currency, lang);
  }

  const feesEl = document.getElementById("summary-fees");
  if (feesEl) {
    feesEl.textContent = formatCurrency(res.upfrontFees, currency, lang);
  }

  const costEl = document.getElementById("summary-cost");
  if (costEl) {
    costEl.textContent = formatCurrency(res.totalCost, currency, lang);
  }

  const numPaymentsEl = document.getElementById("summary-payments-count");
  if (numPaymentsEl) {
    numPaymentsEl.textContent = formatNumber(res.schedule.length, 0, lang);
  }

  const payoffDateEl = document.getElementById("summary-payoff-date");
  if (payoffDateEl) {
    payoffDateEl.textContent = formatDate(res.payoffDate, lang);
  }

  const savingsCard = document.getElementById("extra-savings-card");
  if (savingsCard) {
    if (res.interestSaved > 0.01 || res.periodsSaved > 0) {
      savingsCard.classList.remove("hidden");
      const savingsMsgEl = document.getElementById("extra-savings-message");
      if (savingsMsgEl) {
        savingsMsgEl.textContent = `${t("interest_saved_amount", { amount: formatCurrency(res.interestSaved, currency, lang) })} • ${t("periods_saved", { count: res.periodsSaved })}`;
      }
    } else {
      savingsCard.classList.add("hidden");
    }
  }

  renderCharts(res, currency, lang);
  renderScheduleTable(res, currency, lang);
}

function renderCharts(res, currency, lang) {
  if (typeof Chart === "undefined") {
    return;
  }

  const isDark = document.documentElement.classList.contains("dark");
  const textColor = isDark ? "#cbd5e1" : "#475569";
  const gridColor = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)";

  const breakdownCtx = document.getElementById("breakdown-chart");
  if (breakdownCtx) {
    if (breakdownChart) {
      breakdownChart.destroy();
    }
    breakdownChart = new Chart(breakdownCtx, {
      type: "doughnut",
      data: {
        labels: [t("chart_legend_principal"), t("chart_legend_interest")],
        datasets: [{
          data: [res.totalPrincipal, res.totalInterest],
          backgroundColor: ["#3b82f6", "#f59e0b"],
          hoverBackgroundColor: ["#2563eb", "#d97706"],
          borderWidth: 2,
          borderColor: isDark ? "#1e293b" : "#ffffff"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: textColor,
              font: { family: lang === "km" ? "Kantumruy Pro, sans-serif" : "Inter, sans-serif" }
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const val = context.raw || 0;
                const total = res.totalPrincipal + res.totalInterest;
                const pct = total > 0 ? ((val / total) * 100).toFixed(1) : 0;
                return ` ${context.label}: ${formatCurrency(val, currency, lang)} (${pct}%)`;
              }
            }
          }
        },
        cutout: "68%"
      }
    });
  }

  const balanceCtx = document.getElementById("balance-chart");
  if (balanceCtx) {
    if (balanceChart) {
      balanceChart.destroy();
    }

    const sampledSchedule = res.schedule.length > 120
      ? res.schedule.filter((_, idx) => idx % Math.ceil(res.schedule.length / 80) === 0 || idx === res.schedule.length - 1)
      : res.schedule;

    const labels = sampledSchedule.map(item => formatDate(item.date, lang));
    const dataPoints = sampledSchedule.map(item => item.balance);

    balanceChart = new Chart(balanceCtx, {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: t("chart_legend_balance"),
          data: dataPoints,
          borderColor: "#10b981",
          backgroundColor: "rgba(16, 185, 129, 0.12)",
          fill: true,
          tension: 0.25,
          pointRadius: sampledSchedule.length > 40 ? 0 : 3,
          pointHoverRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "index",
          intersect: false
        },
        scales: {
          x: {
            grid: { color: gridColor },
            ticks: {
              color: textColor,
              maxTicksLimit: 8,
              font: { family: lang === "km" ? "Kantumruy Pro, sans-serif" : "Inter, sans-serif" }
            }
          },
          y: {
            grid: { color: gridColor },
            ticks: {
              color: textColor,
              callback: (val) => formatCurrency(val, currency, lang),
              font: { family: lang === "km" ? "Kantumruy Pro, sans-serif" : "Inter, sans-serif" }
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context) => ` ${t("chart_legend_balance")}: ${formatCurrency(context.raw, currency, lang)}`
            }
          }
        }
      }
    });
  }
}

function updateChartsTheme() {
  if (currentCalculation) {
    renderCharts(currentCalculation, getSelectedCurrency(), getLanguage());
  }
}

function renderScheduleTable(res, currency, lang) {
  const tbody = document.getElementById("schedule-table-body");
  if (!tbody) return;

  tbody.innerHTML = "";

  const frag = document.createDocumentFragment();

  res.schedule.forEach((row) => {
    const tr = document.createElement("tr");
    tr.className = "hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors border-b border-slate-100 dark:border-slate-800 text-sm";

    tr.innerHTML = `
      <td class="py-3 px-4 text-slate-500 dark:text-slate-400 font-mono text-xs">${row.period}</td>
      <td class="py-3 px-4 font-medium text-slate-700 dark:text-slate-200 whitespace-nowrap">${formatDate(row.date, lang)}</td>
      <td class="py-3 px-4 text-right font-semibold text-slate-900 dark:text-slate-100">${formatCurrency(row.payment, currency, lang)}</td>
      <td class="py-3 px-4 text-right text-emerald-600 dark:text-emerald-400 font-medium">${formatCurrency(row.principal, currency, lang)}</td>
      <td class="py-3 px-4 text-right text-amber-600 dark:text-amber-400 font-medium">${formatCurrency(row.interest, currency, lang)}</td>
      <td class="py-3 px-4 text-right text-indigo-600 dark:text-indigo-400">${row.extra > 0 ? formatCurrency(row.extra, currency, lang) : "-"}</td>
      <td class="py-3 px-4 text-right font-medium text-slate-700 dark:text-slate-300 font-mono text-xs">${formatCurrency(row.balance, currency, lang)}</td>
    `;
    frag.appendChild(tr);
  });

  tbody.appendChild(frag);
}

function toggleScheduleVisibility() {
  const scheduleContainer = document.getElementById("schedule-section-content");
  const toggleBtn = document.getElementById("toggle-schedule-btn");
  if (!scheduleContainer || !toggleBtn) return;

  const isHidden = scheduleContainer.classList.toggle("hidden");
  toggleBtn.textContent = isHidden ? t("schedule_toggle_show") : t("schedule_toggle_hide");
}

function handleExportCsv() {
  if (!currentCalculation || !currentCalculation.schedule.length) return;

  const currency = getSelectedCurrency();
  const lang = getLanguage();
  const headers = [
    t("col_num"),
    t("col_date"),
    `${t("col_payment")} (${currency})`,
    `${t("col_principal")} (${currency})`,
    `${t("col_interest")} (${currency})`,
    `${t("col_extra")} (${currency})`,
    `${t("col_balance")} (${currency})`
  ];

  const rows = currentCalculation.schedule.map((row) => [
    row.period,
    formatDate(row.date, lang),
    row.payment,
    row.principal,
    row.interest,
    row.extra,
    row.balance
  ]);

  exportToCsv(`loan-schedule-${new Date().toISOString().slice(0, 10)}.csv`, headers, rows);
}

function resetCalculator() {
  document.getElementById("loan-type").value = defaultState.loanType;
  document.getElementById("loan-amount").value = defaultState.loanAmount;
  document.getElementById("interest-rate").value = defaultState.interestRate;
  document.getElementById("loan-term").value = defaultState.loanTerm;
  document.getElementById("term-unit").value = defaultState.termUnit;
  document.getElementById("payment-frequency").value = defaultState.frequency;
  document.getElementById("processing-fee").value = defaultState.processingFee;
  document.getElementById("origination-fee").value = defaultState.originationFee;
  document.getElementById("insurance-fee").value = defaultState.insuranceFee;
  document.getElementById("extra-payment").value = defaultState.extraPayment;
  document.getElementById("grace-period").value = defaultState.gracePeriod;
  document.getElementById("balloon-payment").value = defaultState.balloonPayment;

  const currencySelect = document.getElementById("currency-selector");
  if (currencySelect) {
    currencySelect.value = defaultState.currency;
    localStorage.setItem("preferred_currency", defaultState.currency);
  }

  initDefaultDates();
  handleLoanTypeChange();
  calculateAndRender();
}
