(function() {
  const containerSelector = ".lessons-flex-container"; // Portfolio container
  const itemSelector = "li"; // Each portfolio item

  function setupPortfolioItem(item) {
    // Avoid re-initializing
    if (item.dataset.videoSetup) return;
    item.dataset.videoSetup = "true";

    const link = item.querySelector("a[href*='/portfolio/v/']");
    const frame = item.querySelector(".grid-image");
    const titleEl = item.querySelector(".lesson-title");

    if (!link || !frame || !titleEl) return;

    const slug = link.getAttribute("href").split("/").pop();
    const videoUrl = `https://tangerine-onion-tt22.squarespace.com/s/${slug}.mp4`;

    // Hide original image
    const originalImg = item.querySelector(".grid-item-image");
    if (originalImg) originalImg.style.display = "none";

    // Video element
    const video = document.createElement("video");
    video.src = videoUrl;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = "metadata";
    video.className = "portfolio-hover-video";
    video.style.position = "absolute";
    video.style.inset = "0";
    video.style.width = "100%";
    video.style.height = "100%";
    video.style.objectFit = "cover";
    video.style.pointerEvents = "none";
    frame.appendChild(video);

    // Overlay
    const overlay = document.createElement("div");
    overlay.className = "custom-video-overlay";
    overlay.style.position = "absolute";
    overlay.style.inset = "0";
    overlay.style.display = "flex";
    overlay.style.alignItems = "flex-end";
    overlay.style.padding = "10px 12px";
    overlay.style.opacity = "0";
    overlay.style.transition = "opacity 0.25s ease";
    overlay.style.pointerEvents = "none";

    const overlayBg = document.createElement("div");
    overlayBg.style.position = "absolute";
    overlayBg.style.inset = "0";
    overlayBg.style.background = "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0))";
    overlay.appendChild(overlayBg);

    const title = document.createElement("div");
    title.className = "custom-video-title";
    title.textContent = titleEl.textContent;
    title.style.position = "relative";
    title.style.zIndex = "2";
    title.style.fontSize = "14px";
    title.style.lineHeight = "1.3";
    title.style.color = "#fff";
    overlay.appendChild(title);

    frame.appendChild(overlay);

    // Hover behavior
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
  }

  function initializePortfolio() {
    const items = document.querySelectorAll(`${containerSelector} ${itemSelector}`);
    items.forEach(setupPortfolioItem);
  }

  // Initial load
  document.addEventListener("DOMContentLoaded", () => {
    initializePortfolio();

    // Observe changes in the portfolio container (e.g., filtering)
    const container = document.querySelector(containerSelector);
    if (container) {
      const observer = new MutationObserver(() => {
        initializePortfolio();
      });
      observer.observe(container, { childList: true, subtree: true });
    }
  });
})();
