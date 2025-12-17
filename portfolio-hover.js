// ======================================================
// PORTFOLIO HOVER MP4 WITH MUTATIONOBSERVER
// Works with Squarespace 7.1 portfolio blocks and filtering
// ======================================================

(function() {
  const containerSelector = ".lessons-flex-container"; // adjust if different
  const itemSelector = "li";
  const videoClass = "portfolio-hover-video";
  const overlayClass = "custom-video-overlay";
  const titleClass = "custom-video-title";

  // Function to attach video & overlay to a portfolio item
  function attachVideo(item) {
    if (item.dataset.videoAttached) return; // prevent duplicate
    
    const link = item.querySelector("a[href*='/portfolio/v/']");
    const frame = item.querySelector(".grid-image");
    const titleEl = item.querySelector(".lesson-title");

    if (!link || !frame || !titleEl) return;

    const slug = link.getAttribute("href").split("/").pop();
    const videoUrl = `/s/${slug}.mp4`;

    // Video
    const video = document.createElement("video");
    video.src = videoUrl;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = "auto";
    video.className = videoClass;
    frame.appendChild(video);

    // Overlay
    const overlay = document.createElement("div");
    overlay.className = overlayClass;
    overlay.style.position = "absolute";
    overlay.style.inset = "0";
    overlay.style.display = "flex";
    overlay.style.alignItems = "flex-end";
    overlay.style.padding = "10px 12px";
    overlay.style.opacity = "0";
    overlay.style.pointerEvents = "none";
    overlay.style.transition = "opacity 0.25s ease";

    const title = document.createElement("div");
    title.className = titleClass;
    title.textContent = titleEl.textContent;
    title.style.color = "#fff";
    title.style.fontSize = "14px";
    title.style.lineHeight = "1.3";
    title.style.position = "relative";
    title.style.zIndex = "2";

    overlay.appendChild(title);
    frame.appendChild(overlay);

    // Hover events
    item.addEventListener("mouseenter", () => {
      video.currentTime = 0;
      video.play();
      overlay.style.opacity = "1";
    });

    item.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
      overlay.style.opacity = "0";
    });

    // Mark as attached
    item.dataset.videoAttached = true;
  }

  // Attach videos to all current items
  function attachAll() {
    document.querySelectorAll(`${containerSelector} ${itemSelector}`).forEach(attachVideo);
  }

  // MutationObserver to handle filtered/rebuilt items
  const container = document.querySelector(containerSelector);
  if (container) {
    const observer = new MutationObserver(() => {
      attachAll();
    });
    observer.observe(container, { childList: true, subtree: true });
  }

  // Initial attach
  attachAll();
})();
