// static/js/neural-network.js
class NeuralAnimation {
    constructor() {
        this.canvas = document.getElementById('neural-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        this.resizeCanvas();
        this.init();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.nodes = []; // Clear existing nodes
            this.init(); // Reinitialize with new dimensions
        });
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.zIndex = '-1';
    }

    init() {
        // Create more nodes with better distribution
        const numNodes = Math.floor(window.innerWidth * window.innerHeight / 15000); // More nodes
        
        // Create grid-based distribution
        const gridSize = 100; // Size of each grid cell
        const cols = Math.ceil(this.canvas.width / gridSize);
        const rows = Math.ceil(this.canvas.height / gridSize);
        
        // Ensure at least one node in each grid cell
        for (let col = 0; col < cols; col++) {
            for (let row = 0; row < rows; row++) {
                const x = (col * gridSize) + (Math.random() * gridSize);
                const y = (row * gridSize) + (Math.random() * gridSize);
                this.nodes.push({
                    x: x,
                    y: y,
                    vx: (Math.random() - 0.5) * 0.8,
                    vy: (Math.random() - 0.5) * 0.8,
                    radius: Math.random() * 3 + 2
                });
            }
        }
        
        // Add additional random nodes
        for (let i = 0; i < numNodes; i++) {
            this.nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                radius: Math.random() * 3 + 2
            });
        }

        this.animate();
    }

    drawConnections() {
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const dx = this.nodes[i].x - this.nodes[j].x;
                const dy = this.nodes[i].y - this.nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 200) {
                    const gradient = this.ctx.createLinearGradient(
                        this.nodes[i].x, this.nodes[i].y,
                        this.nodes[j].x, this.nodes[j].y
                    );
                    gradient.addColorStop(0, 'rgba(74, 144, 226, 0.4)'); // Slightly more opaque
                    gradient.addColorStop(1, 'rgba(138, 43, 226, 0.4)'); // Slightly more opaque

                    this.ctx.beginPath();
                    this.ctx.strokeStyle = gradient;
                    this.ctx.lineWidth = Math.max(0.2, 1.2 - distance/200); // Thicker lines
                    this.ctx.moveTo(this.nodes[i].x, this.nodes[i].y);
                    this.ctx.lineTo(this.nodes[j].x, this.nodes[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    updateNodes() {
        this.nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;

            // Bounce off walls with some padding
            const padding = 50;
            if (node.x < padding || node.x > this.canvas.width - padding) {
                node.vx *= -1;
                node.x = Math.max(padding, Math.min(this.canvas.width - padding, node.x));
            }
            if (node.y < padding || node.y > this.canvas.height - padding) {
                node.vy *= -1;
                node.y = Math.max(padding, Math.min(this.canvas.height - padding, node.y));
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw nodes with gradient
        this.nodes.forEach(node => {
            const gradient = this.ctx.createRadialGradient(
                node.x, node.y, 0,
                node.x, node.y, node.radius
            );
            gradient.addColorStop(0, 'rgba(74, 144, 226, 0.9)'); // Even brighter core
            gradient.addColorStop(1, 'rgba(138, 43, 226, 0.5)'); // More visible edge

            this.ctx.beginPath();
            this.ctx.fillStyle = gradient;
            this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            this.ctx.fill();
        });

        this.drawConnections();
    }

    animate() {
        this.updateNodes();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Start animation when page loads
window.addEventListener('load', () => {
    new NeuralAnimation();
});
