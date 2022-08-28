export const heroVideo = () => {
  const intFrameWidth = window.innerWidth;
  const video = document.querySelector(".hero__video");
  const heroText = document.querySelector(".hero__text");

  if (intFrameWidth < 1025) {
    heroText.classList.add("animate__fadeInRightBig");
    heroText.classList.add("animate__animated");
    heroText.classList.add("animate__slow");
    return;
  }

  video.setAttribute("src", "video/video.mp4");

  video.play();

  video.addEventListener(
    "playing",
    function () {
      heroText.classList.add("animate__fadeInRightBig");
      heroText.classList.add("animate__animated");
      heroText.classList.add("animate__slow");
    },
    false
  );

  video.oncanplaythrough = function () {
    const videoDuration = parseInt((video.duration * 1000).toFixed()) - 1000;

    setTimeout(function () {
      video.classList.add("animate__fadeOut");
      video.classList.add("animate__animated");
    }, videoDuration);
  };
};

export default heroVideo;
