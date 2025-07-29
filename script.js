class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0, radius: 150 };
        this.mouseParticle = null;
        this.isPaused = false;
        
        // 8 Ana Parametre
        this.params = {
            particleCount: 200,
            particleSpeed: 1.0,
            particleSize: 3,
            sizeRandomness: 0.0,
            connectionDistance: 100,
            mouseConnectionDistance: 200,
            mouseForce: 0.0,
            colorScheme: 'galaxy'
        };
        
        this.colorSchemes = {
            galaxy: ['#8b5cf6', '#a855f7', '#c084fc', '#d8b4fe', '#e9d5ff', '#f3e8ff', '#faf5ff'],
            nebula: ['#06b6d4', '#0891b2', '#0e7490', '#155e75', '#164e63', '#0f172a', '#020617'],
            cosmic: ['#f59e0b', '#d97706', '#b45309', '#92400e', '#78350f', '#451a03', '#7c2d12'],
            stardust: ['#ec4899', '#db2777', '#be185d', '#9d174d', '#831843', '#500724', '#1f2937'],
            aurora: ['#10b981', '#059669', '#047857', '#065f46', '#064e3b', '#022c22', '#0f172a']
        };
        
        this.init();
        this.setupEventListeners();
        this.animate();
    }
    
    init() {
        this.resizeCanvas();
        this.createParticles();
    }
    
    resizeCanvas() {
        const controlsPanel = document.querySelector('.controls-panel');
        const isFullscreen = document.fullscreenElement !== null;
        const isHidden = controlsPanel.classList.contains('hidden');
        
        if (isFullscreen || isHidden) {
            // Tam ekran modunda veya menü gizliyse
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        } else {
            // Normal modda - canvas tam ekran boyutunda ama menü üstte
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
        
        // Mobile responsive için
        if (window.innerWidth <= 768 && !isFullscreen) {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight * 0.6; // %60 yükseklik
        }
    }
    
    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.params.particleCount; i++) {
            // Boyut rastgeleliği hesapla
            const randomFactor = 1 + (Math.random() - 0.5) * 2 * this.params.sizeRandomness;
            const particleSize = Math.max(1, this.params.particleSize * randomFactor);
            
            this.particles.push(new Particle(
                Math.random() * this.canvas.width,
                Math.random() * this.canvas.height,
                particleSize,
                this.params.particleSpeed,
                this.getRandomColor()
            ));
        }
        
        // Mouse parçacığını oluştur
        this.mouseParticle = new Particle(
            this.canvas.width / 2,
            this.canvas.height / 2,
            this.params.particleSize * 1.5,
            0,
            '#8b5cf6'
        );
    }
    
    getRandomColor() {
        const colors = this.colorSchemes[this.params.colorScheme];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    updateParticleSizes() {
        this.particles.forEach(particle => {
            // Boyut rastgeleliği hesapla
            const randomFactor = 1 + (Math.random() - 0.5) * 2 * this.params.sizeRandomness;
            particle.size = Math.max(1, this.params.particleSize * randomFactor);
        });
        
        // Mouse parçacığının boyutunu da güncelle
        if (this.mouseParticle) {
            this.mouseParticle.size = this.params.particleSize * 1.5;
        }
    }
    
    setupEventListeners() {
        // Canvas mouse events
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
            
            // Mouse parçacığını güncelle
            if (this.mouseParticle) {
                this.mouseParticle.x = this.mouse.x;
                this.mouseParticle.y = this.mouse.y;
            }
        });
        
        // Mouse'un menü üzerinde olup olmadığını kontrol et
        document.addEventListener('mousemove', (e) => {
            const controlsPanel = document.querySelector('.controls-panel');
            const isFullscreen = document.fullscreenElement !== null;
            const isHidden = controlsPanel.classList.contains('hidden');
            
            if (!isFullscreen && !isHidden) {
                // Normal modda mouse menü üzerindeyse parçacık etkileşimini devre dışı bırak
                const panelRect = controlsPanel.getBoundingClientRect();
                if (e.clientX < panelRect.right) {
                    this.mouse.x = 0;
                    this.mouse.y = 0;
                    if (this.mouseParticle) {
                        this.mouseParticle.x = this.canvas.width / 2;
                        this.mouseParticle.y = this.canvas.height / 2;
                    }
                }
            }
        });
        
        this.canvas.addEventListener('mouseleave', () => {
            this.mouse.x = 0;
            this.mouse.y = 0;
            if (this.mouseParticle) {
                this.mouseParticle.x = this.canvas.width / 2;
                this.mouseParticle.y = this.canvas.height / 2;
            }
        });
        
        // Control events
        document.getElementById('particleCount').addEventListener('input', (e) => {
            this.params.particleCount = parseInt(e.target.value);
            document.getElementById('particleCountValue').textContent = e.target.value;
            this.createParticles();
        });
        
        document.getElementById('particleSpeed').addEventListener('input', (e) => {
            this.params.particleSpeed = parseFloat(e.target.value);
            document.getElementById('particleSpeedValue').textContent = e.target.value;
            this.particles.forEach(particle => {
                // Hız değişikliğini mevcut hıza uygula
                const currentSpeed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
                if (currentSpeed > 0) {
                    const speedMultiplier = this.params.particleSpeed / currentSpeed;
                    particle.vx *= speedMultiplier;
                    particle.vy *= speedMultiplier;
                } else {
                    particle.vx = (Math.random() - 0.5) * 2 * this.params.particleSpeed;
                    particle.vy = (Math.random() - 0.5) * 2 * this.params.particleSpeed;
                }
            });
        });
        
        document.getElementById('particleSize').addEventListener('input', (e) => {
            this.params.particleSize = parseInt(e.target.value);
            document.getElementById('particleSizeValue').textContent = e.target.value;
            this.updateParticleSizes();
        });
        
        document.getElementById('sizeRandomness').addEventListener('input', (e) => {
            this.params.sizeRandomness = parseFloat(e.target.value);
            document.getElementById('sizeRandomnessValue').textContent = e.target.value;
            this.updateParticleSizes();
        });
        
        document.getElementById('connectionDistance').addEventListener('input', (e) => {
            this.params.connectionDistance = parseInt(e.target.value);
            document.getElementById('connectionDistanceValue').textContent = e.target.value;
        });
        
        document.getElementById('mouseConnectionDistance').addEventListener('input', (e) => {
            this.params.mouseConnectionDistance = parseInt(e.target.value);
            document.getElementById('mouseConnectionDistanceValue').textContent = e.target.value;
        });
        
        document.getElementById('mouseForce').addEventListener('input', (e) => {
            this.params.mouseForce = parseFloat(e.target.value);
            document.getElementById('mouseForceValue').textContent = e.target.value;
        });
        
        document.getElementById('colorScheme').addEventListener('change', (e) => {
            this.params.colorScheme = e.target.value;
            this.particles.forEach(particle => {
                particle.color = this.getRandomColor();
            });
        });
        
        // Button events
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetParticles();
        });
        
        document.getElementById('pauseBtn').addEventListener('click', () => {
            this.togglePause();
        });
        
        document.getElementById('fullscreenBtn').addEventListener('click', () => {
            this.toggleFullscreen();
        });
        
        // Window resize
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.createParticles();
        });
        
        // ESC tuşu ile tam ekran modundan çıkış
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.fullscreenElement) {
                this.toggleFullscreen();
            }
        });
        
        // Tam ekran değişikliklerini dinle
        document.addEventListener('fullscreenchange', () => {
            if (!document.fullscreenElement) {
                // Tam ekran modundan çıkıldığında menüyü göster
                const controlsPanel = document.querySelector('.controls-panel');
                const canvasContainer = document.querySelector('.canvas-container');
                const fullscreenBtn = document.getElementById('fullscreenBtn');
                
                controlsPanel.classList.remove('hidden');
                canvasContainer.classList.remove('fullscreen');
                fullscreenBtn.textContent = 'Tam Ekran';
                this.resizeCanvas();
            }
        });
    }
    
    resetParticles() {
        this.particles.forEach(particle => {
            particle.x = Math.random() * this.canvas.width;
            particle.y = Math.random() * this.canvas.height;
            particle.vx = (Math.random() - 0.5) * 2 * this.params.particleSpeed;
            particle.vy = (Math.random() - 0.5) * 2 * this.params.particleSpeed;
        });
    }
    
    togglePause() {
        this.isPaused = !this.isPaused;
        const btn = document.getElementById('pauseBtn');
        btn.textContent = this.isPaused ? 'Devam Et' : 'Duraklat';
    }
    
    toggleFullscreen() {
        const controlsPanel = document.querySelector('.controls-panel');
        const canvasContainer = document.querySelector('.canvas-container');
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        
        if (!document.fullscreenElement) {
            // Tam ekran moduna geç
            document.documentElement.requestFullscreen().then(() => {
                controlsPanel.classList.add('hidden');
                canvasContainer.classList.add('fullscreen');
                fullscreenBtn.textContent = 'Menüyü Göster';
                this.resizeCanvas();
            });
        } else {
            // Tam ekran modundan çık
            document.exitFullscreen().then(() => {
                controlsPanel.classList.remove('hidden');
                canvasContainer.classList.remove('fullscreen');
                fullscreenBtn.textContent = 'Tam Ekran';
                this.resizeCanvas();
            });
        }
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < this.mouse.radius && this.mouse.x !== 0 && this.params.mouseForce !== 0) {
                const force = (this.mouse.radius - distance) / this.mouse.radius;
                const angle = Math.atan2(dy, dx);
                
                // Mouse çekim gücüne göre parçacıkları çek veya it
                if (this.params.mouseForce > 0) {
                    // Pozitif değer: Parçacıkları çek
                    particle.vx += Math.cos(angle) * force * this.params.mouseForce * 0.5;
                    particle.vy += Math.sin(angle) * force * this.params.mouseForce * 0.5;
                } else {
                    // Negatif değer: Parçacıkları it
                    particle.vx -= Math.cos(angle) * force * Math.abs(this.params.mouseForce) * 0.5;
                    particle.vy -= Math.sin(angle) * force * Math.abs(this.params.mouseForce) * 0.5;
                }
            }
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off walls
            if (particle.x <= 0 || particle.x >= this.canvas.width) {
                particle.vx *= -0.8;
                particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            }
            if (particle.y <= 0 || particle.y >= this.canvas.height) {
                particle.vy *= -0.8;
                particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
            }
            
            // Add some randomness
            particle.vx += (Math.random() - 0.5) * 0.1;
            particle.vy += (Math.random() - 0.5) * 0.1;
            
            // Limit speed
            const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
            if (speed > 3) {
                particle.vx = (particle.vx / speed) * 3;
                particle.vy = (particle.vy / speed) * 3;
            }
        });
    }
    
    drawConnections() {
        // Normal parçacıklar arası bağlantılar
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.params.connectionDistance) {
                    const opacity = 1 - (distance / this.params.connectionDistance);
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
        
        // Mouse parçacığı ile diğer parçacıklar arası bağlantılar
        if (this.mouseParticle && this.mouse.x !== 0) {
            for (let i = 0; i < this.particles.length; i++) {
                const dx = this.mouseParticle.x - this.particles[i].x;
                const dy = this.mouseParticle.y - this.particles[i].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.params.mouseConnectionDistance) {
                    const opacity = 1 - (distance / this.params.mouseConnectionDistance);
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.6})`;
                    this.ctx.lineWidth = 2;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.mouseParticle.x, this.mouseParticle.y);
                    this.ctx.lineTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.stroke();
                }
            }
        }
    }
    
    drawParticles() {
        // Normal parçacıkları çiz
        this.particles.forEach(particle => {
            // Create gradient for each particle
            const gradient = this.ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.size
            );
            gradient.addColorStop(0, particle.color);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Add glow effect
            this.ctx.shadowColor = particle.color;
            this.ctx.shadowBlur = 10;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        });
        
        // Mouse parçacığını çiz
        if (this.mouseParticle && this.mouse.x !== 0) {
            // Mouse parçacığı için özel gradient
            const mouseGradient = this.ctx.createRadialGradient(
                this.mouseParticle.x, this.mouseParticle.y, 0,
                this.mouseParticle.x, this.mouseParticle.y, this.mouseParticle.size
            );
            mouseGradient.addColorStop(0, '#8b5cf6');
            mouseGradient.addColorStop(0.5, '#a855f7');
            mouseGradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
            
            this.ctx.fillStyle = mouseGradient;
            this.ctx.beginPath();
            this.ctx.arc(this.mouseParticle.x, this.mouseParticle.y, this.mouseParticle.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Mouse parçacığı için özel glow efekti
            this.ctx.shadowColor = '#8b5cf6';
            this.ctx.shadowBlur = 20;
            this.ctx.fillStyle = '#a855f7';
            this.ctx.beginPath();
            this.ctx.arc(this.mouseParticle.x, this.mouseParticle.y, this.mouseParticle.size * 0.7, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        }
    }
    
    animate() {
        if (!this.isPaused) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            this.updateParticles();
            this.drawConnections();
            this.drawParticles();
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

class Particle {
    constructor(x, y, size, speed, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
        this.color = color;
        this.vx = (Math.random() - 0.5) * 2 * speed;
        this.vy = (Math.random() - 0.5) * 2 * speed;
    }
}

// Initialize the particle system when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particleCanvas');
    new ParticleSystem(canvas);
}); 