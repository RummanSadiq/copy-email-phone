// copy-logic.js

async function handleCopyClick(event) {
    // Ignore non-primary clicks or modified clicks to avoid interfering with site shortcuts
    if (event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    
    // handles Text nodes and Shadow DOM)
    const path = typeof event.composedPath === "function" ? event.composedPath() : null;
    let originEl = null;
    if (path && path.length) {
      for (let i = 0; i < path.length; i++) {
        const n = path[i];
        if (n && n.nodeType === 1) { originEl = n; break; }
      }
    } else {
      const t = event.target;
      originEl = t && t.nodeType === 1 ? t : t && t.parentElement ? t.parentElement : null;
    }
    if (!originEl || typeof originEl.closest !== "function") return;
    const link = originEl.closest("a[href]");
    if (!link) return;
  
    const href = link.getAttribute("href") || "";
  
    if (/^mailto:/i.test(href)) {
      event.preventDefault();
      if (typeof event.stopImmediatePropagation === "function") event.stopImmediatePropagation();
      if (typeof event.stopPropagation === "function") event.stopPropagation();
  
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
      if (typeof event.stopImmediatePropagation === "function") event.stopImmediatePropagation();
      if (typeof event.stopPropagation === "function") event.stopPropagation();
  
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
  