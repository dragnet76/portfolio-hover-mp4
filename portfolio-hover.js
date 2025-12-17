// portfolio-hover.js
(function() {
  const attachVideos = () => {
    document.querySelectorAll(".lessons-flex-container li").forEach(item => {
      if (item.dataset.mp4Attached) return; // skip already processed

      const link = item.querySelector("a[href*='/portfolio/v/']");
      const frame = item.querySelector(".grid-image");
      const titleEl = item.querySelector(".lesson-title");

      if (!link || !frame || !titleEl) return;

      const slug = link.getAttribute("href").split("/").pop().split("?")[0];
      const videoUrl = `/s/${slug}.mp4`;

      // Create video element
      const video = document.createElement("video");
      video.src = videoUrl;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = "metadata";
      video.className = "portfolio-hover-video";
      video.style.position = "absolute";
      video.style.inset = 0;
      video.style.width = "100%";
      video.style.height = "100%";
      video.style.objectFit = "cover";
      video.style.pointerEvents = "none";
      frame.appendChild(video);

      // Create overlay
      const overlay = document.createElement("div");
      overlay.className = "custom-video-overlay";
      overlay.style.position = "absolute";
      overlay.style.inset = 0;
      overlay.style.display = "flex";
      overlay.style.alignItems = "flex-end";
      overlay.style.padding = "10px 12px";
      overlay.style.opacity = 0;
      overlay.style.transition = "opacity 0.25s ease";
      overlay.style.pointerEvents = "none";

      const overlayBg = document.createElement("div");
      overlayBg.style.position = "absolute";
      overlayBg.style.inset = 0;
      overlayBg.style.background = "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0))";
      overlay.appendChild(overlayBg);

      const title = document.createElement("div");
      title.className = "custom-video-title";
      title.textContent = titleEl.textContent;
      title.style.position = "relative";
      title.style.zIndex = 2;
      title.style.fontSize = "14px";
      title.style.lineHeight = 1.3;
      title.style.color = "#fff";
      overlay.appendChild(title);

      frame.appendChild(overlay);

      // Hover
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

      item.dataset.mp4Attached = "true"; // mark as processed
    });
  };

  // Initial attach
  attachVideos();

  // Watch for filtering / DOM changes
  const container = document.querySelector(".lessons-flex-container");
  if (container) {
    const observer = new MutationObserver(attachVideos);
    observer.observe(container, { childList: true, subtree: true });
  }
})();
