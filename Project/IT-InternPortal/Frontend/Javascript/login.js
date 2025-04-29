document.addEventListener('DOMContentLoaded', function() {
    
    const form = document.querySelector('.login-form');
    
    form.addEventListener('submit', async (event) => {
      event.preventDefault(); 

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      const data = {
        email: email,
        password: password
      };

      try {
        const response = await fetch('http://localhost:3000/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data), 
        });

       
        if (response.ok) {
          const result = await response.json();  
          console.log('Login successful:', result);
          localStorage.setItem('accessToken', result.accessToken);
          localStorage.setItem('userId', result.user_id);
          window.location.href = 'dashboard.html'; 
        } else {
          const errorResult = await response.json();
          alert('Login failed: ' + errorResult.message);
        }
      } catch (error) {
        console.error('Error during login:', error);
        alert('Login failed. Please try again later.');
      }
    });
  });