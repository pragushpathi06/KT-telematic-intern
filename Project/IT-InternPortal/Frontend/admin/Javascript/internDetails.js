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
        url: 'http://localhost:3000/api/users/getUser',
        dataSrc: 'result'
      },
      columns: [
        { data: 'userid',
           width: '1px'
        },
        {
          data: null,
          render: data => `${data.first_name} ${data.last_name}`
        },
        { data: 'personal_email' },
        { data: 'phone_number' },
        { data: 'city' },
        { data: 'role',
          orderable: false,
           render: function (data) {
    return data ? data.toUpperCase() : '';
  }

         },
        { data: 'status' ,
          orderable: false
        },
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
  const api = this.api();

  // api.columns().every(function (colIdx) {
  //   const column = this;
  //   const title = column.footer().textContent;

  //   if (colIdx !== 5 &&colIdx !== 6 && title) {
  //     const input = document.createElement('input');
  //     input.placeholder = `Search ${title}`;
  //     column.footer().replaceChildren(input);

  //     input.addEventListener('keyup', function () {
  //       if (column.search() !== this.value) {
  //         column.search(this.value).draw();
  //       }
  //     });
  //   }
  // });

 
  const statusSet = new Set();

  api.column(6).data().each(function (d) {
    statusSet.add(d);
  });


  statusSet.forEach(val => {
    $('#statusFilter').append(`<option value="${val}">${val.toUpperCase()}</option>`);
  });

  $('#statusFilter').on('change', function () {
    const val = $.fn.dataTable.util.escapeRegex($(this).val());
    api.column(6).search(val ? '^' + val + '$' : '', true, false).draw();
  });

  const roleSet = new Set();

  api.column(5).data().each(function (d) {
    roleSet.add(d);
  });


  roleSet.forEach(val => {
    $('#roleFilter').append(`<option value="${val}">${val.toUpperCase()}</option>`);
  });

  $('#roleFilter').on('change', function () {
    const val = $.fn.dataTable.util.escapeRegex($(this).val());
    api.column(5).search(val ? '^' + val + '$' : '', true, false).draw();
  });
}

      
    });
  });

  function handleAjaxError(xhr, status, error) {
    console.error(`AJAX Error: ${error}`);
  
    let errorMessage = 'Something went wrong.';
  
    if (xhr.responseJSON && xhr.responseJSON.message) {
      errorMessage = xhr.responseJSON.message;
    } else if (xhr.responseText) {
      try {
        const json = JSON.parse(xhr.responseText);
        errorMessage = json.message || json.error || xhr.responseText;
      } catch (e) {
        errorMessage = xhr.responseText;
      }
    }
    alert(errorMessage);
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
  
    $('#role_select').hide();
    $('#status_select').hide();
    $('#gender_select').hide();
    $('#state_select').hide();
    $('#pincode_select').hide();
    $('#city_select').hide();

    $('#role_input').show();
    $('#status_input').show();
    $('#gender_input').show();
    $('#state').show();
    $('#pincode').show();
    $('#city').show();
    
  
    $.ajax({
      url: `http://localhost:3000/api/users/getUser/${id}`,
      method: 'GET',
      success: function (data) {
        const user = data.result;
        populateFormFields(user);
        $('#role_input').val(user.role);
        $('#status_input').val(user.status);
        $('#gender_input').val(user.gender);
      },
      error: handleAjaxError
    });
  
    document.querySelector('.close').onclick = () => modal.style.display = 'none';
  }
  

  function openAddUserModal() {
    const modal = document.getElementById('addModal');
    $('.modal-content h3').text('Add New User');
    modal.style.display = 'block';
  
    $('#addForm input').val('');
  
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setMonth(today.getMonth() + 1); 
  

    const formattedMaxDate = maxDate.toISOString().split('T')[0];
  
    $('#add_joined_date')
      .attr('max', formattedMaxDate)
      .off('blur')
      .on('blur', function () {
        const errorSpan = $('#add_joined_date_error');
        if (new Date(this.value) > maxDate) {
          errorSpan.text(`Date cannot be after ${formattedMaxDate}.`);
          this.value = '';
        } else {
          errorSpan.text('');
        }
      });

      
    document.querySelector('#addModal .close').onclick = () => {
      modal.style.display = 'none';
    };


    $('#addForm').off('submit').on('submit', function (e) {
      e.preventDefault();
  
      const joinedDate = $('#add_joined_date').val();
  
      if (new Date(joinedDate) > maxDate) {
        $('#add_joined_date_error').text(`Date cannot be after ${formattedMaxDate}.`);
        return;
      } else {
        $('#add_joined_date_error').text('');
      }
  
      const newUser = {
        first_name: $('#add_first_name').val(),
        last_name: $('#add_last_name').val(),
        personal_email: $('#add_personal_email').val(),
        college_email: $('#add_college_email').val(),
        phone_number: $('#add_phone_number').val(),
        joined_date: joinedDate,
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
  
      // console.log(newUser);
  
      $.ajax({
        url: 'http://localhost:3000/api/users/register',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(newUser),
        success: function () {
          alert('User added successfully');
          modal.style.display = 'none';
          $('#example').DataTable().ajax.reload(null, false);
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
  

    $('#role_input').hide();
    $('#status_input').hide();
    $('#gender_input').hide();
    $('#state').hide();
    $('#pincode').hide();
    $('#city').hide();


    $('#role_select').show();
    $('#status_select').show();
    $('#gender_select').show();
    $('#state_select').show();
    $('#pincode_select').show();
    $('#city_select').show();
    // console.log("hi");
    $.ajax({
      url: `http://localhost:3000/api/users/getUser/${id}`,
      method: 'GET',
      success: function (data) {
        const user = data.result;
        populateFormFields(user);
        $('#userid').val(user.userid);
        $('#role_select').val(user.role);
        $('#status_select').val(user.status);
        $('#gender_select').val(user.gender);
        populateLocationFields(user.state ,user.city, user.pincode);
      },
      error: handleAjaxError
    });
  
    document.querySelector('.close').onclick = () => modal.style.display = 'none';
  
    $('#editForm').off('submit').on('submit', function (e) {
      e.preventDefault();
      const joinedDate = $('#joined_date').val();
      const today = new Date();
      const maxDate = new Date(today);
      maxDate.setMonth(today.getMonth() + 1); 

      const joinedDateObj = new Date(joinedDate);

      if (joinedDateObj > maxDate) {
        alert(`Date cannot be after ${maxDate.toISOString().split('T')[0]}.`);
        $('#add_joined_date_error').text(`Date cannot be after ${maxDate.toISOString().split('T')[0]}.`);
        return;
      } else {
        $('#add_joined_date_error').text('');
      }
 
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
        city: $('#city_select').val(),
        state: $('#state_select').val(),
        pincode: $('#pincode_select').val(),
        profile_picture_url: $('#profile_picture_url').val(),
        role: $('#role_select').val(),
        status: $('#status_select').val()
      };
      if(confirm("Are you sure to edit user details")){
        $.ajax({
        url: `http://localhost:3000/api/users/updateUser/${userId}`,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(updatedUser),
        success: function () {
          alert('User updated successfully');
          modal.style.display = 'none';
          $('#example').DataTable().ajax.reload(null, false);
        },
        error: handleAjaxError
      });
      }
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
          $('#example').DataTable().ajax.reload(null, false);
        },
        error: function () {
        alert('Error deleting study material.');
      }
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
  document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    document.getElementById("addModal").style.display = "none";
    document.getElementById('editModal').style.display = "none";
    document.getElementById('deleteModal').style.display = "none";
  }});
  

  const validationStatus = {
    personal_email: false,
    college_email: false,
    phone_number: false,
  };

  function updateSubmitStatus() {
    const allValid = Object.values(validationStatus).every(Boolean);
    document.getElementById('submit-btn').disabled = !allValid;
  }
  

  async function checkAvailability(value, type, spanId) {
    const span = document.getElementById(spanId);
  
    if (!value || value.length < 5 || (type === 'phone_number' && !/^\d{10}$/.test(value))) {
      span.textContent = '';
      span.style.color = '';
      validationStatus[type] = false;
      updateSubmitStatus();
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3000/api/users/check?value=${encodeURIComponent(value)}&type=${type}`);
      const data = await response.json();
  
      if (response.ok) {
        if (data.exists) {
          span.textContent = `${type.replace('_', ' ')} already exists`;
          span.style.color = 'red';
          validationStatus[type] = false;
        } else {
          span.textContent = '';
          span.style.color = '';
          validationStatus[type] = true;
        }
      } else {
        span.textContent = data.message || 'Error checking';
        span.style.color = 'orange';
        validationStatus[type] = false;
      }
    } catch (err) {
      console.error('Error checking:', err);
      span.textContent = 'Server error';
      span.style.color = 'orange';
      validationStatus[type] = false;
    }
  
    updateSubmitStatus();
  }
  