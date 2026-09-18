/**
 * AI Full-Stack Developer Engineer (FDE) Portfolio
 * Interactive Functionality & Modern UX
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initTypewriter();
  initProjectFilters();
  initProjectModals();
  initStatCounters();
  initSkillProgressBars();
  initContactForm();
  initBackToTop();
  initSmoothScroll();
  initCertModals();
});

/* ==========================================================================
   1. Theme Toggle (Dark / Light Mode)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  
  // Check persisted theme or system preference
  const savedTheme = localStorage.getItem('fde_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const initialTheme = savedTheme ? savedTheme : 'light'; // Default to clean modern light theme
  setTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-bs-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('fde_theme', theme);
    if (themeIcon) {
      if (theme === 'dark') {
        themeIcon.className = 'bi bi-moon-stars-fill';
      } else {
        themeIcon.className = 'bi bi-sun-fill text-warning';
      }
    }
  }
}

/* ==========================================================================
   2. Dynamic Typewriter Effect in Hero
   ========================================================================== */
function initTypewriter() {
  const typewriterElement = document.getElementById('typewriterText');
  if (!typewriterElement) return;

  const roles = [
    'Forward Deployed Engineer',
    'Agentic AI & RAG Architect',
    'Enterprise LLM Solutions Engineer',
    'Production AI Deployment Specialist'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at the end of word
      isDeleting = true;
      typingSpeed = 1800;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   3. Projects Portfolio Filtering
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-item-col');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active class on buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   4. Project Detail Modal Data & Triggers
   ========================================================================== */
const projectData = {
  'medassist': {
    title: 'MedAssist AI FDE RAG: Clinical Intelligence & Protocol Assistant',
    category: 'Healthcare & Life Sciences | AI Forward Deployed Engineering',
    image: 'projects/chat-interface.png',
    description: 'As an AI Forward Deployed Engineer, developed MedAssist to address clinical lookup friction (1.5–2 hours/day per provider) and mitigate malpractice liability caused by general-purpose LLM hallucinations. The platform guarantees 100% verifiable citations (document name and exact page numbers) while enforcing strict multi-tenant boundaries across hospital networks so proprietary institutional formularies and clinical SOPs never leak.',
    architecture: 'Engineered a Two-Stage Retrieval pipeline: 25 medical guidelines partitioned into 219 dense semantic chunks. Vector pre-filtering in ChromaDB enforces tenant-level access control before cosine similarity computation. Top-K candidates undergo deep cross-encoder re-ranking (bge-reranker-base) and are synthesized via Groq LPU LLaMA 3.3 with deterministic rejection guardrails for out-of-context clinical questions. Monitored with LangSmith and backed by 13/13 automated pytest coverage.',
    metrics: [
      { label: 'Lookup Latency SLA', val: '< 1.8s' },
      { label: 'Grounded Citations', val: '100%' },
      { label: 'Clinician Time Saved', val: '~70%' }
    ],
    tech: ['FastAPI', 'Python 3.11', 'LangChain', 'Groq LLaMA 3.3', 'ChromaDB', 'BGE Cross-Encoder', 'Docker', 'JWT RBAC', 'Pytest (13/13)'],
    github: 'https://github.com/bittush8789/medassist-ai-fde-rag',
    demo: 'https://github.com/bittush8789/medassist-ai-fde-rag#readme'
  },
  'retailmind': {
    title: 'RetailMind: Retail Operations RAG Chatbot',
    category: 'Enterprise Retail & Supply Chain | AI Forward Deployed Engineering',
    image: 'projects/Retails.png',
    description: 'Forward deployed across retail operations to automate multi-format operational document ingestion (PDF, DOCX, TXT, CSV, XLSX) and provide store floor staff, cashiers, and supervisors with instant, verified guidance on complex return policies, warranties, and store SOPs. Designed to slash checkout register resolution delays and onboarding friction for high-turnover retail teams.',
    architecture: 'Engineered a Hybrid Retrieval engine combining ChromaDB dense vector embeddings with BM25 keyword lexical search using Reciprocal Rank Fusion (RRF). Added cross-encoder re-ranking for complex inventory SKUs, high-speed Redis TTL query caching to eliminate redundant LLM inference costs by ~60%, and an enterprise security perimeter powered by Groq LLaMA Prompt Guard 22M to neutralize prompt injections and jailbreaks.',
    metrics: [
      { label: 'Prompt Security', val: 'Guard 22M' },
      { label: 'Query Cache Tier', val: 'Redis 7.2' },
      { label: 'Inference Engine', val: 'LLaMA 3.3 70B' }
    ],
    tech: ['FastAPI', 'Python 3.11', 'LangChain 0.3', 'Groq LLaMA 3.3 70B', 'ChromaDB', 'Redis 7.2', 'Prompt Guard 22M', 'Docker Compose'],
    github: 'https://github.com/bittush8789/AI-FDE-RetailMind-RAG-Chatbot',
    demo: 'https://github.com/bittush8789/AI-FDE-RetailMind-RAG-Chatbot#readme'
  }
};

function initProjectModals() {
  const modalElement = document.getElementById('projectDetailModal');
  if (!modalElement) return;

  const modalInstance = new bootstrap.Modal(modalElement);
  const detailButtons = document.querySelectorAll('.btn-project-details');

  detailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projKey = btn.getAttribute('data-project');
      const data = projectData[projKey];
      if (!data) return;

      document.getElementById('modalProjectTitle').textContent = data.title;
      document.getElementById('modalProjectCategory').textContent = data.category;
      document.getElementById('modalProjectImg').src = data.image;
      document.getElementById('modalProjectImg').alt = data.title;
      document.getElementById('modalProjectDesc').textContent = data.description;
      document.getElementById('modalProjectArch').textContent = data.architecture;

      // Metrics
      const metricsContainer = document.getElementById('modalProjectMetrics');
      metricsContainer.innerHTML = data.metrics.map(m => `
        <div class="col-4">
          <div class="p-2 border rounded text-center" style="background: var(--bg-card); border-color: var(--border-color)!important;">
            <div class="fw-bold font-mono text-cyan" style="font-size: 1rem;">${m.val}</div>
            <div class="text-muted small" style="font-size: 0.72rem;">${m.label}</div>
          </div>
        </div>
      `).join('');

      // Tech Badges
      const techContainer = document.getElementById('modalProjectTech');
      techContainer.innerHTML = data.tech.map(t => `<span class="project-tag">${t}</span>`).join('');

      // Links
      document.getElementById('modalProjectGithub').href = data.github;
      document.getElementById('modalProjectDemo').href = data.demo;

      modalInstance.show();
    });
  });
}

/* ==========================================================================
   5. Stat Counters on Scroll
   ========================================================================== */
function initStatCounters() {
  const statContainers = document.querySelectorAll('.hero-stats-row');
  if (!statContainers.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        obs.unobserve(entry.target);
        const statValues = entry.target.querySelectorAll('.stat-number');
        statValues.forEach(el => {
          const target = parseFloat(el.getAttribute('data-target'));
          if (isNaN(target)) return;

          const suffix = el.getAttribute('data-suffix') || '';
          const isFloat = String(target).includes('.');
          const decimals = isFloat ? (String(target).split('.')[1].length) : parseInt(el.getAttribute('data-decimals') || '0', 10);
          
          let count = 0;
          const duration = 1400;
          const stepTime = 20;
          const steps = duration / stepTime;
          const increment = target / steps;

          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              count = target;
              clearInterval(timer);
            }
            el.textContent = (decimals > 0 ? count.toFixed(decimals) : Math.floor(count)) + suffix;
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.15 });

  statContainers.forEach(container => observer.observe(container));
}

/* ==========================================================================
   6. Animated Skill Progress Bars on Scroll
   ========================================================================== */
function initSkillProgressBars() {
  const skillBars = document.querySelectorAll('.skill-progress-bar');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const level = bar.getAttribute('data-level') || '85%';
        bar.style.width = level;
        obs.unobserve(bar);
      }
    });
  }, { threshold: 0.15 });

  skillBars.forEach(bar => observer.observe(bar));
}

/* ==========================================================================
   7. Contact Form Handling & Validation
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitContactBtn');
  const alertBox = document.getElementById('contactAlert');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    form.classList.add('was-validated');

    // Simulate sending with loading state
    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
      Starting Conversation...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnContent;
      
      // Show confirmation alert
      if (alertBox) {
        alertBox.className = 'alert alert-success d-flex align-items-center mb-4';
        alertBox.innerHTML = `
          <i class="bi bi-check-circle-fill fs-5 me-2"></i>
          <div><strong>Conversation Initiated!</strong> Thank you for reaching out. Bittu will respond to your enterprise inquiry shortly.</div>
        `;
        alertBox.classList.remove('d-none');
      }

      form.reset();
      form.classList.remove('was-validated');

      setTimeout(() => {
        if (alertBox) alertBox.classList.add('d-none');
      }, 7000);
    }, 1200);
  });
}

/* ==========================================================================
   8. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 450) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   9. Smooth Scroll & Navbar Collapse on Mobile
   ========================================================================== */
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link:not(.dropdown-toggle)');
  const navbarCollapse = document.getElementById('navbarNav');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });
}

/* ==========================================================================
   10. Certification Verification Modal Handler
   ========================================================================== */
function initCertModals() {
  const verifyBtns = document.querySelectorAll('.cert-verify-btn');
  const modalName = document.getElementById('certModalName');
  const modalIssuer = document.getElementById('certModalIssuer');
  const modalId = document.getElementById('certModalId');
  const modalDate = document.getElementById('certModalDate');
  const modalSkills = document.getElementById('certModalSkills');
  const modalRecipient = document.getElementById('certModalRecipient');
  const modalImg = document.getElementById('certModalImg');
  const modalImgLink = document.getElementById('certModalImgLink');
  const modalLink = document.getElementById('certModalLink');

  verifyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-cert-title');
      const issuer = btn.getAttribute('data-cert-issuer');
      const id = btn.getAttribute('data-cert-id');
      const date = btn.getAttribute('data-cert-date');
      const skills = btn.getAttribute('data-cert-skills');
      const recipient = btn.getAttribute('data-cert-recipient');
      const img = btn.getAttribute('data-cert-image');
      const url = btn.getAttribute('data-cert-url');

      if (modalName && title) modalName.textContent = title;
      if (modalIssuer && issuer) modalIssuer.textContent = issuer;
      if (modalId && id) modalId.textContent = id;
      if (modalDate && date) modalDate.textContent = date;
      if (modalSkills && skills) modalSkills.textContent = skills;
      if (modalRecipient && recipient) modalRecipient.textContent = recipient;
      if (modalImg && img) {
        modalImg.src = img;
        modalImg.alt = title || 'Escbash Certificate';
      }
      if (modalImgLink && img) {
        modalImgLink.href = img;
      }
      if (modalLink && url) {
        modalLink.href = url;
      }
    });
  });
}

