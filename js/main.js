// This function will be called after all sections are loaded
function initializeMainScripts() {
  // Mobile Navigation Toggle
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector("nav");
  const navLinks = document.querySelectorAll("nav ul li a");

  if (hamburger && nav) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      nav.classList.toggle("active");
    });
  }

  // Close mobile nav when clicking a link
  if (navLinks.length > 0) {
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        nav.classList.remove("active");
      });
    });
  }

  // Highlight active nav link on scroll
  const sections = document.querySelectorAll("section");

  function highlightNavOnScroll() {
    let scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute("id");

      if (
        sectionId &&
        scrollY > sectionTop &&
        scrollY <= sectionTop + sectionHeight
      ) {
        const navLink = document.querySelector(
          `nav ul li a[href*=${sectionId}]`
        );
        if (navLink) navLink.classList.add("active");
      } else if (sectionId) {
        const navLink = document.querySelector(
          `nav ul li a[href*=${sectionId}]`
        );
        if (navLink) navLink.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", highlightNavOnScroll);

  // Contact Form Submission
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    emailjs.init("D6eMj2owNC3q0_pWJ");

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      // Show loading indicator
      const submitBtn = contactForm.querySelector(".submit-btn");
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      // Prepare template parameters
      const templateParams = {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
      };

      // Send email using EmailJS
      emailjs.send("service_pqaq3p8", "template_ln2evlt", templateParams).then(
        function () {
          console.log("Email sent successfully!");

          // Show success message
          const successMessage = document.createElement("div");
          successMessage.className = "success-message";
          successMessage.textContent =
            "Your message has been sent successfully!";

          contactForm.reset();
          contactForm.appendChild(successMessage);

          // Reset button
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;

          // Remove the message after 5 seconds
          setTimeout(() => {
            successMessage.remove();
          }, 5000);
        },
        function (error) {
          console.error("Failed to send email:", error);

          // Show error message
          const errorMessage = document.createElement("div");
          errorMessage.className = "error-message";
          errorMessage.textContent =
            "Failed to send your message. Please try again later.";

          contactForm.appendChild(errorMessage);

          // Reset button
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;

          // Remove the message after 5 seconds
          setTimeout(() => {
            errorMessage.remove();
          }, 5000);
        }
      );
    });
  }

  // Animate elements when they come into view
  const animateOnScroll = function () {
    const elementsToAnimate = document.querySelectorAll(
      ".timeline-item, .skill-category, .talk-item, .award-item, .blog-card, .project-card"
    );

    elementsToAnimate.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;

      if (elementPosition < viewportHeight - 100) {
        element.classList.add("animate");
      }
    });
  };

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); // Run once on page load
}

// If the page is already loaded, initialize scripts
if (document.readyState === "complete") {
  initializeMainScripts();
}
