document.addEventListener('DOMContentLoaded', () => {
	// Mobile Nav
	const hamburger = document.querySelector('.hamburger');
	const navLinks = document.querySelector('.nav-links');

	if (hamburger) {
		hamburger.addEventListener('click', () => {
			navLinks.classList.toggle('active');
		});
	}

	// Typewriter Effect Logic (Optional enhancement)
	const typeWriterElement = document.querySelector('.type-writer');
	if (typeWriterElement) {
		const words = ["Big Data", "Business Intelligence", "Raw Numbers", "SQL Queries"];
		let wordIndex = 0;
		let charIndex = 0;
		let isDeleting = false;

		function type() {
			const currentWord = words[wordIndex];

			if (isDeleting) {
				typeWriterElement.textContent = currentWord.substring(0, charIndex - 1);
				charIndex--;
			} else {
				typeWriterElement.textContent = currentWord.substring(0, charIndex + 1);
				charIndex++;
			}

			if (!isDeleting && charIndex === currentWord.length) {
				isDeleting = true;
				setTimeout(type, 2000); // Wait before deleting
			} else if (isDeleting && charIndex === 0) {
				isDeleting = false;
				wordIndex = (wordIndex + 1) % words.length;
				setTimeout(type, 500);
			} else {
				setTimeout(type, isDeleting ? 50 : 100);
			}
		}

		type(); // Start effect
	}
});