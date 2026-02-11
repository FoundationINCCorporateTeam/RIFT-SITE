// ═══════════════════════════════════════════════════════════════════
// RIFT OFFICIAL WEBSITE - MAIN JAVASCRIPT
// Modern, vanilla JavaScript for all interactive functionality
// ═══════════════════════════════════════════════════════════════════

(function() {
  'use strict';

  // ═══════════════════════════════════════════════════════════════════
  // THEME MANAGEMENT
  // ═══════════════════════════════════════════════════════════════════

  const ThemeManager = {
    init() {
      this.themeToggle = document.getElementById('theme-toggle');
      this.currentTheme = localStorage.getItem('theme') || 'light';
      
      this.applyTheme(this.currentTheme);
      
      if (this.themeToggle) {
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
      }
    },

    applyTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      this.currentTheme = theme;
      localStorage.setItem('theme', theme);
      
      if (this.themeToggle) {
        this.themeToggle.textContent = theme === 'dark' ? '☀' : '🌙';
        this.themeToggle.setAttribute('aria-label', 
          theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      }
    },

    toggleTheme() {
      const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
      this.applyTheme(newTheme);
    }
  };

  // ═══════════════════════════════════════════════════════════════════
  // NAVIGATION
  // ═══════════════════════════════════════════════════════════════════

  const Navigation = {
    init() {
      this.header = document.querySelector('.site-header');
      this.mobileToggle = document.querySelector('.mobile-menu-toggle');
      this.navMain = document.querySelector('.nav-main');
      this.navLinks = document.querySelectorAll('.nav-main a');
      
      // Scroll behavior
      window.addEventListener('scroll', () => this.handleScroll());
      
      // Mobile menu
      if (this.mobileToggle) {
        this.mobileToggle.addEventListener('click', () => this.toggleMobileMenu());
      }
      
      // Active nav highlighting
      this.highlightActiveNav();
      
      // Smooth scroll for anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => this.smoothScroll(e));
      });
    },

    handleScroll() {
      if (this.header) {
        if (window.scrollY > 50) {
          this.header.classList.add('scrolled');
        } else {
          this.header.classList.remove('scrolled');
        }
      }
    },

    toggleMobileMenu() {
      if (this.navMain) {
        this.navMain.classList.toggle('active');
      }
    },

    highlightActiveNav() {
      const currentPath = window.location.pathname;
      this.navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPath) {
          link.classList.add('active');
        }
      });
    },

    smoothScroll(e) {
      const href = e.currentTarget.getAttribute('href');
      if (href.startsWith('#') && href.length > 1) {
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    }
  };

  // ═══════════════════════════════════════════════════════════════════
  // INTERSECTION OBSERVER (Reveal Animations)
  // ═══════════════════════════════════════════════════════════════════

  const RevealObserver = {
    init() {
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      };

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      }, observerOptions);

      // Observe all reveal elements
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
        this.observer.observe(el);
      });
    }
  };

  // ═══════════════════════════════════════════════════════════════════
  // TERMINAL TYPING ANIMATION
  // ═══════════════════════════════════════════════════════════════════

  const TerminalTyping = {
    init() {
      this.terminals = document.querySelectorAll('[data-terminal-type]');
      this.terminals.forEach(terminal => this.animateTerminal(terminal));
    },

    async animateTerminal(terminal) {
      const lines = JSON.parse(terminal.getAttribute('data-terminal-lines') || '[]');
      const container = terminal.querySelector('.terminal-body');
      
      if (!container || lines.length === 0) return;

      container.innerHTML = '';
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        await this.typeLine(container, line);
        await this.wait(500);
      }
    },

    async typeLine(container, lineData) {
      const lineEl = document.createElement('div');
      lineEl.className = 'terminal-line';
      
      if (lineData.prompt) {
        const promptEl = document.createElement('span');
        promptEl.className = 'terminal-prompt';
        promptEl.textContent = lineData.prompt;
        lineEl.appendChild(promptEl);
      }

      const contentEl = document.createElement('span');
      contentEl.className = lineData.type === 'output' ? 'terminal-output' : 'terminal-command';
      lineEl.appendChild(contentEl);
      
      const cursor = document.createElement('span');
      cursor.className = 'terminal-cursor';
      lineEl.appendChild(cursor);
      
      container.appendChild(lineEl);

      // Type out the text
      const text = lineData.text || '';
      for (let i = 0; i < text.length; i++) {
        contentEl.textContent += text[i];
        await this.wait(lineData.speed || 50);
      }
      
      // Remove cursor after typing
      cursor.remove();
    },

    wait(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  };

  // ═══════════════════════════════════════════════════════════════════
  // CODE COMPARISON ENGINE
  // ═══════════════════════════════════════════════════════════════════

  const CodeComparison = {
    init() {
      this.comparisonContainer = document.getElementById('comparison-container');
      this.languageFilter = document.getElementById('language-filter');
      this.taskFilter = document.getElementById('task-filter');
      
      if (!this.comparisonContainer) return;
      
      // Load data and render
      if (typeof window.comparisonData !== 'undefined') {
        this.data = window.comparisonData;
        this.setupFilters();
        this.render();
      }
    },

    setupFilters() {
      if (this.languageFilter) {
        this.languageFilter.addEventListener('change', () => this.render());
      }
      if (this.taskFilter) {
        this.taskFilter.addEventListener('change', () => this.render());
      }
    },

    render() {
      if (!this.comparisonContainer || !this.data) return;

      const selectedLanguage = this.languageFilter ? this.languageFilter.value : 'all';
      const selectedTask = this.taskFilter ? this.taskFilter.value : 'all';

      let filteredData = this.data;

      if (selectedLanguage !== 'all') {
        filteredData = filteredData.filter(item => item.language === selectedLanguage);
      }

      if (selectedTask !== 'all') {
        filteredData = filteredData.filter(item => item.task === selectedTask);
      }

      this.comparisonContainer.innerHTML = '';
      
      filteredData.forEach((item, index) => {
        const card = this.createComparisonCard(item, index);
        this.comparisonContainer.appendChild(card);
      });
    },

    createComparisonCard(data, index) {
      const card = document.createElement('div');
      card.className = 'comparison-card reveal';
      card.style.animationDelay = `${index * 0.1}s`;

      const lines = data.code.split('\n').length;
      const chars = data.code.length;

      card.innerHTML = `
        <div class="comparison-header">
          <div class="comparison-language">${data.language}</div>
          <div class="comparison-metrics">
            <div class="comparison-metric">
              <span class="comparison-metric-value">${lines}</span>
              <span>lines</span>
            </div>
            <div class="comparison-metric">
              <span class="comparison-metric-value">${chars}</span>
              <span>chars</span>
            </div>
          </div>
        </div>
        <div class="comparison-code">
          <pre class="code-highlight"><code>${this.highlightCode(data.code, data.language)}</code></pre>
        </div>
      `;

      return card;
    },

    highlightCode(code, language) {
      // Basic syntax highlighting
      if (language.toLowerCase() === 'rift') {
        return this.highlightRift(code);
      }
      return this.escapeHtml(code);
    },

    highlightRift(code) {
      const keywords = ['let', 'mut', 'const', 'conduit', 'make', 'if', 'else', 'while', 'repeat', 
                       'check', 'when', 'stop', 'next', 'give', 'yield', 'build', 'extend', 'me', 
                       'parent', 'static', 'get', 'set', 'grab', 'share', 'as', 'try', 'catch', 
                       'finally', 'fail', 'async', 'wait', 'and', 'or', 'not', 'in', 'yes', 'no', 'none'];
      
      const operators = ['@', '#', '~', '!', '=!', '-!', '~!', '??', '?.', '?~', '::', '..', '...'];
      
      let highlighted = this.escapeHtml(code);
      
      // Highlight keywords
      keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'g');
        highlighted = highlighted.replace(regex, `<span class="keyword">${keyword}</span>`);
      });
      
      // Highlight strings
      highlighted = highlighted.replace(/(['"`])(?:(?=(\\?))\2.)*?\1/g, match => {
        return `<span class="string">${match}</span>`;
      });
      
      // Highlight numbers
      highlighted = highlighted.replace(/\b\d+(\.\d+)?\b/g, match => {
        return `<span class="number">${match}</span>`;
      });
      
      // Highlight comments
      highlighted = highlighted.replace(/(#[^\n]*)/g, match => {
        return `<span class="comment">${match}</span>`;
      });
      
      // Highlight delimiters
      highlighted = highlighted.replace(/(@|#)/g, match => {
        return `<span class="delimiter">${match}</span>`;
      });
      
      return highlighted;
    },

    escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }
  };

  // ═══════════════════════════════════════════════════════════════════
  // COPY TO CLIPBOARD
  // ═══════════════════════════════════════════════════════════════════

  const CopyButtons = {
    init() {
      document.querySelectorAll('[data-copy]').forEach(button => {
        button.addEventListener('click', (e) => this.copy(e));
      });
    },

    async copy(e) {
      const button = e.currentTarget;
      const target = button.getAttribute('data-copy-target');
      const text = button.getAttribute('data-copy') || 
                   document.querySelector(target)?.textContent || '';

      try {
        await navigator.clipboard.writeText(text);
        
        const originalText = button.textContent;
        button.textContent = '✓ Copied!';
        button.style.backgroundColor = 'var(--color-success)';
        button.style.color = 'white';
        
        setTimeout(() => {
          button.textContent = originalText;
          button.style.backgroundColor = '';
          button.style.color = '';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
        button.textContent = '✗ Failed';
        setTimeout(() => {
          button.textContent = 'Copy';
        }, 2000);
      }
    }
  };

  // ═══════════════════════════════════════════════════════════════════
  // TABS
  // ═══════════════════════════════════════════════════════════════════

  const Tabs = {
    init() {
      document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', (e) => this.switchTab(e));
      });
    },

    switchTab(e) {
      const button = e.currentTarget;
      const tabsContainer = button.closest('.tabs-container');
      const targetPanel = button.getAttribute('data-tab-target');

      if (!tabsContainer || !targetPanel) return;

      // Deactivate all tabs and panels
      tabsContainer.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
      });
      tabsContainer.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
      });

      // Activate clicked tab and corresponding panel
      button.classList.add('active');
      const panel = tabsContainer.querySelector(`#${targetPanel}`);
      if (panel) {
        panel.classList.add('active');
      }
    }
  };

  // ═══════════════════════════════════════════════════════════════════
  // LINE REDUCER VISUALIZATION
  // ═══════════════════════════════════════════════════════════════════

  const LineReducer = {
    init() {
      this.containers = document.querySelectorAll('.line-reducer');
      this.containers.forEach(container => this.animate(container));
    },

    animate(container) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.startAnimation(container);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });

      observer.observe(container);
    },

    startAnimation(container) {
      const codeLines = container.querySelectorAll('.code-line');
      codeLines.forEach((line, index) => {
        setTimeout(() => {
          line.style.animation = 'fade-in 0.5s ease forwards';
          line.style.animationDelay = `${index * 0.05}s`;
        }, 100);
      });
    }
  };

  // ═══════════════════════════════════════════════════════════════════
  // TABLE OF CONTENTS (Docs)
  // ═══════════════════════════════════════════════════════════════════

  const TableOfContents = {
    init() {
      this.tocLinks = document.querySelectorAll('.toc-list a');
      this.sections = [];

      // Gather all sections
      this.tocLinks.forEach(link => {
        const targetId = link.getAttribute('href').substring(1);
        const section = document.getElementById(targetId);
        if (section) {
          this.sections.push({ link, section });
        }
      });

      if (this.sections.length > 0) {
        window.addEventListener('scroll', () => this.highlightCurrent());
        this.highlightCurrent();
      }
    },

    highlightCurrent() {
      const scrollPosition = window.scrollY + 100;

      let currentSection = null;
      this.sections.forEach(({ section }) => {
        const sectionTop = section.offsetTop;
        if (scrollPosition >= sectionTop) {
          currentSection = section;
        }
      });

      this.sections.forEach(({ link, section }) => {
        if (section === currentSection) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  };

  // ═══════════════════════════════════════════════════════════════════
  // INSTALL SCRIPT ANIMATION
  // ═══════════════════════════════════════════════════════════════════

  const InstallAnimation = {
    init() {
      this.installTerminals = document.querySelectorAll('[data-install-animation]');
      this.installTerminals.forEach(terminal => this.setupAnimation(terminal));
    },

    setupAnimation(terminal) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animate(terminal);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      observer.observe(terminal);
    },

    async animate(terminal) {
      const body = terminal.querySelector('.terminal-body');
      if (!body) return;

      body.innerHTML = '';

      const steps = [
        { prompt: '$ ', text: 'curl -fsSL https://rift.astroyds.com/rift/install.sh | sh', type: 'command' },
        { text: 'Downloading RIFT installer...', type: 'output' },
        { text: '✓ Downloaded successfully', type: 'output' },
        { text: 'Installing RIFT...', type: 'output' },
        { text: '✓ RIFT installed to /usr/local/bin/rift', type: 'output' },
        { text: 'Verifying installation...', type: 'output' },
        { prompt: '$ ', text: 'rift --version', type: 'command' },
        { text: 'RIFT v1.0.0', type: 'output' }
      ];

      for (let step of steps) {
        await this.addLine(body, step);
        await this.wait(step.type === 'command' ? 1000 : 500);
      }
    },

    async addLine(container, data) {
      const line = document.createElement('div');
      line.className = 'terminal-line';

      if (data.prompt) {
        const prompt = document.createElement('span');
        prompt.className = 'terminal-prompt';
        prompt.textContent = data.prompt;
        line.appendChild(prompt);
      }

      const content = document.createElement('span');
      content.className = data.type === 'output' ? 'terminal-output' : 'terminal-command';
      line.appendChild(content);

      container.appendChild(line);

      // Type effect for commands
      if (data.type === 'command') {
        for (let char of data.text) {
          content.textContent += char;
          await this.wait(30);
        }
      } else {
        content.textContent = data.text;
      }
    },

    wait(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  };

  // ═══════════════════════════════════════════════════════════════════
  // SHAREABLE STATE (URL Hash)
  // ═══════════════════════════════════════════════════════════════════

  const ShareableState = {
    init() {
      // Load state from URL hash
      this.loadFromHash();
      
      // Save state when filters change
      const filters = document.querySelectorAll('.filter-select');
      filters.forEach(filter => {
        filter.addEventListener('change', () => this.saveToHash());
      });
    },

    loadFromHash() {
      const hash = window.location.hash.substring(1);
      if (!hash) return;

      const params = new URLSearchParams(hash);
      
      params.forEach((value, key) => {
        const element = document.getElementById(key);
        if (element && element.tagName === 'SELECT') {
          element.value = value;
          element.dispatchEvent(new Event('change'));
        }
      });
    },

    saveToHash() {
      const filters = document.querySelectorAll('.filter-select');
      const params = new URLSearchParams();

      filters.forEach(filter => {
        if (filter.value && filter.value !== 'all') {
          params.set(filter.id, filter.value);
        }
      });

      const hash = params.toString();
      if (hash) {
        window.location.hash = hash;
      } else {
        history.replaceState(null, null, window.location.pathname);
      }
    }
  };

  // ═══════════════════════════════════════════════════════════════════
  // PERFORMANCE MONITOR (For performance page)
  // ═══════════════════════════════════════════════════════════════════

  const PerformanceMonitor = {
    init() {
      const perfContainers = document.querySelectorAll('[data-performance-viz]');
      perfContainers.forEach(container => this.visualize(container));
    },

    visualize(container) {
      // Simple bar chart animation for performance comparisons
      const bars = container.querySelectorAll('.perf-bar');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            bars.forEach((bar, index) => {
              const width = bar.getAttribute('data-width') || '0';
              setTimeout(() => {
                bar.style.width = width;
                bar.style.transition = 'width 1s ease';
              }, index * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });

      observer.observe(container);
    }
  };

  // ═══════════════════════════════════════════════════════════════════
  // INITIALIZATION
  // ═══════════════════════════════════════════════════════════════════

  function init() {
    // Initialize all modules
    ThemeManager.init();
    Navigation.init();
    RevealObserver.init();
    TerminalTyping.init();
    CodeComparison.init();
    CopyButtons.init();
    Tabs.init();
    LineReducer.init();
    TableOfContents.init();
    InstallAnimation.init();
    ShareableState.init();
    PerformanceMonitor.init();

    // Add loaded class to body
    document.body.classList.add('loaded');
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
