// main.js - Core functionality
(function() {
  'use strict';
  
  // Navigation active state
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPage.includes(href.replace('pages/', ''))) {
      link.classList.add('active');
    } else if (currentPage === 'index.html' && href === 'index.html') {
      link.classList.add('active');
    }
  });
  
  // Download simulation (for Tetsuo pages)
  window.downloadFile = function(filename, content, mimeType = 'application/zip') {
    const blob = new Blob([content], { type: mimeType });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(link.href), 150);
  };
  
  window.generateDummyZip = function(themeName) {
    return `NEO TOKYO CREW - ${themeName}
=================================
Fusion of Cyberpunk & Street Culture
Tetsuo WordPress Theme + Craffiticrew Assets

#wordpress #webdesign #streetart #cyberpunk #manga

heoheoheoheo... glitch data fragment. 鉄雄 // GOBE
`;
  };
  
  // Page switching (for multi-page sections)
  window.switchPage = function(pageId) {
    document.querySelectorAll('.page-section').forEach(p => p.classList.remove('active-page'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    const page = document.getElementById(`page-${pageId}`);
    if (page) page.classList.add('active-page');
    
    const activeBtn = Array.from(document.querySelectorAll('.tab-btn'))
      .find(btn => btn.dataset.page === pageId);
    if (activeBtn) activeBtn.classList.add('active');
  };
  
  // Initialize any download buttons
  document.addEventListener('DOMContentLoaded', () => {
    // Attach download handlers
    const downloadButtons = document.querySelectorAll('[data-download]');
    downloadButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const filename = btn.dataset.download || 'download.zip';
        const themeName = btn.dataset.theme || 'Neo Tokyo Crew';
        downloadFile(filename, generateDummyZip(themeName));
      });
    });
    
    // Tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const page = btn.dataset.page;
        if (page) switchPage(page);
      });
    });
    
    // Join form handler
    const joinForm = document.querySelector('.join-form-street');
    if (joinForm) {
      joinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = joinForm.querySelector('input[type="text"]');
        const name = nameInput?.value || 'STREET ARTIST';
        alert(`🔥 WELCOME TO THE CREW, ${name}! 🔥\nGOBE · LOREM · TETSUO · YOU ARE IN.`);
      });
    }
    
    console.log('🔥 NEO TOKYO CREW // TETSUO × CRAFFITI // SYSTEM ONLINE 🔥');
  });
  
})();
