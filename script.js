// Custom cursor with performance optimization
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let cursorTimeout;
document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    
    clearTimeout(cursorTimeout);
    cursorTimeout = setTimeout(() => {
        cursorFollower.style.left = `${e.clientX}px`;
        cursorFollower.style.top = `${e.clientY}px`;
    }, 50);
});

// Enhanced cursor interactions
document.querySelectorAll('a, button, .card-header').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
        cursorFollower.classList.add('cursor-hover');
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
        cursorFollower.classList.remove('cursor-hover');
    });
});

// Optimized 3D Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('hero-3d'),
    alpha: true,
    antialias: true,
    powerPreference: "high-performance"
});

// Responsive renderer setup
function updateRendererSize() {
    const container = document.querySelector('.hero-3d-container');
    if (container) {
        const width = container.clientWidth;
        const height = container.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }
}

updateRendererSize();
camera.position.z = 5;

// Modern 3D elements
const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
const material = new THREE.MeshPhongMaterial({
    color: 0x8b5cf6,
    shininess: 100,
    specular: 0xffffff,
    flatShading: true
});
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

// Enhanced lighting
const lights = [
    { color: 0x8b5cf6, position: [0, 2, 3] },
    { color: 0xec4899, position: [3, -2, 3] },
    { color: 0x3b82f6, position: [-3, 0, 2] }
];

lights.forEach(light => {
    const pointLight = new THREE.PointLight(light.color, 1);
    pointLight.position.set(...light.position);
    scene.add(pointLight);
});

// Optimized animation loop
let animationFrameId;
function animate() {
    animationFrameId = requestAnimationFrame(animate);
    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.01;
    renderer.render(scene, camera);
}

// Start/Stop animation based on visibility
const heroSection = document.querySelector('#home');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animate();
        } else {
            cancelAnimationFrame(animationFrameId);
        }
    });
}, { threshold: 0.1 });

if (heroSection) observer.observe(heroSection);

// Debounced resize handler
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateRendererSize, 250);
});

// Enhanced scroll animations with performance optimization
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate__fadeIn');
            scrollObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    scrollObserver.observe(section);
});

// Optimized dynamic text animation
const roles = ['PhD Candidate', 'Data Engineer', 'ML Researcher', 'AI Enthusiast'];
const roleElement = document.querySelector('.role');

if (roleElement) {
    let roleIndex = 0;
    function updateRole() {
        roleElement.style.opacity = 0;
        setTimeout(() => {
            roleElement.textContent = roles[roleIndex];
            roleElement.style.opacity = 1;
            roleIndex = (roleIndex + 1) % roles.length;
        }, 500);
    }
    setInterval(updateRole, 3000);
}

// Modern card interactions
document.querySelectorAll('.project-card, .leadership-card, .certification-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Contact form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        try {
            submitBtn.innerHTML = 'Sending...';
            // Add your form submission logic here
            await new Promise(resolve => setTimeout(resolve, 1000));
            submitBtn.innerHTML = 'Sent Successfully!';
            contactForm.reset();
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
            }, 2000);
        } catch (error) {
            submitBtn.innerHTML = 'Error Sending';
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
            }, 2000);
        }
    });
}