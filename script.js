function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  const logo = document.querySelector(".logo"); // Corrected the selector for the logo
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

document.querySelector(".logo").addEventListener("click", function() {
  window.location.href = "/"; // Navigate to the home page
});
