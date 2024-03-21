function showUpdateForm() {
  const updateFormContainer = document.getElementById("updateFormContainer");
  const submitFormContainer = document.getElementById("submitFormContainer");

  if (updateFormContainer && submitFormContainer) {
    updateFormContainer.style.display = "block";
    submitFormContainer.style.display = "none";
  }
}

function showSubmitForm() {
  const updateFormContainer = document.getElementById("updateFormContainer");
  const submitFormContainer = document.getElementById("submitFormContainer");

  if (updateFormContainer && submitFormContainer) {
    updateFormContainer.style.display = "none";
    submitFormContainer.style.display = "block";
  }
}

document.getElementById("updateBtn")?.addEventListener("click", showUpdateForm);
document.getElementById("submitBtn")?.addEventListener("click", showSubmitForm);
