function serializeForm(form: HTMLFormElement): Record<string, string | number> {
  const formData = new FormData(form);

  // Convert form data to JSON
  const jsonData: Record<string, string | number> = {};
  formData.forEach((value, key) => {
    jsonData[key] = value.toString();
  });

  return jsonData;
}

document
  .getElementById("updateFormContainer")
  ?.addEventListener("submit", async (event) => {
    event.preventDefault();

    console.debug({
      function: "updateForm()",
      message: "User if attempting to update a job",
    });

    const updateApplicationId = document.getElementById(
      "updateApplicationId"
    ) as HTMLInputElement;
    const applicationId: number | null = updateApplicationId
      ? parseInt(updateApplicationId.value)
      : null;

    const requestBody = serializeForm(event?.target as HTMLFormElement);

    try {
      const response = await fetch(
        `http://localhost:2020/update-job/${applicationId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );

      await response.json();
    } catch (error) {
      console.error("Error", error);
    }
  });
