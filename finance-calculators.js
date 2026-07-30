// ==========================================
// Finance Calculators — Shared JS
// Add this file as js/finance-calculators.js
// Covers: PPF, RD, FD, CD, Fixed Savings,
// Mortgage, Retirement, Simple & Compound Interest
// ==========================================


// ---------- PPF Calculator ----------
function calculatePPF() {

    const yearly = parseFloat(document.getElementById('ppf_yearly').value);
    const rate = parseFloat(document.getElementById('ppf_rate').value);
    const years = parseFloat(document.getElementById('ppf_years').value);

    const resultBox = document.getElementById('ppf_result');

    if (!yearly || !rate || !years || yearly <= 0 || rate <= 0 || years <= 0) {
        resultBox.innerHTML = "Please enter valid positive numbers for all fields.";
        return;
    }

    const r = rate / 100;

    // Annuity due formula (PPF deposits compound annually, deposit at start of year)
    const maturity = yearly * (((Math.pow(1 + r, years) - 1) / r) * (1 + r));
    const invested = yearly * years;
    const interestEarned = maturity - invested;

    resultBox.innerHTML =
        "Total Invested: " + invested.toFixed(0) + "<br>" +
        "Interest Earned: " + interestEarned.toFixed(0) + "<br>" +
        "Maturity Value: " + maturity.toFixed(0);
}


// ---------- RD Calculator ----------
function calculateRD() {

    const monthly = parseFloat(document.getElementById('rd_monthly').value);
    const rate = parseFloat(document.getElementById('rd_rate').value);
    const months = parseFloat(document.getElementById('rd_months').value);

    const resultBox = document.getElementById('rd_result');

    if (!monthly || !rate || !months || monthly <= 0 || rate <= 0 || months <= 0) {
        resultBox.innerHTML = "Please enter valid positive numbers for all fields.";
        return;
    }

    // Standard approximate RD maturity formula
    const maturity = (monthly * months) + (monthly * months * (months + 1) / 2) * (rate / 1200);
    const invested = monthly * months;
    const interestEarned = maturity - invested;

    resultBox.innerHTML =
        "Total Invested: " + invested.toFixed(0) + "<br>" +
        "Interest Earned: " + interestEarned.toFixed(0) + "<br>" +
        "Maturity Value: " + maturity.toFixed(0);
}


// ---------- FD Calculator ----------
function calculateFD() {

    const principal = parseFloat(document.getElementById('fd_principal').value);
    const rate = parseFloat(document.getElementById('fd_rate').value);
    const years = parseFloat(document.getElementById('fd_years').value);
    const freqSelect = document.getElementById('fd_compound');
    const n = freqSelect ? parseFloat(freqSelect.value) : 4; // default quarterly

    const resultBox = document.getElementById('fd_result');

    if (!principal || !rate || !years || principal <= 0 || rate <= 0 || years <= 0) {
        resultBox.innerHTML = "Please enter valid positive numbers for all fields.";
        return;
    }

    const r = rate / 100;
    const maturity = principal * Math.pow(1 + r / n, n * years);
    const interestEarned = maturity - principal;

    resultBox.innerHTML =
        "Principal: " + principal.toFixed(0) + "<br>" +
        "Interest Earned: " + interestEarned.toFixed(0) + "<br>" +
        "Maturity Value: " + maturity.toFixed(0);
}


// ---------- CD Calculator (US) ----------
function calculateCD() {

    const principal = parseFloat(document.getElementById('cd_principal').value);
    const rate = parseFloat(document.getElementById('cd_rate').value);
    const years = parseFloat(document.getElementById('cd_years').value);
    const freqSelect = document.getElementById('cd_compound');
    const n = freqSelect ? parseFloat(freqSelect.value) : 12; // default monthly

    const resultBox = document.getElementById('cd_result');

    if (!principal || !rate || !years || principal <= 0 || rate <= 0 || years <= 0) {
        resultBox.innerHTML = "Please enter valid positive numbers for all fields.";
        return;
    }

    const r = rate / 100;
    const maturity = principal * Math.pow(1 + r / n, n * years);
    const interestEarned = maturity - principal;

    resultBox.innerHTML =
        "Principal: " + principal.toFixed(2) + "<br>" +
        "Interest Earned: " + interestEarned.toFixed(2) + "<br>" +
        "Maturity Value: " + maturity.toFixed(2);
}


// ---------- Fixed Savings Calculator (UK) ----------
function calculateFixedSavings() {

    const principal = parseFloat(document.getElementById('fs_principal').value);
    const rate = parseFloat(document.getElementById('fs_rate').value);
    const years = parseFloat(document.getElementById('fs_years').value);
    const freqSelect = document.getElementById('fs_compound');
    const n = freqSelect ? parseFloat(freqSelect.value) : 1; // default annually (typical UK fixed-rate)

    const resultBox = document.getElementById('fs_result');

    if (!principal || !rate || !years || principal <= 0 || rate <= 0 || years <= 0) {
        resultBox.innerHTML = "Please enter valid positive numbers for all fields.";
        return;
    }

    const r = rate / 100;
    const maturity = principal * Math.pow(1 + r / n, n * years);
    const interestEarned = maturity - principal;

    resultBox.innerHTML =
        "Principal: " + principal.toFixed(2) + "<br>" +
        "Interest Earned: " + interestEarned.toFixed(2) + "<br>" +
        "Maturity Value: " + maturity.toFixed(2);
}


// ---------- Mortgage Calculator ----------
function calculateMortgage() {

    const principal = parseFloat(document.getElementById('mortgage_principal').value);
    const annualRate = parseFloat(document.getElementById('mortgage_rate').value);
    const years = parseFloat(document.getElementById('mortgage_years').value);

    const resultBox = document.getElementById('mortgage_result');

    if (!principal || !annualRate || !years || principal <= 0 || annualRate <= 0 || years <= 0) {
        resultBox.innerHTML = "Please enter valid positive numbers for all fields.";
        return;
    }

    const monthlyRate = (annualRate / 100) / 12;
    const numPayments = years * 12;

    const monthlyPayment =
        principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments) /
        (Math.pow(1 + monthlyRate, numPayments) - 1);

    const totalPayment = monthlyPayment * numPayments;
    const totalInterest = totalPayment - principal;

    resultBox.innerHTML =
        "Monthly Payment: " + monthlyPayment.toFixed(2) + "<br>" +
        "Total Interest: " + totalInterest.toFixed(2) + "<br>" +
        "Total Payment: " + totalPayment.toFixed(2);
}


// ---------- Retirement Calculator ----------
function calculateRetirement() {

    const currentAge = parseFloat(document.getElementById('retirement_current_age').value);
    const retireAge = parseFloat(document.getElementById('retirement_retire_age').value);
    const currentSavings = parseFloat(document.getElementById('retirement_current_savings').value) || 0;
    const monthlyContribution = parseFloat(document.getElementById('retirement_monthly').value);
    const annualRate = parseFloat(document.getElementById('retirement_rate').value);

    const resultBox = document.getElementById('retirement_result');

    if (!currentAge || !retireAge || !monthlyContribution || !annualRate ||
        retireAge <= currentAge || monthlyContribution <= 0 || annualRate <= 0) {
        resultBox.innerHTML = "Please enter valid values. Retirement age must be greater than current age.";
        return;
    }

    const years = retireAge - currentAge;
    const monthlyRate = (annualRate / 100) / 12;
    const numMonths = years * 12;

    const fvCurrentSavings = currentSavings * Math.pow(1 + monthlyRate, numMonths);
    const fvContributions = monthlyContribution *
        ((Math.pow(1 + monthlyRate, numMonths) - 1) / monthlyRate) * (1 + monthlyRate);

    const totalCorpus = fvCurrentSavings + fvContributions;
    const totalContributed = currentSavings + (monthlyContribution * numMonths);
    const totalGrowth = totalCorpus - totalContributed;

    resultBox.innerHTML =
        "Years to Retirement: " + years + "<br>" +
        "Total Contributed: " + totalContributed.toFixed(2) + "<br>" +
        "Growth Earned: " + totalGrowth.toFixed(2) + "<br>" +
        "Retirement Corpus: " + totalCorpus.toFixed(2);
}


// ---------- Simple Interest Calculator ----------
function calculateSI() {

    const principal = parseFloat(document.getElementById('si_principal').value);
    const rate = parseFloat(document.getElementById('si_rate').value);
    const years = parseFloat(document.getElementById('si_years').value);

    const resultBox = document.getElementById('si_result');

    if (!principal || !rate || !years || principal <= 0 || rate <= 0 || years <= 0) {
        resultBox.innerHTML = "Please enter valid positive numbers for all fields.";
        return;
    }

    const interest = (principal * rate * years) / 100;
    const total = principal + interest;

    resultBox.innerHTML =
        "Interest Earned: " + interest.toFixed(2) + "<br>" +
        "Total Amount: " + total.toFixed(2);
}


// ---------- Compound Interest Calculator ----------
function calculateCI() {

    const principal = parseFloat(document.getElementById('ci_principal').value);
    const rate = parseFloat(document.getElementById('ci_rate').value);
    const years = parseFloat(document.getElementById('ci_years').value);
    const freqSelect = document.getElementById('ci_compound');
    const n = freqSelect ? parseFloat(freqSelect.value) : 1; // default annually

    const resultBox = document.getElementById('ci_result');

    if (!principal || !rate || !years || principal <= 0 || rate <= 0 || years <= 0) {
        resultBox.innerHTML = "Please enter valid positive numbers for all fields.";
        return;
    }

    const r = rate / 100;
    const total = principal * Math.pow(1 + r / n, n * years);
    const interest = total - principal;

    resultBox.innerHTML =
        "Interest Earned: " + interest.toFixed(2) + "<br>" +
        "Total Amount: " + total.toFixed(2);
}


// ==========================================
// CAGR Calculator
// Add this to your existing js/script.js
// ==========================================

function calculateCAGR() {

    const initial = parseFloat(document.getElementById('cagr_initial').value);
    const final = parseFloat(document.getElementById('cagr_final').value);
    const years = parseFloat(document.getElementById('cagr_years').value);

    const resultBox = document.getElementById('cagr_result');

    if (!initial || !final || !years || initial <= 0 || final <= 0 || years <= 0) {
        resultBox.innerHTML = "Please enter valid positive numbers for all fields.";
        return;
    }

    const cagr = (Math.pow(final / initial, 1 / years) - 1) * 100;

    resultBox.innerHTML =
        "CAGR = " + cagr.toFixed(2) + "%";

}

