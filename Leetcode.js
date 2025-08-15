document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("search-btn");
  const usernameInput = document.getElementById("user-input");
  const easyProgressCircle = document.querySelector(".easy-progress");
  const mediumProgressCircle = document.querySelector(".medium-progress");
  const hardProgressCircle = document.querySelector(".hard-progress");
  const easyLabel = document.getElementById("easy-label");
  const mediumLabel = document.getElementById("medium-label");
  const hardLabel = document.getElementById("hard-label");
  const cardStatsContainer = document.getElementById("stats-card");
  const statsContainer = document.querySelector(".stats-container");

  function validateUsername(username) {
    if (username.trim() === "") {
      alert("Username should not be empty");
      return false;
    }
    const regex = /^[a-zA-Z][a-zA-Z0-9._]{2,15}$/;
    const isMatching = regex.test(username);
    if (!isMatching) {
      alert("Invalid Username");
    }
    return isMatching;
  }

  async function fetchUserDetails(username) {
    const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
    try {
      showLoading();
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Unable to fetch user details");
      }

      const parsedData = await response.json();
      console.log("Logging user data:", parsedData);

      if (!parsedData || parsedData.status === "error" || !parsedData.totalSolved) {
        throw new Error("No data found");
      }

      displayUserData(parsedData);
    } catch (error) {
      displayError(error.message);
      console.error(error);
    } finally {
      hideLoading();
    }
  }

  function animateProgress(circle, from, to) {
    let start = from;
    const step = (to - from) / 50; // Smoother animation

    const animate = () => {
      start += step;
      if ((step > 0 && start >= to) || (step < 0 && start <= to)) {
        start = to;
      } else {
        requestAnimationFrame(animate);
      }
      circle.style.setProperty("--progress-degree", `${start}%`);
    };

    animate();
  }

  function updateProgress(solved, total, label, circle) {
    if (!solved || !total) {
      solved = 0;
      total = 1;
    }
    const progressDegree = (solved / total) * 100;
    animateProgress(circle, 0, progressDegree);
    label.textContent = `${solved} / ${total}`;
  }

  function displayUserData(parsedData) {
    const totalEasy = parsedData.easyTotal ?? 1;
    const totalMedium = parsedData.mediumTotal ?? 1;
    const totalHard = parsedData.hardTotal ?? 1;

    const solvedEasy = parsedData.easySolved ?? 0;
    const solvedMedium = parsedData.mediumSolved ?? 0;
    const solvedHard = parsedData.hardSolved ?? 0;

    updateProgress(solvedEasy, totalEasy, easyLabel, easyProgressCircle);
    updateProgress(solvedMedium, totalMedium, mediumLabel, mediumProgressCircle);
    updateProgress(solvedHard, totalHard, hardLabel, hardProgressCircle);

    // Update Stats Card
    cardStatsContainer.innerHTML = `
      <p><strong>Total Solved:</strong> ${parsedData.totalSolved}</p>
      <p><strong>Total Submissions:</strong> ${parsedData.totalSubmissions ?? "N/A"}</p>
      <p><strong>Acceptance Rate:</strong> ${parsedData.acceptanceRate ? parsedData.acceptanceRate.toFixed(2) + "%" : "N/A"}</p>
      <p><strong>Ranking:</strong> ${parsedData.ranking ?? "N/A"}</p>
      <p><strong>Contribution Points:</strong> ${parsedData.contributionPoints ?? "N/A"}</p>
    `;
  }

  function showLoading() {
    searchButton.innerHTML = `<div class="spinner"></div>`;
    searchButton.disabled = true;
  }

  function hideLoading() {
    searchButton.innerHTML = "Search";
    searchButton.disabled = false;
  }

  function displayError(message) {
    cardStatsContainer.innerHTML = `<p class="error-message">${message}</p>`;
  }

  searchButton.addEventListener("click", function () {
    const username = usernameInput.value.trim();
    console.log("Logging username:", username);
    if (validateUsername(username)) {
      fetchUserDetails(username);
    }
  });
});








// document.addEventListener("DOMContentLoaded", function () {
//   const searchButton = document.getElementById("search-btn");
//   const usernameInput = document.getElementById("user-input");
//   const statsContainer = document.querySelector(".stats-container");
//   const easyProgressCircle = document.querySelector(".easy-progress");
//   const mediumProgressCircle = document.querySelector(".medium-progress");
//   const hardProgressCircle = document.querySelector(".hard-progress");
//   const easyLabel = document.getElementById("easy-label");
//   const mediumLabel = document.getElementById("medium-label");
//   const hardLabel = document.getElementById("hard-label");
//   const cardStatsContainer = document.querySelector("stats-cards");

//   function validateUsername(username) {
//     if (username.trim() === "") {
//       alert("Username should not be empty");
//       return false;
//     }

//     const regex = /^[a-zA-Z][a-zA-Z0-9._]{2,15}$/;
//     const isMatching = regex.test(username);
//     if (!isMatching) {
//       alert("Invalid Username");
//     }
//     return isMatching;
//   }

//   async function fetchUserDetails(username) {
//     const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
//     try {
//       searchButton.textContent = "Searching...";
//       searchButton.disabled = true;
//       const response = await fetch(url);

//       if (!response.ok) {
//         throw new Error("Unable to fetch user details");
//       }

//       const parsedData = await response.json();
//       console.log("Logging user data:", parsedData);

//       if (
//         !parsedData ||
//         parsedData.status === "error" ||
//         !parsedData.totalSolved
//       ) {
//         throw new Error("No data found");
//       }

//       displayUserData(parsedData);
//     } catch (error) {
//       statsContainer.innerHTML = `<p>No data found.</p>`;
//       console.error(error);
//     } finally {
//       searchButton.textContent = "Search";
//       searchButton.disabled = false;
//     }
//   }

//   function updateProgress(solved, total, label, circle) {
//     if (!solved || !total) {
//       solved = 0;
//       total = 1; 
//     }
//     const progressDegree = (solved / total) * 100;
//     circle.style.setProperty("--progress-degree", `${progressDegree}%`);
//     label.textContent = `${solved} / ${total}`;
//   }

//   function displayUserData(parsedData) {
   
//     const totalEasy = parsedData.easyTotal ?? 1;
//     const totalMedium = parsedData.mediumTotal ?? 1;
//     const totalHard = parsedData.hardTotal ?? 1;

//     const solvedEasy = parsedData.easySolved ?? 0;
//     const solvedMedium = parsedData.mediumSolved ?? 0;
//     const solvedHard = parsedData.hardSolved ?? 0;

    
//     updateProgress(solvedEasy, totalEasy, easyLabel, easyProgressCircle);
//     updateProgress(
//       solvedMedium,
//       totalMedium,
//       mediumLabel,
//       mediumProgressCircle
//     );
//     updateProgress(solvedHard, totalHard, hardLabel, hardProgressCircle);
//   }

//   searchButton.addEventListener("click", function () {
//     const username = usernameInput.value.trim();
//     console.log("Logging username:", username);
//     if (validateUsername(username)) {
//       fetchUserDetails(username);
//     }
//   });
// });

