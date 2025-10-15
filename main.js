document.addEventListener('DOMContentLoaded', () => {
    const navTabs = document.querySelectorAll('.nav-tab');
    const sections = document.querySelectorAll('section');

    const showSection = (targetId) => {
        sections.forEach(section => {
            if (section.id === targetId) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        });
    };

    // Show the Home section by default
    showSection('hero');

    navTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = tab.getAttribute('href').substring(1);
            showSection(targetId);

            navTabs.forEach(t => t.classList.remove('active-tab'));
            tab.classList.add('active-tab');

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    // --- Dynamic Modal Loading ---
    const projectModal = document.getElementById('projectModal');
    if (projectModal) {
        projectModal.addEventListener('show.bs.modal', async (event) => {
            // Button that triggered the modal
            const button = event.relatedTarget;
            // Get the URL from the data-modal-url attribute
            const modalUrl = button.getAttribute('data-modal-url');            
            const modalDialog = projectModal.querySelector('.modal-dialog');

            // Find the image URL from the card that was clicked
            const card = button.closest('.card');
            const img = card ? card.querySelector('.card-img-top') : null;
            const imageUrl = img ? img.src : '';

            // Show a simple loading state
            modalDialog.innerHTML = '<div class="modal-content bg-dark text-light p-5 text-center"><div class="spinner-border text-light" role="status"><span class="visually-hidden">Loading...</span></div></div>';

            try {
                const response = await fetch(modalUrl);
                const modalContent = await response.text();
                modalDialog.innerHTML = modalContent;

                // Apply the background image to the new modal header
                const modalHeader = modalDialog.querySelector('.modal-header');
                if (modalHeader && imageUrl) {
                    modalHeader.style.backgroundImage = `url('${imageUrl}')`;
                }
            } catch (error) {
                modalDialog.innerHTML = '<div class="modal-content bg-dark text-light p-5 text-center"><p class="text-danger">Error: Could not load case study.</p></div>';
            }
        });
    }

    /**
     * Secure Mailto Link
     * ------------------
     * Prevents email crawlers from scraping the email address by constructing
     * the mailto link dynamically with JavaScript on user click.
     */
    const emailBtn = document.getElementById('contact-email-btn');
    if (emailBtn) {
        emailBtn.addEventListener('click', function() {
            // --- Replace with your email details ---
            const user = 'jtron79';
            const domain = 'gmail.com';
            // -----------------------------------------

            // This opens the user's default email client
            window.location.href = `mailto:${user}@${domain}`;
        });
    }
});
