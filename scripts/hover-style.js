// hover-style.js

function injectHoverStyle() {
    if (document.getElementById("copy-email-phone-hover-style")) return;
  
    const style = document.createElement("style");
    style.id = "copy-email-phone-hover-style";
    style.textContent = `
      a[data-copy-email-phone] {
        transition: filter 120ms ease-out;
      }
      a[data-copy-email-phone]:hover {
        filter: brightness(1.1);
      }
    `;
    document.head.appendChild(style);
  }
  
  function enhanceCopyLinks() {
    injectHoverStyle();
  
    const links = document.querySelectorAll("a[href^='mailto:' i], a[href^='tel:' i], a[href^='callto:' i]");
    links.forEach((link) => {
      link.setAttribute("data-copy-email-phone", "1");
    });
  }
  
  // Run once when this file loads
  enhanceCopyLinks();
  
  // If DOM is still loading, run once after it finishes (avoid redundant listener)
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", enhanceCopyLinks, { once: true });
  }
  