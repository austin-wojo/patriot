const { createApp } = Vue;



const NavBar = {
    template: `
    <header>
        <div id="main-nav" class="container-header">
            <nav>
                <ul>
                    <li><a href="#about">About</a></li>
                    <li><a href="#products">Products</a></li>
                    <li><a href="#signup">Sign Up</a></li>
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
            <p class="hero-text">General text goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vehicula ligula justo, sit amet vestibulum metus eleifend nec. Aenean eget est non dolor pharetra maximus id at neque. Aenean egestas condimentum libero, eget hendrerit quam porttitor ac. Phasellus consectetur placerat ipsum ut bibendum. Duis a faucibus enim. Aliquam finibus leo eget ipsum tristique, non pretium ligula laoreet. Quisque gravida suscipit pellentesque. Vestibulum dignissim facilisis lectus sagittis pellentesque.</p>
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
        <section id="products" class="affiliate-links">
            <div v-for="(item, index) in affiliateItems" :key="item.id" class="container" :ref="setRef">
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
                    title: 'Affiliate Product',
                    description: 'Donec id tincidunt purus, sed interdum diam. Etiam non dignissim turpis, eget volutpat elit. Maecenas semper sem at ipsum tristique, a sagittis sem tempor. Suspendisse sit amet fringilla mi, eget placerat ipsum. Suspendisse molestie lacus diam, at placerat nulla pellentesque vel. Morbi molestie pulvinar tempor. Proin dapibus ac elit vitae facilisis. Integer maximus eget nunc sit amet pharetra. Donec risus nibh, lobortis et aliquam nec, congue eu odio. Fusce accumsan sem quis tortor tempor, in lobortis nisl fringilla. Ut quis pretium mi. Maecenas eget fermentum augue. ',
                    image: 'static/images/book1.avif',
                    link: '#link1'
                },
                {
                    id: 2,
                    title: 'Affiliate Product',
                    description: 'Vestibulum fringilla nunc sit amet viverra porttitor. Sed a mi a neque tincidunt consectetur eget at ex. Nunc et scelerisque lorem. In accumsan ac nisl in varius. Fusce rhoncus eget nibh et imperdiet. Morbi pharetra congue massa, sed dapibus dolor porttitor sit amet. Pellentesque vel nulla ante. Proin nec lectus at libero dapibus fringilla in sit amet tortor. Aenean vel ante blandit, feugiat lorem sit amet, convallis ante. ',
                    image: 'static/images/manreadingbook.webp',
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
