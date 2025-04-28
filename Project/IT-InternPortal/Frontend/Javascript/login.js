document.querySelector('.login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
          console.log('Login successful:', data);

          // Store the JWT token in localStorage
          localStorage.setItem('token', data.token);

          // Redirect to the dashboard
          window.location.href = './dashboard.html';
      } else {
          alert(data.message || 'Login failed');
      }
  } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
  }
});
