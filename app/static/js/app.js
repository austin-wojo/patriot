const { createApp } = Vue;


const NavBar = {
    template: `
    <header>
        <div id="main-nav" class="container-header">
            <nav>
                <ul>
                    <li><a href="#about">About<i class="fas fa-user"></i></a></li>
                    <li><a href="#signup">Sign Up</a></li>
                    <li><a href="#products">Products</a></li>
                </ul>
            </nav>
            <div class="fading-line"></div>
        </div>
    </header>
    `,
    data() {
        return {
            // Data properties for your component
        }
    },
    mounted() {
        // JavaScript for toggle button interaction
        this.initNavbarToggle();
    },
    methods: {
        initNavbarToggle() {
            const burger = document.querySelector('.burger');
            const navLinks = document.querySelector('.nav-links');

            burger.addEventListener('click', () => {
                navLinks.classList.toggle('nav-active');
            });
        }
    }
};


// Hero Section Component
const HeroSection = {
    props: ['src'],
    template: `
    <section id="hero" class="hero fade-in">
        <div class="container">
            <img :src="src" alt="Hero Image" class="hero-image">
            <h1 class="hero-title">BIBLICAL CITIZENSHIP CLASS</h1>
            <p class="hero-text">General text goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
        </div>
    </section>
    `,
    data() {
        return {

        }
    }

};

const AffiliateLinksSection = {
    template: `
        <section class="affiliate-links">
            <div v-for="(item, index) in affiliateItems" :key="item.id" class="container fade-in" :ref="setRef">
                <img :src="item.image" :alt="item.title" class="affiliate-image">
                <h2>{{ item.title }}</h2>
                <p>{{ item.description }}</p>
                <a :href="item.link" target="_blank" class="affiliate-link">Learn More</a>
            </div>
        </section>
    `,
    data() {
        return {
            affiliateItems: [
                {
                    id: 1,
                    title: 'Affiliate Product 1',
                    description: 'Description for affiliate product 1. Lorem ipsum dolor sit amet...',
                    image: 'static/images/kitten.jpg',
                    link: '#link1'
                },
                {
                    id: 2,
                    title: 'Affiliate Product 2',
                    description: 'Description for affiliate product 2. Lorem ipsum dolor sit amet...',
                    image: 'path_to_image_2',
                    link: '#link2'
                },
                // Add more items as needed
            ]
        }
    },
    methods: {
        setRef(el) {
            if (el) {
                this.$nextTick(() => {
                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach((entry) => {
                            // Determine the index for alternating animation direction
                            let index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                            let directionClass = index % 2 === 0 ? 'fade-in-right' : 'fade-in-left';
                            
                            if (entry.isIntersecting) {
                                entry.target.classList.add(directionClass);
                            } else {
                                // Remove the class when the element leaves the viewport
                                entry.target.classList.remove(directionClass);
                            }
                        });
                    }, { threshold: 0.1 });
    
                    observer.observe(el);
                });
            }
        }
    },
    mounted() {
        // Intersection Observer setup is handled in setRef method
    }
};


// About Section Component
const AboutSection = {
    template: `<!-- About section template with props or data -->`
};

// Define more components as needed...

// Create Vue application
const app = createApp({});

// Register components
app.component('nav-bar', NavBar);
app.component('af-links-section', AffiliateLinksSection);
app.component('hero-section', HeroSection);
app.component('about-section', AboutSection);
// Register more components...

app.mount('#app');
