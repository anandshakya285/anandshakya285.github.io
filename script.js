/**
 * Anand Shakya — Personal Portfolio Interactive Scripts
 * Lightweight, vanilla JavaScript with zero external runtime dependencies.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. DYNAMIC YEAR
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2. THEME TOGGLE (Dark / Light)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const rootHtml = document.documentElement;

  // Retrieve saved theme or system preference
  const savedTheme = localStorage.getItem('anand_portfolio_theme');
  if (savedTheme) {
    rootHtml.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    rootHtml.setAttribute('data-theme', 'light');
  } else {
    rootHtml.setAttribute('data-theme', 'dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = rootHtml.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      rootHtml.setAttribute('data-theme', newTheme);
      localStorage.setItem('anand_portfolio_theme', newTheme);
    });
  }

  // 3. MOBILE DRAWER NAVIGATION
  const mobileToggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggleBtn && mobileDrawer) {
    mobileToggleBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggleBtn.setAttribute('aria-expanded', isOpen);
      mobileDrawer.setAttribute('aria-hidden', !isOpen);

      // Icon toggle
      const openIcon = mobileToggleBtn.querySelector('.menu-open-icon');
      const closeIcon = mobileToggleBtn.querySelector('.menu-close-icon');
      if (openIcon && closeIcon) {
        openIcon.style.display = isOpen ? 'none' : 'block';
        closeIcon.style.display = isOpen ? 'block' : 'none';
      }
    });

    // Close drawer when any nav link is tapped
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggleBtn.setAttribute('aria-expanded', 'false');
        mobileDrawer.setAttribute('aria-hidden', 'true');
        const openIcon = mobileToggleBtn.querySelector('.menu-open-icon');
        const closeIcon = mobileToggleBtn.querySelector('.menu-close-icon');
        if (openIcon && closeIcon) {
          openIcon.style.display = 'block';
          closeIcon.style.display = 'none';
        }
      });
    });
  }

  // 4. ACTIVE NAVIGATION LINK ON SCROLL
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        desktopNavLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  };

  const sectionObserver = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach(section => sectionObserver.observe(section));

  // 5. ESCAPE KEY LISTENER FOR MODAL
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeWorkflowModal();
    }
  });

  // Close modal when clicking outside dialog
  const modalOverlay = document.getElementById('workflow-modal');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeWorkflowModal();
      }
    });
  }
});

/**
 * 6. COPY OUTREACH MESSAGE TO CLIPBOARD
 */
function copyOutreachMessage() {
  const templateEl = document.getElementById('outreach-template');
  const btnText = document.getElementById('copy-btn-text');
  const btn = document.getElementById('copy-message-btn');

  if (!templateEl) return;

  const textToCopy = templateEl.innerText || templateEl.textContent;

  navigator.clipboard.writeText(textToCopy).then(() => {
    if (btnText) btnText.textContent = 'Message Copied!';
    if (btn) btn.classList.add('btn-copied');

    setTimeout(() => {
      if (btnText) btnText.textContent = 'Copy Outreach Message';
      if (btn) btn.classList.remove('btn-copied');
    }, 2500);
  }).catch(err => {
    console.error('Failed to copy text: ', err);
  });
}

/**
 * 7. ARCHITECTURE & WORKFLOW MODALS
 */
const projectData = {
  ojas: {
    badge: 'Garment ERP Architecture',
    title: 'Ojas Apparels — Technical & Workflow Architecture',
    html: `
      <div class="modal-detail-content">
        <p style="margin-bottom: 16px; color: var(--text-secondary); line-height: 1.6;">
          <strong>Ojas Apparels</strong> is an in-development business management system engineered to automate the operational intricacies of Indian shirt manufacturing and wholesale distribution.
        </p>

        <h4 style="font-size: 1rem; margin-top: 18px; margin-bottom: 10px; color: var(--text-primary);">
          Core 7-Stage Shirt Manufacturing Workflow
        </h4>
        <div class="workflow-step-list">
          <div class="workflow-step">
            <span class="step-num">1</span>
            <div class="step-text">
              <h5>Fabric &amp; Trims Purchase</h5>
              <p>Meters of cotton/linen fabric, gross of buttons, and thread spools recorded with Weighted Average Cost (WAC) valuation.</p>
            </div>
          </div>
          <div class="workflow-step">
            <span class="step-num">2</span>
            <div class="step-text">
              <h5>Cutting &amp; Bundling</h5>
              <p>Fabric cut into pieces and allocated across collar sizes: 38, 40, 42, 44, and 46.</p>
            </div>
          </div>
          <div class="workflow-step">
            <span class="step-num">3</span>
            <div class="step-text">
              <h5>Job-Work Tailor Stitching</h5>
              <p>Dispatch to home-based tailors with piece-rate tracking, returned counts, and rejection monitoring.</p>
            </div>
          </div>
          <div class="workflow-step">
            <span class="step-num">4</span>
            <div class="step-text">
              <h5>Button &amp; Buttonhole Processing</h5>
              <p>Outside vendor processing with automated payable ledger calculation.</p>
            </div>
          </div>
          <div class="workflow-step">
            <span class="step-num">5</span>
            <div class="step-text">
              <h5>Thread Cutting &amp; Quality Control</h5>
              <p>Rigorous inspection separating accepted garments from repairable or rejected units.</p>
            </div>
          </div>
          <div class="workflow-step">
            <span class="step-num">6</span>
            <div class="step-text">
              <h5>Ironing &amp; Packaging</h5>
              <p>Final polybagging and master carton boxing ready for inventory credit.</p>
            </div>
          </div>
          <div class="workflow-step">
            <span class="step-num">7</span>
            <div class="step-text">
              <h5>Finished Goods Perpetual Inventory</h5>
              <p>Automated stock credit into collar-size matrix (38–46) with perpetual double-entry movement ledger.</p>
            </div>
          </div>
        </div>

        <h4 style="font-size: 1rem; margin-top: 24px; margin-bottom: 10px; color: var(--text-primary);">
          Technical Highlights
        </h4>
        <ul style="padding-left: 20px; color: var(--text-secondary); line-height: 1.7; font-size: 0.875rem;">
          <li><strong>Framework:</strong> Next.js 14 App Router + TypeScript with Server Actions and Route Handlers.</li>
          <li><strong>Database &amp; ORM:</strong> SQLite with Prisma ORM 5 for reliable local-first persistence.</li>
          <li><strong>Business Logic Rules:</strong> Strict payment-before-dispatch policy with owner override audit logs.</li>
          <li><strong>Invoicing:</strong> Compliant GST invoice generation (OA/26-27/xxxx) with A4 print-ready output.</li>
        </ul>
      </div>
    `
  },
  student: {
    badge: 'Academic Software Engineering',
    title: 'Student Management System — Technical Architecture',
    html: `
      <div class="modal-detail-content">
        <p style="margin-bottom: 16px; color: var(--text-secondary); line-height: 1.6;">
          An academic software engineering project developed as part of the B.Tech curriculum at Maharishi University of Information Technology to study practical database integration and graphical interface design.
        </p>

        <h4 style="font-size: 1rem; margin-top: 18px; margin-bottom: 10px; color: var(--text-primary);">
          System Modules &amp; Data Flow
        </h4>
        <div class="workflow-step-list">
          <div class="workflow-step">
            <span class="step-num">1</span>
            <div class="step-text">
              <h5>Desktop GUI Layer (Tkinter)</h5>
              <p>Clean desktop forms with input validation for student records, enrollment details, and search parameters.</p>
            </div>
          </div>
          <div class="workflow-step">
            <span class="step-num">2</span>
            <div class="step-text">
              <h5>Query &amp; Search Processing</h5>
              <p>Real-time filtering by roll number or name with dynamic tabular results display.</p>
            </div>
          </div>
          <div class="workflow-step">
            <span class="step-num">3</span>
            <div class="step-text">
              <h5>Record Management &amp; Confirmation Safeguards</h5>
              <p>Update existing records and delete records with mandatory user confirmation dialogues.</p>
            </div>
          </div>
          <div class="workflow-step">
            <span class="step-num">4</span>
            <div class="step-text">
              <h5>Database Engine (SQLite)</h5>
              <p>Persistent storage in <code>students.db</code> with automatic database and table initialization on first execution.</p>
            </div>
          </div>
        </div>

        <h4 style="font-size: 1rem; margin-top: 24px; margin-bottom: 10px; color: var(--text-primary);">
          Key Academic Learnings
        </h4>
        <ul style="padding-left: 20px; color: var(--text-secondary); line-height: 1.7; font-size: 0.875rem;">
          <li>Hands-on implementation of relational tables, SQL queries, and parameter substitution to prevent injection.</li>
          <li>Desktop event-driven programming concepts with Python Tkinter.</li>
          <li>Data persistence lifecycle and database recovery fundamentals.</li>
        </ul>
      </div>
    `
  }
};

function openWorkflowModal(projectId) {
  const data = projectData[projectId];
  if (!data) return;

  const modal = document.getElementById('workflow-modal');
  const badge = document.getElementById('modal-badge');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');

  if (modal && badge && title && body) {
    badge.textContent = data.badge;
    title.textContent = data.title;
    body.innerHTML = data.html;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function closeWorkflowModal() {
  const modal = document.getElementById('workflow-modal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}
