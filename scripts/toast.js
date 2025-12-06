// toast.js

let cepToastEl = null;
let cepHideTimer = null;
let cepBounceT1 = null;
let cepBounceT2 = null;

function getOrCreateToast() {
  if (cepToastEl) return cepToastEl;
  const el = document.createElement("div");
  el.id = "cep-toast";
  el.style.position = "fixed";
  el.style.padding = "0.40em 0.80em";
  el.style.background = "rgba(0, 0, 0, 0.85)";
  el.style.color = "#ffffff";
  el.style.fontSize = "16px";
  el.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont";
  el.style.borderRadius = "9999px";
  el.style.border = "2px solid rgba(126, 126, 126, 0.5)";
  el.style.zIndex = "999999";
  el.style.pointerEvents = "none";
  el.style.backdropFilter = "blur(12px)";
  el.style.webkitBackdropFilter = "blur(12px)";
  el.style.opacity = "0";
  el.style.transition = "opacity 160ms ease-out, top 160ms ease-out";
  el.style.whiteSpace = "nowrap";
  document.body.appendChild(el);
  cepToastEl = el;
  return el;
}

function clearToastTimers() {
  if (cepHideTimer) { clearTimeout(cepHideTimer); cepHideTimer = null; }
  if (cepBounceT1) { clearTimeout(cepBounceT1); cepBounceT1 = null; }
  if (cepBounceT2) { clearTimeout(cepBounceT2); cepBounceT2 = null; }
}

function showToast(text, targetElement) {
  const toast = getOrCreateToast();
  clearToastTimers();

  // Update text content
  toast.textContent = text;

  const linkRect = targetElement.getBoundingClientRect();
  const margin = 8;
  const viewportHeight = window.innerHeight;

  // Start at same top/left as the link
  let startTop = linkRect.top;
  let left = linkRect.left;

  // Measure after content update
  const toastRect = toast.getBoundingClientRect();

  // Final position just above, else below
  let finalTop = linkRect.top - toastRect.height - margin;
  if (finalTop < margin) {
    finalTop = linkRect.bottom + margin;
  }
  if (finalTop > viewportHeight - toastRect.height - margin) {
    finalTop = viewportHeight - toastRect.height - margin;
  }

  // Reset to known starting state WITHOUT animating from previous position
  const transitionValue = "opacity 160ms ease-out, top 160ms ease-out";
  toast.style.transition = "none";
  toast.style.opacity = "0";
  toast.style.left = left + "px";
  toast.style.top = startTop + "px";
  // Force reflow so the browser applies the above immediately
  void toast.offsetHeight;
  // Restore transitions for the actual animation
  toast.style.transition = transitionValue;

  // Slide from link to final point with a little bounce
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.top = finalTop + "px";

    cepBounceT1 = setTimeout(() => {
      toast.style.top = (finalTop - 3) + "px";
      cepBounceT2 = setTimeout(() => {
        toast.style.top = finalTop + "px";
      }, 70);
    }, 160);
  });

  cepHideTimer = setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.top = (finalTop - 6) + "px";
    // Do not remove the node; keep for reuse
  }, 900);
}
  