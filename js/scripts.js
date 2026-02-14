/*!
* Start Bootstrap - Creative v7.0.7 (https://startbootstrap.com/theme/creative)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
*/
//
// Scripts
// 

// Função para renderizar projetos dinamicamente
async function loadProjects() {
    try {
        // adicionar timestamp para evitar cache CDN/HTTP e garantir JSON atualizado
        const response = await fetch('data/projects.json?t=' + Date.now());
        const data = await response.json();

        // debug: log do URL retornado e quantos projetos vieram
        console.log('[projects.json fetched]', response.url, 'projects:', Array.isArray(data.projects) ? data.projects.length : 'no projects');

        // Renderizar grid de portfolios
        renderPortfolioGrid(data.projects);

        // Renderizar modals
        renderProjectModals(data.projects);
    } catch (error) {
        console.error('Erro ao carregar projetos:', error);
    }
}

// Renderizar a grid de thumbnails dos projetos
function renderPortfolioGrid(projects) {
    const portfolioContainer = document.querySelector('.container-fluid.px-4 .row.g-4');
    if (!portfolioContainer) return;

    // Limpar container (remover itens padrão)
    portfolioContainer.innerHTML = '';

    projects.forEach((project) => {
        const colDiv = document.createElement('div');
        colDiv.className = 'col-lg-4 col-sm-6';
        colDiv.innerHTML = `
            <a class="portfolio-box" title="${project.title}" data-bs-toggle="modal" href="#portfolioModal${project.id}">
                <img class="img-fluid" src="${project.thumbnail}" alt="${project.title}" />
            </a>
        `;
        portfolioContainer.appendChild(colDiv);
    });
}

// Renderizar todos os modals dinamicamente
function renderProjectModals(projects) {
    const modalsContainer = document.getElementById('projects-modals-container');
    if (!modalsContainer) return;

    projects.forEach((project) => {
        const carouselId = `carouselProject${project.id}`;
        
        // Gerar indicadores do carousel
        const indicators = project.images.map((img, index) => `
            <button type="button" data-bs-target="#${carouselId}" data-bs-slide-to="${index}" 
                    class="${index === 0 ? 'active' : ''}"></button>
        `).join('');

        // Gerar slides do carousel
        const slides = project.images.map((img, index) => `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img src="${img}" class="d-block w-100 img-fluid" alt="Project Image ${index + 1}">
            </div>
        `).join('');

        // Gerar descrições
        const descriptions = project.description.map(text => `<p>${text}</p>`).join('');

        // Gerar tecnologias
        const technologiesText = project.technologies.join(' | ');

        // Criar modal
        const modalDiv = document.createElement('div');
        modalDiv.className = 'portfolio-modal modal fade';
        modalDiv.id = `portfolioModal${project.id}`;
        modalDiv.setAttribute('tabindex', '-1');
        modalDiv.setAttribute('role', 'dialog');
        modalDiv.setAttribute('aria-hidden', 'true');
        
        modalDiv.innerHTML = `
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-12">
                                <div class="modal-body">
                                    <!-- BOOTSTRAP CAROUSEL -->
                                    <div id="${carouselId}" class="carousel slide mb-4" data-bs-ride="carousel">
                                        <!-- Indicators -->
                                        <div class="carousel-indicators">
                                            ${indicators}
                                        </div>

                                        <!-- Slides -->
                                        <div class="carousel-inner">
                                            ${slides}
                                        </div>

                                        <!-- Controls -->
                                        <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
                                            <span class="carousel-control-prev-icon"></span>
                                        </button>

                                        <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
                                            <span class="carousel-control-next-icon"></span>
                                        </button>
                                    </div>
                                    <!-- END CAROUSEL -->

                                    <div class="project-meta mb-3">
                                        <h3 class="mb-1">Projeto:</h3>
                                        <p class="mb-1">${project.title}</p>
                                        <h3 class="mb-1">Tecnologias:</h3>
                                        <p class="mb-0">${technologiesText}</p>
                                        <p></p>

                                        <h3 class="mb-1">Descrição:</h3>
                                        ${descriptions}
                                    </div>

                                    <div class="text-center mt-4">
                                        <button class="btn btn-primary btn-xl text-uppercase" data-bs-dismiss="modal" type="button">
                                            <i class="fas fa-xmark me-1"></i>
                                            Fechar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        modalsContainer.appendChild(modalDiv);
    });
}

window.addEventListener('DOMContentLoaded', event => {

    // Carregar projetos do JSON
    loadProjects();

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // SimpleLightbox initialization removed to prevent click opening the lightbox/carousel.
    // If you want to enable it only for specific items, replace with:
    // new SimpleLightbox({ elements: '#portfolio a.portfolio-box.lightbox' });

    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

});
