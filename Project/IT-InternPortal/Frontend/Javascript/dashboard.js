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
  






document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('accessToken'); // Retrieve the token from localStorage

  if (!token) {
    alert('You are not logged in!');
    window.location.href = '../index.html'; // Redirect to login page if token is not available
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
      console.log(result); // Handle the response from the protected API route

      // Optionally, display data in your frontend (for example, showing a dashboard)
      document.getElementById('dashboard').innerText = `Welcome, ${result.name}`;
    } else {
      console.error('Authentication failed or session expired');
      alert('Authentication failed. Please log in again.');
      window.location.href = '../index.html'; // Redirect to login if authentication fails
    }
  } catch (error) {
    console.error('Error during the request:', error);
    alert('Error during the request. Please try again later.');
  }
});

  // const data = {
  //   datasets: [{
  //     label: 'My First Dataset',
  //     data: [300,  100],
  //     backgroundColor: [
  //       'rgb(255, 99, 132)',
  //       'rgb(230, 227, 220)'
  //     ],
  //     hoverOffset: 4
  //   }]
  // };

  // const config = {
  //   type: 'doughnut',
  //   data: data,
  // };

  // const myChart1 = new Chart(
  //   document.getElementById('myDoughnutChart'),
  //   config
  // );



const ctx = document.getElementById('myBarChart').getContext('2d');
const myBarChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Full stack', 'Android Developer', 'Software Testing'],
        datasets: [{
            label: 'Completion',
            data: [12, 90, 10],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
        y: {
            beginAtZero: true,
            min: 0,
            max: 100
        }
    }
    }
});

const ctxHorizontal = document.getElementById('horizontalBarChart').getContext('2d');
const horizontalBarChart = new Chart(ctxHorizontal, {
    type: 'bar',
    data: {
        labels: ['Basic of computer', 'HTML', 'CSS', 'JavaScript', 'Sql', 'Node js','Sequelize'],
        datasets: [{
            label: 'Completion',
            data: [20, 40, 60, 80, 95, 50,80 ],
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    },
    options: {
        indexAxis: 'y', // Make it horizontal
        scales: {
            x: {
                beginAtZero: true,
                min: 0,
                max: 100
            }
        }
    }
});
