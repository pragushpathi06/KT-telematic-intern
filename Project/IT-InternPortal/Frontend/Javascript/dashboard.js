document.addEventListener("DOMContentLoaded", function () {
    const dropdown = document.querySelector(".dropdown");
    dropdown.querySelector("a").addEventListener("click", function (e) {
      e.preventDefault(); 
      dropdown.classList.toggle("active");
    });
  });

  function expandCard(card) {
    const allCards = document.querySelectorAll('.card1');
    allCards.forEach(item => {
      if (item !== card) {
        item.classList.remove('expanded');
      }
    });
    
    card.classList.toggle('expanded');
  }
  // console.log("---");
  // console.log(localStorage.getItem('userId'))

  document.addEventListener("DOMContentLoaded",function(){
    const logout= document.getElementById("logout");
    logout.addEventListener("click", function () {
      if (confirm("Are you sure you want to log out?")) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        window.location.href = '/Frontend/index.html';
      }
    });
  })


  
document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('accessToken'); // Retrieve the token from localStorage

  if (!token) {
    alert('You are not logged in!');
    window.location.href = '/Frontend/index.html'; // Redirect to login page if token is not available
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/users/protected', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Send the token in the Authorization header
      },
    });

    if (response.ok) {
      const result = await response.json();
      // console.log(result); // Handle the response from the protected API route

      // Optionally, display data in your frontend (for example, showing a dashboard)
      document.getElementById('dashboard').innerText = `${result.name} \u270C`;
    } else {
      console.error('Authentication failed or session expired');
      alert('Authentication failed. Please log in again.');
      window.location.href = '/Frontend/index.html'; // Redirect to login if authentication fails
    }
  } catch (error) {
    console.error('Error during the request:', error);
    alert('Error during the request. Please try again later.');
  }
});

