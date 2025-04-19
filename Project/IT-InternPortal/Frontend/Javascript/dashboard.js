document.addEventListener("DOMContentLoaded", function () {
    const dropdown = document.querySelector(".dropdown");
    dropdown.querySelector("a").addEventListener("click", function (e) {
      e.preventDefault(); 
      dropdown.classList.toggle("active");
    });
  });

  const data = {
    datasets: [{
      label: 'My First Dataset',
      data: [300,  100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(230, 227, 220)'
      ],
      hoverOffset: 4
    }]
  };

  const config = {
    type: 'doughnut',
    data: data,
  };

  const myChart1 = new Chart(
    document.getElementById('myDoughnutChart'),
    config
  );

