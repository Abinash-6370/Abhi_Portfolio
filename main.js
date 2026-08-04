
document.addEventListener('DOMContentLoaded', () => {

  
  document.getElementById('year').textContent = new Date().getFullYear();
 
  const navbar = document.getElementById('navbar');
  const progressFill = document.getElementById('progressFill');

  function onScroll(){
    navbar.classList.toggle('scrolled', window.scrollY > 40);

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressFill.style.height = pct + '%';

    updateActiveNav();
  }
  window.addEventListener('scroll', onScroll, { passive:true });


  const themeToggle = document.getElementById('themeToggle');
  const htmlEl = document.documentElement;

  themeToggle.addEventListener('click', () => {
    const current = htmlEl.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    htmlEl.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
  });


  const navToggle = document.getElementById('navToggle');
  const navLinksEl = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinksEl.classList.toggle('open');
  });
  navLinksEl.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinksEl.classList.remove('open');
    });
  });

  const sections = document.querySelectorAll('.section');
  const navLinkEls = document.querySelectorAll('.nav-link');

  function updateActiveNav(){
    let currentId = sections[0].id;
    const offset = 140;
    sections.forEach(sec => {
      if (window.scrollY + offset >= sec.offsetTop) currentId = sec.id;
    });
    navLinkEls.forEach(link => {
      link.classList.toggle('active', link.dataset.section === currentId);
    });
  }

  onScroll(); 


  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold:0.15 });
  revealEls.forEach(el => revealObserver.observe(el));


  const counters = document.querySelectorAll('.stat-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold:0.4 });
  counters.forEach(c => counterObserver.observe(c));

  function animateCounter(el){
    const target = parseInt(el.dataset.count, 10);
    const duration = 1400;
    const start = performance.now();
    function tick(now){
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        const bar = entry.target;
        bar.style.width = bar.dataset.width + '%';
        skillObserver.unobserve(bar);
      }
    });
  }, { threshold:0.3 });
  skillBars.forEach(b => skillObserver.observe(b));

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-10px) rotateX(${y * -6}deg) rotateY(${x * 8}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  const typedText = document.querySelector('.multiple-text');
  if (typedText){
    const words = ['Fullstack Developer', 'UI/UX Designer', 'AI/ML Engineer', 'Django Developer'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeSpeed = 90;      
    const deleteSpeed = 45;   
    const holdDelay = 1400;    
    const nextWordDelay = 400; 

    function typeLoop(){
      const currentWord = words[wordIndex];

      if (!isDeleting){
        charIndex++;
        typedText.textContent = currentWord.slice(0, charIndex);

        if (charIndex === currentWord.length){
          isDeleting = true;
          setTimeout(typeLoop, holdDelay);
          return;
        }
        setTimeout(typeLoop, typeSpeed);
      } else {
        charIndex--;
        typedText.textContent = currentWord.slice(0, charIndex);

        if (charIndex === 0){
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(typeLoop, nextWordDelay);
          return;
        }
        setTimeout(typeLoop, deleteSpeed);
      }
    }

    typeLoop();
  }

 const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;
  formSuccess.classList.remove('show');

  try {
    await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });
  } catch (err) {
    console.error('Form submission error:', err);
  } finally {
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
    formSuccess.classList.add('show');
    form.reset();
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }
});
});
