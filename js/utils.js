function formatCurrency(amount, currencyCode = "USD", locale = "en-US") {
  const num = Number(amount) || 0;
  if (currencyCode === "KHR") {
    return new Intl.NumberFormat(locale === "km" ? "km-KH" : "en-US", {
      style: "currency",
      currency: "KHR",
      maximumFractionDigits: 0
    }).format(Math.round(num));
  }
  return new Intl.NumberFormat(locale === "km" ? "km-KH" : "en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
}

function formatNumber(val, decimals = 2, locale = "en-US") {
  const num = Number(val) || 0;
  return new Intl.NumberFormat(locale === "km" ? "km-KH" : "en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(num);
}

function formatDate(date, locale = "en-US") {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return "";
  }
  return new Intl.DateTimeFormat(locale === "km" ? "km-KH" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(date);
}

function addPaymentPeriod(baseDate, periodIndex, frequency, originalAnchorDay) {
  const d = new Date(baseDate.getTime());
  switch (frequency) {
    case "daily":
      d.setDate(d.getDate() + periodIndex);
      return d;
    case "weekly":
      d.setDate(d.getDate() + periodIndex * 7);
      return d;
    case "biweekly":
      d.setDate(d.getDate() + periodIndex * 14);
      return d;
    case "monthly":
      return addMonthsClamped(baseDate, periodIndex, originalAnchorDay);
    case "quarterly":
      return addMonthsClamped(baseDate, periodIndex * 3, originalAnchorDay);
    case "semiannually":
      return addMonthsClamped(baseDate, periodIndex * 6, originalAnchorDay);
    case "annually":
      return addMonthsClamped(baseDate, periodIndex * 12, originalAnchorDay);
    default:
      return addMonthsClamped(baseDate, periodIndex, originalAnchorDay);
  }
}

function addMonthsClamped(baseDate, monthsToAdd, originalAnchorDay) {
  const targetYear = baseDate.getFullYear();
  const targetMonth = baseDate.getMonth() + monthsToAdd;
  const targetDate = new Date(targetYear, targetMonth, 1);
  const maxDays = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0).getDate();
  const clampedDay = Math.min(originalAnchorDay, maxDays);
  targetDate.setDate(clampedDay);
  return targetDate;
}

function getPeriodsPerYear(frequency) {
  switch (frequency) {
    case "daily": return 365;
    case "weekly": return 52;
    case "biweekly": return 26;
    case "monthly": return 12;
    case "quarterly": return 4;
    case "semiannually": return 2;
    case "annually": return 1;
    default: return 12;
  }
}

