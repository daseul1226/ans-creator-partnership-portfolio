const revealItems = document.querySelectorAll("[data-reveal]");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -60px 0px",
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

const modal = document.getElementById("projectModal");
const modalImage = document.getElementById("projectModalImage");
const modalClose = document.getElementById("projectModalClose");
const imageTriggers = document.querySelectorAll(".project-image-trigger");

function closeModal() {
  modal.hidden = true;
  modal.setAttribute("aria-hidden", "true");
  modalImage.src = "";
  modalImage.alt = "";
  document.body.style.overflow = "";
}

function openModal(imageSrc, imageAlt) {
  modal.hidden = false;
  modal.setAttribute("aria-hidden", "false");
  modalImage.src = imageSrc;
  modalImage.alt = imageAlt;
  document.body.style.overflow = "hidden";
}

imageTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    openModal(trigger.dataset.image, trigger.dataset.alt);
  });
});

modal.addEventListener("click", (event) => {
  const shouldClose = event.target instanceof HTMLElement && event.target.dataset.closeModal === "true";

  if (shouldClose) {
    closeModal();
  }
});

modalClose.addEventListener("click", closeModal);

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) {
    closeModal();
  }
});
