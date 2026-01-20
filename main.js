document.addEventListener('DOMContentLoaded', () => {
    console.log('TriageAI Website Loaded');

    // Modal Elements
    const chatModal = document.getElementById('chat-modal');
    const openBtns = [document.getElementById('nav-demo-btn'), document.getElementById('hero-demo-btn')];
    const closeBtn = document.getElementById('close-chat-btn');

    // Open Modal
    openBtns.forEach(btn => {
        if(btn) {
            btn.addEventListener('click', () => {
                chatModal.classList.remove('hidden');
                chatModal.classList.add('visible');
            });
        }
    });

    // Close Modal
    if(closeBtn) {
        closeBtn.addEventListener('click', () => {
            chatModal.classList.remove('visible');
            setTimeout(() => {
                chatModal.classList.add('hidden');
            }, 300); // Wait for transition
        });
    }

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
