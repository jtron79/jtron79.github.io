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
});
