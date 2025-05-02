document.addEventListener("DOMContentLoaded", function () {
  const dropdown = document.querySelector(".dropdown");
  dropdown.querySelector("a").addEventListener("click", function (e) {
    e.preventDefault(); 
    dropdown.classList.toggle("active");
  });
});


$(document).ready(function () {
  const table = new DataTable('#example', {
    responsive: true,
    ajax: {
      url: 'http://localhost:3000/api/users/getUser',
      dataSrc: ''
    },
    columns: [
      { data: 'userid' },
      {
        data: null,
        render: data => `${data.first_name} ${data.last_name}`
      },
      { data: 'personal_email' },
      { data: 'phone_number' },
      { data: 'city' },
      { data: 'role' },
      { data: 'status' },
      {
        data: null,
        orderable: false,
        render: function (data, type, row) {
          return `
            <div class="btn-group">
              <button class="btn-view" onclick="viewUser(${row.userid})">View</button>
              <button class="btn-edit" onclick="editUser(${row.userid})">Edit</button>
              <button class="btn-delete" onclick="deleteUser(${row.userid})">Delete</button>
            </div>
          `;
        }
      }
    ],
    initComplete: function () {
      this.api().columns().every(function () {
        const column = this;
        const title = column.footer().textContent;

        if (title) {
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
    }
  });
});

function viewUser(id) {
  alert('View user with ID: ' + id);
}

function editUser(id) {
  // Show the modal for editing
  const modal = document.getElementById('editModal');
  modal.style.display = 'block';

  // Fetch user details and populate the form (Replace with actual data fetching logic)
  $.ajax({
    url: `http://localhost:3000/api/users/getUser/${id}`,
    method: 'GET',
    success: function (data) {
      $('#first_name').val(data.first_name);
      $('#last_name').val(data.last_name);
      $('#email').val(data.personal_email);
      $('#phone_number').val(data.phone_number);
      $('#role').val(data.role);
    }
  });

  // Close modal when the close button is clicked
  const closeBtn = document.querySelector('.close');
  closeBtn.onclick = function () {
    modal.style.display = 'none';
  };

  // Handle form submission
  $('#editForm').on('submit', function (e) {
    e.preventDefault();
    const updatedUser = {
      first_name: $('#first_name').val(),
      last_name: $('#last_name').val(),
      personal_email: $('#email').val(),
      phone_number: $('#phone_number').val(),
      role: $('#role').val(),
    };

    // Send updated data to the server (Replace with actual update logic)
    $.ajax({
      url: `http://localhost:3000/api/users/updateUser/${id}`,
      method: 'PUT',
      data: updatedUser,
      success: function () {
        alert('User updated successfully');
        modal.style.display = 'none';
        table.ajax.reload();
      }
    });
  });
}

function deleteUser(id) {
  // Show confirmation modal
  const deleteModal = document.getElementById('deleteModal');
  deleteModal.style.display = 'block';

  // Handle confirmation
  $('#confirmDelete').click(function () {
    $.ajax({
      url: `http://localhost:3000/api/users/deleteUser/${id}`,
      method: 'DELETE',
      success: function () {
        alert('User deleted successfully');
        deleteModal.style.display = 'none';
        table.ajax.reload();
      }
    });
  });

  // Close delete modal
  $('#cancelDelete').click(function () {
    deleteModal.style.display = 'none';
  });
}

// Close modal if clicked outside the modal content
window.onclick = function (event) {
  const editModal = document.getElementById('editModal');
  const deleteModal = document.getElementById('deleteModal');
  if (event.target === editModal || event.target === deleteModal) {
    editModal.style.display = 'none';
    deleteModal.style.display = 'none';
  }
};
