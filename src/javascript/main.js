"use strict";
(function () {
  function getTarget(elem, className) {
    for (; !elem.classList.contains(className); )
      if (((elem = elem.parentNode), "BODY" == elem.nodeName))
        return void (elem = null);
    return elem;
  }

  function initCanvas() {
    setSize();

    context.drawImage(imgElem, imgX, imgY, imgWidth, imgHeight);
    imgData =
      scale >= 2
        ? context.getImageData(imgX, imgY, canvas.width, canvas.height)
        : context.getImageData(imgX, imgY, innerWidth, imgHeight);

    particles = [];

    for (var y = 0; y < imgData.height; y++) {
      for (var x = 0; x < imgData.width; x++) {
        if (
          128 < imgData.data[4 * x * scale + 4 * y * scale * imgData.width + 3]
        ) {
          var _particle = {
            color:
              "rgb(" +
              imgData.data[4 * x * scale + 4 * y * scale * imgData.width] +
              ", " +
              imgData.data[4 * x * scale + 4 * y * scale * imgData.width + 1] +
              ", " +
              imgData.data[4 * x * scale + 4 * y * scale * imgData.width + 2] +
              ")",
            x: x + imgX / scale,
            y: y + imgY / scale,
            originX: x + imgX / scale,
            originY: y + imgY / scale,
            easeValue: 3 * Math.random(),
            radian: (360 * Math.random() * Math.PI) / 180,
          };
          particles.push(_particle);
        }
      }
    }
  }

  function setSize() {
    scale = Math.floor(window.devicePixelRatio);

    canvas.style.width = innerWidth + "px";
    canvas.style.height = innerHeight + "px";

    canvas.width = Math.floor(innerWidth * scale);
    canvas.height = Math.floor(innerHeight * scale);
    context.scale(scale, scale);

    maxScrollHeight = document.body.offsetHeight;

    769 > innerWidth
      ? ((divValue = 40), (ratio = 1.25), (minParticleSize = innerWidth / 25))
      : ((divValue = 120), (minParticleSize = innerWidth / 45), (ratio = 1.6));

    imgWidth = innerWidth / ratio;
    imgWidth > 800 && (imgWidth = 900);
    imgHeight = (imgWidth * imgElem.height) / imgElem.width;
    imgX = innerWidth / 2 - imgWidth / 2;
    imgY = 0.24 * imgHeight;

    allElem.style.cssText = "margin-top: " + (2 * imgY + imgHeight) + "px;";
  }

  function scrollHandler() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    particleSize = 0.025 * pageYOffset;
    particleSize < minParticleSize && (particleSize = minParticleSize);

    for (var i = 0; i < particles.length; i++) {
      0 == i % divValue &&
        ((particle = particles[i]),
        (particle.x =
          particle.originX +
          Math.cos(particle.radian) *
            pageYOffset *
            (pageYOffset / maxScrollHeight) *
            particle.easeValue),
        (particle.y =
          particle.originY +
          Math.sin(particle.radian) *
            pageYOffset *
            (pageYOffset / maxScrollHeight) *
            particle.easeValue),
        (context.fillStyle = particle.color),
        context.fillRect(particle.x, particle.y, particleSize, particleSize),
        50 < pageYOffset &&
          ((context.strokeStyle = "rgb(71, 73, 77)"),
          context.strokeRect(
            particle.x,
            particle.y,
            particleSize,
            particleSize
          )));
    }

    10 > pageYOffset &&
      (context.clearRect(0, 0, canvas.width, canvas.height),
      context.drawImage(imgElem, imgX, imgY, imgWidth, imgHeight));
  }

  function scrollToTop() {
    const scrollTopBtn = document.querySelector(".scroll-top");
    let htmlScrollTop = void 0;

    scrollTopBtn &&
      ((htmlScrollTop = document.querySelector("html").scrollTop),
      htmlScrollTop > 100
        ? scrollTopBtn.classList.add("btn-active")
        : scrollTopBtn.classList.remove("btn-active"));
  }

  const canvas = document.querySelector(".canvas"),
    context = canvas.getContext("2d"),
    allElem = document.querySelector(".all"),
    imgElem = new Image();

  let imgData = void 0,
    imgX = void 0,
    imgY = void 0,
    imgWidth = void 0,
    imgHeight = void 0,
    scale = void 0,
    ratio = void 0,
    particles = [],
    particle = void 0,
    maxScrollHeight = void 0,
    minParticleSize = void 0;

  imgElem.src = "/src/images/main-illust.png";
  imgElem.addEventListener("load", function () {
    allElem.classList.remove("before-start");
    initCanvas();
  });

  var particleSize = void 0,
    divValue = 100;

  addEventListener("resize", initCanvas);
  addEventListener("scroll", function () {
    scrollHandler();
    scrollToTop();
  });

  allElem.addEventListener("click", function (e) {
    const target = e.target,
      viewDetail = getTarget(target, "view-detail"),
      closeStickerModal = getTarget(target, "close-modal"),
      scrollTop = getTarget(target, "scroll-top");

    let parentElem = void 0;

    viewDetail &&
      ((parentElem = viewDetail.parentNode),
      parentElem.classList.contains("session-active")
        ? (parentElem.classList.remove("session-active"),
          (viewDetail.innerHTML = "채용 공고 바로가기"),
          769 > innerWidth &&
            scrollTo(0, parentElem.offsetTop + 0.2 * innerHeight))
        : (parentElem.classList.add("session-active"),
          (viewDetail.innerHTML = "접기")));

    closeStickerModal &&
      ((parentElem = closeStickerModal.parentNode.parentNode),
      parentElem.classList.contains("active")
        ? parentElem.classList.remove("active")
        : "");

    scrollTop && window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  });
})();
