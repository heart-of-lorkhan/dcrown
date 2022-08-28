const detectCollision = (rect1, rect2) => {
  if (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  ) {
    return true;
  }

  return false;
};

export const scrollHeader = () => {
  const headerBlock = document.querySelector(".header");
  const header = document.querySelector(".header__top");
  const apply = document.getElementById("apply");
  const form = document.getElementById("form");
  const headerHeight = header.offsetHeight;
  let formRect = form.getBoundingClientRect();
  let applyRect = apply.getBoundingClientRect();
  let hasCollisionApply = detectCollision(applyRect, formRect);

  // add padding top to header because of fixed header
  headerBlock.style.paddingTop = `${headerHeight}px`;

  const hideOnCollision = (element, classname) =>
    element.classList.add(classname);
  const showOutOfCollision = (element, classname) =>
    element.classList.remove(classname);

  window.addEventListener("scroll", () => {
    let windowScrollY = window.scrollY;

    if (windowScrollY > headerHeight) {
      header.classList.add("has-scrolled");
    } else {
      header.classList.remove("has-scrolled");
    }
  });

  if (window.innerWidth < 769) {
    window.addEventListener("scroll", () => {
      setTimeout(function () {
        formRect = form.getBoundingClientRect();
        applyRect = apply.getBoundingClientRect();
        hasCollisionApply = detectCollision(applyRect, formRect);
        let scrolledToBottom = (window.innerHeight + window.scrollY) >= document.body.scrollHeight;

        if (hasCollisionApply) {
          hideOnCollision(apply, "animate__fadeOutDown");
          apply.classList.remove("no-focus");
        } else if (!scrolledToBottom) {
          showOutOfCollision(apply, "animate__fadeOutDown");
          apply.classList.add("no-focus");
        }
      }, 1000);
    });
  }
};

export default scrollHeader;
