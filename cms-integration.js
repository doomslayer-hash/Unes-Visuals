
// CMS Integration Script
class PortfolioCMS {
    constructor() {
        this.apiBase = '/api';
        this.init();
    }

    async init() {
        try {
            await this.loadDynamicContent();
            await this.loadDynamicProjects();
        } catch (error) {
            console.log('Using static content - CMS not available');
        }
    }

    async loadDynamicContent() {
        try {
            const response = await fetch(`${this.apiBase}/content.php`);
            const content = await response.json();
            
            content.forEach(item => {
                this.updateSectionContent(item.section, item.title, item.content);
            });
        } catch (error) {
            console.log('Static content mode');
        }
    }

    async loadDynamicProjects() {
        try {
            const response = await fetch(`${this.apiBase}/projects.php`);
            const projects = await response.json();
            
            if (projects.length > 0) {
                this.updatePortfolioGrid(projects);
            }
        } catch (error) {
            console.log('Using static projects');
        }
    }

    updateSectionContent(section, title, content) {
        switch (section) {
            case 'hero':
                const heroTitle = document.querySelector('.hero-title');
                const heroDesc = document.querySelector('.hero-description');
                if (title && heroTitle) {
                    const nameSpan = heroTitle.querySelector('.name-highlight');
                    if (nameSpan) {
                        heroTitle.innerHTML = title.replace('Unes Rebeiro', `<span class="name-highlight">Unes Rebeiro</span>`);
                    }
                }
                if (content && heroDesc) {
                    heroDesc.textContent = content;
                }
                break;
                
            case 'about':
                const aboutText = document.querySelector('.about-text p');
                if (content && aboutText) {
                    aboutText.textContent = content;
                }
                break;
                
            case 'contact':
                const contactDesc = document.querySelector('.contact-info p');
                if (content && contactDesc) {
                    contactDesc.textContent = content;
                }
                break;
        }
    }

    updatePortfolioGrid(projects) {
        const portfolioGrid = document.querySelector('.portfolio-grid');
        if (!portfolioGrid) return;

        // Clear existing items
        portfolioGrid.innerHTML = '';

        projects.forEach((project, index) => {
            const projectElement = this.createProjectElement(project, `cms-project-${project.id}`);
            portfolioGrid.appendChild(projectElement);
        });

        // Update project data for modal
        this.updateProjectData(projects);
    }

    createProjectElement(project, projectId) {
        const projectDiv = document.createElement('div');
        projectDiv.className = 'portfolio-item';
        projectDiv.setAttribute('data-project', projectId);

        const mainImage = project.images && project.images.length > 0 ? project.images[0] : '';
        
        projectDiv.innerHTML = `
            <div class="portfolio-image">
                <div class="portfolio-graphic" style="background-image: url('${mainImage}'); background-size: cover; background-position: center;">
                    ${!mainImage ? this.getDefaultGraphic(project.category) : ''}
                </div>
            </div>
            <div class="portfolio-overlay">
                <h3>${project.title}</h3>
                <p>${project.description.substring(0, 60)}...</p>
                <div class="view-project">View Project →</div>
            </div>
        `;

        // Add click event
        projectDiv.addEventListener('click', (e) => {
            e.preventDefault();
            this.openCMSProjectModal(project);
        });

        return projectDiv;
    }

    getDefaultGraphic(category) {
        const graphics = {
            'branding': `
                <div class="logo-design">
                    <div class="mock-logo">
                        <div class="logo-shape circle"></div>
                        <div class="logo-shape triangle"></div>
                        <div class="logo-text-mock">BRAND</div>
                    </div>
                </div>
            `,
            'poster': `
                <div class="poster-design">
                    <div class="poster-mock">
                        <div class="poster-header"></div>
                        <div class="poster-title">EVENT</div>
                        <div class="poster-subtitle">2024</div>
                    </div>
                </div>
            `,
            'digital-art': `
                <div class="digital-art">
                    <div class="art-mock">
                        <div class="art-shape shape-1"></div>
                        <div class="art-shape shape-2"></div>
                        <div class="art-shape shape-3"></div>
                    </div>
                </div>
            `,
            'social-media': `
                <div class="social-media">
                    <div class="social-mock">
                        <div class="social-header">
                            <div class="profile-pic"></div>
                            <div class="username">@brand</div>
                        </div>
                        <div class="social-content">
                            <div class="content-block block-1"></div>
                            <div class="content-block block-2"></div>
                        </div>
                    </div>
                </div>
            `,
            'print': `
                <div class="business-card">
                    <div class="card-mock">
                        <div class="card-logo"></div>
                        <div class="card-name">DESIGN</div>
                        <div class="card-title">PRINT</div>
                    </div>
                </div>
            `,
            'ui-ux': `
                <div class="web-graphics">
                    <div class="web-mock">
                        <div class="browser-bar">
                            <div class="browser-dots">
                                <span></span><span></span><span></span>
                            </div>
                        </div>
                        <div class="web-content">
                            <div class="web-header"></div>
                            <div class="web-graphic"></div>
                        </div>
                    </div>
                </div>
            `
        };
        
        return graphics[category] || graphics['branding'];
    }

    updateProjectData(projects) {
        // Update the global projectsData object used by the modal
        projects.forEach(project => {
            window.projectsData[`cms-project-${project.id}`] = {
                title: project.title,
                description: project.description,
                images: project.images || [],
                tools: project.tools || [],
                client: project.client,
                year: project.year,
                category: project.category
            };
        });
    }

    openCMSProjectModal(project) {
        const projectId = `cms-project-${project.id}`;
        if (window.openProjectModal) {
            window.openProjectModal(projectId);
        }
    }
}

// Initialize CMS when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioCMS = new PortfolioCMS();
});
