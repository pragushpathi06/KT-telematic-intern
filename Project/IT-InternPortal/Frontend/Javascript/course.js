document.addEventListener("DOMContentLoaded", function () {
    const dropdown = document.querySelector(".dropdown");
    dropdown.querySelector("a").addEventListener("click", function (e) {
      e.preventDefault(); 
      dropdown.classList.toggle("active");
    });
  });



const statusFilter = document.getElementById('statusFilter');
const topicFilter = document.getElementById('topicFilter');
const referenceFilter = document.getElementById('referenceFilter');
const table = document.getElementById('studyTable').getElementsByTagName('tbody')[0];


async function fetchStudyMaterials() {
    try {
        const response = await fetch('http://localhost:3000/api/studyMaterial/all');
        const data = await response.json();
        // console.log(data);
        if (response.ok) {
            populateTable(data);
        } else {
            console.error('Failed to fetch data:', data.error);
        }
    } catch (error) {
        console.error('Error fetching study materials:', error);
    }
}

// Populate the table with fetched study materials
function populateTable(studyMaterials) {
    table.innerHTML = ''; // Clear the existing table rows
    let id = 1;
    studyMaterials.forEach(studyMaterial => {
        const row = table.insertRow();
        row.insertCell(0).innerText = id++;
        row.insertCell(1).innerText = studyMaterial.topic;
        row.insertCell(2).innerText = studyMaterial.reference;
        row.insertCell(3).innerHTML = `<a href="${studyMaterial.youtube_link}" target="_blank" class="btn btn-sm btn-outline-primary">Watch</a>`;
        row.insertCell(4).innerText = studyMaterial.tech;  // Adding status column data
        row.insertCell(5).innerHTML = `<input type="checkbox" class="form-check-input">`;
        row.insertCell(6).innerHTML = studyMaterial.role;
    });
}

// Filter rows based on selected filters
function filterRows() {
    const selectedStatus = statusFilter.value.toLowerCase();
    const selectedTopic = topicFilter.value.toLowerCase();
    const selectedReference = referenceFilter.value.toLowerCase();

    const rows = table.getElementsByTagName('tr');
    let id=1;

    for (let i = 0; i < rows.length; i++) {
        const statusCell = rows[i].getElementsByTagName('td')[4]; // Assuming status is in the 5th column (index 4)
        const topicCell = rows[i].getElementsByTagName('td')[4]; // Assuming topic is in the 2nd column (index 1)
        const referenceCell = rows[i].getElementsByTagName('td')[6]; // Assuming reference is in the 3rd column (index 2)
       

        const statusText = statusCell ? statusCell.innerText.trim().toLowerCase() : '';
        const topicText = topicCell ? topicCell.innerText.trim().toLowerCase() : '';
        const referenceText = referenceCell ? referenceCell.innerText.trim().toLowerCase() : '';

        if (
            (selectedStatus === 'all' || statusText.includes(selectedStatus)) &&
            (selectedTopic === 'all' || topicText.includes(selectedTopic)) &&
            (selectedReference === 'all' || referenceText.includes(selectedReference))
        ) {
            rows[i].style.display = '';
            rows[i].getElementsByTagName('td')[0].innerText = id++;
        } else {
            rows[i].style.display = 'none';
        }
    }
}
// Event listeners for filters
statusFilter.addEventListener('change', filterRows);
topicFilter.addEventListener('change', filterRows);
referenceFilter.addEventListener('change', filterRows);

// Initial fetch of study materials
fetchStudyMaterials();
