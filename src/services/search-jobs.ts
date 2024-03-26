async function searchJobs() {
  const searchInput: HTMLInputElement = document.getElementById(
    "searchInput"
  ) as HTMLInputElement;
  const searchResults: HTMLElement = document.getElementById(
    "response"
  ) as HTMLElement;

  try {
    const response = await fetch(
      `http://localhost:2020/find-jobs?q=${searchInput.value.trim()}`
    );
    const data = await response.json();

    if (searchResults) {
      searchResults.innerHTML = "";
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

    if (searchResults) {
      searchResults.appendChild(jobList);
    }

    console.debug({
      function: "searchJobs()",
      message: "The user has successfully searched a job",
    });
  } catch (error) {
    console.error("Error", error);
    if (searchInput) {
      searchInput.textContent =
        "An error occurred while searching for job data";
    }
  }
}

const searchButton: HTMLButtonElement | null = document.getElementById(
  "searchButton"
) as HTMLButtonElement | null;
searchButton?.addEventListener("click", searchJobs);
