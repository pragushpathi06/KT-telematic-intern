document.addEventListener("DOMContentLoaded", function () {
    const dropdown = document.querySelector(".dropdown");
    dropdown.querySelector("a").addEventListener("click", function (e) {
      e.preventDefault(); 
      dropdown.classList.toggle("active");
    });
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
