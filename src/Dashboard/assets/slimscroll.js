export function SlimScroll(element, options) {
  const defaults = {
    width: "auto",
    height: "100vh",
    size: "5px",
    color: "#000",
    position: "right",
    distance: "1px",
    start: "top",
    opacity: 0.4,
    alwaysVisible: true,
    disableFadeOut: false,
    railVisible: false,
    railColor: "#333",
    railOpacity: 0.2,
    railDraggable: true,
    borderRadius: "7px",
    railBorderRadius: "7px",
    allowPageScroll: false,
    wheelStep: 500,
    touchScrollStep: 500,
    scrollSpeed: 800, // Duration of smooth scrolling in milliseconds
  };

  const settings = { ...defaults, ...options };
  const container = element;
  let bar, rail, isDragging = false, startPageY, startTop;

  function init() {
    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";
    wrapper.style.overflow = "hidden";
    wrapper.style.width = settings.width;
    wrapper.style.height = settings.height;

    container.parentNode.insertBefore(wrapper, container);
    wrapper.appendChild(container);

    rail = document.createElement("div");
    rail.style.width = settings.size;
    rail.style.height = "100%";
    rail.style.position = "absolute";
    rail.style.top = "0";
    rail.style.display = settings.alwaysVisible && settings.railVisible ? "block" : "none";
    rail.style.background = settings.railColor;
    rail.style.opacity = settings.railOpacity;
    rail.style.borderRadius = settings.railBorderRadius;
    rail.style[settings.position] = settings.distance;
    wrapper.appendChild(rail);

    bar = document.createElement("div");
    bar.style.background = settings.color;
    bar.style.width = settings.size;
    bar.style.position = "absolute";
    bar.style.top = "0";
    bar.style.opacity = settings.opacity;
    bar.style.display = settings.alwaysVisible ? "block" : "none";
    bar.style.borderRadius = settings.borderRadius;
    bar.style.cursor = "pointer";
    bar.style.transition = `top ${settings.scrollSpeed}ms ease-out`; // Smooth transition for the scrollbar
    bar.style[settings.position] = settings.distance;
    wrapper.appendChild(bar);

    container.style.overflow = "hidden";
    container.style.width = settings.width;
    container.style.height = settings.height;

    updateBarHeight();
    attachEvents();
  }

  function updateBarHeight() {
    const ratio = container.offsetHeight / container.scrollHeight;
    const barHeight = Math.max(ratio * container.offsetHeight, 30);
    bar.style.height = barHeight + "px";

    if (ratio === 1) {
      bar.style.display = "none";
      rail.style.display = "none";
    } else {
      bar.style.display = "block";
      rail.style.display = settings.railVisible ? "block" : "none";
    }
  }

  function scrollTo(newScrollTop) {
    const start = container.scrollTop;
    const change = newScrollTop - start;
    const startTime = performance.now();

    function animateScroll(currentTime) {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / settings.scrollSpeed, 1);
      const easedProgress = easeOutCubic(progress);

      container.scrollTop = start + change * easedProgress;

      // Update scrollbar position
      const barTop = (container.scrollTop / container.scrollHeight) * container.offsetHeight;
      bar.style.top = barTop + "px";

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    }

    requestAnimationFrame(animateScroll);
  }

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function attachEvents() {
    container.addEventListener("wheel", (e) => {
      const delta = e.deltaY > 0 ? settings.wheelStep : -settings.wheelStep;
      const newScrollTop = Math.min(
        Math.max(container.scrollTop + delta, 0),
        container.scrollHeight - container.offsetHeight
      );
      scrollTo(newScrollTop);
      e.preventDefault();
    });

    bar.addEventListener("mousedown", (e) => {
      isDragging = true;
      startPageY = e.pageY;
      startTop = bar.offsetTop;
      document.addEventListener("mousemove", onDrag);
      document.addEventListener("mouseup", () => {
        isDragging = false;
        document.removeEventListener("mousemove", onDrag);
      });
      e.preventDefault();
    });

    container.addEventListener("touchstart", (e) => {
      if (e.touches.length) {
        startPageY = e.touches[0].pageY;
      }
    });

    container.addEventListener("touchmove", (e) => {
      if (e.touches.length) {
        const delta = (startPageY - e.touches[0].pageY) / settings.touchScrollStep;
        const newScrollTop = Math.min(
          Math.max(container.scrollTop + delta, 0),
          container.scrollHeight - container.offsetHeight
        );
        scrollTo(newScrollTop);
        startPageY = e.touches[0].pageY;
        e.preventDefault();
      }
    });

    window.addEventListener("resize", updateBarHeight);
  }

  function onDrag(e) {
    if (!isDragging) return;
    const delta = e.pageY - startPageY;
    const newTop = Math.min(Math.max(startTop + delta, 0), container.offsetHeight - bar.offsetHeight);
    bar.style.top = newTop + "px";
    const percent = newTop / (container.offsetHeight - bar.offsetHeight);
    scrollTo(percent * (container.scrollHeight - container.offsetHeight));
    e.preventDefault();
  }

  init();
}
