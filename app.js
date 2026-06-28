// Run immediately to avoid light-mode flashing during page loads
(function() {
  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
})();

document.addEventListener('DOMContentLoaded', () => {
  
  /* ==========================================================================
     1. Theme Switcher Handler
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
     2. Global & Card-local Cursor Glow Tracking
     ========================================================================== */
  window.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--y', `${e.clientY}px`);
  });

  document.querySelectorAll('.glow-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    });
  });

  /* ==========================================================================
     3. Page-specific Header Navigation Link Active Highlight
     ========================================================================== */
  const header = document.getElementById('header');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  
  document.querySelectorAll('header nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  /* ==========================================================================
     4. Scroll Reveal intersection Observer
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ==========================================================================
     5. Interactive Hero Transform Showcase Sequence (Home Page)
     ========================================================================== */
  const heroShowcase = document.getElementById('hero-showcase');
  if (heroShowcase) {
    const stages = [
      document.getElementById('stage-idea'),
      document.getElementById('stage-strategy'),
      document.getElementById('stage-design'),
      document.getElementById('stage-development'),
      document.getElementById('stage-launch'),
      document.getElementById('stage-growth')
    ];
    const connectors = [
      document.getElementById('connector-1'),
      document.getElementById('connector-2'),
      document.getElementById('connector-3'),
      document.getElementById('connector-4'),
      document.getElementById('connector-5')
    ];

    let cycleTimeout;

    function runShowcaseCycle() {
      // Step 1: Reset all to initial state (Stage 1 active, others inactive, connectors empty)
      stages.forEach((stage, idx) => {
        if (stage) {
          if (idx === 0) stage.classList.add('active');
          else stage.classList.remove('active');
        }
      });
      connectors.forEach(conn => {
        if (conn) conn.style.width = '0%';
      });

      // Step 2: Cascade activations
      // Fill connector 1 -> Active Stage 2
      setTimeout(() => { if (connectors[0]) connectors[0].style.width = '100%'; }, 1000);
      setTimeout(() => { if (stages[1]) stages[1].classList.add('active'); }, 2200);

      // Fill connector 2 -> Active Stage 3
      setTimeout(() => { if (connectors[1]) connectors[1].style.width = '100%'; }, 3200);
      setTimeout(() => { if (stages[2]) stages[2].classList.add('active'); }, 4400);

      // Fill connector 3 -> Active Stage 4
      setTimeout(() => { if (connectors[2]) connectors[2].style.width = '100%'; }, 5400);
      setTimeout(() => { if (stages[3]) stages[3].classList.add('active'); }, 6600);

      // Fill connector 4 -> Active Stage 5
      setTimeout(() => { if (connectors[3]) connectors[3].style.width = '100%'; }, 7600);
      setTimeout(() => { if (stages[4]) stages[4].classList.add('active'); }, 8800);

      // Fill connector 5 -> Active Stage 6
      setTimeout(() => { if (connectors[4]) connectors[4].style.width = '100%'; }, 9800);
      setTimeout(() => { if (stages[5]) stages[5].classList.add('active'); }, 11000);

      // Loop after 14 seconds
      cycleTimeout = setTimeout(runShowcaseCycle, 14000);
    }

    runShowcaseCycle();
  }

  /* ==========================================================================
     6. Home Page "How We Build" Interactive Timeline Hover Logic
     ========================================================================== */
  const timelineNodes = document.querySelectorAll('.timeline-hover-node');
  const timelineExpansionBoxes = document.querySelectorAll('.timeline-expansion-box');

  if (timelineNodes.length > 0 && timelineExpansionBoxes.length > 0) {
    function activateTimelineStep(index) {
      timelineNodes.forEach((node, idx) => {
        if (idx === index) {
          node.classList.add('active');
        } else {
          node.classList.remove('active');
        }
      });

      timelineExpansionBoxes.forEach((box, idx) => {
        if (idx === index) {
          box.style.display = 'grid';
          // Small delay to allow browser to trigger CSS transition
          setTimeout(() => {
            box.classList.add('active');
          }, 20);
        } else {
          box.classList.remove('active');
          box.style.display = 'none';
        }
      });
    }

    timelineNodes.forEach(node => {
      node.addEventListener('mouseenter', () => {
        const index = parseInt(node.getAttribute('data-step'), 10);
        activateTimelineStep(index);
      });
    });

    // Initialize first step
    activateTimelineStep(0);
  }

  /* ==========================================================================
     7. Process Page SVG Flowchart Nodes & Detail Interactive Logic
     ========================================================================== */
  const diagramNodes = document.querySelectorAll('.diagram-node');
  const diagramDetailPanel = document.getElementById('diagram-log-panel');

  const processDetails = [
    {
      title: "Discovery Workshop — Unpacking constraints and goals",
      desc: "We sit down one-on-one with you to audit current operational bottlenecks, unpack your software idea, and draft the initial list of core components required to build your product.",
      logs: [
        "[sys] initial scoping workshop activated",
        "[sys] dependency audit complete: 100% stable",
        "[sys] output: target requirements document generated"
      ]
    },
    {
      title: "Research & Competitor Mapping — Positioning for market success",
      desc: "We audit comparable systems, explore current technical opportunities, map database flows, and plan key software integrations to ensure a competitive advantage.",
      logs: [
        "[sys] system architecture search initialized",
        "[sys] data models configured",
        "[sys] output: competitive design tokens defined"
      ]
    },
    {
      title: "Database & System Architecture — Planning the foundation",
      desc: "We model database schemas, draft secure routing logic, configure API webhooks, and map clean data flow structures to support scaling user databases.",
      logs: [
        "[sys] sql / nosql relational mapping active",
        "[sys] indexing optimization keys set",
        "[sys] output: schema blueprint locked"
      ]
    },
    {
      title: "UI/UX Prototyping — Crafting interactive designs",
      desc: "We craft clean, premium interactive design screens. Setting up visual layout grids, typography families, brand design tokens, and validating high-fidelity workflows in Figma.",
      logs: [
        "[sys] fonts loaded: Plus Jakarta Sans & Inter",
        "[sys] spacing grid: 8px semantic system verified",
        "[sys] output: high-fidelity figma board finalized"
      ]
    },
    {
      title: "Development & AI Integration — Writing clean, performant code",
      desc: "We write clean, modular vanilla code. We integrate databases, configure background webhooks, and wire up AI decision models or LLM query loops.",
      logs: [
        "[sys] npm run build",
        "[sys] client session databases active",
        "[sys] output: core product code compiled in 14.2s"
      ]
    },
    {
      title: "Deployment & Edge Infrastructure — Fast loading global hosting",
      desc: "We set up live server environments, deploy to optimized global hosting edge nodes, configure domain routing, and audit load speeds to ensure a fast user experience.",
      logs: [
        "[sys] build transferred to cloud edge server node",
        "[sys] ssl credentials successfully generated",
        "[sys] output: live application healthy"
      ]
    },
    {
      title: "Growth & Continuous Iteration — Keeping the product optimized",
      desc: "Software is a living system. We audit active session logs, optimize slow database queries, automate operations tasks, and push features in bi-weekly iteration sprints.",
      logs: [
        "[sys] automatic telemetry reporting active",
        "[sys] server query latency check: 84ms",
        "[sys] output: v2 optimization backlog updated"
      ]
    }
  ];

  if (diagramNodes.length > 0 && diagramDetailPanel) {
    function updateDiagramDetail(index) {
      diagramNodes.forEach((node, idx) => {
        if (idx === index) {
          node.classList.add('active');
        } else {
          node.classList.remove('active');
        }
      });

      const detail = processDetails[index];
      if (detail) {
        diagramDetailPanel.style.opacity = 0;
        setTimeout(() => {
          let logsHtml = '';
          detail.logs.forEach(log => {
            logsHtml += `<div class="visual-line"><span>$</span> <span>${log}</span></div>`;
          });

          diagramDetailPanel.innerHTML = `
            <h3 style="margin-bottom: 1rem;">${detail.title}</h3>
            <p style="margin-bottom: 2rem; max-width: 800px;">${detail.desc}</p>
            <div style="background: rgba(0,0,0,0.2); padding: 1.5rem; border-radius: 8px; font-family: var(--font-mono); font-size: 0.85rem; border: 1px solid var(--border-subtle);">
              ${logsHtml}
            </div>
          `;
          diagramDetailPanel.style.opacity = 1;
        }, 200);
      }
    }

    diagramNodes.forEach(node => {
      const idx = parseInt(node.getAttribute('data-index'), 10);
      node.addEventListener('click', () => {
        updateDiagramDetail(idx);
      });
      node.addEventListener('mouseenter', () => {
        updateDiagramDetail(idx);
      });
    });

    // Initialize first node
    updateDiagramDetail(0);
    diagramDetailPanel.style.transition = 'opacity 0.2s ease';
  }

  /* ==========================================================================
     8. Multi-step qualifying funnel logic (Build page)
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

    // Hidden input trackers
    const stageInput = document.getElementById('funnel-stage-input');
    const challengeInput = document.getElementById('funnel-challenge-input');
    const outcomeInput = document.getElementById('funnel-outcome-input');
    const timelineInput = document.getElementById('funnel-timeline-input');

    // Selection buttons logic
    const optionBtns = document.querySelectorAll('.option-select-btn');
    optionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const parent = btn.parentElement;
        parent.querySelectorAll('.option-select-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');

        if (btn.hasAttribute('data-stage')) {
          stageInput.value = btn.getAttribute('data-stage');
        } else if (btn.hasAttribute('data-challenge')) {
          challengeInput.value = btn.getAttribute('data-challenge');
        } else if (btn.hasAttribute('data-outcome')) {
          outcomeInput.value = btn.getAttribute('data-outcome');
        } else if (btn.hasAttribute('data-time')) {
          timelineInput.value = btn.getAttribute('data-time');
        }

        setTimeout(goToNextStep, 350);
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
          alert('Please fill out all questions about your idea.');
          return false;
        }
      } else if (currentStep === 2) {
        if (!stageInput.value) {
          alert('Please select your current business stage.');
          return false;
        }
      } else if (currentStep === 3) {
        if (!challengeInput.value) {
          alert('Please select your current challenge.');
          return false;
        }
      } else if (currentStep === 4) {
        if (!outcomeInput.value) {
          alert('Please select your desired outcome.');
          return false;
        }
      } else if (currentStep === 5) {
        if (!timelineInput.value) {
          alert('Please select your timeline.');
          return false;
        }
      } else if (currentStep === 6) {
        const detailsVal = document.getElementById('funnel-details').value.trim();
        const nameVal = document.getElementById('funnel-name').value.trim();
        const emailVal = document.getElementById('funnel-email').value.trim();
        
        if (detailsVal === '') {
          alert('Please share your vision details.');
          return false;
        }
        if (nameVal === '' || emailVal === '') {
          alert('Please fill in your name and email.');
          return false;
        }
        if (!emailVal.includes('@')) {
          alert('Please enter a valid email address.');
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

        console.log('[Funnel Submitted - guided discovery onboarding]', submission);
        
        // Hide form and step indicators, show success state 7
        funnelForm.style.display = 'none';
        if (indicatorBar) indicatorBar.style.display = 'none';
        successOverlay.classList.add('active');
      }
    }

    btnNext.addEventListener('click', goToNextStep);

    btnBack.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        updateFunnelUI();
      }
    });
  }

  /* ==========================================================================
     9. Case Study Product Simulator Controllers
     ========================================================================== */
  // 1. Brand Auditor Simulator
  const btnRunAudit = document.getElementById('btn-run-audit');
  const simAuditLogs = document.getElementById('sim-audit-logs');
  if (btnRunAudit && simAuditLogs) {
    btnRunAudit.addEventListener('click', () => {
      btnRunAudit.disabled = true;
      btnRunAudit.textContent = 'Auditing...';
      simAuditLogs.innerHTML = '';
      
      const lines = [
        '[sys] connecting headless browser to target URL: app.startup.com...',
        '[sys] capture screenshot success: viewport 1440x900',
        '[sys] OpenCV color extraction algorithms active...',
        '[sys] color audit: found 1 unapproved color (#FF4444)',
        '[sys] spacing audit: found 14 grid margin violations',
        '[sys] typography audit: H1 ratio is 2.4x (target scale is 1.6x)',
        '[sys] COMPLETED. Brand Compliance Score: 84%'
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
        delay += 600;
      });
    });
  }

  // 2. Content Engine Simulator
  const btnGenOutline = document.getElementById('btn-gen-outline');
  const simContentLogs = document.getElementById('sim-content-logs');
  if (btnGenOutline && simContentLogs) {
    btnGenOutline.addEventListener('click', () => {
      btnGenOutline.disabled = true;
      btnGenOutline.textContent = 'Generating...';
      simContentLogs.innerHTML = '';
      
      const lines = [
        '[sys] keyword volume scraper activated: "product studio validation"...',
        '[sys] indexing search volumes: 2,400 monthly queries found',
        '[sys] prompt profile loaded: PAGE Brand Voice (Minimal / Premium / Confident)...',
        '[sys] generating content skeleton outline...',
        '[sys] draft compiled successfully. Campaign structures active.'
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
            resultBox.style.marginTop = '1.5rem';
            resultBox.style.padding = '1rem';
            resultBox.style.border = '1px solid var(--accent-color)';
            resultBox.style.borderRadius = '8px';
            resultBox.style.background = 'rgba(99, 102, 241, 0.05)';
            resultBox.innerHTML = `
              <h5 style="color: var(--text-primary); margin-bottom: 0.5rem;">Generated Outline:</h5>
              <ul style="list-style: square; padding-left: 1.2rem;">
                <li>H1: Building what matters (Core MVP hooks)</li>
                <li>Section 01: The cost of over-engineering</li>
                <li>Section 02: 12-day launch constraints</li>
              </ul>
            `;
            simContentLogs.appendChild(resultBox);
            btnGenOutline.textContent = 'Outline Ready';
          }
        }, delay);
        delay += 500;
      });
    });
  }

  // 3. Founder Inbox Simulator
  const btnRunTriage = document.getElementById('btn-run-triage');
  const simInboxLogs = document.getElementById('sim-inbox-logs');
  if (btnRunTriage && simInboxLogs) {
    btnRunTriage.addEventListener('click', () => {
      btnRunTriage.disabled = true;
      btnRunTriage.textContent = 'Triaging...';
      simInboxLogs.innerHTML = '';
      
      const lines = [
        '[sys] listening to mailbox stream: GMail webhook received...',
        '[sys] parsing email headers: 14 unread messages found...',
        '[sys] running semantic triage models...',
        '[sys] sorting completed: 1 Investors, 2 Leads, 11 Newsletters...',
        '[sys] generating task summaries threads...'
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
            resultBox.style.marginTop = '1.5rem';
            resultBox.style.padding = '1rem';
            resultBox.style.border = '1px solid var(--accent-color)';
            resultBox.style.borderRadius = '8px';
            resultBox.style.background = 'rgba(99, 102, 241, 0.05)';
            resultBox.innerHTML = `
              <h5 style="color: var(--text-primary); margin-bottom: 0.5rem;">Triage Results:</h5>
              <div style="font-size: 0.8rem; margin-bottom: 0.5rem; color: #10B981;">[INVESTOR] Sequoia Partner: Pitch feedback review</div>
              <div style="font-size: 0.8rem; color: var(--text-secondary);">[LEAD] Stripe integration query: timeline schedule?</div>
            `;
            simInboxLogs.appendChild(resultBox);
            btnRunTriage.textContent = 'Inbox Triaged';
          }
        }, delay);
        delay += 550;
      });
    });
  }

  // 4. Page Pipeline Simulator
  const btnRunPipeline = document.getElementById('btn-run-pipeline');
  const simPipelineLogs = document.getElementById('sim-pipeline-logs');
  if (btnRunPipeline && simPipelineLogs) {
    btnRunPipeline.addEventListener('click', () => {
      btnRunPipeline.disabled = true;
      btnRunPipeline.textContent = 'Sequencing...';
      simPipelineLogs.innerHTML = '';
      
      const lines = [
        '[sys] visual sequence pipeline: loaded 3 active active nodes...',
        '[sys] connector jitter offset: 1.8s delay active...',
        '[sys] executing step 01: connection request sent via LinkedIn...',
        '[sys] connection accepted. executing step 02: follow-up email...',
        '[sys] active tracking logs: open rate: 68% | reply rate: 22%',
        '[sys] telemetry update: sync complete'
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
        delay += 600;
      });
    });
  }

  /* ==========================================================================
     10. Phase 6 FAQ Accordion click toggles
     ========================================================================== */
  const faqHeaders = document.querySelectorAll('.faq-header');
  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const accordion = header.parentElement;
      const isOpen = accordion.classList.contains('open');
      
      // Close all other accordions
      document.querySelectorAll('.faq-accordion').forEach(acc => {
        acc.classList.remove('open');
        acc.querySelector('.faq-header').setAttribute('aria-expanded', 'false');
      });

      // Toggle current accordion
      if (!isOpen) {
        accordion.classList.add('open');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ==========================================================================
     11. Phase 6 Client Dashboard AI Assistant Chat Simulator
     ========================================================================== */
  const chatMessagesContainer = document.getElementById('chat-messages-container');
  const chatChips = document.querySelectorAll('.chat-chip');
  if (chatMessagesContainer && chatChips.length > 0) {
    
    // Response mapping
    const replies = {
      timeline: "Based on our scope, we are targeting a production-ready MVP release within 45 days. Phase 3 UI/UX wireframes are active this week, and development starts next week.",
      design: "The UI/UX Figma wireframe templates are 80% complete. Custom settings panels and main dashboard graphs are active. We'll share the live link in our call on Wednesday.",
      features: "Active MVP components: Scrapers, PostgreSQL database indexing schema, and classifying models. Next sprint: Stripe subscriptions billing integration.",
      launch: "We are tracking toward an early launch sandbox release. We'll do final system staging checks next week and then invite the first batch of B2B beta operators."
    };

    chatChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const query = chip.getAttribute('data-query');
        const userText = chip.textContent;
        
        // Disable chips briefly
        chatChips.forEach(c => c.disabled = true);
        
        // Append user chat message bubble
        const userBubble = document.createElement('div');
        userBubble.className = 'chat-bubble user';
        userBubble.textContent = userText;
        chatMessagesContainer.appendChild(userBubble);
        
        // Scroll to bottom
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
        
        // Append typing indicator or delay assistant bubble
        setTimeout(() => {
          const assistantBubble = document.createElement('div');
          assistantBubble.className = 'chat-bubble assistant';
          assistantBubble.textContent = replies[query] || "I am checking the active repository stats for you right now...";
          chatMessagesContainer.appendChild(assistantBubble);
          
          // Scroll to bottom
          chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
          
          // Re-enable chips
          chatChips.forEach(c => c.disabled = false);
        }, 850);
      });
    });
  }

  /* ==========================================================================
     12. Phase 7 - Interactive Circuit Board Trace Canvas Engine
     ========================================================================== */
  const initCircuitCanvas = () => {
    // Dynamic canvas creation
    if (document.getElementById('circuit-canvas')) return;
    const canvas = document.createElement('canvas');
    canvas.id = 'circuit-canvas';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Mouse coordinates tracker
    const mouse = { x: 0, y: 0, active: false, lastMove: Date.now() };

    // Device Pixel Ratio scaling for high-res screens
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.scale(dpr, dpr);
    };
    window.addEventListener('resize', resize);
    resize();

    // Mouse listeners
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
      mouse.lastMove = Date.now();
    });

    window.addEventListener('mouseleave', () => {
      mouse.active = false;
    });

    // Circuit Hub Node class
    class Hub {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.originalX = x;
        this.originalY = y;
        // Slow drifting velocities
        this.vx = (Math.random() - 0.5) * 0.25;
        this.vy = (Math.random() - 0.5) * 0.25;
        this.size = Math.random() * 2 + 1.5;
        this.glow = 0;
        this.activePulse = false;
      }

      update() {
        // Drift within bounds of 30px
        this.x += this.vx;
        this.y += this.vy;

        const distFromOrigX = this.x - this.originalX;
        const distFromOrigY = this.y - this.originalY;

        if (Math.abs(distFromOrigX) > 25) this.vx *= -1;
        if (Math.abs(distFromOrigY) > 25) this.vy *= -1;

        // Reduce glow over time
        if (this.glow > 0) this.glow -= 0.02;
        else this.glow = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        // Dynamic color extraction
        const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim();
        
        ctx.fillStyle = accent;
        ctx.shadowBlur = this.glow * 10;
        ctx.shadowColor = accent;
        ctx.fill();
        
        // Inner circle hole to look like a PCB via node
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg-absolute').trim();
        ctx.shadowBlur = 0;
        ctx.fill();
      }
    }

    // Generate hubs symmetrically
    const hubs = [];
    const cols = 6;
    const rows = 5;
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        // Distribute coordinates plus random offsets
        const px = (width / cols) * (c + 0.5) + (Math.random() - 0.5) * 60;
        const py = (height / rows) * (r + 0.5) + (Math.random() - 0.5) * 60;
        hubs.push(new Hub(px, py));
      }
    }

    // Trace path helper - ensures 45 and 90 degree bends like a tech circuit board trace
    const drawCircuitTrace = (x1, y1, x2, y2, color, alpha, thickness = 1) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      
      const dx = x2 - x1;
      const dy = y2 - y1;
      
      // Calculate 45/90 degree offset segments
      if (Math.abs(dx) > Math.abs(dy)) {
        const midX = x1 + dx - Math.abs(dy) * Math.sign(dx);
        ctx.lineTo(midX, y1);
        ctx.lineTo(x2, y2);
      } else {
        const midY = y1 + dy - Math.abs(dx) * Math.sign(dy);
        ctx.lineTo(x1, midY);
        ctx.lineTo(x2, y2);
      }

      ctx.strokeStyle = color;
      ctx.globalAlpha = alpha;
      ctx.lineWidth = thickness;
      ctx.shadowBlur = 0;
      ctx.stroke();
      ctx.globalAlpha = 1.0;
    };

    // Animated signals / pulses traveling along circuit tracks
    class Signal {
      constructor(startHub, endHub) {
        this.start = startHub;
        this.end = endHub;
        this.progress = 0;
        this.speed = Math.random() * 0.01 + 0.008;
      }

      update() {
        this.progress += this.speed;
        if (this.progress >= 1) {
          this.progress = 1;
          this.end.glow = 1.0; // Activate hub glow on impact
          return false; // Deactivate signal
        }
        return true;
      }

      draw() {
        // Calculate coordinates along circuit trace bends
        const x1 = this.start.x;
        const y1 = this.start.y;
        const x2 = this.end.x;
        const y2 = this.end.y;
        
        const dx = x2 - x1;
        const dy = y2 - y1;
        
        let cx = x1;
        let cy = y1;
        
        // Midpoint bend calculations
        if (Math.abs(dx) > Math.abs(dy)) {
          const midX = x1 + dx - Math.abs(dy) * Math.sign(dx);
          const segment1Ratio = Math.abs(midX - x1) / (Math.abs(midX - x1) + Math.abs(dy) * Math.sqrt(2));
          
          if (this.progress < segment1Ratio) {
            const p1 = this.progress / segment1Ratio;
            cx = x1 + (midX - x1) * p1;
            cy = y1;
          } else {
            const p2 = (this.progress - segment1Ratio) / (1 - segment1Ratio);
            cx = midX + (x2 - midX) * p2;
            cy = y1 + (y2 - y1) * p2;
          }
        } else {
          const midY = y1 + dy - Math.abs(dx) * Math.sign(dy);
          const segment1Ratio = Math.abs(midY - y1) / (Math.abs(midY - y1) + Math.abs(dx) * Math.sqrt(2));
          
          if (this.progress < segment1Ratio) {
            const p1 = this.progress / segment1Ratio;
            cx = x1;
            cy = y1 + (midY - y1) * p1;
          } else {
            const p2 = (this.progress - segment1Ratio) / (1 - segment1Ratio);
            cx = x1 + (x2 - x1) * p2;
            cy = midY + (y2 - midY) * p2;
          }
        }

        const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim();
        
        ctx.beginPath();
        ctx.arc(cx, cy, 3, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.shadowBlur = 10;
        ctx.shadowColor = accent;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    let signals = [];

    // Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Disable mouse active status if stationary for 2.5 seconds
      if (mouse.active && Date.now() - mouse.lastMove > 2500) {
        mouse.active = false;
      }

      const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim();

      // 1. Update and draw Hub nodes
      hubs.forEach(hub => {
        hub.update();
        hub.draw();
      });

      // 2. Draw default background grid circuit traces
      hubs.forEach((hub, i) => {
        // Find 2 closest nodes to connect traces
        const targets = hubs
          .map((h, idx) => ({ idx, dist: Math.hypot(h.x - hub.x, h.y - hub.y) }))
          .filter(t => t.idx !== i)
          .sort((a, b) => a.dist - b.dist)
          .slice(0, 2);

        targets.forEach(target => {
          // Trace opacity blends into background
          drawCircuitTrace(hub.x, hub.y, hubs[target.idx].x, hubs[target.idx].y, accent, 0.08, 1);
        });
      });

      // 3. Draw mouse-interactive active tracing lines
      if (mouse.active) {
        // Find 3 closest hubs to cursor
        const closeHubs = hubs
          .map((h, idx) => ({ idx, dist: Math.hypot(h.x - mouse.x, h.y - mouse.y) }))
          .sort((a, b) => a.dist - b.dist)
          .slice(0, 3);

        closeHubs.forEach(ch => {
          // Dynamic glow based on proximity (closer cursor = stronger lines)
          const proximityAlpha = Math.max(0, 1 - ch.dist / 280) * 0.25;
          if (proximityAlpha > 0) {
            drawCircuitTrace(mouse.x, mouse.y, hubs[ch.idx].x, hubs[ch.idx].y, accent, proximityAlpha, 1.2);
            hubs[ch.idx].glow = Math.max(hubs[ch.idx].glow, proximityAlpha * 2);
          }
        });
      }

      // 4. Randomly launch signals traveling tracks
      if (Math.random() < 0.015 && signals.length < 15) {
        const startIdx = Math.floor(Math.random() * hubs.length);
        const startHub = hubs[startIdx];
        
        // Find closest targets
        const targets = hubs
          .map((h, idx) => ({ idx, dist: Math.hypot(h.x - startHub.x, h.y - startHub.y) }))
          .filter(t => t.idx !== startIdx)
          .sort((a, b) => a.dist - b.dist)
          .slice(0, 3);
          
        if (targets.length > 0) {
          const randTarget = targets[Math.floor(Math.random() * targets.length)];
          signals.push(new Signal(startHub, hubs[randTarget.idx]));
        }
      }

      // 5. Update and draw signals
      signals = signals.filter(sig => {
        const active = sig.update();
        if (active) sig.draw();
        return active;
      });

      requestAnimationFrame(draw);
    };

    draw();
  };

  // Run the canvas engine on load
  initCircuitCanvas();

});
