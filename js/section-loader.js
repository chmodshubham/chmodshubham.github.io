document.addEventListener("DOMContentLoaded", function () {
  // Array of sections to load - updated with correct file paths
  const sections = [
    { id: "header-container", file: "sections/header.html" },
    { id: "home-container", file: "sections/home.html" },
    { id: "experience-container", file: "sections/experience.html" },
    { id: "education-container", file: "sections/education.html" },
    { id: "skills-container", file: "sections/skills.html" },
    { id: "talks-container", file: "sections/talks.html" },
    { id: "awards-container", file: "sections/awards.html" },
    { id: "blog-container", file: "sections/blog.html" },
    { id: "projects-container", file: "sections/projects.html" },
    { id: "contact-container", file: "sections/contact.html" },
    { id: "support-container", file: "sections/support.html" },
    { id: "footer-container", file: "sections/footer.html" },
  ];

  // Function to fetch and insert HTML content
  async function loadSection(section) {
    try {
      const response = await fetch(section.file);
      if (!response.ok) {
        throw new Error(`Failed to load ${section.file}`);
      }
      const html = await response.text();
      document.getElementById(section.id).innerHTML = html;
    } catch (error) {
      console.error(`Error loading section ${section.id}:`, error);
    }
  }
  
  // Load all sections
  Promise.all(sections.map(loadSection))
    .then(() => {
      // After all sections are loaded, initialize scripts
      if (typeof initializeMainScripts === 'function') {
        initializeMainScripts();
      }
      
      // Initialize dark mode after all sections are loaded
      if (typeof initializeDarkMode === 'function') {
        initializeDarkMode();
      }
    });
});