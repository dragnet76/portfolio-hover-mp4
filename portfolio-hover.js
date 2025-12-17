// ====== Inject necessary CSS ======
const style = document.createElement('style');
style.textContent = `
.lessons-flex-container .grid-image {
  position: relative !important;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}
.lessons-flex-container .grid-item-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.lessons-flex-container video.portfolio-hover-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}
.lessons-flex-container .grid-meta-wrapper,
.lessons-flex-container .lessons-grid-meta-container {
  display: none !important;
  height: 0 !important;
}
.custom-video-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  padding: 10px 12px;
  opacity: 0;
  transition: opacity 0.25s ease;
  pointer-events: none;
}
.custom-video-overlay::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0));
}
.custom-video-title {
  position: relative;
  z-index: 2;
  font-size: 14px;
  line-height: 1.3;
  color: #fff;
  margin: 0;
}
.lessons-flex-container li:hover .custom-video-overlay {
  opacity: 1;
}
`;
document.head.appendChild(style);

// ====== Function to attach video + overlay to a portfolio item ======
function attachVideo(item) {
  if (item.dataset.videoAttached) return; // Prevent double attachment
  const link = item.querySelector("a[href*='/portfolio/v/']");
  const frame = item.querySelector(".grid-image");
  const titleEl = item.querySelector(".lesson-title");

  if (!link || !frame || !titleEl) return;

  const slug = link.getAttribute("href").split("/").pop();
  const videoUrl = `/s/${slug}.mp4`;

  // Video element
  const video = document.createElement("video");
  video.src = videoUrl;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.preload = "metadata";
  video.className = "portfolio-hover-video";
  frame.appendChild(video);

  // Custom overlay
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

  item.dataset.videoAttached = "true"; // mark as attached
}

// ====== Apply to all current items ======
function attachAllVideos() {
  document.querySelectorAll(".lessons-flex-container li").forEach(attachVideo);
}

// ====== Observe portfolio container for filtered / re-ordered items ======
const container = document.querySelector(".lessons-flex-container");
if (container) {
  const observer = new MutationObserver(() => {
    attachAllVideos();
  });
  observer.observe(container, { childList: true, subtree: true });
}

// ====== Initial attachment ======
document.addEventListener("DOMContentLoaded", attachAllVideos);
