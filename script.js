/**
 * MARTIN CHUKWU — DATA ANALYST PORTFOLIO
 * script.js | Interactions, Charts, Animations
 */

/* ====================================================
   1. STICKY NAVBAR
   ==================================================== */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ====================================================
   2. HAMBURGER MOBILE MENU
   ==================================================== */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close menu when a nav link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

/* ====================================================
   3. ACTIVE NAV LINK ON SCROLL
   ==================================================== */
const sections = document.querySelectorAll('section[id]');

const observeNav = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(sec => observeNav.observe(sec));

/* ====================================================
   4. SCROLL REVEAL ANIMATIONS
   ==================================================== */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

/* ====================================================
   5. ANIMATED SKILL BARS
   ==================================================== */
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.getAttribute('data-width');
      entry.target.style.width = width + '%';
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));

/* ====================================================
   6. BACK TO TOP BUTTON
   ==================================================== */
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ====================================================
   7. CONTACT FORM HANDLER
   ==================================================== */
const contactForm  = document.getElementById('contactForm');
const formSuccess  = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;

  // Simulate async send (replace with actual fetch/EmailJS/Formspree etc.)
  setTimeout(() => {
    formSuccess.classList.add('show');
    contactForm.reset();
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    btn.disabled = false;
    setTimeout(() => formSuccess.classList.remove('show'), 6000);
  }, 1500);
});

/* ====================================================
   8. FOOTER YEAR
   ==================================================== */
document.getElementById('year').textContent = new Date().getFullYear();

/* ====================================================
   9. CHART.JS VISUALIZATIONS
   ==================================================== */

// Shared chart defaults
Chart.defaults.color = '#8ba3bf';
Chart.defaults.font.family = "'DM Sans', sans-serif";
Chart.defaults.font.size = 12;

// Helper: teal gradient
function accentGradient(ctx, chartArea) {
  if (!chartArea) return 'rgba(15, 244, 198, 0.6)';
  const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
  gradient.addColorStop(0, 'rgba(15, 244, 198, 0.05)');
  gradient.addColorStop(1, 'rgba(15, 244, 198, 0.5)');
  return gradient;
}

// ---- Chart 1: Monthly Sales Bar Chart ----
const salesCtx = document.getElementById('salesChart').getContext('2d');
const salesChart = new Chart(salesCtx, {
  type: 'bar',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
             'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Revenue (₦ thousands)',
      data: [42, 55, 61, 48, 70, 85, 78, 92, 68, 75, 88, 105],
      backgroundColor: (ctx) => {
        const chart = ctx.chart;
        const { ctx: c, chartArea } = chart;
        if (!chartArea) return 'rgba(15, 244, 198, 0.5)';
        const gradient = c.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient.addColorStop(0, 'rgba(15, 244, 198, 0.2)');
        gradient.addColorStop(1, 'rgba(15, 244, 198, 0.7)');
        return gradient;
      },
      borderColor: 'rgba(15, 244, 198, 0.9)',
      borderWidth: 1.5,
      borderRadius: 6,
      borderSkipped: false,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0d1520',
        borderColor: 'rgba(15,244,198,0.3)',
        borderWidth: 1,
        titleColor: '#0ff4c6',
        bodyColor: '#8ba3bf',
        callbacks: {
          label: (ctx) => ` ₦${ctx.parsed.y}k`
        }
      }
    },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.04)' } },
      y: {
        grid: { color: 'rgba(255,255,255,0.04)' },
        ticks: { callback: v => '₦' + v + 'k' }
      }
    }
  }
});

// ---- Chart 2: Customer Segmentation Doughnut ----
const segCtx = document.getElementById('segmentChart').getContext('2d');
new Chart(segCtx, {
  type: 'doughnut',
  data: {
    labels: ['Premium', 'Regular', 'Occasional', 'At-Risk', 'New'],
    datasets: [{
      data: [22, 35, 18, 12, 13],
      backgroundColor: [
        'rgba(15,244,198,0.75)',
        'rgba(59,130,246,0.75)',
        'rgba(168,85,247,0.75)',
        'rgba(239,68,68,0.75)',
        'rgba(234,179,8,0.75)',
      ],
      borderColor: '#0d1520',
      borderWidth: 3,
      hoverOffset: 8,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: {
        position: 'right',
        labels: {
          padding: 14,
          boxWidth: 12,
          font: { size: 11 }
        }
      },
      tooltip: {
        backgroundColor: '#0d1520',
        borderColor: 'rgba(15,244,198,0.3)',
        borderWidth: 1,
        titleColor: '#0ff4c6',
        bodyColor: '#8ba3bf',
        callbacks: {
          label: (ctx) => ` ${ctx.label}: ${ctx.parsed}%`
        }
      }
    }
  }
});

// ---- Chart 3: COVID-19 Line Chart ----
const covidCtx = document.getElementById('covidChart').getContext('2d');
const covidChart = new Chart(covidCtx, {
  type: 'line',
  data: {
    labels: ['Jan 20', 'Mar 20', 'Jun 20', 'Sep 20', 'Dec 20',
             'Mar 21', 'Jun 21', 'Sep 21', 'Dec 21', 'Mar 22'],
    datasets: [
      {
        label: 'Cases (M)',
        data: [0.1, 0.5, 8, 30, 80, 110, 175, 210, 280, 440],
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239,68,68,0.06)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: '#ef4444',
        borderWidth: 2,
      },
      {
        label: 'Recovered (M)',
        data: [0, 0.1, 4, 18, 55, 80, 140, 185, 250, 400],
        borderColor: '#0ff4c6',
        backgroundColor: 'rgba(15,244,198,0.06)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: '#0ff4c6',
        borderWidth: 2,
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { position: 'top', labels: { boxWidth: 12, padding: 16 } },
      tooltip: {
        backgroundColor: '#0d1520',
        borderColor: 'rgba(15,244,198,0.3)',
        borderWidth: 1,
        titleColor: '#0ff4c6',
        bodyColor: '#8ba3bf',
      }
    },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.04)' } },
      y: {
        grid: { color: 'rgba(255,255,255,0.04)' },
        ticks: { callback: v => v + 'M' }
      }
    }
  }
});

// ---- Chart 4: Skills Radar ----
const skillsCtx = document.getElementById('skillsChart').getContext('2d');
new Chart(skillsCtx, {
  type: 'radar',
  data: {
    labels: ['Python', 'SQL', 'Excel', 'Power BI', 'Visualization', 'Data Cleaning', 'Reporting', 'Training'],
    datasets: [{
      label: 'Proficiency',
      data: [80, 85, 90, 78, 82, 88, 84, 92],
      borderColor: 'rgba(15,244,198,0.8)',
      backgroundColor: 'rgba(15,244,198,0.08)',
      pointBackgroundColor: 'rgba(15,244,198,0.9)',
      pointBorderColor: '#0d1520',
      pointRadius: 4,
      borderWidth: 2,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        min: 0, max: 100,
        beginAtZero: true,
        grid: { color: 'rgba(255,255,255,0.06)' },
        angleLines: { color: 'rgba(255,255,255,0.06)' },
        pointLabels: { font: { size: 11 }, color: '#8ba3bf' },
        ticks: { display: false }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0d1520',
        borderColor: 'rgba(15,244,198,0.3)',
        borderWidth: 1,
        titleColor: '#0ff4c6',
        bodyColor: '#8ba3bf',
        callbacks: {
          label: (ctx) => ` ${ctx.parsed.r}%`
        }
      }
    }
  }
});

/* ====================================================
   10. SMOOTH NAV LINK ACTIVE STATE STYLES
   ==================================================== */
const style = document.createElement('style');
style.textContent = `
  .nav-link.active {
    color: var(--accent) !important;
  }
  .nav-link.active::after {
    width: 100% !important;
  }
`;
document.head.appendChild(style);

/* ====================================================
   11. TYPING EFFECT — HERO TAGLINE (subtle)
   ==================================================== */
function typeWriter(element, text, speed = 50) {
  element.textContent = '';
  let i = 0;
  const timer = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
}

// Optional: subtle greeting type effect
window.addEventListener('load', () => {
  const greeting = document.querySelector('.hero-greeting');
  if (greeting) {
    const original = greeting.textContent;
    setTimeout(() => typeWriter(greeting, original, 60), 400);
  }
});

/* ====================================================
   12. INTERSECTION OBSERVER — Chart Trigger
   ==================================================== */
// Trigger chart animations on scroll into view
const vizSection = document.getElementById('visualization');
let chartsAnimated = false;

const vizObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !chartsAnimated) {
    chartsAnimated = true;
    // Charts are already initialized above; Chart.js animates on creation
    // and again when updated — nothing extra needed
  }
}, { threshold: 0.2 });

if (vizSection) vizObserver.observe(vizSection);

/* ====================================================
   13. CURSOR GLOW EFFECT (desktop only)
   ==================================================== */
if (window.matchMedia('(hover: hover)').matches) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(15,244,198,0.04) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: left 0.08s linear, top 0.08s linear;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}
