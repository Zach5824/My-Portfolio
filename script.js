// Tab Router Switcher Function
    function switchTab(tabId) {
      // Hide all page views
      const pages = document.querySelectorAll('.page-view');
      pages.forEach(p => p.classList.remove('active-page'));

      // Remove active highlight from all nav tabs
      const navTabs = document.querySelectorAll('.nav-tab');
      navTabs.forEach(t => t.classList.remove('active-tab'));

      // Activate selected page
      const targetPage = document.getElementById(`page-${tabId}`);
      if (targetPage) {
        targetPage.classList.add('active-page');
      }

      // Activate selected tab button
      const targetTab = document.getElementById(`tab-${tabId}`);
      if (targetTab) {
        targetTab.classList.add('active-tab');
      }

      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Mobile Menu Toggle
    function toggleMobileMenu() {
      const mobileMenu = document.getElementById('mobileMenu');
      mobileMenu.classList.toggle('hidden');
      mobileMenu.classList.toggle('flex');
    }
    document.getElementById('mobileMenuBtn').addEventListener('click', toggleMobileMenu);

    // Orbit Canvas Animation
    const canvas = document.getElementById('orbitCanvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
      if (!canvas || !canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let angle = 0;
    function drawOrbit() {
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const rx = canvas.width * 0.38;
      const ry = canvas.height * 0.22;

      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(26, 26, 26, 0.15)';

      const rotations = [0, Math.PI / 3, -Math.PI / 3];

      rotations.forEach((rot, i) => {
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(rot + (angle * 0.2 * (i % 2 === 0 ? 1 : -1)));
        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.restore();
      });

      angle += 0.01;
      requestAnimationFrame(drawOrbit);
    }
    drawOrbit();

    // Project Tag Filtering
    function filterProjects(tag) {
      const filterBtns = document.querySelectorAll('.project-filter-btn');
      filterBtns.forEach(btn => {
        if (btn.getAttribute('data-tag') === tag) {
          btn.classList.add('bg-black', 'text-white', 'border-black');
          btn.classList.remove('bg-white/40', 'text-black/70', 'border-black/20');
        } else {
          btn.classList.remove('bg-black', 'text-white', 'border-black');
          btn.classList.add('bg-white/40', 'text-black/70', 'border-black/20');
        }
      });

      const cards = document.querySelectorAll('.project-card');
      cards.forEach(card => {
        const cardTags = card.getAttribute('data-tags') || '';
        if (tag === 'all' || cardTags.includes(tag)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    }

    // Skill Category Filtering
    function filterSkills(category) {
      const btns = document.querySelectorAll('.skill-filter-btn');
      btns.forEach(b => {
        if (b.getAttribute('data-skill') === category) {
          b.classList.add('bg-black', 'text-white', 'border-black');
          b.classList.remove('bg-white/40', 'text-black/70', 'border-black/20');
        } else {
          b.classList.remove('bg-black', 'text-white', 'border-black');
          b.classList.add('bg-white/40', 'text-black/70', 'border-black/20');
        }
      });

      const skillCards = document.querySelectorAll('.skill-card');
      skillCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (category === 'all' || cat === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    }

    const REPOS = {
      'studio-manager': 'https://github.com/Zach5824/Studio-Manager/tree/main',
      'task-manager': 'https://github.com/Zach5824/task-manager/tree/main',
      'cinema-system': 'https://github.com/Zach5824/movie-theatre-system/tree/main',
      vetty: 'https://github.com/Zach5824/VETTY/tree/main',
      'mood-music': 'https://github.com/Zach5824/MOOSIC/tree/master'
    };

    function openRepository(projectId) {
      const repository = REPOS[projectId];
      if (repository) {
        window.location.assign(repository);
      }
    }

    // Case Study Modal Data
    const projectsData = {
      'studio-manager': {
        category: 'FULL-STACK PLATFORM',
        title: 'Studio Manager',
        badges: ['React', 'Python / Flask', 'REST API', 'SQLite / PostgreSQL', 'Tailwind CSS'],
        description: `
          <p>Studio Manager is a full-stack resource management application designed for creative media studios to streamline room reservations, hardware asset checking, client scheduling, and staff shifts.</p>
          <p>Built with a modular Python/Flask backend using SQLAlchemy models and REST API controllers, paired with a React dynamic frontend.</p>
        `,
        highlights: [
          'Modular Flask backend with RESTful API architecture.',
          'React frontend with state management for instant calendar updates.',
          'Relational database design supporting SQLite in dev & PostgreSQL in production.',
          'Custom responsive UI styled using Tailwind CSS.'
        ],
        link: REPOS['studio-manager']
      },
      'mood-music': {
        category: 'AUDIO WEB APP',
        title: 'Mood-Based Music Discovery App',
        badges: ['Deezer API', 'Vanilla JS', 'LocalStorage', 'CSS Grid'],
        description: `
          <p>An interactive client application that matches user emotional inputs with curated audio parameters and track streams using the Deezer API.</p>
        `,
        highlights: [
          'RESTful integration with Deezer Audio API endpoints.',
          'Local storage persistence for user playlists and favorite tracks.',
          'Responsive grid layout tailored for both desktop and mobile views.'
        ],
        link: REPOS['mood-music']
      },
      'task-manager': {
        category: 'PYTHON TASK MANAGER',
        title: 'Task Manager',
        badges: ['Python', 'CLI', 'Input Validation', 'Task Tracking'],
        description: `
          <p>A command-line task manager for creating, reviewing, completing, and deleting tasks with descriptions and due dates.</p>
        `,
        highlights: [
          'Validates task titles, descriptions, and due dates.',
          'Tracks pending and completed tasks and calculates completion progress.',
          'Separates task operations and input validation into reusable Python modules.'
        ],
        link: REPOS['task-manager']
      },
      'cinema-system': {
        category: 'SYSTEMS & PYTHON CLI',
        title: 'Movie Theater Management CLI',
        badges: ['Python 3', 'OOP Architecture', 'Custom Decorators', 'PyTest'],
        description: `
          <p>A Python terminal software suite engineered with strict Object-Oriented Design principles to manage theater seating arrangements, ticket reservations, and sales logging.</p>
        `,
        highlights: [
          'Encapsulated OOP architecture with distinct domain models.',
          'Custom Python decorators for input validation and logging.',
          'Full unit test suite implemented with PyTest.'
        ],
        link: REPOS['cinema-system']
      },
      vetty: {
        category: 'FULL-STACK PET-CARE MARKETPLACE',
        title: 'Vetty',
        badges: ['React', 'Flask', 'SQLite', 'Stripe', 'M-Pesa'],
        description: `
          <p>A mobile-first pet-care marketplace where customers can browse products and veterinary services, book appointments, and pay by card or M-Pesa.</p>
        `,
        highlights: [
          'React client backed by a Flask REST API and relational persistence.',
          'Customer and administrator experiences with role-based access.',
          'Checkout integrations for Stripe and Safaricom M-Pesa.'
        ],
        link: REPOS.vetty
      }
    };

    function openModal(projectId) {
      const data = projectsData[projectId];
      if (!data) return;

      document.getElementById('modalCategory').innerText = data.category;
      document.getElementById('modalTitle').innerText = data.title;
      document.getElementById('modalDescription').innerHTML = data.description;
      document.getElementById('modalLiveBtn').href = data.link;

      const badgesContainer = document.getElementById('modalBadges');
      badgesContainer.innerHTML = '';
      data.badges.forEach(b => {
        const badgeElem = document.createElement('span');
        badgeElem.className = 'px-2.5 py-1 rounded border border-black/10 bg-black/5';
        badgeElem.innerText = b;
        badgesContainer.appendChild(badgeElem);
      });

      const highlightsContainer = document.getElementById('modalHighlights');
      highlightsContainer.innerHTML = '';
      data.highlights.forEach(h => {
        const item = document.createElement('li');
        item.innerText = h;
        highlightsContainer.appendChild(item);
      });

      const modal = document.getElementById('projectModal');
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      const modal = document.getElementById('projectModal');
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = 'auto';
    }

    // Articles Modal Data
    const articlesData = {
      'question': {
        num: 'FIELD NOTE 01',
        title: 'Start with the real question.',
        body: `
          <p>When starting a new software project or building a full-stack feature, it is easy to get caught up in framework choices or over-engineering backends before defining the core problem.</p>
          <p>I focus on identifying the exact user requirement or data workflow first. Once the core requirement is clear, building clean REST endpoints and modular UI components becomes straightforward.</p>
        `
      },
      'sing': {
        num: 'FIELD NOTE 02',
        title: 'Make it clear, then make it sing.',
        body: `
          <p>Visual simplicity requires discipline. Clear layout structure, generous whitespace, legible typography, and predictable interaction models are far more impactful than unnecessary visual clutter.</p>
          <p>Refining a design means stripping away noise until every element on the screen serves a purpose.</p>
        `
      },
            'design': { num: 'FIELD NOTE 04', title: 'Design the API before the UI.', body: `<p>I sketch the endpoints, request bodies and response shapes before writing components. It exposes missing data early and turns the frontend into a consumer of a stable contract.</p><p>Consistent naming, honest status codes and clear error messages make an API pleasant to build against, including for future me.</p>` },
      'test': { num: 'FIELD NOTE 05', title: 'Test the boring parts.', body: `<p>Seat allocation, input validation and date handling look trivial until they fail in production. A small PyTest suite around them pays for itself the first time I refactor.</p><p>Tests also document intent: they show what the code is supposed to do, not just what it happens to do.</p>` },
      'small': { num: 'FIELD NOTE 06', title: 'Ship small, refactor often.', body: `<p>I work in short Git branches with focused commits. When a module starts to feel awkward, I reshape it while it is still small instead of waiting for a rewrite.</p>` },
      'beginner': {
        num: 'FIELD NOTE 03',
        title: "Stay curious. Keep a beginner's mind.",
        body: `
          <p>Web technology evolves rapidly—from React state libraries to Python frameworks. Maintaining curiosity and an eager learning mindset ensures continuous growth as a developer.</p>
        `
      }
    };

    function openArticleModal(id) {
      const data = articlesData[id];
      if (!data) return;

      document.getElementById('artNumber').innerText = data.num;
      document.getElementById('artTitle').innerText = data.title;
      document.getElementById('artBody').innerHTML = data.body;

      const modal = document.getElementById('articleModal');
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.style.overflow = 'hidden';
    }

    function closeArticleModal() {
      const modal = document.getElementById('articleModal');
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = 'auto';
    }

    // Copy Email to Clipboard Helper
    function copyEmail() {
      const emailText = 'zach@devportfolio.com';
      
      const el = document.createElement('textarea');
      el.value = emailText;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);

      const copyText = document.getElementById('copyText');
      copyText.innerText = 'Copied to Clipboard!';
      setTimeout(() => {
        copyText.innerText = 'Copy Email Address';
      }, 3000);
    }

    // Contact Form Handler
    function handleFormSubmit(e) {
      e.preventDefault();
      const feedback = document.getElementById('formFeedback');
      const n = document.getElementById('name').value, em = document.getElementById('email').value, m = document.getElementById('message').value;
      window.location.href = 'mailto:zach@devportfolio.com?subject=' + encodeURIComponent('Portfolio message from ' + n) + '&body=' + encodeURIComponent(m + '\n\n' + n + ' (' + em + ')');
      feedback.classList.remove('hidden');
      document.getElementById('contactForm').reset();
      setTimeout(() => {
        feedback.classList.add('hidden');
      }, 4000);
    }
