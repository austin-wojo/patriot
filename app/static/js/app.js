const { createApp } = Vue;

const NavBar = {
    template: `
    <header>
        <div id="main-nav">
            <a class="brand" href="#hero"><span class="brand-star">&#9733;</span> Robert M. Sitarski</a>
            <nav>
                <ul>
                    <li><a href="#hero">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#policies">Policies</a></li>
                    <li><a class="nav-donate" href="https://buy.stripe.com/9AQ5nU42L6Pq4uc7ss">Donate</a></li>
                </ul>
            </nav>
        </div>
    </header>
    `
};

const HeroSection = {
    props: ['src'],
    template: `
    <section id="hero" class="hero">
        <div class="container hero-inner">
            <img :src="src" alt="Campaign emblem: an open book before the American flag" class="hero-image">
            <h1 class="hero-title">Robert M. Sitarski</h1>
            <div class="hero-rule" role="presentation"></div>
            <p class="hero-subtitle">Candidate for Oshtemo Township Supervisor</p>

            <div class="hero-actions">
                <a class="btn btn-primary" href="https://buy.stripe.com/9AQ5nU42L6Pq4uc7ss">Donate Now</a>
                <a class="video-link" href="https://www.youtube.com/watch?v=-KoXt9pZLGM" target="_blank" rel="noopener">
                    <span class="video-play" aria-hidden="true">&#9654;</span>
                    <span class="video-text">
                        <strong>God Bless The U.S.A.</strong>
                        <small>Lee Greenwood &middot; watch on YouTube</small>
                    </span>
                </a>
            </div>

            <div class="quotes-grid">
                <blockquote class="quote-card">
                    <p>&ldquo;We mutually pledge to each other our lives, our fortunes, and our sacred honour.&rdquo;</p>
                    <cite>Thomas Jefferson</cite>
                </blockquote>
                <blockquote class="quote-card">
                    <p>&ldquo;Duty is ours; results are God's&rdquo;</p>
                    <cite>John Quincy Adams</cite>
                </blockquote>
            </div>
        </div>
    </section>
    `
};

const AboutSection = {
    template: `
    <section id="about" class="about-section">
        <div class="container">
            <p class="eyebrow">Get to know</p>
            <h2>About</h2>
            <div class="about-grid">
                <figure class="about-portrait">
                    <img src="static/images/portrait.jpg" alt="Portrait of Robert M. Sitarski">
                </figure>
                <div class="about-content">
                    <p>Candidate for Oshtemo Township Supervisor. <br> BS Public Administration, CMU, 2003 <br> Master&rsquo;s coursework in Public Administration, WMU, 2010-2012.</p>
                    <p>Voluntary Probation Officer, 16th Dist. Court, Livonia, MI 1997-2007 <br>Certified Supplier Quality Engineer, 2002. Career in automotive quality 25 years.<br> Married 20 years and have three stepchildren.<br> Constitutional Coach Patriot Academy since 2023 <br> NFIB member 2024 <br> I have been a Kalamazoo County resident since 2007. I'm a recovered alcoholic with 32 years of continuous sobriety.</p>
                </div>
            </div>
            <div class="contact-card">
                <h3>Get in touch</h3>
                <ul class="contact-list">
                    <li><span class="contact-label">Mail</span> P.O. Box 136 Oshtemo, MI. 49097</li>
                    <li><span class="contact-label">Email</span> <a href="mailto:rsitar5@gmail.com">rsitar5@gmail.com</a></li>
                    <li><span class="contact-label">Phone</span> <a href="tel:+12692209114">269-220-9114</a></li>
                    <li><span class="contact-label">Web</span> <a href="http://cterobertmsitarski.com/" target="_blank" rel="noopener">cterobertmsitarski.com</a></li>
                    <li><span class="contact-label">Facebook</span> <a href="http://www.facebook.com/rob.sitarski" target="_blank" rel="noopener">www.facebook.com/rob.sitarski</a></li>
                </ul>
                <p class="contact-tagline">Quality Engineer</p>
            </div>
        </div>
    </section>
    `
};

const PoliciesSection = {
    template: `
    <section id="policies" class="policies-section">
        <div class="container">
            <p class="eyebrow">Where I stand</p>
            <h2>Policies</h2>
            <div class="policies-grid">
                <div class="policy-card">
                    <span class="policy-chip"><img src="static/icons/voting.svg" alt="" class="policy-icon"></span>
                    <h3>Restoring Voting Rights</h3>
                    <p>To address Oshtemo resident&rsquo;s voting rights. The ability to vote for board appointments and bond proposals has been suppressed. It is imperative to restore the Supervisor to a public servant and have public issues decided by resident vote.</p>
                </div>
                <div class="policy-card">
                    <span class="policy-chip"><img src="static/icons/law.svg" alt="" class="policy-icon"></span>
                    <h3>Strengthening Law Enforcement</h3>
                    <p>Kalamazoo County is a sanctuary county. I will work with the sheriff to develop a stronger law enforcement strategy to ensure Oshtemo resident's safety.</p>
                </div>
                <div class="policy-card">
                    <span class="policy-chip"><img src="static/icons/sewer.svg" alt="" class="policy-icon"></span>
                    <h3>Sewer Expansion</h3>
                    <p>To finish the sewer expansion project. I will resolve the sewer issue swiftly through resident input and project review.</p>
                </div>
                <div class="policy-card">
                    <span class="policy-chip"><img src="static/icons/skills.svg" alt="" class="policy-icon"></span>
                    <h3>Talents, Skills, and Experiences</h3>
                    <p>I possess excellent communication skills. This ability to relay ideas and negotiate is essential to perform the functions of the Township Supervisor. My experience in automotive manufacturing has given me a problem-solving and process-oriented skill set.</p>
                </div>
            </div>
        </div>
    </section>
    `
};

const DonateSection = {
    template: `
    <section id="donate" class="donate-section">
        <div class="container">
            <p class="donate-text">Your support is greatly appreciated. Please consider making a donation to help us achieve our goals.</p>
            <a class="btn btn-donate" href="https://buy.stripe.com/9AQ5nU42L6Pq4uc7ss">Donate Now</a>
        </div>
    </section>
    `
};

const app = createApp({});
app.component('nav-bar', NavBar);
app.component('hero-section', HeroSection);
app.component('about-section', AboutSection);
app.component('policies-section', PoliciesSection);
app.component('donate-section', DonateSection);
app.mount('#app');

// Gentle reveal-on-scroll. Elements are visible by default; the class is only
// added once the observer exists, so nothing can be left hidden without JS.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    document.querySelectorAll('.quote-card, .policy-card, .about-grid, .contact-card').forEach((el) => {
        el.classList.add('will-reveal');
        io.observe(el);
    });
}
