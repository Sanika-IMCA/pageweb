// Immediately check and apply the local theme preference
(function() {
  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
})();

document.addEventListener('DOMContentLoaded', () => {
  
  /* ==========================================================================
     1. "The System Boots" Preloader Sequence
     ========================================================================== */
  const preloader = document.getElementById('preloader');
  const bootStatus = document.getElementById('boot-status');
  const bootLine = document.getElementById('boot-line');
  const bootNodesContainer = document.getElementById('boot-nodes-container');

  if (preloader) {
    const hasPreloaded = sessionStorage.getItem('page-preloaded');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    function revealHero() {
      // 1. Staggered squircle morphs: headline first, visual second, CTAs last
      const morphElements = document.querySelectorAll('.hero-sec .reveal-squircle');
      morphElements.forEach((el, idx) => {
        const delay = idx * 120; // 120ms stagger delay
        setTimeout(() => {
          el.classList.add('squircle-active');
        }, delay);
      });

      // 2. Nav items frame lock (slide down & fade in)
      if (document.body.classList.contains('home-nav-animate')) {
        const navElements = document.querySelectorAll('#header nav ul li, #header .logo, #header .nav-cta, #header .theme-toggle-btn');
        navElements.forEach((el, idx) => {
          const delay = 350 + (idx * 50); // trails after hero text starts morphing
          setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, delay);
        });
      }

      // 3. Fallback standard text reveals
      setTimeout(() => {
        document.querySelectorAll('.hero-sec .reveal-text').forEach(el => {
          el.classList.add('revealed');
        });
      }, 100);
    }

    if (hasPreloaded || prefersReducedMotion) {
      preloader.classList.add('loaded');
      if (prefersReducedMotion) {
        revealHero();
      } else {
        setTimeout(revealHero, 200);
      }
    } else {
      let isSkipped = false;
      let timeouts = [];

      const skipPreloader = () => {
        if (isSkipped) return;
        isSkipped = true;
        
        timeouts.forEach(t => clearTimeout(t));
        preloader.classList.add('loaded');
        sessionStorage.setItem('page-preloaded', 'true');
        revealHero();
      };

      preloader.addEventListener('click', skipPreloader);
      window.addEventListener('keydown', skipPreloader);

      const createNode = (leftPercent) => {
        const node = document.createElement('div');
        node.className = 'boot-node';
        node.style.left = `${leftPercent}%`;
        if (bootNodesContainer) bootNodesContainer.appendChild(node);
        setTimeout(() => node.classList.add('active'), 50);
      };

      if (bootStatus) {
        bootStatus.textContent = 'DISCOVER';
        bootStatus.classList.add('active');
      }

      if (bootLine) {
        bootLine.style.width = '40%';
      }

      timeouts.push(setTimeout(() => {
        if (isSkipped) return;
        createNode(15);
        if (bootStatus) bootStatus.textContent = 'MAP';
      }, 600));

      timeouts.push(setTimeout(() => {
        if (isSkipped) return;
        createNode(25);
        if (bootStatus) bootStatus.textContent = 'BUILD';
      }, 800));

      timeouts.push(setTimeout(() => {
        if (isSkipped) return;
        createNode(35);
        if (bootStatus) bootStatus.textContent = 'DEPLOY';
      }, 1000));

      timeouts.push(setTimeout(() => {
        if (isSkipped) return;
        createNode(40);
        if (bootLine) bootLine.style.width = '100%';
        if (bootStatus) {
          bootStatus.classList.remove('active');
          setTimeout(() => {
            if (isSkipped) return;
            bootStatus.textContent = 'PAGE STUDIOS';
            bootStatus.className = 'preloader-boot-status active locked';
          }, 150);
        }
      }, 1200));

      timeouts.push(setTimeout(() => {
        if (isSkipped) return;
        preloader.classList.add('loaded');
        sessionStorage.setItem('page-preloaded', 'true');
        preloader.removeEventListener('click', skipPreloader);
        window.removeEventListener('keydown', skipPreloader);
      }, 2000));

      timeouts.push(setTimeout(() => {
        if (isSkipped) return;
        revealHero();
      }, 1900));
    }
  }

  /* ==========================================================================
     2. Lenis Smooth Scroll Integration
     ========================================================================== */
  let lenis;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      infinite: false,
    });

    function scrollLoop(time) {
      lenis.raf(time);
      requestAnimationFrame(scrollLoop);
    }
    requestAnimationFrame(scrollLoop);
  }

  /* ==========================================================================
     3. Left Spine Navigation Spying & Mobile Progress
     ========================================================================== */
  const spineItems = document.querySelectorAll('.spine-item');
  const dossierSections = document.querySelectorAll('.section-dossier');
  const mobileProgressBar = document.querySelector('.mobile-progress-bar');
  
  if (spineItems.length > 0 && dossierSections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // Trigger when section is in the middle of viewport
      threshold: 0
    };
    
    const spineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('id');
          
          spineItems.forEach(item => {
            const itemTarget = item.getAttribute('data-section');
            if (itemTarget === sectionId) {
              item.classList.add('active');
            } else {
              item.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);
    
    dossierSections.forEach(section => {
      spineObserver.observe(section);
    });
    
    // Spine click navigation handler
    spineItems.forEach(item => {
      item.addEventListener('click', () => {
        const targetId = item.getAttribute('data-section');
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          if (lenis) {
            lenis.scrollTo(targetSection);
          } else {
            targetSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }

  // Mobile scroll progress bar tracker
  window.addEventListener('scroll', () => {
    if (mobileProgressBar) {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const scrolled = (window.scrollY / scrollHeight) * 100;
        mobileProgressBar.style.width = scrolled + '%';
      }
    }
  });

  /* ==========================================================================
     4. Theme Toggle Handler
     ========================================================================== */
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  /* ==========================================================================
     5. Scroll Reveal Intersection Observer (Cinematic Transitions)
     ========================================================================== */
  const revealTexts = document.querySelectorAll('.reveal-text');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -10% 0px'
  });
  
  revealTexts.forEach(el => {
    // Avoid double triggering hero elements which are controlled by preloader
    if (!el.closest('.hero-sec')) {
      revealObserver.observe(el);
    }
  });

  /* ==========================================================================
     6. Section 02: Pinned Philosophy Auto-Highlight
     ========================================================================== */
  const philosophyRows = document.querySelectorAll('.philosophy-row');
  if (philosophyRows.length > 0) {
    const philObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active');
        }
      });
    }, {
      threshold: 0.5,
      rootMargin: '-10% 0px -20% 0px'
    });
    
    philosophyRows.forEach(row => {
      philObserver.observe(row);
    });
  }

  /* ==========================================================================
     7. Section 03: Interactive SVG Workflow Animation Loop
     ========================================================================== */
  const flowNodes = document.querySelectorAll('.flow-node');
  const detailPanel = document.getElementById('workflow-detail-panel');
  
  const workflowStepsData = [
    {
      title: "Business Discovery",
      desc: "We study your business goals, target audience, manual bottlenecks, team structures, and success metrics before writing code.",
      log: "[discovery] scoped requirements: 24 bottleneck friction points mapped"
    },
    {
      title: "Workflow Mapping",
      desc: "We build visual representations of how data, approvals, and actions flow across your teams and operational software.",
      log: "[mapping] flow structured: Sales -> Qualification -> Proposal -> Renewal"
    },
    {
      title: "Bottleneck Analysis",
      desc: "We identify slow manual handoffs, data silos, and redundant spreadsheet tracking processes.",
      log: "[bottlenecks] identified: manual CRM entry costs 14 hours per operator/week"
    },
    {
      title: "Solution Design",
      desc: "We architect automated database paths, custom internal interfaces, and AI decision systems.",
      log: "[design] architecture locked: multi-channel event pipeline configured"
    },
    {
      title: "Systems Build",
      desc: "We engineer production-grade, highly resilient backend software modules, database models, and API endpoints.",
      log: "[build] git commit: initialized postgres db migrations and webhook serial"
    },
    {
      title: "Secure Deployment",
      desc: "We provision and deploy systems on private cloud servers, configuring API endpoints, SSL certificates, and credentials.",
      log: "[deploy] edge deployment: SSL active, load testing response latency 62ms"
    },
    {
      title: "Continuous Optimization",
      desc: "We track telemetry logs, optimize database query latency, and build follow-up sprint improvements.",
      log: "[optimization] analytics telemetry synced: 0 operational errors reported"
    }
  ];

  if (flowNodes.length > 0 && detailPanel) {
    let currentActiveIndex = 0;
    let flowInterval;

    function activateStep(index) {
      flowNodes.forEach((node, idx) => {
        if (idx === index) {
          node.classList.add('active');
        } else {
          node.classList.remove('active');
        }
      });

      const data = workflowStepsData[index];
      if (data) {
        detailPanel.style.opacity = 0;
        setTimeout(() => {
          detailPanel.innerHTML = `
            <h5>${index + 1} / ${data.title}</h5>
            <p>${data.desc}</p>
            <div class="log-terminal-output">> ${data.log}</div>
          `;
          detailPanel.style.opacity = 1;
        }, 150);
      }
      currentActiveIndex = index;
    }

    // Set interactive hover hooks
    flowNodes.forEach((node, idx) => {
      node.addEventListener('click', () => {
        clearInterval(flowInterval);
        activateStep(idx);
      });
      node.addEventListener('mouseenter', () => {
        clearInterval(flowInterval);
        activateStep(idx);
      });
    });

    // Auto rotate every 3 seconds
    const startWorkflowLoop = () => {
      flowInterval = setInterval(() => {
        const nextIndex = (currentActiveIndex + 1) % flowNodes.length;
        activateStep(nextIndex);
      }, 3000);
    };

    // Observe flowchart entry to start loop
    const flowSection = document.getElementById('sec-03');
    if (flowSection) {
      const flowObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            activateStep(0);
            startWorkflowLoop();
            flowObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      flowObserver.observe(flowSection);
    }
  }

  /* ==========================================================================
     8. Card Trailing Cursor Dot Interaction
     ========================================================================== */
  const customCursor = document.createElement('div');
  customCursor.id = 'custom-cursor';
  customCursor.style.position = 'fixed';
  customCursor.style.width = '24px';
  customCursor.style.height = '24px';
  customCursor.style.borderRadius = '50%';
  customCursor.style.border = '1px solid var(--accent-color)';
  customCursor.style.pointerEvents = 'none';
  customCursor.style.zIndex = '9999';
  customCursor.style.opacity = '0';
  customCursor.style.transform = 'translate(-50%, -50%)';
  customCursor.style.transition = 'opacity 0.3s ease, transform 0.2s ease';
  document.body.appendChild(customCursor);

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    document.documentElement.style.setProperty('--x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--y', `${e.clientY}px`);
  });

  // Smooth trail animation loop
  function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    cursorX += dx * 0.15;
    cursorY += dy * 0.15;
    customCursor.style.left = cursorX + 'px';
    customCursor.style.top = cursorY + 'px';
    requestAnimationFrame(animateCursor);
  }
  requestAnimationFrame(animateCursor);

  // Activate hover effect on cards
  const interactiveCards = document.querySelectorAll('.capability-card, .marquee-card');
  interactiveCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      customCursor.style.opacity = '1';
      customCursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
      card.classList.add('cursor-dot-active');
    });
    card.addEventListener('mouseleave', () => {
      customCursor.style.opacity = '0';
      customCursor.style.transform = 'translate(-50%, -50%) scale(1)';
      card.classList.remove('cursor-dot-active');
    });
  });

  /* ==========================================================================
     9. Onboarding discovery funnel questionnaire (Build Page)
     ========================================================================== */
  const funnelForm = document.getElementById('funnel-form');
  if (funnelForm) {
    let currentStep = 1;
    const totalSteps = 6;

    const stepsElements = document.querySelectorAll('.form-step');
    const indicatorElements = document.querySelectorAll('.funnel-step-indicator');
    const btnNext = document.getElementById('btn-next');
    const btnBack = document.getElementById('btn-back');
    const successOverlay = document.getElementById('funnel-success');
    const indicatorBar = document.getElementById('funnel-indicators');

    const stageInput = document.getElementById('funnel-stage-input');
    const challengeInput = document.getElementById('funnel-challenge-input');
    const outcomeInput = document.getElementById('funnel-outcome-input');
    const timelineInput = document.getElementById('funnel-timeline-input');

    const optionBtns = document.querySelectorAll('.option-select-btn');
    optionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const parent = btn.parentElement;
        parent.querySelectorAll('.option-select-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (btn.hasAttribute('data-stage')) {
          stageInput.value = btn.getAttribute('data-stage');
        } else if (btn.hasAttribute('data-challenge')) {
          challengeInput.value = btn.getAttribute('data-challenge');
        } else if (btn.hasAttribute('data-outcome')) {
          outcomeInput.value = btn.getAttribute('data-outcome');
        } else if (btn.hasAttribute('data-time')) {
          timelineInput.value = btn.getAttribute('data-time');
        }

        setTimeout(goToNextStep, 300);
      });
    });

    function updateFunnelUI() {
      stepsElements.forEach(step => {
        step.classList.remove('active');
        if (parseInt(step.getAttribute('data-step'), 10) === currentStep) {
          step.classList.add('active');
        }
      });

      indicatorElements.forEach(ind => {
        const indNum = parseInt(ind.getAttribute('data-ind'), 10);
        ind.classList.remove('active', 'completed');
        
        if (indNum === currentStep) {
          ind.classList.add('active');
        } else if (indNum < currentStep) {
          ind.classList.add('completed');
        }
      });

      if (currentStep === 1) {
        btnBack.style.visibility = 'hidden';
      } else {
        btnBack.style.visibility = 'visible';
      }

      if (currentStep === totalSteps) {
        btnNext.textContent = 'Submit Product Inquiry';
      } else {
        btnNext.textContent = 'Next Step';
      }
    }

    function validateCurrentStep() {
      if (currentStep === 1) {
        const buildVal = document.getElementById('funnel-build-q').value.trim();
        const probVal = document.getElementById('funnel-problem-q').value.trim();
        const audVal = document.getElementById('funnel-audience-q').value.trim();
        if (buildVal === '' || probVal === '' || audVal === '') {
          alert('Please fill out all fields.');
          return false;
        }
      } else if (currentStep === 2 && !stageInput.value) {
        alert('Please select your current stage.');
        return false;
      } else if (currentStep === 3 && !challengeInput.value) {
        alert('Please select your primary challenge.');
        return false;
      } else if (currentStep === 4 && !outcomeInput.value) {
        alert('Please select your target outcome.');
        return false;
      } else if (currentStep === 5 && !timelineInput.value) {
        alert('Please select your timeline.');
        return false;
      } else if (currentStep === 6) {
        const detailsVal = document.getElementById('funnel-details').value.trim();
        const nameVal = document.getElementById('funnel-name').value.trim();
        const emailVal = document.getElementById('funnel-email').value.trim();
        
        if (detailsVal === '' || nameVal === '' || emailVal === '') {
          alert('Please complete all contact details.');
          return false;
        }
        if (!emailVal.includes('@')) {
          alert('Please provide a valid email address.');
          return false;
        }
      }
      return true;
    }

    function goToNextStep() {
      if (!validateCurrentStep()) return;

      if (currentStep < totalSteps) {
        currentStep++;
        updateFunnelUI();
      } else {
        const submission = {
          build: document.getElementById('funnel-build-q').value,
          problem: document.getElementById('funnel-problem-q').value,
          audience: document.getElementById('funnel-audience-q').value,
          stage: stageInput.value,
          challenge: challengeInput.value,
          outcome: outcomeInput.value,
          timeline: timelineInput.value,
          details: document.getElementById('funnel-details').value,
          name: document.getElementById('funnel-name').value,
          email: document.getElementById('funnel-email').value
        };

        console.log('[Form Submitted: Onboarding discovery inquiries]', submission);
        
        funnelForm.style.display = 'none';
        if (indicatorBar) indicatorBar.style.display = 'none';
        successOverlay.style.display = 'block';
      }
    }

    btnNext.addEventListener('click', goToNextStep);

    btnBack.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        updateFunnelUI();
      }
    });

    updateFunnelUI();
  }

  /* ==========================================================================
     10. Client Portal Simulators (Case Studies)
     ========================================================================== */
  // 1. Brand Auditor simulator
  const btnRunAudit = document.getElementById('btn-run-audit');
  const simAuditLogs = document.getElementById('sim-audit-logs');
  if (btnRunAudit && simAuditLogs) {
    btnRunAudit.addEventListener('click', () => {
      btnRunAudit.disabled = true;
      btnRunAudit.textContent = 'Auditing...';
      simAuditLogs.innerHTML = '';
      
      const lines = [
        '[sys] connecting headless scraping node to target sandbox URL...',
        '[sys] capture screenshot success: viewport 1440x900',
        '[sys] OpenCV color extraction active: verified hex palettes',
        '[sys] compliance check: found 1 invalid hex color (#FF4444)',
        '[sys] compliance check: H1 layout scale is 2.4x (expected 1.6x)',
        '[sys] audit complete: score: 84% - alert report sent'
      ];
      
      let delay = 0;
      lines.forEach((line, idx) => {
        setTimeout(() => {
          const div = document.createElement('div');
          div.className = 'visual-line';
          div.innerHTML = `<span>$</span> <span>${line}</span>`;
          simAuditLogs.appendChild(div);
          
          if (idx === lines.length - 1) {
            btnRunAudit.textContent = 'Audit Complete';
          }
        }, delay);
        delay += 500;
      });
    });
  }

  // 2. Content Engine simulator
  const btnGenOutline = document.getElementById('btn-gen-outline');
  const simContentLogs = document.getElementById('sim-content-logs');
  if (btnGenOutline && simContentLogs) {
    btnGenOutline.addEventListener('click', () => {
      btnGenOutline.disabled = true;
      btnGenOutline.textContent = 'Generating...';
      simContentLogs.innerHTML = '';
      
      const lines = [
        '[sys] search engine volumes database connected...',
        '[sys] scraped keyword metrics: B2B operations tools',
        '[sys] prompting LLM context parameters: Page Studios tone...',
        '[sys] generating semantic layout details...',
        '[sys] outline finalized: rendering draft'
      ];
      
      let delay = 0;
      lines.forEach((line, idx) => {
        setTimeout(() => {
          const div = document.createElement('div');
          div.className = 'visual-line';
          div.innerHTML = `<span>$</span> <span>${line}</span>`;
          simContentLogs.appendChild(div);
          
          if (idx === lines.length - 1) {
            const resultBox = document.createElement('div');
            resultBox.style.marginTop = '1.2rem';
            resultBox.style.padding = '1rem';
            resultBox.style.border = '1px solid var(--border-strong)';
            resultBox.style.borderRadius = '2px';
            resultBox.style.background = 'rgba(var(--accent-rgb), 0.05)';
            resultBox.innerHTML = `
              <h5 style="color: var(--text-primary); font-family: var(--font-mono); font-size: 0.75rem; margin-bottom: 0.5rem; text-transform: uppercase;">Generated Draft:</h5>
              <ul style="list-style: square; padding-left: 1.2rem; font-size: 0.8rem; color: var(--text-secondary);">
                <li>Title: Automating back office bottlenecks</li>
                <li>H2: Discovery processes come first</li>
                <li>H2: The cost of manual coordination loops</li>
              </ul>
            `;
            simContentLogs.appendChild(resultBox);
            btnGenOutline.textContent = 'Generated';
          }
        }, delay);
        delay += 400;
      });
    });
  }

  // 3. Founder Inbox simulator
  const btnRunTriage = document.getElementById('btn-run-triage');
  const simInboxLogs = document.getElementById('sim-inbox-logs');
  if (btnRunTriage && simInboxLogs) {
    btnRunTriage.addEventListener('click', () => {
      btnRunTriage.disabled = true;
      btnRunTriage.textContent = 'Triaging...';
      simInboxLogs.innerHTML = '';
      
      const lines = [
        '[sys] active webhook connection established to mail server stream...',
        '[sys] fetched 14 unread message headers...',
        '[sys] parsing semantic intents and sender parameters...',
        '[sys] sorting categories: 1 Partner, 2 Leads, 11 Newsletters...',
        '[sys] inbox items compiled'
      ];
      
      let delay = 0;
      lines.forEach((line, idx) => {
        setTimeout(() => {
          const div = document.createElement('div');
          div.className = 'visual-line';
          div.innerHTML = `<span>$</span> <span>${line}</span>`;
          simInboxLogs.appendChild(div);
          
          if (idx === lines.length - 1) {
            const resultBox = document.createElement('div');
            resultBox.style.marginTop = '1.2rem';
            resultBox.style.padding = '1rem';
            resultBox.style.border = '1px solid var(--border-strong)';
            resultBox.style.borderRadius = '2px';
            resultBox.style.background = 'rgba(var(--accent-rgb), 0.05)';
            resultBox.innerHTML = `
              <h5 style="color: var(--text-primary); font-family: var(--font-mono); font-size: 0.75rem; margin-bottom: 0.5rem; text-transform: uppercase;">Sorted Mailbox:</h5>
              <div style="font-size: 0.75rem; color: #10B981;">[INVESTOR] Sequoia Partner: Pitch feedback review</div>
              <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.3rem;">[LEAD] Stripe integration query: timeline schedule?</div>
            `;
            simInboxLogs.appendChild(resultBox);
            btnRunTriage.textContent = 'Triaged';
          }
        }, delay);
        delay += 450;
      });
    });
  }

  // 4. Page Pipeline simulator
  const btnRunPipeline = document.getElementById('btn-run-pipeline');
  const simPipelineLogs = document.getElementById('sim-pipeline-logs');
  if (btnRunPipeline && simPipelineLogs) {
    btnRunPipeline.addEventListener('click', () => {
      btnRunPipeline.disabled = true;
      btnRunPipeline.textContent = 'Sequencing...';
      simPipelineLogs.innerHTML = '';
      
      const lines = [
        '[sys] campaigns engine loading visual triggers grid...',
        '[sys] jitter delays applied: offset 1.8s...',
        '[sys] trigger: connection request sent via LinkedIn API...',
        '[sys] node complete: recipient accepted. trigger follow-up email...',
        '[sys] campaign active. analytics metrics: Open: 68% | Reply: 22%'
      ];
      
      let delay = 0;
      lines.forEach((line, idx) => {
        setTimeout(() => {
          const div = document.createElement('div');
          div.className = 'visual-line';
          div.innerHTML = `<span>$</span> <span>${line}</span>`;
          simPipelineLogs.appendChild(div);
          
          if (idx === lines.length - 1) {
            btnRunPipeline.textContent = 'Sequence Active';
          }
        }, delay);
        delay += 500;
      });
    });
  }

  /* ==========================================================================
     11. FAQ Accordion Click Toggles (FAQ elements)
     ========================================================================== */
  const faqHeaders = document.querySelectorAll('.faq-header');
  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const accordion = header.parentElement;
      const isOpen = accordion.classList.contains('open');
      
      document.querySelectorAll('.faq-accordion').forEach(acc => {
        acc.classList.remove('open');
        acc.querySelector('.faq-header').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        accordion.classList.add('open');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ==========================================================================
     12. Client Portal AI Chatbot (dashboard.html)
     ========================================================================== */
  const chatMessagesContainer = document.getElementById('chat-messages-container');
  const chatChips = document.querySelectorAll('.chat-chip');
  if (chatMessagesContainer && chatChips.length > 0) {
    const replies = {
      timeline: "Based on our current scope, we are targeting a production-ready MVP release within 45 days. Phase 3 UI/UX wireframes are active this week, and development starts next week.",
      design: "The UI/UX Figma wireframes are 80% complete. Custom settings panels and main dashboard graphs are active. We'll share the live link in our call on Wednesday.",
      features: "Active MVP components: Scrapers, PostgreSQL database indexing schema, and classifying models. Next sprint: Stripe subscriptions billing integration.",
      launch: "We are tracking toward an early launch sandbox release. We'll do final system staging checks next week and then invite the first batch of B2B beta operators."
    };

    chatChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const query = chip.getAttribute('data-query');
        const userText = chip.textContent;
        
        chatChips.forEach(c => c.disabled = true);
        
        const userBubble = document.createElement('div');
        userBubble.className = 'chat-bubble user';
        userBubble.textContent = userText;
        chatMessagesContainer.appendChild(userBubble);
        
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
        
        setTimeout(() => {
          const assistantBubble = document.createElement('div');
          assistantBubble.className = 'chat-bubble assistant';
          assistantBubble.textContent = replies[query] || "I am checking the active database telemetry stats for you right now...";
          chatMessagesContainer.appendChild(assistantBubble);
          
          chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
          chatChips.forEach(c => c.disabled = false);
        }, 600);
      });
    });
  }

  /* ==========================================================================
     13. Wilmington HQ Local-Time Clock (Obys detail)
     ========================================================================== */
  const hqClockElement = document.getElementById('hq-time-clock');
  if (hqClockElement) {
    const updateClock = () => {
      const now = new Date();
      // Format Eastern time string (e.g. 04:32:15 PM)
      const timeFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      const timeString = timeFormatter.format(now);
      
      // Determine Eastern time zone code (EST or EDT)
      const tzFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York',
        timeZoneName: 'short'
      });
      const tzParts = tzFormatter.formatToParts(now);
      const tzName = tzParts.find(p => p.type === 'timeZoneName')?.value || 'ET';
      
      hqClockElement.textContent = `${tzName} ${timeString}`;
    };
    updateClock();
    setInterval(updateClock, 1000);
  }

  /* ==========================================================================
     14. Case-Study Index View Toggle (Grid / List)
     ========================================================================== */
  const btnGridView = document.getElementById('btn-grid-view');
  const btnListView = document.getElementById('btn-list-view');
  const gridContainer = document.getElementById('work-grid-container');
  const listContainer = document.getElementById('work-list-container');

  if (btnGridView && btnListView && gridContainer && listContainer) {
    btnGridView.addEventListener('click', () => {
      btnGridView.classList.add('active');
      btnListView.classList.remove('active');
      gridContainer.style.display = 'block';
      listContainer.style.display = 'none';
      
      // Let Lenis recalculate height
      if (lenis) lenis.resize();
    });

    btnListView.addEventListener('click', () => {
      btnListView.classList.add('active');
      btnGridView.classList.remove('active');
      gridContainer.style.display = 'none';
      listContainer.style.display = 'block';
      
      // Let Lenis recalculate height
      if (lenis) lenis.resize();
    });
  }

  /* ==========================================================================
     15. Scattered Parallax Masonry Scroll Drift (Obys style)
     ========================================================================== */
  const workTiles = document.querySelectorAll('.work-tile');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (workTiles.length > 0 && !prefersReducedMotion) {
    const driftFactors = [0.08, -0.06, 0.04, -0.09]; // Alternate drifts per tile for visual parallax depth
    
    const applyParallax = () => {
      const scrollY = window.scrollY;
      const viewHeight = window.innerHeight;
      
      workTiles.forEach((tile, index) => {
        const factor = driftFactors[index % driftFactors.length];
        const rect = tile.getBoundingClientRect();
        
        // Only run translate if the tile is inside the active viewport
        if (rect.top < viewHeight && rect.bottom > 0) {
          // Calculate offset relative to window center
          const offset = (window.innerHeight / 2 - (rect.top + rect.height / 2)) * factor;
          tile.style.transform = `translateY(${offset}px)`;
        }
      });
    };
    
    // Listen to scroll events
    if (lenis) {
      lenis.on('scroll', applyParallax);
    } else {
      window.addEventListener('scroll', applyParallax);
    }
    
    // Initial run
    applyParallax();
  }

  /* ==========================================================================
     16. Scroll-triggered Squircle Reveals for Case Studies (offmenu.design)
     ========================================================================== */
  const squircleElements = document.querySelectorAll('.work-tile-image-wrapper.reveal-squircle');
  if (squircleElements.length > 0 && !prefersReducedMotion) {
    const squircleObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('squircle-active');
          squircleObserver.unobserve(entry.target); // Trigger once
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    squircleElements.forEach(el => {
      squircleObserver.observe(el);
    });
  }

});

