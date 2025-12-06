// copy-logic.js

async function handleCopyClick(event) {
    const link = event.target.closest("a[href]");
    if (!link) return;
  
    const href = link.getAttribute("href") || "";
  
    // mailto
    if (href.startsWith("mailto:")) {
      event.preventDefault();
  
      const decoded = decodeURIComponent(href);
      const email = decoded.replace(/^mailto:/i, "").split("?")[0].trim();
      if (!email) return;
  
      try {
        await navigator.clipboard.writeText(email);
        showToast("Copied: " + email, link);
      } catch (err) {
        console.error("Failed to copy email", err);
        showToast("Failed to copy", link);
      }
      return;
    }
  
    // tel / callto
    if (/^(tel:|callto:)/i.test(href)) {
      event.preventDefault();
  
      const decoded = decodeURIComponent(href); // handles %20 etc
      const raw = decoded.replace(/^(tel:|callto:)/i, ""); // strip scheme
  
      const chars = raw.match(/[+\d]/g);
      const phone = chars ? chars.join("") : "";
      if (!phone) return;
  
      try {
        await navigator.clipboard.writeText(phone);
        showToast("Copied: " + raw, link);
      } catch (err) {
        console.error("Failed to copy phone", err);
        showToast("Failed to copy", link);
      }
      return;
    }
  }
  