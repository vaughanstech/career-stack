window.addEventListener("scroll", function () {
  const scrollToTop = this.document.getElementById("scrollToTop");
  if (
    this.document.body.scrollTop > 20 ||
    this.document.documentElement.scrollTop > 20
  ) {
    scrollToTop?.classList.add("show");
  } else {
    scrollToTop?.classList.remove("show");
  }
});

document.getElementById("scrollToTop")?.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
