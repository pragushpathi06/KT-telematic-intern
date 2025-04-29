
async function fetchRoleCompletionChart() {
  try {
    const response = await fetch('http://localhost:3000/api/userProgress/completed-role/28');
    const data = await response.json();

    const labels = [...new Set([...data.map(item => item.Role), 'Android Developer', 'Software Tester'])];
    const counts = data.map(item => parseInt(item.completedCount));
    const backgroundColors = [
      'rgba(255, 99, 132, 0.5)',
      'rgba(153, 102, 255, 0.5)',
      'rgba(255, 159, 64, 0.5)'
    ];

    const borderColors = [
      'rgba(255, 99, 132, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ];

    const ctx = document.getElementById('myBarChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Completion',
          data: counts,
          backgroundColor: backgroundColors.slice(0, labels.length),
          borderColor: borderColors.slice(0, labels.length),
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

  } catch (error) {
    console.error('Failed to load chart data:', error);
  }
}

fetchRoleCompletionChart();







async function fetchChartData() {
  try {
    const response = await fetch('http://localhost:3000/api/userProgress/completed-topics/28');
    const data = await response.json();

    // Transform API response to Chart.js format
    const labels = data.map(item => item.tech);
    const counts = data.map(item => parseInt(item.completedCount));

    // Render the chart
    const ctxHorizontal = document.getElementById('horizontalBarChart').getContext('2d');
    new Chart(ctxHorizontal, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Completed Topics',
          data: counts,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true,
            min: 0
          }
        }
      }
    });
  } catch (error) {
    console.error('Error loading chart data:', error);
  }
}

// Load the chart on page load
fetchChartData();
