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
        // localStorage.setItem('userId', result.id);
        console.log(localStorage.getItem('userId'));
        
        let userId = + localStorage.getItem('userId');
        // console.log(+ userId);
        // userId=28
        // console.log(+ userId);
        const [studyRes, progressRes] = await Promise.all([
            fetch('http://localhost:3000/api/studyMaterial/all'),
            fetch('http://localhost:3000/api/userProgress/getAll')
        ]);
    

        const studyMaterials = await studyRes.json();
        const userProgress = await progressRes.json();

        // Filter progress only for current user and status 'Completed'
        const completedMap = new Map();
        userProgress.forEach(entry => {
            if (entry.user_id === userId && entry.status === 'Completed') {
                completedMap.set(entry.studymaterialid, true);
            }
        });

        if (studyRes.ok && progressRes.ok) {
            populateTable(studyMaterials, userId, completedMap);
        } else {
            console.error('Failed to fetch data');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function populateTable(studyMaterials, userId, completedMap) {
    table.innerHTML = '';
    let id = 1;

    studyMaterials.forEach(studyMaterial => {
        const row = table.insertRow();
        row.insertCell(0).innerText = id++;
        row.insertCell(1).innerText = studyMaterial.topic;
        row.insertCell(2).innerText = studyMaterial.reference;
        row.insertCell(3).innerHTML = `<a href="${studyMaterial.youtube_link}" target="_blank" class="btn btn-sm btn-outline-primary">Watch</a>`;
        row.insertCell(4).innerText = studyMaterial.tech;

  
        const checkboxCell = row.insertCell(5);

        if (completedMap.has(studyMaterial.studymaterialid)) {
        checkboxCell.innerHTML = '<button class="btn btn-success btn-sm" disabled>Completed</button>';
        } else {
            const completeBtn = document.createElement('button');
            completeBtn.className = 'btn btn-outline-primary btn-sm';
            completeBtn.innerText = 'Mark as Completed';

    completeBtn.addEventListener('click', async () => {
        try {
            const response = await fetch('http://localhost:3000/api/userProgress/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: userId,
                    studymaterialid: studyMaterial.studymaterialid,
                    status: 'Completed'
                })
            });

            if (!response.ok) throw new Error('Failed to update progress');

            checkboxCell.innerHTML = '<button class="btn btn-success btn-sm" disabled>Completed</button>';
            alert("Successfully marked as completed");
        } catch (err) {
            console.error('Error marking as completed:', err);
        }
    });

    checkboxCell.appendChild(completeBtn);
}
        row.insertCell(6).innerText = studyMaterial.role;
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
