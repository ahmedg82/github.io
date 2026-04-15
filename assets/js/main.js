document.addEventListener('DOMContentLoaded', () => {
	// Mobile Nav
	const hamburger = document.querySelector('.hamburger');
	const navLinks = document.querySelector('.nav-links');

	if (hamburger) {
		hamburger.addEventListener('click', () => {
			navLinks.classList.toggle('active');
		});
	}

	if (navLinks) {
		navLinks.querySelectorAll('a').forEach((link) => {
			link.addEventListener('click', () => {
				navLinks.classList.remove('active');
			});
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

	const caseStudyModal = document.getElementById('case-study-modal');
	const caseStudyButtons = document.querySelectorAll('.case-study-btn');
	const modalTitle = document.getElementById('case-study-title');
	const modalSummary = document.getElementById('case-study-summary');
	const modalChallenge = document.getElementById('case-study-challenge');
	const modalSolution = document.getElementById('case-study-solution');
	const modalOutcome = document.getElementById('case-study-outcome');
	const modalTools = document.getElementById('case-study-tools');
	const modalLink = document.getElementById('case-study-link');
	let lastTrigger = null;

	function closeCaseStudy() {
		if (!caseStudyModal) {
			return;
		}

		caseStudyModal.classList.remove('is-open');
		caseStudyModal.setAttribute('aria-hidden', 'true');
		document.body.style.overflow = '';

		if (lastTrigger) {
			lastTrigger.focus();
		}
	}

	function openCaseStudy(projectData, trigger) {
		if (!caseStudyModal) {
			return;
		}

		lastTrigger = trigger;
		modalTitle.textContent = projectData.title;
		modalSummary.textContent = projectData.summary;
		modalChallenge.textContent = projectData.challenge;
		modalSolution.textContent = projectData.solution;
		modalOutcome.textContent = projectData.outcome;
		modalLink.href = projectData.link;
		modalTools.innerHTML = '';

		projectData.tools.forEach((tool) => {
			const tag = document.createElement('span');
			tag.className = 'tag';
			tag.textContent = `#${tool.replace(/\s+/g, '')}`;
			modalTools.appendChild(tag);
		});

		caseStudyModal.classList.add('is-open');
		caseStudyModal.setAttribute('aria-hidden', 'false');
		document.body.style.overflow = 'hidden';
		caseStudyModal.querySelector('.case-study-close').focus();
	}

	caseStudyButtons.forEach((button) => {
		button.addEventListener('click', () => {
			const card = button.closest('.project-card');
			const projectData = JSON.parse(card.dataset.caseStudy);
			openCaseStudy(projectData, button);
		});
	});

	if (caseStudyModal) {
		caseStudyModal.querySelectorAll('[data-close-modal]').forEach((element) => {
			element.addEventListener('click', closeCaseStudy);
		});

		document.addEventListener('keydown', (event) => {
			if (event.key === 'Escape' && caseStudyModal.classList.contains('is-open')) {
				closeCaseStudy();
			}
		});
	}
});

// CV Download Function - Opens CV page and triggers print dialog for PDF save
function downloadCV() {
	// Open cv.html in a new window
	const cvWindow = window.open('cv.html', '_blank');
	
	// Wait for the page to load, then trigger print dialog
	if (cvWindow) {
		cvWindow.addEventListener('load', function() {
			setTimeout(() => {
				cvWindow.print();
			}, 500);
		});
	}
}
