window.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.pillnav a');
    const movingBg = document.querySelector('.movingbg');
    const navbarContainer = document.querySelector('.navbar');

    const stars = [];


    for (let i = 0; i < 25; i++) {
        const star = document.createElement('div');
        star.className = 'star-particle';
        movingBg.append(star);
        stars.push(star);
        
        const size = (Math.random() * 2 + 0.8) + "px";
        
        gsap.set(star, {
            width: size, height: size,
            left: gsap.utils.random(5, 95) + "%",
            top: gsap.utils.random(10, 85) + "%",
            opacity: gsap.utils.random(0.4, 1)
        });

        gsap.to(star, {
            xPercent: gsap.utils.random(-150, 150),
            yPercent: gsap.utils.random(-100, 100),
            duration: gsap.utils.random(6, 12),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }

    const shuffleStars = () => {
        gsap.to(stars, {
            x: () => gsap.utils.random(-60, 60), 
            y: () => gsap.utils.random(-25, 25),
            duration: 1.2,
            ease: "power4.out", 
            overwrite: false 
        });
    };

    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const isMovingRight = link.offsetLeft > gsap.getProperty(movingBg, "x");

            gsap.to(movingBg, {
                opacity: 1,
                x: link.offsetLeft,
                y: link.offsetTop,
                width: link.offsetWidth,
                height: link.offsetHeight,
                duration: 0.9, 
                ease: "elastic.out(1.1, 0.6)", 
                overwrite: "auto",
                keyframes: {
                    "0%": { scaleX: 1 },
                    "25%": { scaleX: 1.35, transformOrigin: isMovingRight ? "left center" : "right center" },
                    "100%": { scaleX: 1 }
                }
            });

            shuffleStars();
        });
    });

    navbarContainer.addEventListener('mouseleave', () => {
        gsap.to(movingBg, { 
            opacity: 0, 
            scale: 0.8, 
            duration: 0.4,
            ease: "power2.inOut",
            overwrite: true, 
            clearProps: "scale"
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("title");
  const wand = document.querySelector(".wand");
  if (!el || !wand) return;

  const text = el.textContent;

  el.innerHTML = [...text]
    .map(l => `<span class="char">${l === " " ? "&nbsp;" : l}</span>`)
    .join("");

  const chars = el.querySelectorAll(".char");

  gsap.set(chars, {
    opacity: 0,
    x: -20,
    scaleX: 1.8,
    filter: "blur(8px)"
  });


  gsap.to(wand, {
    opacity: 0,
    duration: 0.6,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut"
  });

  const tl = gsap.timeline({ delay: 0.7 });

  chars.forEach((char, i) => {
    const t = i * 0.06;

    tl.to(char, {
      opacity: 1,
      x: 0,
      scaleX: 1.25,
      filter: "blur(0px)",
      duration: 0.18
    }, t);

    tl.to(char, {
      scaleX: 1,
      duration: 0.25
    }, t + 0.12);

    tl.to(wand, {
      x: char.offsetLeft + char.offsetWidth + 6,
      duration: 0.18,
      ease: "power2.out"
    }, t);
  });
});
// партікли
tsParticles.load("hero",{
  fullScreen: { enable: false },
  fpsLimit: 60,
  particles: {
    number: { value: 400 },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: { value: 0.8 },
    size: { value: { min: 1, max: 3 } },
    shadow: { enable: true, color: "#ffffff", blur: 5 },
    move: {
      enable: true,
      speed: 0.8,
      direction: "none",
      outModes: "bounce",
      friction: 0.5, 
      straight: false
    }
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" }
    },
    modes: {
      repulse: {
        distance: 100,
        duration: 0.4,
        factor: 20,
        speed: 0.3,
        easing: "ease-out-quad"
      }
    }
  }
});

tsParticles.load("tickets-particles", {
  fullScreen: { enable: false },
  fpsLimit: 60,
  particles: {
    number: { value: 400 },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: { value: 0.8 },
    size: { value: { min: 1, max: 3 } },
    shadow: { enable: true, color: "#ffffff", blur: 5 },
    move: {
      enable: true,
      speed: 0.8,
      direction: "none",
      outModes: { default: "bounce" },
      friction: 0.5,
      straight: false
    }
  },
  interactivity: {
    detectsOn: "window",
    events: {
      onHover: { enable: true, mode: "repulse" }
    },
    modes: {
      repulse: {
        distance: 100,
        duration: 0.4,
        factor: 20,
        speed: 0.3,
        easing: "ease-out-quad"
      }
    }
  }
});


gsap.to(".mars-planet", {
  backgroundPositionX: "-200%",
  ease: "none",
  duration: 20,
  repeat: -1
});

const hero = document.getElementById('hero');
const moons = document.querySelectorAll('.moon');
let mouseX = -100, mouseY = -100;

hero.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

let moonData = Array.from(moons).map(moon => ({
  el: moon,
  x: Math.random() * 300, y: Math.random() * 300,
  dx: (Math.random() - 0.5) * 2, dy: (Math.random() - 0.5) * 2,
  rot: 0, dragging: false
}));

moonData.forEach(m => {
  m.el.addEventListener('mousedown', () => m.dragging = true);
  window.addEventListener('mouseup', () => m.dragging = false);
  window.addEventListener('mousemove', e => {
    if (m.dragging) {
      m.x = e.clientX - 25;
      m.y = e.clientY - 25;
      m.rot += 15; 
    }
  });
});

function animate() {
  moonData.forEach(m => {
    if (!m.dragging) {
      m.x += m.dx; m.y += m.dy; m.rot += 0.5;

      if (m.x <= 0 || m.x >= hero.clientWidth - 50) m.dx *= -1;
      if (m.y <= 0 || m.y >= hero.clientHeight - 50) m.dy *= -1;

      let dist = Math.hypot(m.x + 25 - mouseX, m.y + 25 - mouseY);
      if (dist < 100) {
        m.dx = (m.x + 25 - mouseX) * 0.05;
        m.dy = (m.y + 25 - mouseY) * 0.05;
      }
    }

    m.el.style.left = m.x + 'px';
    m.el.style.top = m.y + 'px';
    m.el.style.transform = `rotate(${m.rot}deg) ${m.dragging ? 'scale(1.2)' : ''}`;
  });
  requestAnimationFrame(animate);
}

animate();

gsap.registerPlugin(ScrollTrigger);

const track = document.querySelector(".horizontal-track");

gsap.to(track, {
  x: () => -(track.scrollWidth - window.innerWidth),
  ease: "none",
  scrollTrigger: {
    trigger: ".horizontal-scroll",
    start: "top top",
    end: () => `+=${track.scrollWidth - window.innerWidth}`,
    scrub: true,
    pin: true,
    invalidateOnRefresh: true
  }
});

const targetDate = new Date("May 10, 2026 23:59:59").getTime();
const timerElement = document.getElementById("main-countdown-box");

const timer = setInterval(() => {
  const now = new Date().getTime();
  const diff = targetDate - now;

  if (diff < 0) {
    clearInterval(timer);
    timerElement.innerText = "Акция завершена!";
    return;
  }


  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((diff % (1000 * 60)) / 1000);

  
  timerElement.innerText = ` before making humantiy multiplanetary ${d}d. ${h}h. ${m}min. ${s}s.`;

}, 1000); 

const viewer = document.querySelector('.mars-viewer');
const viewerBg = document.querySelector('.viewer-bg');
const viewerTitle = document.querySelector('.viewer-title');
const viewerText = document.querySelector('.viewer-text');

document.querySelectorAll('.mars-card').forEach(card => {

  card.addEventListener('click', () => {

    viewerBg.src = card.dataset.image;
    viewerTitle.textContent = card.dataset.title;
    viewerText.textContent = card.dataset.text;

    viewer.classList.add('active');
    document.body.classList.add('viewer-open');

  });

});

document.querySelector('.close-viewer')
.addEventListener('click', () => {

  viewer.classList.remove('active');
  document.body.classList.remove('viewer-open');

});

