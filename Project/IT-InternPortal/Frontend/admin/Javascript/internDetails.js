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

  function handleAjaxError(xhr, status, error) {
    console.error(`AJAX Error: ${error}`);
    alert(`Something went wrong:\n${xhr.responseJSON?.error || xhr.responseText || 'Unknown error'}`);
  }

  function setFormReadonly(isReadonly) {
    $('#editForm input, #editForm select, #editForm textarea').prop('readonly', isReadonly);
    $('#editForm button[type="submit"]').toggle(!isReadonly);
  }

  function populateFormFields(data) {
    $('#userid').val(data.userid);
    $('#first_name').val(data.first_name);
    $('#last_name').val(data.last_name);
    $('#personal_email').val(data.personal_email);
    $('#college_email').val(data.college_email);
    $('#phone_number').val(data.phone_number);
    $('#joined_date').val(data.joined_date);
    $('#gender').val(data.gender);
    $('#address').val(data.address);
    $('#city').val(data.city);
    $('#state').val(data.state);
    $('#pincode').val(data.pincode);
    $('#profile_picture_url').val(data.profile_picture_url);
    $('#role').val(data.role);
    $('#status').val(data.status);
  }

  function viewUser(id) {
    const modal = document.getElementById('editModal');
    modal.style.display = 'block';
    $('.modal-content h3').text('View User');
    setFormReadonly(true);
    $.ajax({
      url: `http://localhost:3000/api/users/getUser/${id}`,
      method: 'GET',
      success: function (data) {
        populateFormFields(data);
      },
      error: handleAjaxError
    });
    document.querySelector('.close').onclick = () => modal.style.display = 'none';
  }

  function openAddUserModal() {
    const modal = document.getElementById('addModal');
    modal.style.display = 'block';
    $('#addForm input').val('');
    document.querySelector('#addModal .close').onclick = () => modal.style.display = 'none';
    $('#addForm').off('submit').on('submit', function (e) {
      e.preventDefault();
      const newUser = {
        first_name: $('#add_first_name').val(),
        last_name: $('#add_last_name').val(),
        personal_email: $('#add_personal_email').val(),
        college_email: $('#add_college_email').val(),
        phone_number: $('#add_phone_number').val(),
        joined_date: $('#add_joined_date').val(),
        gender: $('#add_gender').val(),
        address: $('#add_address').val(),
        city: $('#add_city').val(),
        state: $('#add_state').val(),
        pincode: $('#add_pincode').val(),
        profile_picture_url: $('#add_profile_picture_url').val(),
        password: $('#add_password').val(),
        role: $('#add_role').val(),
        status: $('#add_status').val()
      };
      console.log(newUser);
      $.ajax({
        url: 'http://localhost:3000/api/users/register',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(newUser),
        success: function () {
          alert('User added successfully');
          modal.style.display = 'none';
          $('#example').DataTable().ajax.reload();
        },
        error: handleAjaxError
      });
    });
  }

  function editUser(id) {
    const modal = document.getElementById('editModal');
    modal.style.display = 'block';
    $('.modal-content h3').text('Edit User');
    setFormReadonly(false);
    $.ajax({
      url: `http://localhost:3000/api/users/getUser/${id}`,
      method: 'GET',
      success: function (data) {
        populateFormFields(data);
        $('#userid').val(data.userid);
      },
      error: handleAjaxError
    });
    document.querySelector('.close').onclick = () => modal.style.display = 'none';
    $('#editForm').off('submit').on('submit', function (e) {
      e.preventDefault();
      const userId = $('#userid').val();
      const updatedUser = {
        first_name: $('#first_name').val(),
        last_name: $('#last_name').val(),
        personal_email: $('#personal_email').val(),
        college_email: $('#college_email').val(),
        phone_number: $('#phone_number').val(),
        joined_date: $('#joined_date').val(),
        gender: $('#gender').val(),
        address: $('#address').val(),
        city: $('#city').val(),
        state: $('#state').val(),
        pincode: $('#pincode').val(),
        profile_picture_url: $('#profile_picture_url').val(),
        role: $('#role').val(),
        status: $('#status').val()
      };
      $.ajax({
        url: `http://localhost:3000/api/users/updateUser/${userId}`,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(updatedUser),
        success: function () {
          alert('User updated successfully');
          modal.style.display = 'none';
          $('#example').DataTable().ajax.reload();
        },
        error: handleAjaxError
      });
    });
  }

  function deleteUser(id) {
    const modal = document.getElementById('deleteModal');
    modal.style.display = 'block';
    $('#confirmDelete').off('click').on('click', function () {
      $.ajax({
        url: `http://localhost:3000/api/users/deleteUser/${id}`,
        method: 'DELETE',
        success: function () {
          alert('User deleted successfully');
          modal.style.display = 'none';
          $('#example').DataTable().ajax.reload();
        },
        error: handleAjaxError
      });
    });
    $('#cancelDelete').off('click').on('click', function () {
      modal.style.display = 'none';
    });
    $('#deleteModal .close').off('click').on('click', function () {
      modal.style.display = 'none';
    });
    window.onclick = function (event) {
      const editModal = document.getElementById('editModal');
      const deleteModal = document.getElementById('deleteModal');
      if (event.target === editModal || event.target === deleteModal) {
        editModal.style.display = 'none';
        deleteModal.style.display = 'none';
      }
    };
  }
