const fetchJobsBtn = document.getElementById("fetchJobsBtn");

// Mapping to define field names to display name
const fieldDisplayNames: { [key: string]: string } = {
  APPLICATION_ID: "Application ID",
  COMPANY_NAME: "Company Name",
  POSITION_TITLE: "Position Title",
  LOCATION: "Location",
  SALARY_RANGE: "Salary Range",
  APPLICATION_SUBMITTED_DATE: "Application Submitted Date",
  ACCEPTED_OR_DENIED: "Accepted or Denied",
  HIRING_MANAGER_RESPONDED: "Hiring Manager Responded",
  HIRING_MANAGER_RESPONDED_DATE: "Hiring Manager Responded Date",
  INTERVIEW_SCHEDULED: "Interview Scheduled",
  INTERVIEW_SCHEDULED_DATE: "Interview Scheduled Date",
  OFFER_MADE: "Offer Made",
  OFFER_MADE_DATE: "Offer Made Date",
};

async function fetchAndRenderJobs() {
  console.debug({
    function: "fetchAndRenderJobs()",
    message: "User has requested to fetch all records",
  });
  const responseContainer = document.getElementById("response");

  try {
    // Fetch the user data from the API
    const response = await fetch("http://localhost:2020/get-jobs");
    const data = await response.json();

    // Clear existing content in the container
    if (responseContainer) {
      responseContainer.innerHTML = "";
    }

    // Create a new unordered list for each user
    const jobList = document.createElement("ul");
    jobList.classList.add("fetchJobContainer");

    // Iterate over each user record and create list items
    data.forEach((job: Record<string, string>) => {
      const listItem = document.createElement("li");

      // Iterate over each field in the user record and append to the list item with a new line
      Object.keys(job).forEach((field) => {
        // Check if the field has a display name mapping
        const displayName = fieldDisplayNames[field] || field;
        const fieldContent = document.createTextNode(
          `${displayName}: ${job[field]}`
        );
        listItem.appendChild(fieldContent);
        listItem.appendChild(document.createElement("br"));
      });

      listItem.appendChild(document.createElement("br"));
      listItem.appendChild(document.createElement("hr"));
      listItem.appendChild(document.createElement("br"));

      jobList.appendChild(listItem);
    });

    // Append the user's unordered list to the container
    if (responseContainer) {
      responseContainer.appendChild(jobList);
    }

    console.debug({
      function: "fetchAndRenderJobs",
      message: "The user has successfully requested all records",
    });
  } catch (error) {
    console.error("Error", error);
    if (responseContainer) {
      responseContainer.textContent =
        "An error occurred while fetching user data.";
    }
  }
}

fetchJobsBtn?.addEventListener("click", fetchAndRenderJobs);
