// portfolio-hover.js
(function() {
  const attachVideos = (container) => {
    container.querySelectorAll("li.grid-item").forEach(item => {
      if (item.querySelector("video.portfolio-hover-video")) return; // already processed

      const link = item.querySelector("a[href*='/portfolio/v/']");
      const frame = item.querySelector(".grid-image");
      const titleEl = item.querySelector(".lesson-title");

      if (!link || !frame || !titleEl) return;

      const slug = link.getAttribute("href").split("/").pop();
      const videoUrl = `/s/${slug}.mp4`;

      // Add video
      const video = document.createElement("video");
      video.src = videoUrl;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = "metadata";
      video.className = "portfolio-hover-video";
      frame.appendChild(video);

      // Add overlay
      const overlay = document.createElement("div");
      overlay.className = "custom-video-overlay";

      const title = document.createElement("div");
      title.className = "custom-video-title";
      title.textContent = titleEl.textContent;

      overlay.appendChild(title);
      frame.appendChild(overlay);

      // Hover playback
      item.addEventListener("mouseenter", () => {
        video.currentTime = 0;
        video.play();
      });
      item.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0;
      });
    });
  };

  const container = document.querySelector(".lessons-flex-container");

  if (!container) return;

  // Initial attach
  attachVideos(container);

  // Observe dynamically added items (filtering)
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === 1 && node.matches("li.grid-item")) {
          attachVideos(node.parentNode); // re-run on the parent
        }
      });
    });
  });

  observer.observe(container, { childList: true, subtree: true });
})();
