const jobCountContainer = document.getElementById("jobCountContainer");

// Fetch job count when the page is loaded
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Fetch the job count from the API
    const response = await fetch("http://localhost:2020/job-count");
    const data = await response.json();

    // Update the HTML with the count
    if (jobCountContainer === null) {
      console.error("Job count could not be retrieved");
      return;
    }

    jobCountContainer.textContent = `Number of jobs: ${data.count}`;
  } catch (error) {
    console.error("Error", error);
    if (jobCountContainer === null) {
      console.error("Job count could not be retrieved");
      return;
    }

    jobCountContainer.textContent =
      "An error occurred while fetching the user count";
  }
});
