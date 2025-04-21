// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Cursor interactions
document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorFollower.style.transform = 'scale(1.5)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });
});

// 3D Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('hero-3d'),
    alpha: true,
    antialias: true
});

renderer.setSize(window.innerWidth / 2, window.innerHeight);
camera.position.z = 5;

// Create animated 3D elements
const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
const material = new THREE.MeshPhongMaterial({
    color: 0x8b5cf6,
    shininess: 100,
    specular: 0xffffff
});
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

// Add lights
const light1 = new THREE.PointLight(0x8b5cf6, 1);
light1.position.set(0, 2, 3);
scene.add(light1);

const light2 = new THREE.PointLight(0xec4899, 1);
light2.position.set(3, -2, 3);
scene.add(light2);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

// Responsive 3D scene
window.addEventListener('resize', () => {
    const width = window.innerWidth / 2;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate__animated');
            entry.target.classList.add(entry.target.dataset.animate);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('[data-animate]').forEach(element => {
    observer.observe(element);
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Parallax Effect for Floating Elements
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.005;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.005;

    document.querySelectorAll('.floating-element').forEach(element => {
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// Video Intro Modal
const videoIntroBtn = document.querySelector('.video-intro');
if (videoIntroBtn) {
    videoIntroBtn.addEventListener('click', () => {
        // Add your video modal implementation here
        alert('Video introduction coming soon!');
    });
}

// Dynamic Text Animation
const roles = ['PhD Candidate', 'Data Engineer', 'ML Researcher', 'AI Enthusiast'];
let roleIndex = 0;
const roleElement = document.querySelector('.role');

function updateRole() {
    roleElement.style.opacity = 0;
    setTimeout(() => {
        roleElement.textContent = roles[roleIndex];
        roleElement.style.opacity = 1;
        roleIndex = (roleIndex + 1) % roles.length;
    }, 500);
}

if (roleElement) {
    setInterval(updateRole, 3000);
}

// Card Hover Effects
document.querySelectorAll('.experience-card, .project-card, .voluntary-card, .certification-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
        menuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

