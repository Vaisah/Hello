// nav bar links
function setActive(clickedElement) {
    // Remove the "active" class from all nav-links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));

    // Add the "active" class to the clicked nav-link
    clickedElement.classList.add('active');
}

  function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('section').forEach(section => {
      section.classList.remove('active');
    });

    // Show the selected section
    document.getElementById(sectionId).classList.add('active');
  }
