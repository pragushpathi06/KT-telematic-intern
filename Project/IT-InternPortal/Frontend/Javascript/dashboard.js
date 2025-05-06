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
      console.log(result); // Handle the response from the protected API route

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



// const ctx = document.getElementById('myBarChart').getContext('2d');
// const myBarChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ['Full stack', 'Android Developer', 'Software Testing'],
//         datasets: [{
//             label: 'Completion',
//             data: [12, 90, 10],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.5)',
//                 'rgba(153, 102, 255, 0.5)',
//                 'rgba(255, 159, 64, 0.5)'
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//         y: {
//             beginAtZero: true,
//             min: 0,
//             max: 100
//         }
//     }
//     }
// });


document.addEventListener("DOMContentLoaded", async function () {
  const userId = + localStorage.getItem('userId'); // Replace with dynamic user ID if needed

  const desiredOrder = [
    "Computer Basics",
    "HTML",
    "CSS",
    "JavaScript",
    "SQL",
    "Node.js",
    "Sequelize"
  ];

  
  const frontendToApiMap = {
    "Basics of Computer": "Computer Basics",
    "HTML": "HTML",
    "CSS": "CSS",
    "JavaScript": "JavaScript",
    "SQL": "SQL",
    "Node js": "Node.js",
    "Sequelize": "Sequelize"
  };

  try {
    const response = await fetch(`http://localhost:3000/api/userProgress/completed-topics/${userId}`);
    const data = await response.json();

    // Sort data based on the desired order
    const sortedData = data.sort((a, b) => {
      const indexA = desiredOrder.indexOf(a.tech);
      const indexB = desiredOrder.indexOf(b.tech);
      return indexA - indexB;
    });

    // Normalize fetched data for easy lookup
    const progressMap = {};
    sortedData.forEach(item => {
      progressMap[item.tech] = {
        total: item.totalCount,
        completed: item.completedCount
      };
    });

    // Loop through all subtopics and update
    document.querySelectorAll('.subtopic').forEach(sub => {
      const topicName = sub.querySelector('span').textContent.trim();
      const apiTopicName = frontendToApiMap[topicName]; // Use the map to get the API-friendly name

      if (apiTopicName) {
        const info = progressMap[apiTopicName];
        let percent = 0;

        if (info && info.total > 0) {
          percent = ((info.completed / info.total) * 100).toFixed(0);
        }

        const color = percent >= 70 ? '#4caf50' : percent >= 40 ? '#ffc107' : '#f44336';

        // Set percentage text
        sub.querySelector('.completion').textContent = `${percent}%`;

        // Create and append progress bar
        const barContainer = document.createElement('div');
        barContainer.classList.add('progress-bar-container');

        const barFill = document.createElement('div');
        barFill.classList.add('progress-bar-fill');
        barFill.style.width = `${percent}%`;
        barFill.style.backgroundColor = color;

        barContainer.appendChild(barFill);
        sub.appendChild(barContainer);
      }
    });

  } catch (error) {
    console.error("Failed to fetch progress data:", error);
  }
});


