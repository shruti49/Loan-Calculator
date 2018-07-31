// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
 
  document.getElementById("loader").style.display = "block";
  setTimeout(calculateResults, 1500);

  e.preventDefault();
});

// Calculate Results
function calculateResults(e) {

  // UI Vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    
    document.getElementById("results").style.display = "block";
    document.getElementById("loader").style.display = "none";
  } else {
    
    showError();
  }
}


function showError() {
  document.getElementById("loader").style.display = "none";
  $('#myModal').modal('show');
}