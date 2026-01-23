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

	// Contact Form Handling
	const contactForm = document.getElementById('contact-form');
	const formMessages = document.getElementById('form-messages');

	if (contactForm) {
		contactForm.addEventListener('submit', async (e) => {
			e.preventDefault();

			// Get form data
			const formData = new FormData(contactForm);

			// Show loading state
			const submitButton = contactForm.querySelector('button[type="submit"]');
			const originalButtonText = submitButton.innerHTML;
			submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
			submitButton.disabled = true;

			try {
				// Submit form to Formspree
				const response = await fetch(contactForm.action, {
					method: 'POST',
					body: formData,
					headers: {
						'Accept': 'application/json'
					}
				});

				if (response.ok) {
					// Success
					formMessages.style.display = 'block';
					formMessages.style.padding = '1rem';
					formMessages.style.borderRadius = '8px';
					formMessages.style.backgroundColor = 'rgba(34, 197, 94, 0.1)';
					formMessages.style.border = '1px solid rgba(34, 197, 94, 0.3)';
					formMessages.style.color = '#22c55e';
					formMessages.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully. I\'ll get back to you soon.';
					
					// Reset form
					contactForm.reset();
				} else {
					// Error
					throw new Error('Form submission failed');
				}
			} catch (error) {
				// Error
				formMessages.style.display = 'block';
				formMessages.style.padding = '1rem';
				formMessages.style.borderRadius = '8px';
				formMessages.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
				formMessages.style.border = '1px solid rgba(239, 68, 68, 0.3)';
				formMessages.style.color = '#ef4444';
				formMessages.innerHTML = '<i class="fas fa-exclamation-circle"></i> Oops! Something went wrong. Please try again or email me directly at ahmedg1982@gmail.com.';
			} finally {
				// Restore button
				submitButton.innerHTML = originalButtonText;
				submitButton.disabled = false;

				// Hide message after 5 seconds
				setTimeout(() => {
					formMessages.style.display = 'none';
				}, 5000);
			}
		});
	}
});