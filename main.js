document.addEventListener("DOMContentLoaded", function () {
  const typedText = document.querySelector(".multiple-text");
  const words = ["Frontend Developer", "UI/UX Designer", "Designer", "Freelancer"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      typedText.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedText.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 80 : 150;

    if (!isDeleting && charIndex === currentWord.length) {
      speed = 1000; // rukne ka time jab word pura likh jaaye
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      speed = 500;
    }

    setTimeout(typeEffect, speed);
  }

  typeEffect();
});