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
      userData = data.result.usersDetails;
      populateTable(data.result.usersDetails ,data.result.total_count);
    });
});

let userData = [];

function populateTable(data, count) {
  const tbody = document.getElementById("internTableBody");
  tbody.innerHTML = "";

  const totalStudyMaterialsByRole = count;

  const roleMap = {
    "full stack developer": "Full stack",
    "android developer": "Android",
    "software tester": "Software tester"
  };

  data.forEach((user, index) => {
    const userRole = user.role.toLowerCase();
    const studyMaterialRole = roleMap[userRole];

    let completed = 0;
    let total = totalStudyMaterialsByRole[studyMaterialRole] || 0;

    let progressDisplay;
    if (userRole === "admin") {
      progressDisplay = "Admin";
    } else {
      user.user_progresses.forEach(progress => {
        if (
          progress.StudyMaterial &&
          progress.StudyMaterial.role === studyMaterialRole
        ) {
          completed++;
        }
      });
      progressDisplay = total
        ? Math.round((completed / total) * 100) + "%"
        : "0%";
    }

    const joinedDate = new Date(user.joined_date);
    const currentDate = new Date();
    const completedDisplay =
      joinedDate > currentDate ? "Yet to Join" :  new Date(user.joined_date).toDateString();

    const row = document.createElement("tr");

const isPercentage = /^\d+%$/.test(progressDisplay);
const percentValue = isPercentage ? parseInt(progressDisplay.replace('%', '')) : 0;
const displayHTML = isPercentage
  ? `<div class="circle-progress" onclick="progressInfo(${user.userid})" style="--progress:${percentValue}" data-label="${percentValue}%"></div>`
  : `<span class="non-progress">${progressDisplay}</span>`;

    row.innerHTML = `
      <td><img src="${user.profile_picture_url}" class="user-img" /></td>
      <td>${(user.first_name).toUpperCase()} ${(user.last_name).toUpperCase()}</td>
      <td>${(user.role).toUpperCase()}</td>
      <td class="progress-display">${displayHTML}</td>
      <td class="completed-status">${completedDisplay}</td>
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

  popup.querySelector(".intern-image").src = user.profile_picture_url ;
  popup.querySelector(".intern-image").alt = `${user.first_name} ${user.last_name}`;
  popup.querySelector(".intern-name").textContent = (`${user.first_name} ${user.last_name}`).toUpperCase();

  const fieldMap = {
    "popup-role": (user.role).toUpperCase(),
    "popup-status": (user.status).toUpperCase(),
    "popup-pemail": (user.personal_email).toUpperCase(),
    "popup-cemail": (user.college_email).toUpperCase(),
    "popup-phone": user.phone_number,
    "popup-gender": (user.gender).toUpperCase(),
    "popup-joined": new Date(user.joined_date).toDateString(),
    "popup-address": (user.address).toUpperCase(),
    "popup-city": (user.city).toUpperCase(),
    "popup-state": (user.state).toUpperCase(),
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

async function progressInfo(index) {
  const popup = document.getElementById('progressPopup');
  const userId = index;

  const desiredOrder = [
    "Computer Basics",
    "HTML",
    "CSS",
    "JavaScript",
    "SQL",
    "Node.js",
    "Sequelize"
  ];

  const frontendToApiMap = {
    "Basics of Computer": "Computer Basics",
    "HTML": "HTML",
    "CSS": "CSS",
    "JavaScript": "JavaScript",
    "SQL": "SQL",
    "Node js": "Node.js",
    "Sequelize": "Sequelize"
  };

  try {
    const response = await fetch(`http://localhost:3000/api/userProgress/completed-topics/${userId}`);
    const data1 = await response.json();
    const data =data1.result;
    const sortedData = data.sort((a, b) => {
      const indexA = desiredOrder.indexOf(a.tech);
      const indexB = desiredOrder.indexOf(b.tech);
      return indexA - indexB;
    });

    const progressMap = {};
    sortedData.forEach(item => {
      progressMap[item.tech] = {
        total: item.totalCount,
        completed: item.completedCount
      };
    });

  
    document.querySelectorAll('.progress-bar-container').forEach(el => el.remove());


    document.querySelectorAll('.fsd-topic').forEach(sub => {
      const topicName = sub.querySelector('span').textContent.trim();
      const apiTopicName = frontendToApiMap[topicName];

      if (apiTopicName) {
        const info = progressMap[apiTopicName];
        let percent = 0;

        if (info && info.total > 0) {
          percent = ((info.completed / info.total) * 100).toFixed(0);
        }

        const color = percent >= 70 ? '#4caf50' : percent >= 40 ? '#ffc107' : '#f44336';

        sub.querySelector('.fsd-progress').textContent = `${percent}%`;

        // Create and append progress bar
        const barContainer = document.createElement('div');
        barContainer.classList.add('progress-bar-container');

        const barFill = document.createElement('div');
        barFill.classList.add('progress-bar-fill');
        barFill.style.width = `${percent}%`;
        barFill.style.backgroundColor = color;

        barContainer.appendChild(barFill);
        sub.appendChild(barContainer);
      }
    });

  } catch (error) {
    console.error("Failed to fetch progress data:", error);
  }

  popup.style.display = 'flex';
  setTimeout(() => popup.classList.add('active'), 10);
}




function closeProgressPopup() {
  const popup = document.getElementById('progressPopup');
  popup.classList.remove('active');
  setTimeout(() => popup.style.display = 'none', 300); 
}

