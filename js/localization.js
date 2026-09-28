const translations = {
  en: {
    app_title: "Loan Calculator",
    app_subtitle: "Calculate, analyze, and plan your loan repayments with precision.",
    loan_type: "Loan Type",
    loan_type_reducing: "Amortized / Reducing Balance",
    loan_type_flat: "Flat Rate",
    loan_type_interest_only: "Interest-Only",
    loan_type_bullet: "Bullet Loan",
    loan_type_simple: "Simple Interest",
    loan_type_custom: "Custom / Manual",
    desc_reducing: "Interest is calculated on the remaining principal balance. Payments reduce both principal and interest each period.",
    desc_flat: "Interest is calculated on the original principal for the entire duration, resulting in equal interest charges.",
    desc_interest_only: "Periodic payments cover only interest. The entire principal is due at maturity.",
    desc_bullet: "Periodic payments cover interest, with the entire principal paid as a lump sum at the end.",
    desc_simple: "Calculates interest using the simple interest formula: Principal × Rate × Time.",
    desc_custom: "Directly configure the number of periods, payment frequency, and interest structure.",
    loan_amount: "Loan Amount",
    interest_rate: "Annual Interest Rate (%)",
    loan_term: "Loan Term",
    term_months: "Months",
    term_years: "Years",
    payment_frequency: "Payment Frequency",
    freq_daily: "Daily (365/yr)",
    freq_weekly: "Weekly (52/yr)",
    freq_biweekly: "Bi-weekly (26/yr)",
    freq_monthly: "Monthly (12/yr)",
    freq_quarterly: "Quarterly (4/yr)",
    freq_semiannually: "Semi-annually (2/yr)",
    freq_annually: "Annually (1/yr)",
    start_date: "Start Date",
    advanced_options: "Advanced Options",
    processing_fee: "Processing Fee",
    origination_fee: "Origination Fee",
    insurance_fee: "Insurance Fee",
    other_fee: "Other Fee",
    extra_payment: "Extra Payment per Period",
    grace_period: "Grace Period (Periods)",
    balloon_payment: "Balloon Payment",
    calculate_btn: "Calculate Loan",
    reset_btn: "Reset",
    results_title: "Calculation Results",
    empty_results_msg: "Enter your loan details and click Calculate Loan to see results.",
    summary_periodic_payment: ":frequency Payment",
    summary_total_principal: "Total Principal",
    summary_total_interest: "Total Interest",
    summary_total_repayment: "Total Repayment",
    summary_total_fees: "Total Upfront Fees",
    summary_effective_cost: "Total Cost (Repayment + Fees)",
    summary_num_payments: "Number of Payments",
    summary_payoff_date: "Estimated Payoff Date",
    chart_breakdown_title: "Principal vs Interest",
    chart_balance_title: "Remaining Balance Over Time",
    chart_legend_principal: "Principal",
    chart_legend_interest: "Interest",
    chart_legend_balance: "Balance",
    schedule_title: "Payment Schedule",
    schedule_toggle_show: "Show Schedule",
    schedule_toggle_hide: "Hide Schedule",
    print: "Print",
    col_num: "#",
    col_date: "Date",
    col_payment: "Payment",
    col_principal: "Principal",
    col_interest: "Interest",
    col_extra: "Extra Payment",
    col_balance: "Remaining Balance",
    err_amount_positive: "Loan amount must be greater than 0.",
    err_rate_negative: "Interest rate cannot be negative.",
    err_term_positive: "Loan term must be greater than 0.",
    err_frequency_required: "Please select a payment frequency.",
    err_start_date_invalid: "Please enter a valid start date.",
    err_extra_negative: "Extra payment cannot be negative.",
    err_fees_negative: "Fees cannot be negative.",
    err_grace_period_invalid: "Grace period cannot exceed total periods.",
    err_balloon_invalid: "Balloon payment cannot exceed loan amount.",
    currency: "Currency",
    currency_usd: "USD ($)",
    currency_khr: "KHR (៛)",
    theme_light: "Light",
    theme_dark: "Dark",
    theme_system: "System",
    language: "Language",
    lang_en: "English",
    lang_km: "ខ្មែរ",
    interest_savings: "Extra Payment Savings",
    term_reduction: "Term Shortened By",
    periods_saved: ":count payments saved",
    interest_saved_amount: ":amount saved in interest"
  },
  km: {
    app_title: "ម៉ាស៊ីនគណនាប្រាក់កម្ចី",
    app_subtitle: "គណនា វិភាគ និងរៀបចំផែនការទូទាត់ប្រាក់កម្ចីរបស់អ្នកយ៉ាងសុក្រឹត និងច្បាស់លាស់។",
    loan_type: "ប្រភេទកម្ចី",
    loan_type_reducing: "កម្ចីបង់រំលស់ (ការប្រាក់ថយចុះ)",
    loan_type_flat: "កម្ចីការប្រាក់ថេរ",
    loan_type_interest_only: "កម្ចីបង់តែការប្រាក់",
    loan_type_bullet: "កម្ចីទូទាត់ដើមចុងគ្រា",
    loan_type_simple: "កម្ចីការប្រាក់ធម្មតា",
    loan_type_custom: "កម្ចីកំណត់ដោយខ្លួនឯង",
    desc_reducing: "ការប្រាក់ត្រូវគណនាលើប្រាក់ដើមនៅសល់ជាក់ស្តែង។ ការបង់ប្រាក់រៀងរាល់គ្រាកាត់បន្ថយទាំងប្រាក់ដើម និងការប្រាក់។",
    desc_flat: "ការប្រាក់ត្រូវគណនាលើប្រាក់ដើមដំបូងពេញមួយរយៈពេលកម្ចី ដែលធ្វើឲ្យការប្រាក់មានចំនួនថេរសរុប។",
    desc_interest_only: "ការបង់ប្រចាំគ្រាគឺសម្រាប់តែការប្រាក់ប៉ុណ្ណោះ។ ប្រាក់ដើមសរុបត្រូវសងនៅពេលផុតកំណត់កម្ចី។",
    desc_bullet: "ការបង់ប្រចាំគ្រាគឺជាការប្រាក់ ហើយប្រាក់ដើមសរុបត្រូវទូទាត់ជាដុំនៅចុងគ្រា។",
    desc_simple: "គណនាការប្រាក់តាមរូបមន្តការប្រាក់សាមញ្ញ៖ ប្រាក់ដើម × អត្រាការប្រាក់ × រយៈពេល។",
    desc_custom: "កំណត់ចំនួនគ្រា ភាពញឹកញាប់នៃការទូទាត់ និងអត្រាការប្រាក់ដោយផ្ទាល់តាមតម្រូវការ។",
    loan_amount: "ចំនួនប្រាក់កម្ចី",
    interest_rate: "អត្រាការប្រាក់ប្រចាំឆ្នាំ (%)",
    loan_term: "រយៈពេលកម្ចី",
    term_months: "ខែ",
    term_years: "ឆ្នាំ",
    payment_frequency: "ភាពញឹកញាប់នៃការទូទាត់",
    freq_daily: "ប្រចាំថ្ងៃ (៣៦៥ លើក/ឆ្នាំ)",
    freq_weekly: "ប្រចាំសប្តាហ៍ (៥២ លើក/ឆ្នាំ)",
    freq_biweekly: "រៀងរាល់ ២ សប្តាហ៍ (២៦ លើក/ឆ្នាំ)",
    freq_monthly: "ប្រចាំខែ (១២ លើក/ឆ្នាំ)",
    freq_quarterly: "ប្រចាំត្រីមាស (៤ លើក/ឆ្នាំ)",
    freq_semiannually: "ប្រចាំឆមាស (២ លើក/ឆ្នាំ)",
    freq_annually: "ប្រចាំឆ្នាំ (១ លើក/ឆ្នាំ)",
    start_date: "ថ្ងៃចាប់ផ្តើម",
    advanced_options: "ជម្រើសកម្រិតខ្ពស់",
    processing_fee: "ថ្លៃសេវាដំណើរការ",
    origination_fee: "ថ្លៃសេវារៀបចំកម្ចី",
    insurance_fee: "ថ្លៃធានារ៉ាប់រង",
    other_fee: "ថ្លៃសេវាផ្សេងៗ",
    extra_payment: "ប្រាក់បង់បន្ថែមក្នុងមួយគ្រា",
    grace_period: "រយៈពេលអនុគ្រោះ (ចំនួនគ្រា)",
    balloon_payment: "ការទូទាត់ចុងគ្រា (Balloon)",
    calculate_btn: "គណនាប្រាក់កម្ចី",
    reset_btn: "កំណត់ឡើងវិញ",
    results_title: "លទ្ធផលគណនា",
    empty_results_msg: "សូមបញ្ចូលព័ត៌មានលម្អិតនៃប្រាក់កម្ចី ហើយចុច គណនាប្រាក់កម្ចី ដើម្បីមើលលទ្ធផល។",
    summary_periodic_payment: "ការទូទាត់:frequency",
    summary_total_principal: "ប្រាក់ដើមសរុប",
    summary_total_interest: "ការប្រាក់សរុប",
    summary_total_repayment: "ការទូទាត់សរុប",
    summary_total_fees: "ថ្លៃសេវាដំបូងសរុប",
    summary_effective_cost: "ចំណាយសរុប (ប្រាក់សង + ថ្លៃសេវា)",
    summary_num_payments: "ចំនួនលើកនៃការទូទាត់",
    summary_payoff_date: "ថ្ងៃបញ្ចប់ការទូទាត់",
    chart_breakdown_title: "សមាមាត្រប្រាក់ដើម និងការប្រាក់",
    chart_balance_title: "សមតុល្យប្រាក់ដើមនៅសល់តាមពេលវេលា",
    chart_legend_principal: "ប្រាក់ដើម",
    chart_legend_interest: "ការប្រាក់",
    chart_legend_balance: "សមតុល្យនៅសល់",
    schedule_title: "តារាងកាលវិភាគបង់ប្រាក់",
    schedule_toggle_show: "បង្ហាញតារាង",
    schedule_toggle_hide: "លាក់តារាង",
    print: "បោះពុម្ព",
    col_num: "#",
    col_date: "កាលបរិច្ឆេទ",
    col_payment: "ការទូទាត់",
    col_principal: "ប្រាក់ដើម",
    col_interest: "ការប្រាក់",
    col_extra: "ប្រាក់បង់បន្ថែម",
    col_balance: "សមតុល្យនៅសល់",
    err_amount_positive: "ចំនួនប្រាក់កម្ចីត្រូវតែធំជាង ០។",
    err_rate_negative: "អត្រាការប្រាក់មិនអាចអវិជ្ជមានបានទេ។",
    err_term_positive: "រយៈពេលកម្ចីត្រូវតែធំជាង ០។",
    err_frequency_required: "សូមជ្រើសរើសភាពញឹកញាប់នៃការទូទាត់។",
    err_start_date_invalid: "សូមបញ្ចូលកាលបរិច្ឆេទចាប់ផ្តើមឲ្យបានត្រឹមត្រូវ។",
    err_extra_negative: "ប្រាក់បង់បន្ថែមមិនអាចអវិជ្ជមានបានទេ។",
    err_fees_negative: "ថ្លៃសេវាមិនអាចអវិជ្ជមានបានទេ។",
    err_grace_period_invalid: "រយៈពេលអនុគ្រោះមិនអាចលើសពីចំនួនគ្រាសរុបឡើយ។",
    err_balloon_invalid: "ប្រាក់បង់ចុងគ្រាមិនអាចលើសពីប្រាក់កម្ចីដើមឡើយ។",
    currency: "រូបិយប័ណ្ណ",
    currency_usd: "ដុល្លារអាមេរិក ($)",
    currency_khr: "រៀលខ្មែរ (៛)",
    theme_light: "ពន្លឺ",
    theme_dark: "ងងឹត",
    theme_system: "តាមប្រព័ន្ធ",
    language: "ភាសា",
    lang_en: "English",
    lang_km: "ខ្មែរ",
    interest_savings: "ការសន្សំការប្រាក់ពីការបង់បន្ថែម",
    term_reduction: "រយៈពេលត្រូវបានកាត់បន្ថយ",
    periods_saved: "កាត់បន្ថយបាន :count លើក",
    interest_saved_amount: "សន្សំការប្រាក់បាន :amount"
  }
};

let currentLanguage = localStorage.getItem("preferred_lang") || "en";

function getLanguage() {
  return currentLanguage;
}

function setLanguage(lang) {
  if (translations[lang]) {
    currentLanguage = lang;
    localStorage.setItem("preferred_lang", lang);
    applyTranslations();
  }
}

function t(key, params = {}) {
  const dict = translations[currentLanguage] || translations.en;
  let text = dict[key] || translations.en[key] || key;
  for (const [paramKey, val] of Object.entries(params)) {
    text = text.replace(new RegExp(`:${paramKey}`, "g"), val);
  }
  return text;
}

function applyTranslations() {
  document.documentElement.lang = currentLanguage;
  if (currentLanguage === "km") {
    document.body.classList.add("font-khmer");
  } else {
    document.body.classList.remove("font-khmer");
  }

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    el.setAttribute("placeholder", t(key));
  });

  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    const key = el.getAttribute("data-i18n-title");
    el.setAttribute("title", t(key));
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.getAttribute("data-i18n-aria");
    el.setAttribute("aria-label", t(key));
  });

  const event = new CustomEvent("languageChanged", { detail: { lang: currentLanguage } });
  document.dispatchEvent(event);
}
