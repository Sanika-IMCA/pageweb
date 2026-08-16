"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as PIXI from "pixi.js";

interface HeroVisualContentProps {
  activeState: number;
  setActiveState: (state: number) => void;
  reduceMotion: boolean;
  isMobile: boolean;
}

interface VisualNode {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: number;
  alpha: number;
  
  targetX: number;
  targetY: number;
  targetRadius: number;
  targetAlpha: number;
}

interface Packet {
  pathIndex: number; // Index of the connection path
  progress: number; // 0 to 1
  speed: number;
  color: number;
  size: number;
  fromNode: number;
  toNode: number;
}

export default function HeroVisualContent({
  activeState,
  setActiveState,
  reduceMotion,
  isMobile
}: HeroVisualContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Track mouse and drag interaction
  const mousePos = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const accumDrag = useRef(0);
  
  // Velocity trackers for WebGL distortion
  const velocity = useRef({ x: 0, y: 0 });
  const smoothedVelocity = useRef({ x: 0, y: 0 });
  
  // Keep track of dynamic width/height
  const dims = useRef({ width: 500, height: 500 });
  
  // Procedural node configurations
  const numNodes = 35;
  const nodes = useRef<VisualNode[]>(
    Array.from({ length: 35 }, (_, i) => ({
      id: i,
      x: 0.5,
      y: 0.5,
      vx: 0,
      vy: 0,
      radius: 4,
      color: 0x2e5b94,
      alpha: 0.6,
      targetX: 0.5,
      targetY: 0.5,
      targetRadius: 4,
      targetAlpha: 0.6
    }))
  );
  const packets = useRef<Packet[]>([]);
  const connections = useRef<{ from: number; to: number; color: number; alpha: number }[]>([]);

  // Spawns data packets based on state
  const spawnPackets = useCallback((state: number) => {
    packets.current = [];
    if (connections.current.length === 0) return;

    let numPackets = 10;
    let baseSpeed = 0.005;

    if (state === 1) {
      // Friction: more packets, accumulate at the bottleneck
      numPackets = 18;
    } else if (state === 3) {
      // Automation: fast flow loops
      numPackets = 25;
      baseSpeed = 0.015;
    } else if (state === 4) {
      // Control: structured pulses
      numPackets = 14;
      baseSpeed = 0.008;
    }

    for (let p = 0; p < numPackets; p++) {
      // Pick a random connection path
      const pathIdx = Math.floor(Math.random() * connections.current.length);
      const conn = connections.current[pathIdx];
      
      let speed = baseSpeed * (0.8 + 0.4 * Math.random());
      const color = conn.color;
      let size = 2 + Math.random() * 2;

      // Special packet features based on state
      if (state === 1) {
        // In friction, central red bottleneck paths slow packets down to 15% speed
        if (conn.color === 0xe59393) {
          speed = baseSpeed * 0.15;
          size = 3.5;
        }
      }

      packets.current.push({
        pathIndex: pathIdx,
        progress: Math.random(),
        speed,
        color,
        size,
        fromNode: conn.from,
        toNode: conn.to
      });
    }
  }, []);

  // Set node states targets based on activeState
  const updateStateTargets = useCallback((state: number) => {
    const w = dims.current.width;
    const h = dims.current.height;
    const ns = nodes.current;

    // Reset connections
    connections.current = [];

    switch (state) {
      case 0: // CHAOS
        // Scatter nodes randomly but deterministic
        ns.forEach((node, i) => {
          node.targetX = 0.15 + 0.7 * (Math.sin(i * 4.3 + 0.5) * 0.5 + 0.5);
          node.targetY = 0.15 + 0.7 * (Math.cos(i * 3.7 + 1.2) * 0.5 + 0.5);
          node.targetRadius = 2 + (i % 5);
          node.targetAlpha = 0.3 + 0.5 * (i % 3) / 2;
          node.color = 0x2e5b94;
        });
        
        // Random messy connections
        for (let i = 0; i < numNodes; i++) {
          if (i % 2 === 0) {
            connections.current.push({
              from: i,
              to: (i + 5) % numNodes,
              color: 0x2e5b94,
              alpha: 0.15
            });
          }
          if (i % 3 === 0) {
            connections.current.push({
              from: i,
              to: (i + 12) % numNodes,
              color: 0x2e5b94,
              alpha: 0.1
            });
          }
        }
        break;

      case 1: // FRICTION
        // Two clustered silos (left vs right) with a narrow bottleneck bridge
        ns.forEach((node, i) => {
          if (i < 15) {
            // Left Silo (0 - 14)
            const row = i % 4;
            const col = Math.floor(i / 4);
            node.targetX = 0.15 + 0.15 * (col / 3);
            node.targetY = 0.2 + 0.6 * (row / 3);
            node.color = 0x2e5b94;
          } else if (i < 30) {
            // Right Silo (15 - 29)
            const index = i - 15;
            const row = index % 4;
            const col = Math.floor(index / 4);
            node.targetX = 0.7 + 0.15 * (col / 3);
            node.targetY = 0.2 + 0.6 * (row / 3);
            node.color = 0x2e5b94;
          } else {
            // Bottleneck Nodes (30 - 34)
            const index = i - 30;
            node.targetX = 0.45 + 0.1 * (index / 4);
            node.targetY = 0.45 + 0.1 * (Math.sin(index) * 0.5);
            node.color = 0xe59393; // Alert warning red-ish color
          }
          node.targetRadius = i >= 30 ? 5.5 : 3.5;
          node.targetAlpha = i >= 30 ? 0.9 : 0.6;
        });

        // Set connections
        for (let i = 0; i < 15; i++) {
          if (i % 2 === 0) {
            connections.current.push({ from: i, to: (i + 1) % 15, color: 0x2e5b94, alpha: 0.15 });
          }
        }
        for (let i = 15; i < 29; i++) {
          if (i % 2 === 0) {
            connections.current.push({ from: i, to: i + 1, color: 0x2e5b94, alpha: 0.15 });
          }
        }
        // Bottleneck bridge connections
        connections.current.push({ from: 5, to: 30, color: 0xe59393, alpha: 0.4 });
        connections.current.push({ from: 30, to: 31, color: 0xe59393, alpha: 0.6 });
        connections.current.push({ from: 31, to: 32, color: 0xe59393, alpha: 0.6 });
        connections.current.push({ from: 32, to: 33, color: 0xe59393, alpha: 0.6 });
        connections.current.push({ from: 33, to: 34, color: 0xe59393, alpha: 0.6 });
        connections.current.push({ from: 34, to: 20, color: 0xe59393, alpha: 0.4 });
        break;

      case 2: // SYSTEM
        // Balanced structured grid
        ns.forEach((node, i) => {
          const col = i % 5;
          const row = Math.floor(i / 5);
          node.targetX = 0.15 + 0.7 * (col / 4);
          node.targetY = 0.15 + 0.7 * (row / 6);
          node.targetRadius = 4;
          node.targetAlpha = 0.7;
          node.color = 0x2e5b94;
        });

        // Grid lines connections
        for (let i = 0; i < numNodes; i++) {
          const col = i % 5;
          const row = Math.floor(i / 5);
          if (col < 4) {
            connections.current.push({ from: i, to: i + 1, color: 0x2e5b94, alpha: 0.2 });
          }
          if (row < 6) {
            connections.current.push({ from: i, to: i + 5, color: 0x2e5b94, alpha: 0.2 });
          }
        }
        break;

      case 3: // AUTOMATION
        // Synchronized parallel flows
        ns.forEach((node, i) => {
          const lane = i % 3;
          const step = Math.floor(i / 3);
          node.targetX = 0.15 + 0.7 * (step / 11);
          node.targetY = 0.25 + 0.25 * lane;
          node.targetRadius = 3.5;
          node.targetAlpha = 0.8;
          node.color = 0x2e5b94;
        });

        // Dynamic parallel routing connections
        for (let i = 0; i < numNodes - 3; i++) {
          connections.current.push({ from: i, to: i + 3, color: 0x2e5b94, alpha: 0.3 });
        }
        break;

      case 4: // CONTROL
        // Concentric circles converging to a center target node
        ns.forEach((node, i) => {
          if (i === 0) {
            // Target Node (Center)
            node.targetX = 0.5;
            node.targetY = 0.5;
            node.targetRadius = 8;
            node.targetAlpha = 1.0;
            node.color = 0x2e5b94;
          } else if (i <= 8) {
            // Inner Ring
            const angle = ((i - 1) / 8) * Math.PI * 2;
            node.targetX = 0.5 + 0.15 * Math.sin(angle);
            node.targetY = 0.5 + 0.15 * Math.cos(angle);
            node.targetRadius = 4;
            node.targetAlpha = 0.7;
            node.color = 0x2e5b94;
          } else if (i <= 20) {
            // Middle Ring
            const angle = ((i - 9) / 12) * Math.PI * 2;
            node.targetX = 0.5 + 0.28 * Math.sin(angle);
            node.targetY = 0.5 + 0.28 * Math.cos(angle);
            node.targetRadius = 3.5;
            node.targetAlpha = 0.6;
            node.color = 0x2e5b94;
          } else {
            // Outer Ring
            const angle = ((i - 21) / 14) * Math.PI * 2;
            node.targetX = 0.5 + 0.4 * Math.sin(angle);
            node.targetY = 0.5 + 0.4 * Math.cos(angle);
            node.targetRadius = 3;
            node.targetAlpha = 0.5;
            node.color = 0xe59393;
          }
        });

        // Circular ring connections
        for (let i = 1; i <= 8; i++) {
          connections.current.push({ from: i, to: 0, color: 0x2e5b94, alpha: 0.25 });
        }
        for (let i = 1; i <= 8; i++) {
          const next = 1 + (i % 8);
          connections.current.push({ from: i, to: next, color: 0x2e5b94, alpha: 0.2 });
        }
        for (let i = 9; i <= 20; i++) {
          const next = 9 + ((i - 9 + 1) % 12);
          connections.current.push({ from: i, to: next, color: 0x2e5b94, alpha: 0.15 });
        }
        for (let i = 21; i <= 34; i++) {
          const next = 21 + ((i - 21 + 1) % 14);
          connections.current.push({ from: i, to: next, color: 0xe59393, alpha: 0.1 });
        }
        break;
    }

    // Refresh packets when state changes
    spawnPackets(state);
  }, [spawnPackets]);

  // Run target updates when activeState changes
  useEffect(() => {
    updateStateTargets(activeState);
  }, [activeState, updateStateTargets]);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // Set dimensions
    const updateSize = () => {
      if (!containerRef.current || !canvasRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight || 500;
      dims.current = { width, height };
      
      if (appRef.current) {
        appRef.current.renderer.resize(width, height);
      }
      updateStateTargets(activeState);
    };

    const appRef = { current: null as PIXI.Application | null };
    
    const initPixi = async () => {
      const app = new PIXI.Application();
      await app.init({
        canvas: canvasRef.current!,
        width: dims.current.width,
        height: dims.current.height,
        antialias: true,
        backgroundAlpha: 0,
        resolution: isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2),
        autoDensity: true,
      });

      appRef.current = app;

      // Draw graphics element
      const graphics = new PIXI.Graphics();
      app.stage.addChild(graphics);

      // Create Custom GLSL ES 3.0 Fragment Shader
      const fragmentShader = `
        in vec2 vTextureCoord;
        uniform sampler2D uTexture;
        uniform vec2 uVelocity;
        uniform float uTime;
        out vec4 finalColor;

        float noise(vec2 p) {
          return sin(p.x * 12.0 + uTime * 2.0) * cos(p.y * 12.0 + uTime * 2.0) * 0.5 + 0.5;
        }

        void main() {
          vec2 uv = vTextureCoord;
          float n = noise(uv * 4.0);
          
          // Offset coordinates along velocity direction scaled by noise
          vec2 offset = uVelocity * 0.005 * (n * 0.6 + 0.4);
          
          // Chromatic aberration split proportional to velocity length
          float shift = length(uVelocity) * 0.003;
          
          vec4 r = texture(uTexture, uv - offset + vec2(shift, 0.0));
          vec4 g = texture(uTexture, uv - offset);
          vec4 b = texture(uTexture, uv - offset - vec2(shift, 0.0));
          
          finalColor = vec4(r.r, g.g, b.b, g.a);
        }
      `;

      // Default WebGL 2 vertex shader for filters in PixiJS v8
      const vertexShader = `
        in vec2 aPosition;
        out vec2 vTextureCoord;

        uniform vec4 uInputSize;
        uniform vec4 uOutputFrame;
        uniform vec4 uOutputTexture;

        vec4 filterVertexPosition( void ) {
            vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
            position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
            position.y = position.y * (2.0 * uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;
            return vec4(position, 0.0, 1.0);
        }

        vec2 filterTextureCoord( void ) {
            return aPosition * (uOutputFrame.zw * uInputSize.zw);
        }

        void main(void) {
            gl_Position = filterVertexPosition();
            vTextureCoord = filterTextureCoord();
        }
      `;

      // Define filter with custom uniforms
      const displacementFilter = PIXI.Filter.from({
        gl: {
          vertex: vertexShader,
          fragment: fragmentShader
        },
        resources: {
          customUniforms: {
            uVelocity: { value: [0.0, 0.0], type: 'vec2<f32>' },
            uTime: { value: 0.0, type: 'f32' }
          }
        }
      });

      // Apply filter to graphics container (or stage)
      if (!reduceMotion && !isMobile) {
        app.stage.filters = [displacementFilter];
      }

      // Resize listener
      updateSize();
      window.addEventListener("resize", updateSize);

      let timeElapsed = 0;

      // Physics constants
      const springK = 0.04;
      const damping = 0.85;

      // PixiJS animation ticker loop
      const tickerCallback = (ticker: PIXI.Ticker) => {
        timeElapsed += 0.02 * ticker.deltaTime;

        // 1. Uniforms update (distort shader)
        if (!reduceMotion && !isMobile && displacementFilter.resources?.customUniforms) {
          // Smooth the input velocity using linear interpolation (inertia)
          smoothedVelocity.current.x += (velocity.current.x - smoothedVelocity.current.x) * 0.1;
          smoothedVelocity.current.y += (velocity.current.y - smoothedVelocity.current.y) * 0.1;

          // Decay input velocity
          velocity.current.x *= 0.92;
          velocity.current.y *= 0.92;

          // Set shader uniforms
          const uniforms = displacementFilter.resources.customUniforms.uniforms;
          uniforms.uVelocity = [smoothedVelocity.current.x, smoothedVelocity.current.y];
          uniforms.uTime = timeElapsed;
        }

        // 2. Physics simulation for nodes
        const w = dims.current.width;
        const h = dims.current.height;
        
        nodes.current.forEach((node, i) => {
          // Spring force towards target
          const tx = node.targetX * w;
          const ty = node.targetY * h;
          
          // Organic drift per state to make it look alive
          let driftX = 0;
          let driftY = 0;

          if (activeState === 0) {
            // Chaos drift: erratic Brownian-like movement
            driftX = Math.sin(timeElapsed * 1.5 + i) * 15;
            driftY = Math.cos(timeElapsed * 1.8 - i) * 15;
          } else if (activeState === 1) {
            // Friction drift: nervous shaking at bottleneck
            if (node.color === 0xe59393) {
              driftX = (Math.random() - 0.5) * 1.5;
              driftY = (Math.random() - 0.5) * 1.5;
            }
          } else if (activeState === 4) {
            // Control drift: clean rotating orbits around center
            if (i > 0) {
              const dx = node.x - w / 2;
              const dy = node.y - h / 2;
              const r = Math.sqrt(dx*dx + dy*dy);
              const angle = Math.atan2(dy, dx);
              
              // Rotate different rings in opposite directions
              let dir = 1;
              if (i >= 9 && i < 21) dir = -1;
              if (i >= 21) dir = 0.5;

              const speed = 0.003 * dir;
              const nextAngle = angle + speed;
              
              // Direct override coordinates rather than drift force to keep clean rings
              node.targetX = (w / 2 + Math.cos(nextAngle) * r) / w;
              node.targetY = (h / 2 + Math.sin(nextAngle) * r) / h;
            }
          }

          const dx = tx + driftX - node.x;
          const dy = ty + driftY - node.y;

          if (reduceMotion) {
            // Skip spring animations
            node.x = tx + driftX;
            node.y = ty + driftY;
            node.radius = node.targetRadius;
            node.alpha = node.targetAlpha;
          } else {
            const ax = dx * springK;
            const ay = dy * springK;

            node.vx = (node.vx + ax) * damping;
            node.vy = (node.vy + ay) * damping;

            node.x += node.vx;
            node.y += node.vy;

            // Interpolate radius and alpha
            node.radius += (node.targetRadius - node.radius) * 0.1;
            node.alpha += (node.targetAlpha - node.alpha) * 0.1;
          }
        });

        // 3. Clear and redraw canvas
        graphics.clear();

        // 3a. Draw background grid
        graphics.stroke({ width: 1, color: 0x2e5b94, alpha: 0.04 });
        const gridGap = 40;
        for (let x = 0; x < w; x += gridGap) {
          graphics.moveTo(x, 0);
          graphics.lineTo(x, h);
        }
        for (let y = 0; y < h; y += gridGap) {
          graphics.moveTo(0, y);
          graphics.lineTo(w, y);
        }

        // 3b. Draw connections (lines)
        connections.current.forEach((conn) => {
          const fromNode = nodes.current[conn.from];
          const toNode = nodes.current[conn.to];
          
          if (fromNode && toNode) {
            graphics.stroke({
              width: conn.color === 0xe59393 ? 1.5 : 1,
              color: conn.color,
              alpha: conn.alpha * ((fromNode.alpha + toNode.alpha) / 2)
            });
            graphics.moveTo(fromNode.x, fromNode.y);
            graphics.lineTo(toNode.x, toNode.y);
          }
        });

        // 3c. Draw moving packets along connections
        packets.current.forEach((packet) => {
          const conn = connections.current[packet.pathIndex];
          if (!conn) return;

          const fromNode = nodes.current[packet.fromNode];
          const toNode = nodes.current[packet.toNode];

          if (fromNode && toNode) {
            // Update packet progress
            packet.progress += packet.speed;
            if (packet.progress >= 1) {
              packet.progress = 0;
              // Reroute slightly to make it feel dynamic
              if (activeState === 0) {
                // Chaos: pick a random connection
                packet.pathIndex = Math.floor(Math.random() * connections.current.length);
                const nextConn = connections.current[packet.pathIndex];
                packet.fromNode = nextConn.from;
                packet.toNode = nextConn.to;
              }
            }

            // Interpolate position along line
            const px = fromNode.x + (toNode.x - fromNode.x) * packet.progress;
            const py = fromNode.y + (toNode.y - fromNode.y) * packet.progress;

            // Draw glowing packet
            graphics.fill({ color: packet.color, alpha: 0.95 });
            graphics.drawCircle(px, py, packet.size);
          }
        });

        // 3d. Draw nodes
        nodes.current.forEach((node) => {
          graphics.fill({ color: node.color, alpha: node.alpha });
          graphics.drawCircle(node.x, node.y, node.radius);
          
          // Draw subtle outline for larger nodes (Control center / Red nodes)
          if (node.radius > 5) {
            graphics.stroke({ width: 1, color: node.color, alpha: 0.3 });
            graphics.drawCircle(node.x, node.y, node.radius + 3);
          }
        });
      };

      app.ticker.add(tickerCallback);
    };

    initPixi();

    // Clean up
    return () => {
      window.removeEventListener("resize", updateSize);
      if (appRef.current) {
        appRef.current.destroy(true, { children: true, texture: true });
        appRef.current = null;
      }
    };
  }, [reduceMotion]);

  // Pointer drag and touch listeners to inject velocity & trigger state transitions
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
    accumDrag.current = 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    // Add velocity proportional to pointer movements (all desktop mouse movements over canvas add subtle distortion)
    const dx = e.movementX;
    const dy = e.movementY;
    
    velocity.current.x += dx * 0.25;
    velocity.current.y += dy * 0.25;

    if (isDragging.current) {
      const deltaX = e.clientX - dragStart.current.x;
      accumDrag.current = deltaX;
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging.current) {
      isDragging.current = false;
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);

      // Trigger state change based on drag distance (swipe gesture)
      const threshold = 80;
      if (Math.abs(accumDrag.current) > threshold) {
        let nextState = activeState;
        if (accumDrag.current > 0) {
          // Drag right -> previous state
          nextState = Math.max(0, activeState - 1);
        } else {
          // Drag left -> next state
          nextState = Math.min(4, activeState + 1);
        }

        if (nextState !== activeState) {
          // Inject transition impulse
          const direction = accumDrag.current > 0 ? 1 : -1;
          velocity.current.x += direction * 35; // Peak distortion
          setActiveState(nextState);
        }
      }
    }
  };

  // Scroll wheel listener inside container
  const handleWheel = (e: React.WheelEvent) => {
    // Stop event propagating if we are transitioning within the hero
    // Capture vertical scroll velocity
    const deltaY = e.deltaY;
    velocity.current.y += deltaY * 0.08;

    // Detect high velocity scrolls to transition states
    const scrollThreshold = 180;
    accumDrag.current += deltaY;

    if (Math.abs(accumDrag.current) > scrollThreshold) {
      let nextState = activeState;
      if (accumDrag.current > 0) {
        nextState = Math.min(4, activeState + 1);
      } else {
        nextState = Math.max(0, activeState - 1);
      }

      if (nextState !== activeState) {
        // Prevent default scrolling during state transitions
        e.preventDefault();
        
        // Push velocity distortion
        const direction = accumDrag.current > 0 ? 1 : -1;
        velocity.current.y += direction * 30;
        
        setActiveState(nextState);
        accumDrag.current = 0; // Reset accumulator
      } else {
        // Let scroll pass through to next sections naturally if at the borders
        if (activeState === 4 && deltaY > 0) {
          // At the end, scrolling down should go to the next section
        } else if (activeState === 0 && deltaY < 0) {
          // At the start, scrolling up
        } else {
          e.preventDefault();
        }
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px] relative select-none cursor-grab active:cursor-grabbing overflow-hidden flex items-center justify-center bg-transparent"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onWheel={handleWheel}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block touch-none z-10"
      />
    </div>
  );
}
