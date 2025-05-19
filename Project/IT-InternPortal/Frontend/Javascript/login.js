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
          alert('Login failed: ' + (errorResult.message || 'Invalid email or password'));
        }
      } catch (error) {        
       console.error('Server/network error:', error);
      alert('Server error. Please try again later.');
      }
    });
  });


    function updateSubmitStatus() {
    const allValid = Object.values(validationStatus).every(Boolean);
    document.getElementById('submit-btn').disabled = !allValid;
  }

  const validationStatus = {
    personal_email: false,
    college_email: false,
    phone_number: false,
  };
    async function checkAvailability(value, type, spanId) {
    const span = document.getElementById(spanId);
  
    if (!value || value.length < 5 || (type === 'phone_number' && !/^\d{10}$/.test(value))) {
      span.textContent = '';
      span.style.color = '';
      validationStatus[type] = false;
      updateSubmitStatus();
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3000/api/users/check?value=${encodeURIComponent(value)}&type=${type}`);
      const data = await response.json();
  
      if (response.ok) {
        if (data.exists) {
          span.textContent = `${type.replace('_', ' ')} already exists`;
          span.style.color = 'red';
          validationStatus[type] = false;
        } else {
          span.textContent = '';
          span.style.color = '';
          validationStatus[type] = true;
        }
      } else {
        span.textContent = data.message || 'Error checking';
        span.style.color = 'orange';
        validationStatus[type] = false;
      }
    } catch (err) {
      console.error('Error checking:', err);
      span.textContent = 'Server error';
      span.style.color = 'orange';
      validationStatus[type] = false;
    }
  
    updateSubmitStatus();
  }
  
function openAddUserModal() {
  const modal = document.getElementById('addModal');
  modal.style.display = 'block';

  // Clear all input values
  const inputs = modal.querySelectorAll('#addForm input, #addForm select, #addForm textarea');
  inputs.forEach(input => input.value = '');

  // Date validation
  const joinedDateInput = document.getElementById('add_joined_date');
  const errorSpan = document.getElementById('add_joined_date_error');

  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setMonth(today.getMonth() + 1);

  const formattedMaxDate = maxDate.toISOString().split('T')[0];
  joinedDateInput.max = formattedMaxDate;

  joinedDateInput.removeEventListener('blur', joinedDateBlurHandler); // Remove old
  joinedDateInput.addEventListener('blur', joinedDateBlurHandler);

  function joinedDateBlurHandler() {
    const enteredDate = new Date(joinedDateInput.value);
    if (enteredDate > maxDate) {
      errorSpan.textContent = `Date cannot be after ${formattedMaxDate}.`;
      joinedDateInput.value = '';
    } else {
      errorSpan.textContent = '';
    }
  }

  modal.querySelector('.close').onclick = () => {
    modal.style.display = 'none';
  };

  const form = document.getElementById('addForm');
  form.onsubmit = async function (e) {
    e.preventDefault();

    const joinedDate = joinedDateInput.value;
    if (new Date(joinedDate) > maxDate) {
      errorSpan.textContent = `Date cannot be after ${formattedMaxDate}.`;
      return;
    } else {
      errorSpan.textContent = '';
    }

    const newUser = {
      first_name: document.getElementById('add_first_name').value,
      last_name: document.getElementById('add_last_name').value,
      personal_email: document.getElementById('add_personal_email').value,
      college_email: document.getElementById('add_college_email').value,
      phone_number: document.getElementById('add_phone_number').value,
      joined_date: joinedDate,
      gender: document.getElementById('add_gender').value,
      address: document.getElementById('add_address').value,
      city: document.getElementById('add_city').value,
      state: document.getElementById('add_state').value,
      pincode: document.getElementById('add_pincode').value,
      profile_picture_url: document.getElementById('add_profile_picture_url').value,
      password: document.getElementById('add_password').value,
      role: document.getElementById('add_role').value,
      status: document.getElementById('add_status').value
    };

    try {
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert('Error: ' + (errorData.message || 'Failed to add user.'));
        return;
      }

      alert('User added successfully');
      modal.style.display = 'none';

    } catch (error) {
      console.error(error);
      alert('Network or server error. Please try again.');
    }
  };
}




window.onclick = function(event) {
  const modal = document.getElementById('addModal');
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    document.getElementById("addModal").style.display = "none";
  }
});
