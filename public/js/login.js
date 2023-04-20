// Get the input fields from the login form
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Add an event listener to the login form
document.getElementById('loginForm').addEventListener('submit', (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the user's input
  const email = emailInput.value;
  const password = passwordInput.value;

  // Validate the input
  if (!email || !password) {
    alert('Please enter both email and password.');
    return;
  }

  // Send a request to the server to validate the user's credentials
  fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      else {  window.location.href = '/dashboard';}
      return response.json();
    })
    .catch((error) => {
      alert(`Login failed: ${error.message}`);
    });
});
