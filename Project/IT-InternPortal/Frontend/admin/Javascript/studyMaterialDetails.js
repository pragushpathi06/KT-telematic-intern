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



$(document).ready(function () {
  const table = new DataTable('#example', {
    responsive: true,
    ajax: {
      url: 'http://localhost:3000/api/studyMaterial/all', 
      dataSrc: ''
    },
    columns: [
      { data: 'studymaterialid',
        width: '1px'
       },
      { 
      data: 'topic',             
      width: '200px',
      render: data => `
      <span class="fixed-column-text">${data}</span>
      `
    },
      { 
      data: 'reference',  
      width: '250px',
      orderable: false,
      render: data => `
        <a href="${data}" target="_blank" class="fixed-link" title="${data} ">${data}</a>
      `
    },
      {
        data: 'youtube_link',
         width: '100px',
          orderable: false,
        render: data => `<a href="${data}" target="_blank" class="fixed-link" title="${data}">${data}</a>`
      },
      { data: 'tech',
        orderable: false
       },
      { data: 'role',
        orderable: false
       },
      {
        data: null,
        orderable: false,
        render: function (data, type, row) {
          return `
            <div class="btn-group">
              <button class="btn-edit" onclick="editMaterial(${row.studymaterialid})">Edit</button>
              <button class="btn-delete" onclick="deleteMaterial(${row.studymaterialid})">Delete</button>
            </div>
          `;
        }
      }
    ],
    initComplete: function () {
  const api = this.api();

 
  api.columns().every(function (colIdx) {
    const column = this;
    const title = column.footer().textContent;
    if (colIdx !== 4 && colIdx !== 5 && title) {
      const input = document.createElement('input');
      input.placeholder = `Search ${title}`;
      column.footer().replaceChildren(input);
      input.addEventListener('keyup', function () {
        if (column.search() !== this.value) {
          column.search(this.value).draw();
        }
      });
    }
  });

  const techSet = new Set();
  api.column(4).data().each(function (d) {
    techSet.add(d);
  });
  techSet.forEach(val => {
    $('#techFilter').append(`<option value="${val}">${val}</option>`);
  });

  $('#techFilter').on('change', function () {
    const val = $.fn.dataTable.util.escapeRegex($(this).val());
    api.column(4).search(val ? '^' + val + '$' : '', true, false).draw();
  });

  const roleSet = new Set();
  api.column(5).data().each(function (d) {
    roleSet.add(d);
  });
  roleSet.forEach(val => {
    $('#roleFilter').append(`<option value="${val}">${val}</option>`);
  });

  $('#roleFilter').on('change', function () {
    const val = $.fn.dataTable.util.escapeRegex($(this).val());
    api.column(5).search(val ? '^' + val + '$' : '', true, false).draw();
  });
}

  });
});

function editMaterial(id) {
  $.ajax({
    url: `http://localhost:3000/api/studyMaterial/get/${id}`,
    method: 'GET',
    success: function (data) {
      document.getElementById('edit_studymaterialid').value = data.studymaterialid;
      document.getElementById('edit_topic').value = data.topic;
      document.getElementById('edit_reference').value = data.reference;
      document.getElementById('edit_youtube_link').value = data.youtube_link;
      document.getElementById('edit_tech').value = data.tech;
      document.getElementById('edit_role').value = data.role;

      document.getElementById("editStudyMaterialModal").style.display = "block";
    },
    error: function () {
      alert("Failed to fetch study material details.");
    }
  });
}


document.querySelector("#editStudyMaterialModal .close").addEventListener("click", function () {
  document.getElementById("editStudyMaterialModal").style.display = "none";
});


$('#editStudyMaterialForm').on('submit', function (e) {
  e.preventDefault();

  const updatedData = {
    topic: $('#edit_topic').val(),
    reference: $('#edit_reference').val(),
    youtube_link: $('#edit_youtube_link').val(),
    tech: $('#edit_tech').val(),
    role: $('#edit_role').val()
  };

  const id = $('#edit_studymaterialid').val();

  $.ajax({
    url: `http://localhost:3000/api/studyMaterial/updateStatus/${id}`,
    method: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify(updatedData),
    success: function () {
      alert('Study material updated successfully.');
      document.getElementById("editStudyMaterialModal").style.display = "none";
      $('#example').DataTable().ajax.reload();
    },
    error: function () {
      alert('Error updating study material.');
    }
  });
});


// Delete modal close
document.querySelector("#deleteModal .close").addEventListener("click", function () {
  document.getElementById("deleteModal").style.display = "none";
});

// Cancel delete
document.getElementById("cancelDelete").addEventListener("click", function () {
  document.getElementById("deleteModal").style.display = "none";
});

function deleteMaterial(id) {
  const modal = document.getElementById('deleteModal');
  modal.style.display = 'block';

  $('#confirmDelete').off('click').on('click', function () {
    $.ajax({
      url: `http://localhost:3000/api/studyMaterial/delete/${id}`,
      method: 'DELETE',
      success: function () {
        alert('Study material deleted successfully');
        modal.style.display = 'none';
        $('#example').DataTable().ajax.reload();
      },
      error: function () {
        alert('Error deleting study material.');
      }
    });
  });

  $('#cancelDelete, #deleteModal .close').off('click').on('click', function () {
    modal.style.display = 'none';
  });

  window.addEventListener("click", function (event) {
  const deleteModal = document.getElementById('deleteModal');
  if (event.target === deleteModal) {
    deleteModal.style.display = 'none';
  }

  const editModal = document.getElementById('editStudyMaterialModal');
  if (event.target === editModal) {
    editModal.style.display = 'none';
  }
});
}


function openModal() {
  document.getElementById('addModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('addModal').style.display = 'none';
}

let rowCount = 0;


function addNewRow(event) {
  event.preventDefault(); 

  const topic = document.getElementById("add_topic").value.trim();
  const reference = document.getElementById("add_reference").value.trim();
  const youtube = document.getElementById("add_youtube_link").value.trim();
  const tech = document.getElementById("add_tech").value;
  const role = document.getElementById("add_role").value;

  if (!topic || !reference || !youtube || !tech || !role) {
    alert("Please fill in all required fields.");
    return;
  }

  rowCount++;
  const table = document.getElementById("studyTable").getElementsByTagName("tbody")[0];


  const newRow = table.insertRow();

  newRow.innerHTML = `
    <td>${rowCount}</td>
    <td>${topic}</td>
    <td><a href="${reference}" target="_blank">${reference}</a></td>
    <td><a href="${youtube}" target="_blank">${youtube}</a></td>
    <td>${tech}</td>
    <td>${role}</td> 
    <td>
      <button class="btn-delete" onclick="deleteRow(this)">Delete</button>
      <button class="btn-edit" onclick="editRow(this)">Edit</button>
    </td>
  `;
    document.querySelector('.add-table-popup').style.display = 'block';

  document.getElementById("singleForm").reset();
}

function editRow(button) {
  const row = button.closest("tr");
  const topicCell = row.cells[1];
  const referenceCell = row.cells[2];
  const youtubeCell = row.cells[3];
  const techCell = row.cells[4];
  const roleCell = row.cells[5];
  const actionCell = row.cells[6];

  const topic = topicCell.innerText;
  const reference = referenceCell.innerText;
  const youtube = youtubeCell.innerText;
  const tech = techCell.innerText;
  const role = roleCell.innerText;

  topicCell.innerHTML = `<input type="text" class="edit-input" value="${topic}" required>`;
  referenceCell.innerHTML = `<input type="url" class="edit-input" value="${reference}" required>`;
  youtubeCell.innerHTML = `<input type="url"  class="edit-input" value="${youtube}" required>`;

  techCell.innerHTML = `
    <select class="edit-select">
      <option ${tech === 'Computer Basics' ? 'selected' : ''}>Computer Basics</option>
      <option ${tech === 'HTML' ? 'selected' : ''}>HTML</option>
      <option ${tech === 'CSS' ? 'selected' : ''}>CSS</option>
      <option ${tech === 'JavaScript' ? 'selected' : ''}>JavaScript</option>
      <option ${tech === 'Sql' ? 'selected' : ''}>Sql</option>
      <option ${tech === 'Node.js' ? 'selected' : ''}>Node.js</option>
      <option ${tech === 'Sequelize' ? 'selected' : ''}>Sequelize</option>
    </select>`;

  roleCell.innerHTML = `
    <select class="edit-select">
      <option ${role === 'Full stack developer' ? 'selected' : ''}>Full stack developer</option>
      <option ${role === 'Software tester' ? 'selected' : ''}>Software tester</option>
      <option ${role === 'Android developer' ? 'selected' : ''}>Android developer</option>
    </select>`;

 
  actionCell.innerHTML = `
    <button class="btn-save" onclick="saveRow(this)">Save</button>
    <button class="btn-cancel" onclick="cancelEdit(this, '${topic}', '${reference}', '${youtube}', '${tech}', '${role}')">Cancel</button>
  `;
}


function saveRow(button) {
  const row = button.closest("tr");

  const topic = row.cells[1].querySelector("input").value.trim();
  const reference = row.cells[2].querySelector("input").value.trim();
  const youtube = row.cells[3].querySelector("input").value.trim();
  const tech = row.cells[4].querySelector("select").value;
  const role = row.cells[5].querySelector("select").value;

  if (!topic || !reference || !youtube || !tech || !role) {
    alert("Please fill in all fields.");
    return;
  }

  row.cells[1].innerText = topic;
  row.cells[2].innerHTML = `<a href="${reference}" target="_blank">${reference}</a>`;
  row.cells[3].innerHTML = `<a href="${youtube}" target="_blank">${youtube}</a>`;
  row.cells[4].innerText = tech;
  row.cells[5].innerText = role;

  row.cells[6].innerHTML = `
    <button class="btn-delete" onclick="deleteRow(this)">Delete</button>
    <button class="btn-edit" onclick="editRow(this)">Edit</button>
  `;
}


function cancelEdit(button, topic, reference, youtube, tech, role) {
  const row = button.closest("tr");

  row.cells[1].innerText = topic;
  row.cells[2].innerHTML = `<a href="${reference}" target="_blank">${reference}</a>`;
  row.cells[3].innerHTML = `<a href="${youtube}" target="_blank">${youtube}</a>`;
  row.cells[4].innerText = tech;
  row.cells[5].innerText = role;

  row.cells[6].innerHTML = `
    <button class="btn-delete" onclick="deleteRow(this)">Delete</button>
    <button class="btn-edit" onclick="editRow(this)">Edit</button>
  `;
}


function deleteRow(button) {
  const row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);
  updateSerialNumbers();
}


function updateSerialNumbers() {
  const rows = document.querySelectorAll("#studyTable tbody tr");
  rowCount = 0;
  rows.forEach((row, index) => {
    row.cells[0].innerText = ++rowCount;
  });
  if(rowCount===0){
    document.querySelector('.add-table-popup').style.display = 'none';
  }
}


function submitMultipleForms() {
  const tableRows = document.querySelectorAll("#studyTable tbody tr");

  if (tableRows.length === 0) {
    alert("No topics to submit!");
    return;
  }

  const bulkData = [];

  tableRows.forEach(row => {
    const topic = row.cells[1].innerText;
    const reference = row.cells[2].innerText;
    const youtube_link = row.cells[3].innerText;
    const tech = row.cells[4].innerText;
    const role = row.cells[5].innerText;

    bulkData.push({ topic, reference, youtube_link, tech, role });
  });

  fetch('http://localhost:3000/api/studyMaterial/addBulk', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bulkData)
  })
  .then(res => {
    if (res.ok) {
      alert("Study materials submitted successfully!");
      document.querySelector("#studyTable tbody").innerHTML = "";
      rowCount = 0;
      $('#example').DataTable().ajax.reload();
      document.querySelector('.add-table-popup').style.display = 'none';
    } else {
      return res.json().then(data => {
        throw new Error(data.message || "Submission failed");
      });
    }
  })
  .catch(error => {
    console.error("Error:", error);
    alert("Error submitting data. Please try again.");
  });
}

window.onclick = function(event) {
  const modal = document.getElementById('addModal');
  if (event.target === modal) {
    modal.style.display = "none";
  }
}