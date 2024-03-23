function showUpdateForm() {
  console.log("Generating update form");
  const updateFormContainer = document.getElementById("updateFormContainer");
  const submitFormContainer = document.getElementById("submitFormContainer");
  const deleteFormContainer = document.getElementById("deleteFormContainer");

  if (updateFormContainer && submitFormContainer && deleteFormContainer) {
    updateFormContainer.style.display = "block";
    submitFormContainer.style.display = "none";
    deleteFormContainer.style.display = "none";
  }
}

function showSubmitForm() {
  console.log("Generating submit form");
  const updateFormContainer = document.getElementById("updateFormContainer");
  const submitFormContainer = document.getElementById("submitFormContainer");
  const deleteFormContainer = document.getElementById("deleteFormContainer");

  if (updateFormContainer && submitFormContainer && deleteFormContainer) {
    updateFormContainer.style.display = "none";
    submitFormContainer.style.display = "block";
    deleteFormContainer.style.display = "none";
  }
}

function showDeleteForm() {
  console.log("Generating delete form");
  const updateFormContainer = document.getElementById("updateFormContainer");
  const submitFormContainer = document.getElementById("submitFormContainer");
  const deleteFormContainer = document.getElementById("deleteFormContainer");

  if (updateFormContainer && submitFormContainer && deleteFormContainer) {
    updateFormContainer.style.display = "none";
    submitFormContainer.style.display = "none";
    deleteFormContainer.style.display = "block";
  }
}

document.getElementById("updateBtn")?.addEventListener("click", showUpdateForm);
document.getElementById("submitBtn")?.addEventListener("click", showSubmitForm);
document.getElementById("deleteBtn")?.addEventListener("click", showDeleteForm);
