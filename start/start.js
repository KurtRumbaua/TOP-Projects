document.addEventListener('DOMContentLoaded', function() {
    const textElement = document.getElementById('typing-text');
    const startButton = document.getElementById('start-button');
    const words = ["Rock.", "Paper.", "Scissors."];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;
    
    function typeEffect() {
        const currentWord = words[wordIndex];
        
        // Set typing speed based on action
        if (isDeleting) {
            typingSpeed = 100;
        } else {
            typingSpeed = 150;
        }
        
        // Add or remove characters
        if (!isDeleting && charIndex <= currentWord.length) {
            textElement.textContent = currentWord.substring(0, charIndex);
            charIndex++;
        } else if (isDeleting && charIndex >= 0) {
            textElement.textContent = currentWord.substring(0, charIndex);
            charIndex--;
        }
        
        // Change direction and word after completing or deleting
        if (!isDeleting && charIndex > currentWord.length) {
            isDeleting = true;
            typingSpeed = 800; // Pause before starting to delete
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before typing next word
        }
        
        setTimeout(typeEffect, typingSpeed);
    }
    
    // Start the typing effect
    typeEffect();
    
    // Set up the start button click
    startButton.addEventListener('click', function() {
        window.location.href = '../index/index.html';
    });
});