let userId = + localStorage.getItem('userId');
if (!userId) {
  alert("User not logged in");
  window.location.href = '/Frontend/index.html'; 
}


async function fetchRoleCompletionChart() {
  try {
    const response = await fetch(`http://localhost:3000/api/userProgress/completed-role/${userId}`);
    const json = await response.json();
    const data = json.result; 

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
        responsive: true,
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


Chart.register(ChartDataLabels);


  async function fetchChartData() {
    try {
      const response = await fetch(`http://localhost:3000/api/userProgress/completed-topics/${userId}`);
      const json = await response.json();
      const data = json.result; 
  
      const labels = data.map(item => item.tech);
      const completedCounts = data.map(item => parseInt(item.completedCount));
      const totalCounts = data.map(item => parseInt(item.totalCount));
      const percentProgress = completedCounts.map((completed, i) => {
      const total = totalCounts[i] || 1;
        return ((completed / total) * 100).toFixed(0);
      });
  
      const ctxHorizontal = document.getElementById('horizontalBarChart').getContext('2d');
  
      new Chart(ctxHorizontal, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Completed Topics',
            data: completedCounts,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          plugins: {
            datalabels: {
              anchor: 'end',
              align: 'end',
              color: '#000',
              font: {
                family: 'Roboto',
                size: 12,
                weight: '500',
                style: 'italic'     
              },
              formatter: function(value, context) {
                const index = context.dataIndex;
                const total = totalCounts[context.dataIndex];
                const percent = percentProgress[index]
                return `Total-Topics: ${total} `;
              }
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const index = context.dataIndex;
                  const completed = context.dataset.data[index];
                  return `Completed: ${completed}`;
                }
              }
            }
          },
          scales: {
            x: {
              beginAtZero: true,
              min: 0,
              max: 50
            }
          }
        },
        plugins: [ChartDataLabels]
      });
  
    } catch (error) {
      console.error('Error loading chart data:', error);
    }
  }
  
  fetchChartData();