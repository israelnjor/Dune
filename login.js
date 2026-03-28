// login.js
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const messageBox = document.getElementById('messageBox'); // <div> to show messages

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) {
    showMessage('Please enter both email and password.', 'error');
    return;
  }

  try {
    const response = await fetch('https://api-std-filehub.mywallets.work/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    // Try to parse JSON first
    let data;
    const text = await response.text();
    try {
      data = JSON.parse(text);
    } catch {
      // If not JSON, it's likely HTML (email confirmation page)
      showMessage('Please check your email to complete login.', 'info');
      return;
    }

    // Handle JSON response
    if (data.token) {
      showMessage('Login successful! Redirecting...', 'success');
      // Save token in localStorage or sessionStorage if needed
      localStorage.setItem('authToken', data.token);
      setTimeout(() => {
        window.location.href = 'index.html'; // Redirect to main page
      }, 1200);
    } else if (data.message) {
      showMessage(data.message, 'error');
    } else {
      showMessage('Unexpected response from server.', 'error');
    }

  } catch (err) {
    console.error(err);
    showMessage('Network error. Please try again later.', 'error');
  }
});

// Helper function to show messages
function showMessage(msg, type) {
  messageBox.textContent = msg;
  messageBox.className = ''; // reset
  messageBox.classList.add(type); // 'error', 'success', 'info'
}