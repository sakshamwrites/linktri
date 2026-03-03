// Tilt Effect for Link Items
document.addEventListener("DOMContentLoaded", () => {
    const tiltElements = document.querySelectorAll('.tilt-element');

    // Add 3D tilt effect on mousemove for desktops
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element

            // Calculate rotation based on cursor position
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Max rotation degree
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px) scale(1.02)`;
        });

        // Reset elements on mouse leave
        element.addEventListener('mouseleave', () => {
            element.style.transform = '';
        });
    });

    // Share Button Logic
    const shareBtn = document.getElementById('shareBtn');
    const toast = document.getElementById('toast');

    shareBtn.addEventListener('click', () => {
        // Create dummy URL representing the profile
        const profileUrl = window.location.href;

        // Copy to clipboard
        navigator.clipboard.writeText(profileUrl).then(() => {
            showToast();
        }).catch(err => {
            console.error('Failed to copy: ', err);
            // Fallback for older browsers
            showToast('Unable to copy automatically.');
        });
    });

    function showToast(message) {
        if (message) {
            toast.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${message}`;
        } else {
            toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> Link copied to clipboard!`;
        }

        toast.classList.add('show');

        // Hide after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
});
