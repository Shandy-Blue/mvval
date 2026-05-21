// ===========================
// NAVBAR SCROLL BEHAVIOR
// ===========================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });


// ===========================
// HAMBURGER MENU
// ===========================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});


// ===========================
// SCROLL REVEAL
// ===========================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

const revealSelectors = [
  '.vm-card',
  '.value-card',
  '.service-card',
  '.project-card',
  '.accred-card',
  '.org-node',
  '.stat',
  '.company-desc',
  '.bg-text-col p',
  '.accred-intro',
  '.contact-tagline',
  '.contact-item',
  '.section-title',
];

revealSelectors.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('reveal');
    const delay = i % 4;
    if (delay > 0) el.classList.add(`reveal-delay-${delay}`);
    revealObserver.observe(el);
  });
});


// ===========================
// SMOOTH ANCHOR SCROLLING
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 16;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


// ===========================
// ACTIVE NAV LINK HIGHLIGHT
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--teal)' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));


// ===========================
// PROJECT DATA
// ===========================
const projectData = {
  proj01: {
    title: 'EVO CITY BPO 1 & 2',
    status: 'COMPLETED',
    statusClass: 'completed',
    category: 'COMMERCIAL',
    description: 'Masonry and interior fit-out works for two BPO office floors at EVO City commercial development in Kawit, Cavite. Works included structural masonry, interior partitions, and architectural finishing to commercial-grade standards.',
    location: 'Evo City, Kawit, Cavite',
    client: 'JFides Construction & Supply',
    contract: '₱ 7,650,000',
    date: 'Q4 2024',
    scope: ['Masonry Works', 'Fit-Out Works'],
    ref: 'EVO-BPO-01-02',
    img: 'images/proj-evo.jpg',
  },
  proj02: {
    title: 'AYALA MALLS VERMOSA',
    status: 'COMPLETED',
    statusClass: 'completed',
    category: 'ARCHITECTURAL FINISHING',
    description: 'Comprehensive architectural finishing for Ayala Malls Vermosa retail development in Imus, Cavite. Works covered all public mall areas including premium tiling, decorative ceiling systems, and full painting throughout the facility.',
    location: 'Vermosa Estate, Imus, Cavite',
    client: 'JFides Construction & Supply',
    contract: '₱ 16,900,000',
    date: 'Q1 2025',
    scope: ['Tiling Works', 'Ceiling Works', 'Painting Works'],
    ref: 'AML-VRM-FIT-01',
    img: 'images/proj-ayala.jpg',
  },
  proj03: {
    title: 'FLOOD CONTROL STRUCTURE',
    status: 'ONGOING',
    statusClass: 'ongoing',
    category: 'INFRASTRUCTURE',
    description: 'Major civil infrastructure project for flood mitigation in Barangay Bagong Silangan, Quezon City. Scope includes reinforced concrete flood control structures, retaining walls, drainage systems, and associated earthworks. Currently executing Phase 2 of 4.',
    location: 'Brgy. Bagong Silangan, Quezon City',
    client: 'Topnotch Catalyst Builders Inc.',
    contract: '₱ 35,000,000',
    date: 'In Progress — Phase 02 of 04',
    scope: ['Structural Works', 'Civil Works', 'Earth Works'],
    ref: 'QC-FLD-STR-01',
    img: 'images/proj-flood.jpg',
  },
};

// Thumbnail zoom positions to simulate multiple views of the same photo
const thumbPositions = ['center', 'top', 'bottom'];


// ===========================
// PROJECT MODAL
// ===========================
const projectModal = document.getElementById('projectModal');
const projectModalClose = document.getElementById('projectModalClose');

function openProjectModal(projectId) {
  const data = projectData[projectId];
  if (!data) return;

  // Status badge
  const statusEl = document.getElementById('modalProjStatus');
  statusEl.textContent = `● ${data.status} · ${data.category}`;
  statusEl.className = `modal-proj-status ${data.statusClass}`;

  // Title + description
  document.getElementById('modalProjTitle').textContent = data.title;
  document.getElementById('modalProjDesc').textContent = data.description;

  // Cover image — real photo
  const cover = document.getElementById('modalCover');
  cover.style.backgroundImage = `url('${data.img}')`;
  cover.style.backgroundSize = 'cover';
  cover.style.backgroundPosition = 'center';

  // Thumbnails — same photo, different zoom positions
  const thumbsEl = document.getElementById('modalThumbs');
  thumbsEl.innerHTML = '';
  thumbPositions.forEach((pos, i) => {
    const thumb = document.createElement('div');
    thumb.className = `modal-thumb${i === 0 ? ' active' : ''}`;
    thumb.style.backgroundImage = `url('${data.img}')`;
    thumb.style.backgroundSize = 'cover';
    thumb.style.backgroundPosition = pos;
    thumb.setAttribute('title', ['Overview', 'Upper', 'Lower'][i]);
    thumb.addEventListener('click', () => {
      thumbsEl.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      cover.style.backgroundPosition = pos;
    });
    thumbsEl.appendChild(thumb);
  });

  // Details table
  const details = document.getElementById('modalProjDetails');
  details.innerHTML = `
    <div class="modal-detail-row">
      <span class="modal-detail-key">Location</span>
      <span class="modal-detail-val">${data.location}</span>
    </div>
    <div class="modal-detail-row">
      <span class="modal-detail-key">Client</span>
      <span class="modal-detail-val">${data.client}</span>
    </div>
    <div class="modal-detail-row">
      <span class="modal-detail-key">Contract</span>
      <span class="modal-detail-val accent-val">${data.contract}</span>
    </div>
    <div class="modal-detail-row">
      <span class="modal-detail-key">Completion</span>
      <span class="modal-detail-val">${data.date}</span>
    </div>
    <div class="modal-detail-row">
      <span class="modal-detail-key">Scope</span>
      <div class="modal-detail-val">
        <div class="modal-scope-chips">${data.scope.map(s => `<span>${s}</span>`).join('')}</div>
      </div>
    </div>
    <div class="modal-detail-row">
      <span class="modal-detail-key">Reference</span>
      <span class="modal-detail-val">${data.ref}</span>
    </div>
  `;

  projectModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  projectModal.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => openProjectModal(card.id));
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openProjectModal(card.id);
    }
  });
});

projectModalClose.addEventListener('click', closeProjectModal);
projectModal.addEventListener('click', e => {
  if (e.target === projectModal) closeProjectModal();
});


// ===========================
// ACCREDITATION DATA
// ===========================
const accredData = [
  {
    issuer: 'Securities & Exchange Commission',
    title: 'CERTIFICATE OF INCORPORATION',
    img: 'images/cert-sec.png',
  },
  {
    issuer: 'City of General Trias, Province of Cavite',
    title: 'INTEGRATED LGU PERMIT',
    img: 'images/cert-lgu.png',
  },
  {
    issuer: 'PCAB · DTI Phil. Contractors Accreditation Board',
    title: "REGULAR CONTRACTOR'S LICENSE",
    img: 'images/cert-pcab.png',
  },
  {
    issuer: 'Bureau of Internal Revenue',
    title: 'CERTIFICATE OF REGISTRATION',
    img: 'images/cert-bir.png',
  },
  {
    issuer: 'CRIF Philippines · Vendor Integrity Access',
    title: 'AYALA LAND PREQUALIFIED VENDOR',
    img: 'images/cert-ayala.png',
  },
];


// ===========================
// ACCREDITATION MODAL
// ===========================
const accredModal = document.getElementById('accredModal');
const accredModalClose = document.getElementById('accredModalClose');

function openAccredModal(id) {
  const data = accredData[id];
  if (!data) return;

  document.getElementById('certImage').src = data.img;
  document.getElementById('certImage').alt = data.title;
  document.getElementById('certTitle').textContent = data.title;
  document.getElementById('certIssuer').textContent = data.issuer;

  accredModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeAccredModal() {
  accredModal.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.accred-card').forEach(card => {
  card.addEventListener('click', () => {
    openAccredModal(parseInt(card.getAttribute('data-accred-id')));
  });
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openAccredModal(parseInt(card.getAttribute('data-accred-id')));
    }
  });
});

accredModalClose.addEventListener('click', closeAccredModal);
accredModal.addEventListener('click', e => {
  if (e.target === accredModal) closeAccredModal();
});


// ===========================
// ESC KEY — close any open modal
// ===========================
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (projectModal.classList.contains('open')) closeProjectModal();
    if (accredModal.classList.contains('open')) closeAccredModal();
  }
});
