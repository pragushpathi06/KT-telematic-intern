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
          localStorage.setItem('accessToken', result.result.token); 
          localStorage.setItem('userId', result.result.userid);     
          try {
            const responseRole=await fetch(`http://localhost:3000/api/users/getRoleUser/${result.result.userid}`)
            const roleResult = await responseRole.json();
            console.log('Role response:', roleResult);
            console.log('Role:', roleResult.role);

            if (roleResult.role === 'admin') {
              window.location.href = '/Frontend/admin/admin.html'
            }
            else{
              window.location.href = 'dashboard.html';
            }
          } catch (error) {
            window.location.href = 'dashboard.html';
            console.error('Error fetching role data:', error);
          }
          
        } else {
          const errorResult = await response.json();
          alert('Login failed: ' + errorResult.message);
        }
      } catch (error) {
        if (!passwordValid){
          return res.status(401).json({ message: 'Incorrect email or password' });
        }        
        console.error('Error during login:', error);
        alert('Login failed. Please try again later.');
      }
    });
  });