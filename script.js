document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTS ---
    const introOverlay = document.getElementById('intro-overlay');
    const skipBtn = document.getElementById('skip-btn');
    const mainContent = document.getElementById('main-content');
    const introVideo = document.getElementById('intro-video');

    const viewMenuBtn = document.getElementById('view-menu-btn');
    const menuViewer = document.getElementById('menu-viewer');
    const optionBtns = document.querySelectorAll('.menu-option-btn');
    const whatsappBtn = document.getElementById('whatsapp-btn');

    // --- CONFIGURATION ---
    // ¡REEMPLAZA ESTE NÚMERO CON TU TELÉFONO DE WHATSAPP REAL! (ej. 34600112233 para España +34)
    const WHATSAPP_PHONE = '34638545256'; 
    let selectedMenu = ''; // Holds 'Carne' or 'Pescado'

    // --- INTRO TRANSITION ---
    function revealInvitation() {
        // Fade out overlay
        introOverlay.style.opacity = '0';
        // Wait for CSS fade-out transition, then hide elements
        setTimeout(() => {
            introOverlay.classList.add('hidden');
            mainContent.classList.remove('hidden');
            mainContent.style.opacity = '0';
            mainContent.style.transition = 'opacity 0.8s ease-in-out';
            // Force reflow
            mainContent.offsetHeight;
            mainContent.style.opacity = '1';
        }, 1000);
        
        // Pause video to save resources
        introVideo.pause();
    }

    // Skip button clicks
    skipBtn.addEventListener('click', revealInvitation);

    // Unmute button clicks to bypass browser autoplay sound block
    const unmuteBtn = document.getElementById('unmute-btn');
    if (unmuteBtn) {
        unmuteBtn.addEventListener('click', () => {
            if (introVideo.muted) {
                introVideo.muted = false;
                unmuteBtn.innerHTML = 'Silenciar 🔇';
            } else {
                introVideo.muted = true;
                unmuteBtn.innerHTML = 'Activar Sonido 🔊';
            }
        });
    }

    // Auto-reveal when video ends (if it plays fully)
    introVideo.addEventListener('ended', revealInvitation);

    // If video fails to play or load, make sure the user can click
    introVideo.addEventListener('error', () => {
        console.log('Video error. Habilitando entrada.');
    });

    // --- MENU TOGGLE ---
    viewMenuBtn.addEventListener('click', () => {
        menuViewer.classList.toggle('show');
        if (menuViewer.classList.contains('show')) {
            viewMenuBtn.textContent = 'Ocultar Menú';
            // Smooth scroll to menu image
            setTimeout(() => {
                menuViewer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 300);
        } else {
            viewMenuBtn.textContent = 'Ver Menú Completo';
        }
    });

    // --- PREFERENCE SELECTOR & WHATSAPP GENERATOR ---
    function updateWhatsAppLink() {
        let baseMsg = '¡Hola! Confirmo mi asistencia al bautizo de Leo el 19/09/2026.';
        if (selectedMenu) {
            baseMsg += ` Mi preferencia de menú es: *${selectedMenu}*.`;
        }
        
        const encodedMsg = encodeURIComponent(baseMsg);
        whatsappBtn.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMsg}`;
    }

    optionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove selection from others
            optionBtns.forEach(b => b.classList.remove('selected'));
            
            // Add selection to clicked
            btn.classList.add('selected');
            selectedMenu = btn.getAttribute('data-choice');
            
            // Highlight selected button & update link
            updateWhatsAppLink();
        });
    });

    // Initialize WhatsApp button link
    updateWhatsAppLink();
});
