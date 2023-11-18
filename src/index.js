import "./index.scss";

const contentReferences = [
  ...document.querySelectorAll("div.content-slider > div.contents > *"),
];

const dotContainer = document.querySelector(
  "div.content-slider > div.dot-navigator",
);

const dotReferences = contentReferences.map((item, index) => {
  const dot = document.createElement("button");
  dot.classList.add("dot");
  dot.dataset.index = index;
  return dotContainer.appendChild(dot);
});

const reflect = (function Reflector() {
  let currContentIndex = 0;

  function hideContent() {
    contentReferences[currContentIndex].classList.add("hide");
    dotReferences[currContentIndex].classList.remove("selected");
  }

  function showContent() {
    contentReferences[currContentIndex].classList.remove("hide");
    dotReferences[currContentIndex].classList.add("selected");
  }

  function setContentIndex(index) {
    hideContent();
    currContentIndex = index;
    showContent();
  }

  contentReferences.forEach((item) => {
    item.classList.add("hide");
  });

  return setContentIndex;
})();

const pointer = (function Logic() {
  const numContent = contentReferences.length;
  let pointerIndex = 0;
  let intervalID = null;

  function pushChanges() {
    reflect(pointerIndex);
  }

  function internalIncrementPointer() {
    pointerIndex = (pointerIndex + 1) % numContent;
    pushChanges();
  }

  function internalDecrementPointer() {
    pointerIndex = (pointerIndex - 1 + numContent) % numContent;
    pushChanges();
  }

  function internalSetPointerTo(index) {
    pointerIndex = index;
    pushChanges();
  }

  function relaunchTimer() {
    clearInterval(intervalID);
    intervalID = setInterval(internalIncrementPointer, 5000);
  }

  function incrementPointer() {
    internalIncrementPointer();
    relaunchTimer();
  }

  function decrementPointer() {
    internalDecrementPointer();
    relaunchTimer();
  }

  function setPointerTo(index) {
    internalSetPointerTo(index);
    relaunchTimer();
  }

  function getNumImages() {
    return numContent;
  }

  pushChanges();
  relaunchTimer();
  return { incrementPointer, decrementPointer, setPointerTo, getNumImages };
})();

(function Controller() {
  const showNext = document.querySelector("button.show-next");
  const showPrev = document.querySelector("button.show-previous");

  showNext.addEventListener("click", () => {
    pointer.incrementPointer();
  });

  showPrev.addEventListener("click", () => {
    pointer.decrementPointer();
  });

  dotContainer.addEventListener("click", (e) => {
    if (!e.target.matches("button.dot")) return;

    pointer.setPointerTo(e.target.dataset.index);
  });
})();
