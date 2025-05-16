document.addEventListener("DOMContentLoaded", () => {
  const logout = document.getElementById("logout");
  logout?.addEventListener("click", () => {
    if (confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      window.location.href = "/Frontend/index.html";
    }
  });

  fetch("http://localhost:3000/api/users/getAllUsersDetails")
    .then((res) => res.json())
    .then((data) => {
      userData = data;
      populateTable(data);
      
    });
});

let userData = [];

function populateTable(data) {
  const tbody = document.getElementById("internTableBody");
  tbody.innerHTML = "";
  let completedDisplay;
  let progressPercentage =0;
  data.forEach((user, index) => {
    const joinedDate = new Date(user.joined_date);
    const currentDate = new Date();

     if (joinedDate > currentDate){
         completedDisplay = "Yet to Join"
     }else{
         completedDisplay =user.joined_date;
     }

    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${user.profile_picture_url || 'https://shorturl.at/9YiGW'}" class="user-img" /></td>
      <td>${user.first_name} ${user.last_name}</td>
      <td>${user.role}</td>
      <td>
         ${progressPercentage}
      </td>
      <td>${completedDisplay}</td>
      <td><button class="view-button" onclick="openPopup(${index})">view</button></td>
    `;
    tbody.appendChild(row);
  });
}

function openPopup(index) {
  const user = userData[index];
  const popup = document.getElementById("internPopup");
  popup.classList.add("active");
  document.body.style.overflow = "hidden";

  popup.querySelector(".intern-image").src = user.profile_picture_url || "/Frontend/image/4625618.jpg";
  popup.querySelector(".intern-image").alt = `${user.first_name} ${user.last_name}`;
  popup.querySelector(".intern-name").textContent = `${user.first_name} ${user.last_name}`;

  const fieldMap = {
    "popup-role": user.role,
    "popup-status": user.status,
    "popup-pemail": user.personal_email,
    "popup-cemail": user.college_email,
    "popup-phone": user.phone_number,
    "popup-gender": user.gender,
    "popup-joined": new Date(user.joined_date).toDateString(),
    "popup-address": user.address,
    "popup-city": user.city,
    "popup-state": user.state,
    "popup-pincode": user.pincode,
  };

  Object.entries(fieldMap).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value || "-";
  });
}

function closePopup() {
  document.getElementById("internPopup").classList.remove("active");
  document.body.style.overflow = "auto";
}

document.addEventListener("click", function (e) {
  const popup = document.getElementById("internPopup");
  if (e.target === popup) closePopup();
});


