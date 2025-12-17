// portfolio-hover.js
(function() {
  const portfolioSelector = ".lessons-flex-container";
  const videoClass = "portfolio-hover-video";
  const overlayClass = "custom-video-overlay";
  const titleClass = "custom-video-title";

  function setupPortfolioItem(item) {
    if (item.dataset.videoAttached) return; // Already processed

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
    video.preload = "metadata";
    video.className = videoClass;
    video.style.position = "absolute";
    video.style.inset = 0;
    video.style.width = "100%";
    video.style.height = "100%";
    video.style.objectFit = "cover";
    video.style.pointerEvents = "none";

    frame.appendChild(video);

    // Overlay
    const overlay = document.createElement("div");
    overlay.className = overlayClass;
    overlay.style.position = "absolute";
    overlay.style.inset = 0;
    overlay.style.display = "flex";
    overlay.style.alignItems = "flex-end";
    overlay.style.padding = "10px 12px";
    overlay.style.opacity = 0;
    overlay.style.transition = "opacity 0.25s ease";
    overlay.style.pointerEvents = "none";

    const title = document.createElement("div");
    title.className = titleClass;
    title.textContent = titleEl.textContent;
    title.style.position = "relative";
    title.style.zIndex = 2;
    title.style.fontSize = "14px";
    title.style.lineHeight = 1.3;
    title.style.color = "#fff";
    title.style.margin = 0;

    overlay.appendChild(title);
    frame.appendChild(overlay);

    // Hover playback
    item.addEventListener("mouseenter", () => {
      video.currentTime = 0;
      video.play();
      overlay.style.opacity = 1;
    });

    item.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
      overlay.style.opacity = 0;
    });

    item.dataset.videoAttached = "true";
  }

  function processPortfolio() {
    document.querySelectorAll(`${portfolioSelector} li`).forEach(setupPortfolioItem);
  }

  // Initial setup
  processPortfolio();

  // Observe mutations (for filtering)
  const observer = new MutationObserver(() => {
    processPortfolio();
  });

  const container = document.querySelector(portfolioSelector);
  if (container) {
    observer.observe(container, { childList: true, subtree: true });
  }
})();
