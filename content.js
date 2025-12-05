function showToast(text, targetElement) {
    const toast = document.createElement("div");
    toast.innerText = text;
  
    toast.style.position = "fixed";
    toast.style.padding = "0.35em 0.75em";
    toast.style.background = "rgba(0, 0, 0, 0.85)";
    toast.style.color = "#ffffff";
    toast.style.fontSize = "16px";
    toast.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont";
    toast.style.borderRadius = "12px";
    toast.style.zIndex = "999999";
    toast.style.pointerEvents = "none";
    toast.style.backdropFilter = "blur(12px)";
    toast.style.webkitBackdropFilter = "blur(12px)";
    toast.style.opacity = "0";
    toast.style.transition = "opacity 160ms ease-out, top 160ms ease-out";
    toast.style.whiteSpace = "nowrap";
    
    document.body.appendChild(toast);
  
    const linkRect = targetElement.getBoundingClientRect();
    const toastRect = toast.getBoundingClientRect();
    const margin = 8;
    const viewportHeight = window.innerHeight;
  
    // Start: same top/left as the href tag
    let startTop = linkRect.top;
    let left = linkRect.left;
  
    // Final position: just above the href
    let finalTop = linkRect.top - toastRect.height - margin;
  
    // If not enough space above, show below instead
    if (finalTop < margin) {
      finalTop = linkRect.bottom + margin;
    }
    if (finalTop > viewportHeight - toastRect.height - margin) {
      finalTop = viewportHeight - toastRect.height - margin;
    }
  
    toast.style.left = left + "px";
    toast.style.top = startTop + "px";
  
    // Animate from href position to final position
    requestAnimationFrame(() => {
        // Arrive
        toast.style.opacity = "1";
        toast.style.top = finalTop + "px";
      
        // Mini bounce upward
        setTimeout(() => {
          toast.style.top = (finalTop - 3) + "px";
          // Ease back to final
          setTimeout(() => {
            toast.style.top = finalTop + "px";
          }, 70);
        }, 160);
      });
      
      // Fade out
      setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.top = (finalTop - 6) + "px";
        setTimeout(() => toast.remove(), 180);
      }, 900);
      
  }
  
  document.addEventListener("click", async (event) => {
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
      } catch {
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
      } catch {
        showToast("Failed to copy", link);
      }
      return;
    }
  });
  