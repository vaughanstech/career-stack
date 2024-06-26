function serializeDeleteForm(form: HTMLFormElement): Record<string, string> {
  const formData = new FormData(form);

  const jsonData: Record<string, string> = {};
  formData.forEach((value, key) => {
    jsonData[key] = value.toString();
  });

  return jsonData;
}

document
  .getElementById("deleteFormContainer")
  ?.addEventListener("submit", async (event) => {
    event.preventDefault();

    console.debug({
      function: "deleteForm()",
      message: "User is attempting to delete a job",
    });

    const deleteApplicationId = document.getElementById(
      "deleteApplicationId"
    ) as HTMLInputElement;
    const applicationId: number | null = deleteApplicationId
      ? parseInt(deleteApplicationId.value)
      : null;

    const requestBody = serializeDeleteForm(event?.target as HTMLFormElement);

    try {
      const response = await fetch(
        `http://localhost:2020/delete-job/${applicationId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        console.debug({
          function: "deleteJob()",
          message: `Successfully deleted applicationId: ${applicationId}`,
        });
        alert("Job has been successfully deleted");
        window.location.reload();
      } else {
        console.error("Failed to delete data", response.statusText);
      }
    } catch (error) {
      console.error("Error", error);
    }
  });
