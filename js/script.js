/* ===========================
   YourDaily Calculator JS
   All Calculators
=========================== */

/* Helper: show result */
function showResult(elementId, message) {
    document.getElementById(elementId).innerHTML = message;
}

/* ===========================
   CPM Calculator
   CPM = (Cost / Impressions) * 1000
=========================== */
function calculateCPM() {

    let cost = parseFloat(document.getElementById("cpm_cost").value);
    let impressions = parseFloat(document.getElementById("cpm_impressions").value);

    if (isNaN(cost) || isNaN(impressions) || impressions <= 0) {
        showResult("cpm_result", "<span class='text-danger'>Please enter valid values.</span>");
        return;
    }

    let cpm = (cost / impressions) * 1000;

    showResult("cpm_result", "<strong>CPM = " + cpm.toFixed(2) + "</strong>");
}

/* ===========================
   CPC Calculator
   CPC = Spend / Clicks
=========================== */
function calculateCPC() {

    let spend = parseFloat(document.getElementById("cpc_spend").value);
    let clicks = parseFloat(document.getElementById("cpc_clicks").value);

    if (isNaN(spend) || isNaN(clicks) || clicks <= 0) {
        alert("Please enter valid CPC values");
        return;
    }

    let cpc = spend / clicks;

    showResult("cpc_result", "CPC = " + cpc.toFixed(2));
}

/* ===========================
   CPA Calculator
   CPA = Spend / Conversions
=========================== */
function calculateCPA() {

    let spend = parseFloat(document.getElementById("cpa_spend").value);
    let conversions = parseFloat(document.getElementById("cpa_conversions").value);

    if (isNaN(spend) || isNaN(conversions) || conversions <= 0) {
        showResult("cpa_result", "<span class='text-danger'>Please enter valid values.</span>");
        return;
    }

    let cpa = spend / conversions;

    showResult("cpa_result", "<strong>CPA = " + cpa.toFixed(2) + "</strong>");
}
/* ===========================
   CTR Calculator
   CTR = Impressions / Clicks
=========================== */
function calculateCTR() {
    const clicks = parseFloat(document.getElementById("ctr_clicks").value);
    const impressions = parseFloat(document.getElementById("ctr_impressions").value);
    if (isNaN(clicks) || isNaN(impressions) || impressions <= 0) {
        document.getElementById("ctr_result").innerHTML =
            "<span class='text-danger'>Please enter valid values.</span>";
        return;
    }
    const ctr = (clicks / impressions) * 100;
    document.getElementById("ctr_result").innerHTML =
        `<strong>CTR = ${ctr.toFixed(2)}%</strong>`;
}
/* ===========================
   ROAS Calculator
   ROAS = Revenue / Ad Spend
=========================== */
function calculateROAS() {

    let revenue = parseFloat(document.getElementById("roas_revenue").value);
    let spend = parseFloat(document.getElementById("roas_spend").value);

    if (isNaN(revenue) || isNaN(spend) || spend <= 0) {
        showResult("roas_result", "<span class='text-danger'>Please enter valid values.</span>");
        return;
    }

    let roas = revenue / spend;
    let percentage = roas * 100;

    showResult(
        "roas_result",
        "<strong>ROAS = " + roas.toFixed(2) + "x</strong><br>" +
        "Return = " + percentage.toFixed(2) + "%"
    );
}

/* ===========================
   SIP Calculator
=========================== */
function calculateSIP() {

    let monthly = parseFloat(document.getElementById("sip_monthly").value);
    let rate = parseFloat(document.getElementById("sip_rate").value);
    let years = parseFloat(document.getElementById("sip_years").value);

    if (isNaN(monthly) || isNaN(rate) || isNaN(years)) {
        alert("Please enter valid SIP values");
        return;
    }

    let r = rate / 12 / 100;
    let n = years * 12;

    let futureValue =
        monthly *
        (((Math.pow(1 + r, n) - 1) / r) * (1 + r));

    let invested = monthly * n;
    let returns = futureValue - invested;

    showResult(
        "sip_result",
        "Invested:  " + invested.toFixed(0) + "<br>" +
        "Returns:  " + returns.toFixed(0) + "<br>" +
        "Total:  " + futureValue.toFixed(0)
    );
}

/* Reset inputs */
function resetAll(formId, resultId) {
    document.getElementById(formId).reset();
    document.getElementById(resultId).innerHTML = "";
}


/* =====================================================
   EMI CALCULATOR
===================================================== */

let emiChart = null;

function drawEMIChart(principal, interest, totalPayment) {

    const principalPct = ((principal / totalPayment) * 100).toFixed(1);
    const interestPct = ((interest / totalPayment) * 100).toFixed(1);

    document.getElementById("chartTotal").innerHTML = formatCurrency(totalPayment);
    document.getElementById("principalAmount").innerHTML = formatCurrency(principal);
    document.getElementById("principalPercent").innerHTML = "Principal (" + principalPct + "%)";
    document.getElementById("interestAmount").innerHTML = formatCurrency(interest);
    document.getElementById("interestPercent").innerHTML = "Interest (" + interestPct + "%)";

    const ctx = document.getElementById("emiChart").getContext("2d");

    if (emiChart) {
        emiChart.data.datasets[0].data = [principal, interest];
        emiChart.update();
    } else {
        emiChart = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: ["Principal", "Interest"],
                datasets: [{
                    data: [principal, interest],
                    backgroundColor: ["#F97316", "#E1A10B"],
                    borderWidth: 0
                }]
            },
            options: {
                cutout: "70%",
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ": " + formatCurrency(context.raw);
                            }
                        }
                    }
                }
            }
        });
    }
}

function formatCurrency(value) {

    return new Intl.NumberFormat("en-IN", {

        
        maximumFractionDigits: 2

    }).format(value);

}

/* =====================================================
   CALCULATE EMI
===================================================== */

function calculateEMI() {

    const loanAmount =
        parseFloat(document.getElementById("loan_amount").value);

    const annualInterest =
        parseFloat(document.getElementById("interest_rate").value);

    const tenure =
        parseFloat(document.getElementById("loan_tenure").value);

    const tenureType =
        document.getElementById("tenure_type").value;

    if (

        isNaN(loanAmount) ||

        isNaN(annualInterest) ||

        isNaN(tenure) ||

        loanAmount <= 0 ||

        annualInterest <= 0 ||

        tenure <= 0

    ) {

        document.getElementById("emi_result").style.display = "none";

        return;

    }

    let months;

    if (tenureType === "years") {

        months = tenure * 12;

    }

    else {

        months = tenure;

    }

    const monthlyRate = annualInterest / 12 / 100;

    const emi =

        loanAmount *

        monthlyRate *

        Math.pow(

            1 + monthlyRate,

            months

        )

        /

        (

            Math.pow(

                1 + monthlyRate,

                months

            ) - 1

        );

    const totalPayment =

        emi * months;

    const totalInterest =

        totalPayment - loanAmount;

    document.getElementById("monthly_emi").innerHTML =

        formatCurrency(emi);

    document.getElementById("total_interest").innerHTML =

        formatCurrency(totalInterest);

    document.getElementById("total_payment").innerHTML =

        formatCurrency(totalPayment);

    document.getElementById("emi_result").style.display =

        "block";

document.getElementById("chartSection").classList.add("show");   

drawEMIChart(

        loanAmount,

        totalInterest,

        totalPayment

    );

}

/* =====================================================
   RESET EMI
===================================================== */

function resetEMI() {

    document.getElementById("loan_amount").value = "";

    document.getElementById("interest_rate").value = "";

    document.getElementById("loan_tenure").value = "";

    document.getElementById("tenure_type").value = "years";

    document.getElementById("monthly_emi").innerHTML =

        "0";

    document.getElementById("total_interest").innerHTML =

        "0";

    document.getElementById("total_payment").innerHTML =

        "0";

    document.getElementById("chartTotal").innerHTML =

        "0";

    document.getElementById("principalAmount").innerHTML =

        "0";

    document.getElementById("interestAmount").innerHTML =

        "0";

    document.getElementById("principalPercent").innerHTML =

        "0%";

    document.getElementById("interestPercent").innerHTML =

        "0%";

    document.getElementById("emi_result").style.display =

        "none";

document.getElementById("chartSection").classList.remove("show");

    if (emiChart) {

        emiChart.destroy();

        emiChart = null;

    }

}



/* =====================================================
   AUTO CALCULATE
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const fields = [

        "loan_amount",

        "interest_rate",

        "loan_tenure",

        "tenure_type"

    ];

    fields.forEach(function(id) {

        const element = document.getElementById(id);

        if (!element) return;

        element.addEventListener("input", function() {

            const loan = document.getElementById("loan_amount").value;

            const rate = document.getElementById("interest_rate").value;

            const tenure = document.getElementById("loan_tenure").value;

            if (

                loan !== "" &&

                rate !== "" &&

                tenure !== ""

            ) {

                calculateEMI();

            }

        });

    });

});


// CAGR Calculator now lives in js/finance-calculators.js
// (removed duplicate from here to avoid two conflicting definitions)


