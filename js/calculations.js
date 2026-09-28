function calculateLoan(params) {
  const {
    loanType = "reducing",
    principal = 10000,
    annualRate = 12,
    termValue = 12,
    termUnit = "months",
    frequency = "monthly",
    startDate = new Date(),
    processingFee = 0,
    originationFee = 0,
    insuranceFee = 0,
    extraPayment = 0,
    gracePeriod = 0,
    balloonPayment = 0
  } = params;

  const P = Math.max(0, Number(principal));
  const rate = Math.max(0, Number(annualRate));
  const periodsPerYear = getPeriodsPerYear(frequency);

  let totalPeriods = 0;
  let termInYears = 0;

  if (loanType === "custom") {
    totalPeriods = Math.max(1, Math.round(Number(termValue)));
    termInYears = totalPeriods / periodsPerYear;
  } else if (termUnit === "years") {
    termInYears = Number(termValue);
    totalPeriods = Math.max(1, Math.round(termInYears * periodsPerYear));
  } else {
    termInYears = Number(termValue) / 12;
    totalPeriods = Math.max(1, Math.round(termInYears * periodsPerYear));
  }

  const periodicRate = rate > 0 ? (rate / 100) / periodsPerYear : 0;
  const upfrontFees = Math.max(0, Number(processingFee)) +
                      Math.max(0, Number(originationFee)) +
                      Math.max(0, Number(insuranceFee));

  let calcResult;

  switch (loanType) {
    case "flat":
      calcResult = computeFlatRateLoan({
        P, rate, termInYears, totalPeriods, periodicRate, extraPayment, startDate, frequency
      });
      break;
    case "interest_only":
      calcResult = computeInterestOnlyLoan({
        P, periodicRate, totalPeriods, extraPayment, startDate, frequency
      });
      break;
    case "bullet":
      calcResult = computeBulletLoan({
        P, periodicRate, totalPeriods, extraPayment, startDate, frequency
      });
      break;
    case "simple_interest":
      calcResult = computeSimpleInterestLoan({
        P, rate, termInYears, totalPeriods, extraPayment, startDate, frequency
      });
      break;
    case "reducing":
    case "custom":
    default:
      calcResult = computeReducingBalanceLoan({
        P, periodicRate, totalPeriods, extraPayment, gracePeriod, balloonPayment, startDate, frequency
      });
      break;
  }

  let baselineInterest = calcResult.totalInterest;
  let baselinePeriods = totalPeriods;

  if (extraPayment > 0) {
    let baselineResult;
    if (loanType === "flat") {
      baselineResult = computeFlatRateLoan({
        P, rate, termInYears, totalPeriods, periodicRate, extraPayment: 0, startDate, frequency
      });
    } else if (loanType === "interest_only") {
      baselineResult = computeInterestOnlyLoan({
        P, periodicRate, totalPeriods, extraPayment: 0, startDate, frequency
      });
    } else if (loanType === "bullet") {
      baselineResult = computeBulletLoan({
        P, periodicRate, totalPeriods, extraPayment: 0, startDate, frequency
      });
    } else if (loanType === "simple_interest") {
      baselineResult = computeSimpleInterestLoan({
        P, rate, termInYears, totalPeriods, extraPayment: 0, startDate, frequency
      });
    } else {
      baselineResult = computeReducingBalanceLoan({
        P, periodicRate, totalPeriods, extraPayment: 0, gracePeriod, balloonPayment, startDate, frequency
      });
    }
    baselineInterest = baselineResult.totalInterest;
    baselinePeriods = baselineResult.schedule.length;
  }

  const interestSaved = Math.max(0, baselineInterest - calcResult.totalInterest);
  const periodsSaved = Math.max(0, baselinePeriods - calcResult.schedule.length);

  return {
    ...calcResult,
    upfrontFees,
    totalCost: calcResult.totalRepayment + upfrontFees,
    interestSaved,
    periodsSaved,
    termInYears,
    totalPeriods,
    periodicRate
  };
}

function computeReducingBalanceLoan({
  P, periodicRate, totalPeriods, extraPayment = 0, gracePeriod = 0, balloonPayment = 0, startDate, frequency
}) {
  const g = Math.min(Math.max(0, Math.round(gracePeriod)), totalPeriods - 1);
  const B = Math.min(P, Math.max(0, Number(balloonPayment)));
  const amortPeriods = totalPeriods - g;

  let regularPayment = 0;
  if (periodicRate === 0) {
    regularPayment = (P - B) / amortPeriods;
  } else {
    const discount = Math.pow(1 + periodicRate, -amortPeriods);
    if (1 - discount === 0) {
      regularPayment = (P - B) / amortPeriods;
    } else {
      regularPayment = (P - (B * Math.pow(1 + periodicRate, -amortPeriods))) *
                       (periodicRate / (1 - discount));
    }
  }

  const schedule = [];
  let balance = P;
  let totalInterest = 0;
  let totalPrincipalPaid = 0;
  const anchorDay = startDate.getDate();

  for (let i = 1; i <= totalPeriods; i++) {
    if (balance <= 0.00001) break;

    const date = addPaymentPeriod(startDate, i, frequency, anchorDay);
    const interest = balance * periodicRate;
    let scheduledPrincipal = 0;
    let payment = 0;
    let appliedExtra = 0;

    if (i <= g) {
      scheduledPrincipal = 0;
      payment = interest;
    } else if (i === totalPeriods && B > 0) {
      scheduledPrincipal = Math.min(balance, (regularPayment - interest) + B);
      payment = scheduledPrincipal + interest;
    } else {
      scheduledPrincipal = regularPayment - interest;
      if (scheduledPrincipal > balance) {
        scheduledPrincipal = balance;
      }
      payment = scheduledPrincipal + interest;

      if (extraPayment > 0 && balance > scheduledPrincipal) {
        appliedExtra = Math.min(extraPayment, balance - scheduledPrincipal);
      }
    }

    if (i === totalPeriods && balance - (scheduledPrincipal + appliedExtra) < 0.05) {
      scheduledPrincipal = balance - appliedExtra;
      payment = scheduledPrincipal + interest;
    }

    const totalPrincipalThisPeriod = scheduledPrincipal + appliedExtra;
    balance = Math.max(0, balance - totalPrincipalThisPeriod);

    totalInterest += interest;
    totalPrincipalPaid += totalPrincipalThisPeriod;

    schedule.push({
      period: i,
      date,
      payment: Number((payment + appliedExtra).toFixed(2)),
      principal: Number(totalPrincipalThisPeriod.toFixed(2)),
      interest: Number(interest.toFixed(2)),
      extra: Number(appliedExtra.toFixed(2)),
      balance: Number(balance.toFixed(2))
    });

    if (balance <= 0.00001) break;
  }

  const lastPayment = schedule.length > 0 ? schedule[schedule.length - 1] : null;
  const payoffDate = lastPayment ? lastPayment.date : startDate;
  const initialPeriodicPayment = schedule.length > 0 ? (g > 0 ? schedule[g] ? schedule[g].payment : schedule[0].payment : schedule[0].payment) : 0;

  return {
    paymentAmount: Number(regularPayment.toFixed(2)) || (schedule[0] ? schedule[0].payment : 0),
    initialPeriodicPayment,
    totalPrincipal: Number(totalPrincipalPaid.toFixed(2)),
    totalInterest: Number(totalInterest.toFixed(2)),
    totalRepayment: Number((totalPrincipalPaid + totalInterest).toFixed(2)),
    payoffDate,
    schedule
  };
}

function computeFlatRateLoan({
  P, rate, termInYears, totalPeriods, periodicRate, extraPayment = 0, startDate, frequency
}) {
  const totalInterestExpected = P * (rate / 100) * termInYears;
  const totalRepaymentExpected = P + totalInterestExpected;
  const periodicInterest = totalInterestExpected / totalPeriods;
  const periodicPrincipal = P / totalPeriods;
  const regularPayment = periodicPrincipal + periodicInterest;

  const schedule = [];
  let balance = P;
  let totalInterest = 0;
  let totalPrincipalPaid = 0;
  const anchorDay = startDate.getDate();

  for (let i = 1; i <= totalPeriods; i++) {
    if (balance <= 0.00001) break;

    const date = addPaymentPeriod(startDate, i, frequency, anchorDay);
    let principalPart = Math.min(balance, periodicPrincipal);
    let appliedExtra = 0;

    if (extraPayment > 0 && balance > principalPart) {
      appliedExtra = Math.min(extraPayment, balance - principalPart);
    }

    if (i === totalPeriods) {
      principalPart = balance - appliedExtra;
    }

    const totalPrincipalThisPeriod = principalPart + appliedExtra;
    balance = Math.max(0, balance - totalPrincipalThisPeriod);

    totalInterest += periodicInterest;
    totalPrincipalPaid += totalPrincipalThisPeriod;

    schedule.push({
      period: i,
      date,
      payment: Number((regularPayment + appliedExtra).toFixed(2)),
      principal: Number(totalPrincipalThisPeriod.toFixed(2)),
      interest: Number(periodicInterest.toFixed(2)),
      extra: Number(appliedExtra.toFixed(2)),
      balance: Number(balance.toFixed(2))
    });

    if (balance <= 0.00001) break;
  }

  const lastPayment = schedule.length > 0 ? schedule[schedule.length - 1] : null;
  const payoffDate = lastPayment ? lastPayment.date : startDate;

  return {
    paymentAmount: Number(regularPayment.toFixed(2)),
    initialPeriodicPayment: Number(regularPayment.toFixed(2)),
    totalPrincipal: Number(totalPrincipalPaid.toFixed(2)),
    totalInterest: Number(totalInterest.toFixed(2)),
    totalRepayment: Number((totalPrincipalPaid + totalInterest).toFixed(2)),
    payoffDate,
    schedule
  };
}

function computeInterestOnlyLoan({
  P, periodicRate, totalPeriods, extraPayment = 0, startDate, frequency
}) {
  const schedule = [];
  let balance = P;
  let totalInterest = 0;
  let totalPrincipalPaid = 0;
  const anchorDay = startDate.getDate();
  const regularInterestPayment = P * periodicRate;

  for (let i = 1; i <= totalPeriods; i++) {
    if (balance <= 0.00001) break;

    const date = addPaymentPeriod(startDate, i, frequency, anchorDay);
    const interest = balance * periodicRate;
    let principalPart = 0;
    let appliedExtra = 0;

    if (i === totalPeriods) {
      principalPart = balance;
    } else if (extraPayment > 0) {
      appliedExtra = Math.min(extraPayment, balance);
      principalPart = appliedExtra;
      appliedExtra = 0;
    }

    balance = Math.max(0, balance - principalPart);
    totalInterest += interest;
    totalPrincipalPaid += principalPart;

    schedule.push({
      period: i,
      date,
      payment: Number((interest + principalPart).toFixed(2)),
      principal: Number(principalPart.toFixed(2)),
      interest: Number(interest.toFixed(2)),
      extra: Number(appliedExtra.toFixed(2)),
      balance: Number(balance.toFixed(2))
    });

    if (balance <= 0.00001) break;
  }

  const lastPayment = schedule.length > 0 ? schedule[schedule.length - 1] : null;
  const payoffDate = lastPayment ? lastPayment.date : startDate;

  return {
    paymentAmount: Number(regularInterestPayment.toFixed(2)),
    initialPeriodicPayment: Number(regularInterestPayment.toFixed(2)),
    totalPrincipal: Number(totalPrincipalPaid.toFixed(2)),
    totalInterest: Number(totalInterest.toFixed(2)),
    totalRepayment: Number((totalPrincipalPaid + totalInterest).toFixed(2)),
    payoffDate,
    schedule
  };
}

function computeBulletLoan({
  P, periodicRate, totalPeriods, extraPayment = 0, startDate, frequency
}) {
  return computeInterestOnlyLoan({
    P, periodicRate, totalPeriods, extraPayment, startDate, frequency
  });
}

function computeSimpleInterestLoan({
  P, rate, termInYears, totalPeriods, extraPayment = 0, startDate, frequency
}) {
  return computeFlatRateLoan({
    P, rate, termInYears, totalPeriods, periodicRate: 0, extraPayment, startDate, frequency
  });
}
