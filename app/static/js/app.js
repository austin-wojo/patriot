const { createApp } = Vue;

const NavBar = {
    template: `
    <header>
        <div id="main-nav" class="container-header">
            <nav>
                <ul>
                    <li><a href="#hero">HOME</a></li>
                    <li><a href="#about">ABOUT</a></li>
                    <li><a href="#policies">POLICIES</a></li>
                    <li><a href="#donate">DONATE</a></li>
                </ul>
            </nav>
        </div>
    </header>
    `,
    data() {
        return {
            // Data properties for your component
        }
    }
};

const HeroSection = {
    props: ['src'],
    template: `
    <section id="hero" class="hero fade-in">
        <div class="container">
            <img :src="src" alt="Hero Image" class="hero-image">
            
            <h1 class="hero-title">ROBERT M. SITARSKI</h1>
            <h2 class="hero-subtitle">CANDIDATE FOR <br> OSHTEMO TOWNSHIP SUPERVISOR</h2>
        </div>
        
        <div >
            <p class="quote1">"We mutually pledge to each other our lives, our fortunes, and our sacred honour." - Thomas Jefferson</p>
            <p class="quote2">"Duty is ours; results are God's" - John Quincy Adams</p>
        </div>

        <div id="donate"class="donate-section container">
            <button class="donate-button">Donate Now</button>
            <p>Your support is greatly appreciated. Please consider making a donation to help us achieve our goals.</p>
            <div class="video-wrapper">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/-KoXt9pZLGM" title="YouTube video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>
    </section>
    `,
    data() {
        return {

        }
    }
};

const AboutSection = {
    template: `
    <section id="about" class="about-section fade-in">
        <div class="container">
            <h2>About</h2>
                <div class="about-photos">
                
                <img src="static/images/portrait.jpg" alt="Photo 1">

                </div>
            <div class="about-content">
                <p>Candidate for Oshtemo Township Supervisor. <br> BS Public Administration, CMU, 2003 <br> Master’s coursework in Public Administration, WMU, 2010-2012.</p>
                <p>Voluntary Probation Officer, 16th Dist. Court, Livonia, MI 1997-2007 <br>Certified Supplier Quality Engineer, 2002. Career in automotive quality 25 years.<br> Married 20 years and have three stepchildren.<br> Constitutional Coach Patriot Academy since 2023 <br> I have been a Kalamazoo County resident since 2007. I'm a recovered alchoholic with 32 years of continuous sobriety.</p>
                <p>P.O. Box 136 Oshtemo, MI. 49097 <br> rsitar5@gmail.com </p>
                <p><a href="http://cterobertmsitarski.com/" target="_blank">cterobertmsitarski.com</a></p>
                <p>269-220-9114</p>
                <p><a href="http://www.facebook.com/rob.sitarski" target="_blank">www.facebook.com/rob.sitarski</a></p>
                <p>Quality Engineer</p>
            </div>

        </div>
    </section>
    `
};
const PoliciesSection = {
    template: `
    <section id="policies" class="policies-section fade-in">
        <div class="container">
            <h2>Policies</h2>
            <div class="policies-grid">
                <div class="policy-card">
                    <img src="static/icons/voting.svg" alt="Voting Rights" class="policy-icon">
                    <h3>Restoring Voting Rights</h3>
                    <p>To address Oshtemo resident’s voting rights. The ability to vote for board appointments and bond proposals has been suppressed. It is imperative to restore the Supervisor to a public servant and have public issues decided by resident vote.</p>
                </div>
                <div class="policy-card">
                    <img src="static/icons/law.svg" alt="Law Enforcement" class="policy-icon">
                    <h3>Strengthening Law Enforcement</h3>
                    <p>Kalamazoo County is a sanctuary county. I will work with the sheriff to develop a stronger law enforcement strategy to ensure Oshtemo resident's safety.</p>
                </div>
                <div class="policy-card">
                    <img src="static/icons/sewer.svg" alt="Sewer Expansion" class="policy-icon">
                    <h3>Sewer Expansion</h3>
                    <p>To finish the sewer expansion project. I will resolve the sewer issue swiftly through resident input and project review.</p>
                </div>
                <div class="policy-card">
                    <img src="static/icons/skills.svg" alt="Skills" class="policy-icon">
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

    `
};

// Create Vue application
const app = createApp({});

// Register components
app.component('nav-bar', NavBar);
app.component('hero-section', HeroSection);
app.component('about-section', AboutSection);
app.component('policies-section', PoliciesSection);
app.component('donate-section', DonateSection);

app.mount('#app');