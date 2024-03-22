let currentUserId = 0;

function generateApplicationId(): number {
  return ++currentUserId;
}

function serializeSubmitForm(form: HTMLFormElement): Record<string, string> {
  const formData = new FormData(form);

  const applicationId = generateApplicationId();

  // Convert form data to JSON
  const jsonData: Record<string, string> = {};
  formData.forEach((value, key) => {
    jsonData[key] = value.toString();
  });

  jsonData["applicationId"] = applicationId.toString();

  console.log(jsonData);

  return jsonData;
}

document
  .getElementById("submitFormContainer")
  ?.addEventListener("submit", async (event: SubmitEvent) => {
    event.preventDefault();

    console.debug({
      function: "submitForm",
      message: "User is attempting to submit a job",
    });

    const requestBody = serializeForm(event.target as HTMLFormElement);

    try {
      // Send POST request to API endpoint
      const response = await fetch("http://localhost:2020/submit-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const submitJob = await response.json(); // Parse response JSON

      console.log({
        function: "submitForm",
        message: `Successfully submitted job ${submitJob.POSITION_TITLE} at ${submitJob.COMPANY_NAME}`,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  });
