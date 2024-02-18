document.addEventListener('DOMContentLoaded', () => {
    const faders = document.querySelectorAll('.fade-in');

    const appearOnScroll = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    });

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});

document.addEventListener('scroll', function() {
    const parallaxBackground = document.querySelector('.parallax-background');
    const scrollPosition = window.scrollY;
    parallaxBackground.style.backgroundPositionY = -(scrollPosition * 0.5) + 'px';
});