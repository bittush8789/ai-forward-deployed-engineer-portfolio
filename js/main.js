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
  'omniagent': {
    title: 'OmniAgent Studio: Autonomous Multi-Agent Orchestrator',
    category: 'AI Agents & LLMs',
    image: 'assets/images/project-agent.jpg',
    description: 'A cutting-edge platform for orchestrating distributed LLM agents with multi-step reasoning, tool invocation, graph-based routing, and human-in-the-loop intervention safeguards.',
    architecture: 'Built on FastAPI async backend, Python LangGraph, Next.js 14 frontend, WebSocket live event streaming, and Qdrant vector memory storage.',
    metrics: [
      { label: 'Inference Latency', val: '32ms (Streaming)' },
      { label: 'Agent Concurrency', val: '10,000+ Tasks' },
      { label: 'Tool Success Rate', val: '99.1%' }
    ],
    tech: ['Python', 'FastAPI', 'LangGraph', 'TypeScript', 'Next.js', 'WebSockets', 'Qdrant', 'Docker'],
    github: 'https://github.com/bittu-kumar/omniagent-studio',
    demo: 'https://omniagent-studio.dev'
  },
  'rag-engine': {
    title: 'Enterprise RAG Engine & Vector Search Pipeline',
    category: 'AI / Vector Search',
    image: 'assets/images/project-rag.jpg',
    description: 'Scalable hybrid retrieval system supporting dense and sparse retrieval (BM25 + ColBERT / e5-mistral), dynamic reranking, automated chunking, and document lineage tracking.',
    architecture: 'High-throughput document ingestion workers powered by Celery + Redis, FAISS & Qdrant cluster, FastAPI semantic search endpoints, and React analytics telemetry dashboard.',
    metrics: [
      { label: 'Mean Search Latency', val: '2.1ms' },
      { label: 'Indexed Docs', val: '1.2 Million' },
      { label: 'Retrieval Accuracy', val: '98.4%' }
    ],
    tech: ['Python', 'PyTorch', 'Qdrant', 'FastAPI', 'Redis', 'Docker', 'React', 'Tailwind'],
    github: 'https://github.com/bittu-kumar/enterprise-rag-engine',
    demo: 'https://rag-engine.demo.io'
  },
  'visionpulse': {
    title: 'VisionPulse AI: Clinical Radiology Diagnostics Platform',
    category: 'Computer Vision & AI',
    image: 'assets/images/project-vision.jpg',
    description: 'Real-time computer vision system for pulmonary nodule segmentation and automated radiological triage using deep convolutional networks and vision transformers.',
    architecture: 'Trained with PyTorch, exported to TensorRT for low-latency GPU inference, served with Triton Inference Server, and visualized in a DICOM-compliant WebGL interface.',
    metrics: [
      { label: 'Diagnostic AUC-ROC', val: '0.986' },
      { label: 'Inference Speed', val: '14ms / Scan' },
      { label: 'Segmentation Score', val: '91.4% Dice' }
    ],
    tech: ['PyTorch', 'TensorRT', 'Triton Server', 'FastAPI', 'WebGL', 'Three.js', 'Docker'],
    github: 'https://github.com/bittu-kumar/visionpulse-radiology',
    demo: 'https://visionpulse.health.io'
  },
  'neuralsaas': {
    title: 'NeuralSaaS: LLM Observability & Token Analytics',
    category: 'Full-Stack Web & Cloud',
    image: 'assets/images/project-analytics.jpg',
    description: 'Enterprise observability dashboard monitoring LLM latency waterfalls, token consumption costs, prompt cache hit rates, and model hallucination rates across multi-tenant deployments.',
    architecture: 'Full-stack application powered by Next.js 14, Go microservices, ClickHouse time-series data warehouse, Kafka streaming ingestion, and PostgreSQL.',
    metrics: [
      { label: 'Processed Queries', val: '28.4K / hr' },
      { label: 'Cache Hit Rate', val: '64.8%' },
      { label: 'Cost Reduction', val: '38% Avg' }
    ],
    tech: ['Next.js', 'Go', 'ClickHouse', 'PostgreSQL', 'Kafka', 'Chart.js', 'AWS ECS'],
    github: 'https://github.com/bittu-kumar/neuralsaas-analytics',
    demo: 'https://neuralsaas.cloud'
  },
  'voiceflow': {
    title: 'VoiceFlow Copilot: Conversational Voice AI',
    category: 'AI Audio & Real-Time',
    image: 'assets/images/project-voice.jpg',
    description: 'Ultra-low latency duplex voice conversation agent incorporating streaming Whisper ASR, semantic intent detection, and neural TTS synthesis with sub-second roundtrip latency.',
    architecture: 'Bi-directional WebRTC / WebSockets audio pipe connected to Python vLLM & XTTS model instances with audio packet buffering and jitter compensation.',
    metrics: [
      { label: 'Voice RTT Latency', val: '802ms (<1s)' },
      { label: 'ASR Accuracy', val: '98.2% WER' },
      { label: 'Simultaneous Streams', val: '500+ calls' }
    ],
    tech: ['Python', 'WebRTC', 'Whisper ASR', 'FastAPI', 'Node.js', 'Docker', 'WebSockets'],
    github: 'https://github.com/bittu-kumar/voiceflow-copilot',
    demo: 'https://voiceflow.ai-demo.live'
  },
  'synthetix': {
    title: 'Synthetix Data: SLM Fine-Tuning & Evaluation',
    category: 'AI / Data Science',
    image: 'assets/images/project-synth.jpg',
    description: 'Automated synthetic dataset curation and LoRA fine-tuning pipeline for Small Language Models (Llama 3.2, Gemma 2, Phi-3) with automated benchmark evaluation.',
    architecture: 'Ray distributed cluster for parallel LLM prompt synthesis, HuggingFace TRL / Peft library for quantization, and interactive visualization dashboard.',
    metrics: [
      { label: 'Dataset Yield', val: '500k high-quality pairs' },
      { label: 'Model MMLU Gain', val: '+7.4 pts' },
      { label: 'Training Cost', val: '4x Lower vs Base' }
    ],
    tech: ['Python', 'PyTorch', 'HuggingFace', 'Ray Cluster', 'Streamlit', 'Docker', 'GCP'],
    github: 'https://github.com/bittu-kumar/synthetix-data-engine',
    demo: 'https://synthetix-engine.org'
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

