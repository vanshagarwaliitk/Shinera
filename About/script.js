const words = ["India.", "World.", "Universe.", "Multi-verse."];
const dynamicText = document.getElementById("dynamic-text");
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentWord = words[wordIndex];
  const displayedText = isDeleting
    ? currentWord.substring(0, charIndex--)
    : currentWord.substring(0, charIndex++);

  dynamicText.textContent = displayedText;

  if (!isDeleting && charIndex === currentWord.length) {
    // Pause before deleting
    setTimeout(() => (isDeleting = true), 1000);
  } else if (isDeleting && charIndex === 0) {
    // Move to the next word
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length; // Loop through words
  }

  const typingSpeed = isDeleting ? 50 : 100;
  setTimeout(type, typingSpeed);
}

// Start the typing effect
type();

//    Code for carousel working 
const carousel = document.querySelector(".slider");
const arrowBtns = document.querySelectorAll(".wrapper .sign");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
let isDragging = false, startX, startScrollLeft;
const carouselChildren = [...carousel.children];
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Clone the last few cards and prepend them to the beginning
carouselChildren.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Clone the first few cards and append them to the end
carouselChildren.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML); // Fixed "beforend" typo
});

// Arrow button functionality
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    });
});

// Drag start event
const dragStart = (e) => { // Added 'e' parameter
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
};

// Dragging event
const dragging = (e) => {
    if (!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

// Drag stop event
const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
};

// Infinite scroll functionality
const infiniteScroll = () => {
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);