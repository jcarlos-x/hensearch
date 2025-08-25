// TMOHentai Search - Simplified Sidebar App

// Función global para manejar errores de imagen con múltiples estrategias
function handleImageError(imgElement, originalUrl) {
    // Si ya intentamos con la URL original, usar placeholder
    if (imgElement.dataset.retryAttempt === 'original') {
        imgElement.onerror = null;
        imgElement.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwIiBoZWlnaHQ9IjM1MCIgdmlld0JveD0iMCAwIDI1MCAzNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTAiIGhlaWdodD0iMzUwIiBmaWxsPSIjMzMzIi8+Cjx0ZXh0IHg9IjEyNSIgeT0iMTc1IiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPkVycm9yIGRlIGltYWdlbjwvdGV4dD4KPC9zdmc+';
        return;
    }
    
    // Si el proxy falló y tenemos URL original, intentar con la imagen directa
    if (originalUrl && originalUrl !== imgElement.src && !imgElement.dataset.retryAttempt) {
        imgElement.dataset.retryAttempt = 'original';
        imgElement.src = originalUrl;
        return;
    }
    
    // Última opción: placeholder
    imgElement.onerror = null;
    imgElement.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwIiBoZWlnaHQ9IjM1MCIgdmlld0JveD0iMCAwIDI1MCAzNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTAiIGhlaWdodD0iMzUwIiBmaWxsPSIjMzMzIi8+Cjx0ZXh0IHg9IjEyNSIgeT0iMTc1IiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPkVycm9yIGRlIGltYWdlbjwvdGV4dD4KPC9zdmc+';
}

class SidebarManager {
    constructor() {
        this.sidebar = document.querySelector('.sidebar');
        this.mobileMenuBtn = document.getElementById('mobileMenuToggle');
        this.sidebarToggle = document.getElementById('sidebarToggle');
        this.isOpen = window.innerWidth >= 1024;
        this.isMobile = window.innerWidth < 1024;
        
        this.init();
    }

    init() {
        this.attachEventListeners();
        this.handleResize();
        
        // Set initial state
        if (!this.isMobile) {
            this.open();
        } else {
            this.close();
        }
    }

    attachEventListeners() {
        // Mobile menu button
        if (this.mobileMenuBtn) {
            this.mobileMenuBtn.addEventListener('click', () => this.toggle());
        }
        
        // Sidebar toggle button
        if (this.sidebarToggle) {
            this.sidebarToggle.addEventListener('click', () => this.toggle());
        }
        
        // Window resize
        window.addEventListener('resize', () => this.handleResize());
        
        // Advanced filters toggle
        this.attachAdvancedToggle();
    }

    attachAdvancedToggle() {
        const advancedToggle = document.getElementById('toggleAdvanced');
        const advancedFilters = document.getElementById('advancedFilters');
        
        if (advancedToggle && advancedFilters) {
            advancedToggle.addEventListener('click', () => {
                const isExpanded = advancedToggle.classList.contains('expanded');
                
                if (isExpanded) {
                    advancedToggle.classList.remove('expanded');
                    advancedFilters.classList.remove('expanded');
                } else {
                    advancedToggle.classList.add('expanded');
                    advancedFilters.classList.add('expanded');
                }
            });
        }
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        this.isOpen = true;
        this.sidebar.classList.add('open');
        
        if (this.isMobile) {
            document.body.style.overflow = 'hidden';
        }
    }

    close() {
        this.isOpen = false;
        this.sidebar.classList.remove('open');
        document.body.style.overflow = '';
    }

    handleResize() {
        const wasMobile = this.isMobile;
        this.isMobile = window.innerWidth < 1024;
        
        if (wasMobile !== this.isMobile) {
            if (!this.isMobile) {
                this.open();
                document.body.style.overflow = '';
            } else {
                this.close();
            }
        }
    }
}

class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.themeToggle = document.getElementById('themeToggle');
        this.themeToggleMobile = document.getElementById('themeToggleMobile');
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        if (this.themeToggleMobile) {
            this.themeToggleMobile.addEventListener('click', () => this.toggleTheme());
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        
        // Update mobile toggle icon
        if (this.themeToggleMobile) {
            const icon = this.themeToggleMobile.querySelector('i');
            icon.className = this.currentTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }
}

class SearchManager {
    constructor() {
        this.searchInput = document.getElementById('searchQuery');
        this.searchForm = document.getElementById('searchForm');
        this.searchBy = document.getElementById('searchBy');
        this.contentType = document.getElementById('contentType');
        this.viewMode = document.getElementById('viewMode');
        this.order = document.getElementById('order');
        this.sortDirection = document.getElementById('sortDirection');
        this.resultsSection = document.getElementById('resultsSection');
        this.resultsContainer = document.getElementById('resultsContainer');
        this.resultsCount = document.getElementById('resultsCount');
        this.welcomeState = document.getElementById('welcomeState');
        this.noResults = document.getElementById('noResults');
        this.errorMessage = document.getElementById('errorMessage');
        this.loadingOverlay = document.getElementById('loadingOverlay');
        
        // Pagination elements
        this.paginationContainer = document.getElementById('paginationContainer');
        this.prevPageBtn = document.getElementById('prevPageBtn');
        this.nextPageBtn = document.getElementById('nextPageBtn');
        this.currentPageNum = document.getElementById('currentPageNum');
        this.totalPagesNum = document.getElementById('totalPagesNum');
        
        this.currentQuery = '';
        this.isSearching = false;
        this.baseUrl = 'http://134.209.116.239:3000';
        
        // Pagination state
        this.currentPage = 1;
        this.totalPages = 1;
        
        this.init();
    }

    init() {
        this.attachEventListeners();
        this.showWelcomeState();
        this.checkBackendStatus();
    }

    async checkBackendStatus() {
        const statusDot = document.querySelector('.status-dot');
        const statusText = document.querySelector('.status-text');
        
        try {
            const response = await fetch(`${this.baseUrl}/api/health`, { 
                method: 'GET',
                timeout: 5000 
            });
            
            if (response.ok) {
                const data = await response.json();
                if (statusDot) statusDot.style.background = 'var(--success)';
                if (statusText) statusText.textContent = 'Online';
            } else {
                throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
            }
        } catch (error) {
            if (statusDot) statusDot.style.background = 'var(--error)';
            if (statusText) statusText.textContent = 'Offline';
        }
    }

    attachEventListeners() {
        // Form submission
        if (this.searchForm) {
            this.searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.performSearch();
            });
        }

        // Input animations
        if (this.searchInput) {
            this.searchInput.addEventListener('focus', () => {
                this.searchInput.style.transform = 'scale(1.02)';
            });
            
            this.searchInput.addEventListener('blur', () => {
                this.searchInput.style.transform = 'scale(1)';
            });
        }

        // View mode change listener
        if (this.viewMode) {
            this.viewMode.addEventListener('change', () => {
                if (this.resultsContainer && !this.resultsContainer.children.length === 0) {
                    const viewMode = this.viewMode.value;
                    this.resultsContainer.className = `results-grid ${viewMode}`;
                }
            });
        }

        // Pagination listeners
        if (this.prevPageBtn) {
            this.prevPageBtn.addEventListener('click', () => this.goToPreviousPage());
        }
        if (this.nextPageBtn) {
            this.nextPageBtn.addEventListener('click', () => this.goToNextPage());
        }
    }

    showWelcomeState() {
        this.hideAllStates();
        if (this.welcomeState) {
            this.welcomeState.classList.remove('hidden');
        }
    }

    showLoading() {
        if (this.loadingOverlay) {
            this.loadingOverlay.classList.remove('hidden');
        }
        this.isSearching = true;
    }

    hideLoading() {
        if (this.loadingOverlay) {
            this.loadingOverlay.classList.add('hidden');
        }
        this.isSearching = false;
    }

    hideAllStates() {
        [this.welcomeState, this.resultsSection, this.noResults, this.errorMessage, this.paginationContainer].forEach(element => {
            if (element) {
                element.classList.add('hidden');
            }
        });
    }

    async performSearch(page = 1) {
        if (this.isSearching) return;
        
        const query = this.searchInput?.value?.trim();
        
        if (!query) {
            this.showError('Por favor ingresa un término de búsqueda');
            return;
        }

        this.currentQuery = query;
        this.currentPage = page;
        this.showLoading();

        try {
            const searchBy = this.searchBy?.value || 'name';
            const params = new URLSearchParams({
                query: query,
                search_by: searchBy,
                page: page.toString()
            });

            // Add advanced filters if they exist
            if (this.contentType?.value) {
                params.append('type', this.contentType.value);
            }
            if (this.viewMode?.value) {
                params.append('view', this.viewMode.value);
            }
            if (this.order?.value) {
                params.append('order', this.order.value);
            }
            if (this.sortDirection?.value) {
                params.append('order_dir', this.sortDirection.value);
            }

            const searchUrl = `${this.baseUrl}/api/search-basic?${params}`;

            const response = await fetch(searchUrl);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                const errorMessage = errorData?.error || `HTTP ${response.status}: ${response.statusText}`;
                throw new Error(errorMessage);
            }

            const data = await response.json();
            this.displayResults(data);
            
        } catch (error) {
            // Mostrar error más específico según el tipo
            let errorMessage = `Error al buscar: ${error.message}`;
            if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                errorMessage = 'No se pudo conectar al servidor. Verifica que el backend esté ejecutándose en http://134.209.116.239:3000';
            } else if (error.message.includes('429')) {
                errorMessage = 'Demasiadas solicitudes. Espera un momento antes de buscar nuevamente.';
            }
            
            this.showError(errorMessage);
        } finally {
            this.hideLoading();
        }
    }

    displayResults(data) {
        this.hideAllStates();

        if (!data.success) {
            this.showError(data.error || 'Error desconocido en la búsqueda');
            return;
        }

        // El backend devuelve 'content' no 'results'
        const results = data.content || [];
        if (results.length === 0) {
            this.showNoResults();
            return;
        }

        const resultCount = results.length;
        const totalResults = data.total_results || resultCount;
        
        if (this.resultsCount) {
            const pageInfo = this.currentPage > 1 ? ` (Página ${this.currentPage})` : '';
            this.resultsCount.textContent = `${resultCount} elementos encontrados${pageInfo}`;
        }
        
        // Aplicar el modo de vista seleccionado
        if (this.resultsContainer) {
            const viewMode = this.viewMode?.value || 'thumbnails';
            this.resultsContainer.className = `results-grid ${viewMode}`;
            
            this.resultsContainer.innerHTML = results.map(item => this.createResultCard(item)).join('');
        }
        
        if (this.resultsSection) {
            this.resultsSection.classList.remove('hidden');
        }
        
        // Update pagination
        this.updatePagination(data);
        
        // Inicializar lazy loading para las nuevas imágenes
        this.initializeLazyLoading();
    }

    createResultCard(item) {
        const safeTitle = item.title || 'Sin título';
        const safeUrl = item.full_url || item.url || '#';
        
        // Placeholder por defecto para lazy loading
        const placeholderSrc = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwIiBoZWlnaHQ9IjM1MCIgdmlld0JveD0iMCAwIDI1MCAzNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTAiIGhlaWdodD0iMzUwIiBmaWxsPSIjMzMzIi8+Cjx0ZXh0IHg9IjEyNSIgeT0iMTc1IiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPkNhcmdhbmRvLi4uPC90ZXh0Pgo8L3N2Zz4=';
        
        // Guardar la URL real de la imagen para lazy loading
        let realImageUrl = null;
        if (item.image_url) {
            realImageUrl = `http://134.209.116.239:3000/api/proxy-image?url=${encodeURIComponent(item.image_url)}`;
        }
        
        const safeCategory = item.category || item.type || 'General';
        const safeRating = item.rating ? `★ ${item.rating.toFixed(1)}` : '';
        const safeLanguage = item.language || '';
        const safeDate = item.publish_date || '';
        
        // Generar ID único para la tarjeta
        const cardId = `card-${Math.random().toString(36).substr(2, 9)}`;
        
        return `
            <div class="result-card" id="${cardId}">
                <div class="result-image">
                    <img src="${placeholderSrc}" 
                         data-lazy-src="${realImageUrl || placeholderSrc}"
                         data-original-src="${item.image_url || ''}"
                         alt="${safeTitle}" 
                         class="lazy-image"
                         onerror="handleImageError(this, '${item.image_url || ''}')"
                         style="opacity: 0.7; transition: opacity 0.3s ease;">
                    <div class="result-overlay">
                        <button class="result-action" title="Ver detalles" onclick="window.open('${safeUrl}', '_blank')">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div class="result-content">
                    <h3 class="result-title" title="${safeTitle}">${safeTitle}</h3>
                    <p class="result-meta">
                        <span class="result-category">${safeCategory}</span>
                        ${safeRating ? `<span class="result-rating">${safeRating}</span>` : ''}
                    </p>
                    
                    <div class="result-actions">
                        <button class="details-btn" onclick="window.searchManager.loadItemDetails('${safeUrl}', document.getElementById('${cardId}'))">
                            <i class="fas fa-info-circle"></i> Más detalles
                        </button>
                        <button class="download-btn" onclick="window.searchManager.downloadMangaPDF('${safeUrl}', '${safeTitle}', document.getElementById('${cardId}'))" title="Descargar en PDF">
                            <i class="fas fa-download"></i> PDF
                        </button>
                        <div class="result-date">
                            ${safeDate ? `<i class="fas fa-calendar"></i> ${safeDate}` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Nueva función para obtener detalles específicos de un elemento
    async loadItemDetails(itemUrl, cardElement) {
        try {
            // Mostrar loading en el botón
            const detailsBtn = cardElement.querySelector('.details-btn');
            if (detailsBtn) {
                detailsBtn.textContent = 'Cargando...';
                detailsBtn.disabled = true;
            }

            const params = new URLSearchParams({ url: itemUrl });
            const detailsUrl = `${this.baseUrl}/api/details?${params}`;
            
            const response = await fetch(detailsUrl);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            
            if (data.success && data.details) {
                // Actualizar la tarjeta con los detalles completos
                this.updateCardWithDetails(cardElement, data.details);
            } else {
                throw new Error(data.error || 'No se pudieron obtener los detalles');
            }
            
        } catch (error) {
            // Mostrar error en el botón
            const detailsBtn = cardElement.querySelector('.details-btn');
            if (detailsBtn) {
                detailsBtn.textContent = 'Error';
                detailsBtn.style.background = 'var(--error)';
            }
            
            // Opcional: mostrar mensaje de error más detallado
            const errorDiv = document.createElement('div');
            errorDiv.className = 'details-error';
            errorDiv.textContent = `Error: ${error.message}`;
            errorDiv.style.cssText = 'color: var(--error); font-size: 12px; margin-top: 8px; text-align: center;';
            
            const resultContent = cardElement.querySelector('.result-content');
            if (resultContent) {
                resultContent.appendChild(errorDiv);
            }
        }
    }

    // Función para actualizar una tarjeta con detalles completos
    updateCardWithDetails(cardElement, details) {
        // Procesar y mostrar tags, géneros, etc. como antes
        const processTags = (tags, className = 'tag') => {
            if (!tags) return '';
            const tagArray = Array.isArray(tags) ? tags : (typeof tags === 'string' ? tags.split(',') : []);
            
            let html = tagArray.map(tag => 
                `<span class="${className}">${tag.trim()}</span>`
            ).join('');
            
            return html;
        };

        const tagsHtml = processTags(details.tags, 'tag tag-primary');
        const gendersHtml = processTags(details.genders, 'tag tag-gender');
        const magazinesHtml = processTags(details.magazines, 'tag tag-magazine');
        const artistsHtml = processTags(details.artists, 'tag tag-artist');

        // Buscar el contenedor de información detallada o crearlo
        let detailsContainer = cardElement.querySelector('.detailed-info');
        if (!detailsContainer) {
            detailsContainer = document.createElement('div');
            detailsContainer.className = 'detailed-info';
            detailsContainer.style.cssText = 'margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border);';
            
            const resultContent = cardElement.querySelector('.result-content');
            if (resultContent) {
                resultContent.appendChild(detailsContainer);
            }
        }

        // Crear el HTML de detalles
        detailsContainer.innerHTML = `
            ${tagsHtml ? `
                <div class="result-info">
                    <div class="result-info-label">Tags</div>
                    <div class="result-tags">${tagsHtml}</div>
                </div>
            ` : ''}
            
            ${gendersHtml ? `
                <div class="result-info">
                    <div class="result-info-label">Géneros</div>
                    <div class="result-tags">${gendersHtml}</div>
                </div>
            ` : ''}
            
            ${magazinesHtml ? `
                <div class="result-info">
                    <div class="result-info-label">Revistas</div>
                    <div class="result-tags">${magazinesHtml}</div>
                </div>
            ` : ''}
            
            ${artistsHtml ? `
                <div class="result-info">
                    <div class="result-info-label">Artistas</div>
                    <div class="result-tags">${artistsHtml}</div>
                </div>
            ` : ''}
            
            ${details.full_title && details.full_title !== cardElement.querySelector('.result-title')?.textContent ? `
                <div class="result-info">
                    <div class="result-info-label">Título Completo</div>
                    <div class="result-detail-text">${details.full_title}</div>
                </div>
            ` : ''}
            
            ${details.language_name ? `
                <div class="result-info">
                    <div class="result-info-label">Idioma</div>
                    <div class="result-detail-text">${details.language_name}</div>
                </div>
            ` : ''}
            
            ${details.uploaded_by ? `
                <div class="result-info">
                    <div class="result-info-label">Subido por</div>
                    <div class="result-detail-text">${details.uploaded_by}</div>
                </div>
            ` : ''}
            
            ${details.pages ? `
                <div class="result-info">
                    <div class="result-info-label">Páginas</div>
                    <div class="result-detail-text">${details.pages} páginas</div>
                </div>
            ` : ''}
        `;

        // Eliminar o ocultar el botón de detalles
        const detailsBtn = cardElement.querySelector('.details-btn');
        if (detailsBtn) {
            detailsBtn.textContent = '✓ Detalles cargados';
            detailsBtn.disabled = true;
            detailsBtn.style.background = 'var(--success)';
            detailsBtn.style.cursor = 'default';
        }
    }

    showNoResults() {
        this.hideAllStates();
        if (this.noResults) {
            this.noResults.classList.remove('hidden');
        }
    }

    showError(message) {
        this.hideAllStates();
        
        if (this.errorMessage) {
            const errorText = this.errorMessage.querySelector('#errorText');
            if (errorText) {
                errorText.textContent = message;
            }
            this.errorMessage.classList.remove('hidden');
        }
    }

    // Función para actualizar la paginación
    goToPreviousPage() {
        if (this.currentPage > 1) {
            const newPage = this.currentPage - 1;
            this.performSearch(newPage);
            // Desplazar hacia arriba para ver los nuevos resultados
            this.scrollToTop();
        }
    }

    goToNextPage() {
        // Permitir ir a la siguiente página si el botón no está deshabilitado
        if (!this.nextPageBtn.disabled) {
            const newPage = this.currentPage + 1;
            this.performSearch(newPage);
            // Desplazar hacia arriba para ver los nuevos resultados
            this.scrollToTop();
        }
    }

    // Función para actualizar la paginación
    updatePagination(data) {
        const results = data.content || [];
        const resultCount = results.length;
        
        // Estrategia para paginación: si obtenemos resultados, asumimos que puede haber más páginas
        // Si obtenemos menos de 24 resultados (el máximo por página), probablemente sea la última página
        if (data.pagination && data.pagination.total_pages) {
            this.totalPages = data.pagination.total_pages;
        } else {
            // Estimación inteligente: si obtenemos 24 resultados, probablemente hay más páginas
            if (resultCount >= 24) {
                this.totalPages = this.currentPage + 1; // Al menos hay una página más
            } else {
                this.totalPages = this.currentPage; // Probablemente es la última página
            }
        }

        if (this.currentPageNum) {
            this.currentPageNum.textContent = this.currentPage;
        }
        if (this.totalPagesNum) {
            this.totalPagesNum.textContent = this.totalPages > this.currentPage ? `${this.totalPages}+` : this.totalPages;
        }

        // Update button states
        if (this.prevPageBtn) {
            this.prevPageBtn.disabled = this.currentPage <= 1;
        }
        if (this.nextPageBtn) {
            // Habilitar el botón "Siguiente" si:
            // 1. Tenemos 24 resultados (indica que probablemente hay más)
            // 2. O si sabemos que hay más páginas
            this.nextPageBtn.disabled = resultCount < 24 && this.currentPage >= this.totalPages;
        }

        // Siempre mostrar la paginación cuando hay resultados
        if (this.paginationContainer && resultCount > 0) {
            this.paginationContainer.classList.remove('hidden');
        } else if (this.paginationContainer) {
            this.paginationContainer.classList.add('hidden');
        }
    }

    // Sistema de Lazy Loading Inteligente
    initializeLazyLoading() {
        // Limpiar observer anterior si existe
        if (this.imageObserver) {
            this.imageObserver.disconnect();
        }
        
        // Configurar Intersection Observer
        const observerOptions = {
            root: null,
            rootMargin: '50px', // Cargar imágenes 50px antes de que sean visibles
            threshold: 0.1
        };
        
        this.imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    this.loadLazyImage(img);
                    this.imageObserver.unobserve(img);
                }
            });
        }, observerOptions);
        
        // Cola de carga de imágenes para rate limiting
        this.imageQueue = [];
        this.isProcessingQueue = false;
        
        // Observar todas las imágenes lazy
        const lazyImages = document.querySelectorAll('.lazy-image');
        lazyImages.forEach(img => {
            this.imageObserver.observe(img);
        });
    }

    async loadLazyImage(img) {
        const lazySrc = img.getAttribute('data-lazy-src');
        if (!lazySrc || lazySrc === img.src) return;
        
        // Agregar a la cola para rate limiting
        this.imageQueue.push({ img, lazySrc });
        this.processImageQueue();
    }

    async processImageQueue() {
        if (this.isProcessingQueue || this.imageQueue.length === 0) return;
        
        this.isProcessingQueue = true;
        
        // Procesar imágenes en lotes de 3
        while (this.imageQueue.length > 0) {
            // Tomar hasta 3 imágenes del queue
            const batch = this.imageQueue.splice(0, 3);
            
            // Procesar el lote en paralelo
            const batchPromises = batch.map(async ({ img, lazySrc }) => {
                try {
                    // Crear nueva imagen para precargar
                    const newImg = new Image();
                    
                    // Promesa para manejar la carga
                    const loadPromise = new Promise((resolve, reject) => {
                        newImg.onload = () => {
                            // Imagen cargada exitosamente
                            img.src = lazySrc;
                            img.style.opacity = '1';
                            img.classList.add('loaded');
                            resolve();
                        };
                        
                        newImg.onerror = () => {
                            // Error al cargar la imagen
                            img.classList.add('error');
                            reject();
                        };
                    });
                    
                    // Iniciar carga
                    newImg.src = lazySrc;
                    
                    // Esperar resultado
                    await loadPromise;
                    
                } catch (error) {
                    // Error silencioso para no interrumpir el procesamiento
                }
            });
            
            // Esperar a que todas las imágenes del lote terminen
            await Promise.allSettled(batchPromises);
            
            // Delay entre lotes (1.5 segundos) solo si hay más imágenes
            if (this.imageQueue.length > 0) {
                await new Promise(resolve => setTimeout(resolve, 1500));
            }
        }
        
        this.isProcessingQueue = false;
    }

    // Función para desplazarse hacia la parte superior de la página
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Nueva función para descargar manga en PDF
    async downloadMangaPDF(mangaUrl, mangaTitle, cardElement = null) {
        // Obtener el botón de descarga para mostrar estado
        const downloadBtn = cardElement?.querySelector('.download-btn');
        
        try {
            // Deshabilitar botón y mostrar estado de descarga
            if (downloadBtn) {
                downloadBtn.disabled = true;
                downloadBtn.classList.add('downloading');
                downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Descargando...';
            }
            
            // Mostrar progreso de descarga
            this.showDownloadProgress(mangaTitle);
            
            // Primero obtener los detalles del manga para conseguir todas las imágenes
            this.updateDownloadStatus('Obteniendo información del manga...');
            
            const detailsResponse = await fetch(`${this.baseUrl}/api/details?url=${encodeURIComponent(mangaUrl)}`);
            if (!detailsResponse.ok) {
                throw new Error(`Error obteniendo detalles: ${detailsResponse.status}`);
            }
            
            const detailsData = await detailsResponse.json();
            if (!detailsData.success) {
                throw new Error(detailsData.error || 'Error obteniendo detalles del manga');
            }
            
            // Necesitamos obtener las imágenes del manga
            // Para esto, vamos a hacer una solicitud especial al backend
            this.updateDownloadStatus('Obteniendo lista de imágenes...');
            
            const imagesResponse = await fetch(`${this.baseUrl}/api/images?url=${encodeURIComponent(mangaUrl)}`);
            let imageUrls = [];
            
            if (imagesResponse.ok) {
                const imagesData = await imagesResponse.json();
                if (imagesData.success && imagesData.images) {
                    imageUrls = imagesData.images;
                }
            }
            
            // Si no hay endpoint de imágenes, intentar extraer del HTML
            if (imageUrls.length === 0) {
                this.updateDownloadStatus('Analizando contenido del manga...');
                
                try {
                    // Intentar usar el proxy CORS del backend si existe
                    const proxyUrl = `${this.baseUrl}/api/proxy-html?url=${encodeURIComponent(mangaUrl)}`;
                    const htmlResponse = await fetch(proxyUrl);
                    
                    if (htmlResponse.ok) {
                        const htmlData = await htmlResponse.json();
                        if (htmlData.success && htmlData.html) {
                            const parser = new DOMParser();
                            const doc = parser.parseFromString(htmlData.html, 'text/html');
                            
                            // Buscar imágenes del manga
                            const imgElements = doc.querySelectorAll('img[data-original], .content-image');
                            imageUrls = Array.from(imgElements)
                                .map(img => img.getAttribute('data-original') || img.src)
                                .filter(url => url && !url.includes('spinner.gif') && (url.includes('tmohentai') || url.startsWith('http')));
                        }
                    }
                } catch (proxyError) {
                    // Proxy no disponible, intentar método alternativo
                }
                
                // Si el proxy no funcionó, intentar acceso directo (puede fallar por CORS)
                if (imageUrls.length === 0) {
                    try {
                        const htmlResponse = await fetch(mangaUrl, { mode: 'cors' });
                        if (htmlResponse.ok) {
                            const htmlText = await htmlResponse.text();
                            const parser = new DOMParser();
                            const doc = parser.parseFromString(htmlText, 'text/html');
                            
                            // Buscar imágenes del manga
                            const imgElements = doc.querySelectorAll('img[data-original], .content-image');
                            imageUrls = Array.from(imgElements)
                                .map(img => img.getAttribute('data-original') || img.src)
                                .filter(url => url && !url.includes('spinner.gif') && (url.includes('tmohentai') || url.startsWith('http')));
                        }
                    } catch (corsError) {
                        // No se pudo acceder directamente por CORS
                    }
                }
                
                // Último recurso: generar URLs estimadas basadas en el patrón del sitio
                if (imageUrls.length === 0) {
                    this.updateDownloadStatus('Generando lista de imágenes estimada...');
                    
                    // Extraer ID del manga de la URL
                    const mangaId = mangaUrl.split('/').pop().split('?')[0];
                    
                    // Intentar obtener el número de páginas de los detalles
                    let pageCount = 25; // Valor por defecto
                    
                    if (detailsData.details && detailsData.details.pages) {
                        pageCount = parseInt(detailsData.details.pages);
                    }
                    
                    // Si no hay información de páginas en los detalles, intentar detectar automáticamente
                    if (!detailsData.details || !detailsData.details.pages || pageCount <= 0) {
                        this.updateDownloadStatus('Detectando número de páginas...');
                        
                        pageCount = await this.detectPageCount(mangaId);
                    }
                    
                    // Generar URLs basadas en el número de páginas detectado
                    for (let i = 0; i < pageCount; i++) {
                        const imageNumber = String(i).padStart(3, '0');
                        imageUrls.push(`https://imgrojo.tmohentai.com/contents/${mangaId}/${imageNumber}.webp`);
                    }
                }
            }
            
            if (imageUrls.length === 0) {
                throw new Error('No se encontraron imágenes para descargar. El manga podría no estar disponible o tener protección especial.');
            }
            
            this.updateDownloadStatus(`Descargando ${imageUrls.length} imágenes...`);
            
            // Usar jsPDF para crear el PDF
            const pdfInfo = await this.createPDFFromImages(imageUrls, mangaTitle);
            
            this.showDownloadSuccess(mangaTitle, `(${pdfInfo.successfulImages}/${pdfInfo.totalImages} páginas incluidas)`);
            
            // Actualizar botón a estado exitoso
            if (downloadBtn) {
                downloadBtn.innerHTML = '<i class="fas fa-check"></i> ¡Descargado!';
                downloadBtn.style.background = 'linear-gradient(135deg, var(--success), #059669)';
                
                // Restaurar botón después de 3 segundos
                setTimeout(() => {
                    downloadBtn.disabled = false;
                    downloadBtn.classList.remove('downloading');
                    downloadBtn.innerHTML = '<i class="fas fa-download"></i> PDF';
                    downloadBtn.style.background = '';
                }, 3000);
            }
            
        } catch (error) {
            this.showDownloadError(error.message);
            
            // Restaurar botón a estado de error
            if (downloadBtn) {
                downloadBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
                downloadBtn.style.background = 'linear-gradient(135deg, var(--error), #dc2626)';
                
                // Restaurar botón después de 3 segundos
                setTimeout(() => {
                    downloadBtn.disabled = false;
                    downloadBtn.classList.remove('downloading');
                    downloadBtn.innerHTML = '<i class="fas fa-download"></i> PDF';
                    downloadBtn.style.background = '';
                }, 3000);
            }
        } finally {
            // Ocultar progreso después de un delay
            setTimeout(() => {
                this.hideDownloadProgress();
            }, 3000);
        }
    }

    // Función para crear PDF desde lista de imágenes
    async createPDFFromImages(imageUrls, title) {
        // Importar jsPDF dinámicamente si no está disponible
        if (typeof window.jsPDF === 'undefined') {
            await this.loadJsPDF();
        }
        
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();
        let currentPage = 1;
        let successfulImages = 0;
        let failedImages = 0;
        
        this.updateDownloadStatus('Generando PDF...');
        
        for (let i = 0; i < imageUrls.length; i++) {
            try {
                this.updateDownloadStatus(`Procesando imagen ${i + 1}/${imageUrls.length}... (${successfulImages} exitosas, ${failedImages} fallidas)`);
                
                // Descargar imagen a través del proxy del backend
                const imageUrl = imageUrls[i];
                const proxyUrl = `${this.baseUrl}/api/proxy-image?url=${encodeURIComponent(imageUrl)}`;
                
                const response = await fetch(proxyUrl);
                if (!response.ok) {
                    failedImages++;
                    
                    // Si fallan más de 10 imágenes consecutivas, probablemente terminamos el manga
                    if (failedImages > 10 && (failedImages / (i + 1)) > 0.5) {
                        break;
                    }
                    continue;
                }
                
                const blob = await response.blob();
                
                // Verificar que realmente es una imagen
                if (!blob.type.startsWith('image/')) {
                    failedImages++;
                    continue;
                }
                
                const imgUrl = URL.createObjectURL(blob);
                
                // Cargar imagen y obtener dimensiones
                const img = await new Promise((resolve, reject) => {
                    const image = new Image();
                    image.onload = () => resolve(image);
                    image.onerror = () => reject(new Error('Error cargando imagen'));
                    image.src = imgUrl;
                });
                
                // Calcular dimensiones para ajustar al PDF
                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();
                const imgRatio = img.width / img.height;
                let imgWidth = pageWidth - 20;
                let imgHeight = imgWidth / imgRatio;
                
                // Si la imagen es más alta que la página, ajustar altura
                if (imgHeight > pageHeight - 20) {
                    imgHeight = pageHeight - 20;
                    imgWidth = imgHeight * imgRatio;
                }
                
                // Agregar nueva página excepto para la primera imagen
                if (successfulImages > 0) {
                    pdf.addPage();
                }
                
                // Centrar imagen en la página
                const x = (pageWidth - imgWidth) / 2;
                const y = (pageHeight - imgHeight) / 2;
                
                pdf.addImage(img, 'JPEG', x, y, imgWidth, imgHeight);
                URL.revokeObjectURL(imgUrl);
                
                successfulImages++;
                
            } catch (error) {
                failedImages++;
            }
        }
        
        // Mostrar resumen final
        this.updateDownloadStatus(`PDF generado con ${successfulImages} páginas`);
        
        if (successfulImages === 0) {
            throw new Error('No se pudo procesar ninguna imagen para el PDF');
        }
        
        // Descargar el PDF
        const fileName = `${this.sanitizeFilename(title)}.pdf`;
        pdf.save(fileName);
        
        return {
            fileName,
            totalImages: imageUrls.length,
            successfulImages,
            failedImages
        };
    }

    // Función para cargar jsPDF dinámicamente
    async loadJsPDF() {
        return new Promise((resolve, reject) => {
            if (document.querySelector('script[src*="jspdf"]')) {
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    // Función para actualizar el estado de descarga
    updateDownloadStatus(message) {
        const statusElement = document.querySelector('.download-status');
        if (statusElement) {
            statusElement.textContent = message;
            statusElement.style.color = 'var(--text-secondary)';
        }
    }

    // Función para detectar automáticamente el número de páginas de un manga
    async detectPageCount(mangaId) {
        try {
            // Estrategia 1: Probar existencia de imágenes incrementalmente
            let pageCount = 0;
            let consecutiveFailures = 0;
            const maxConsecutiveFailures = 5; // Dejar de buscar después de 5 fallos consecutivos
            const maxPages = 200; // Límite máximo razonable
            
            // Comenzar con verificaciones más espaciadas para acelerar el proceso
            const checkPoints = [10, 25, 50, 75, 100, 150, 200];
            let lastValidPage = 0;
            
            // Primero hacer verificaciones rápidas en puntos clave
            for (const checkPoint of checkPoints) {
                this.updateDownloadStatus(`Verificando página ${checkPoint}...`);
                
                const imageNumber = String(checkPoint - 1).padStart(3, '0'); // -1 porque empezamos desde 0
                const testUrl = `https://imgrojo.tmohentai.com/contents/${mangaId}/${imageNumber}.webp`;
                const proxyUrl = `${this.baseUrl}/api/proxy-image?url=${encodeURIComponent(testUrl)}`;
                
                try {
                    const response = await fetch(proxyUrl, { method: 'HEAD' });
                    if (response.ok) {
                        lastValidPage = checkPoint;
                    } else {
                        break;
                    }
                } catch (error) {
                    break;
                }
                
                // Pequeña pausa para no sobrecargar el servidor
                await new Promise(resolve => setTimeout(resolve, 200));
            }
            
            // Ahora hacer búsqueda binaria entre el último punto válido y el siguiente
            let start = Math.max(1, lastValidPage - 25);
            let end = lastValidPage + 25;
            
            while (start <= end && end <= maxPages) {
                const mid = Math.floor((start + end) / 2);
                this.updateDownloadStatus(`Verificando página ${mid} (búsqueda binaria)...`);
                
                const imageNumber = String(mid - 1).padStart(3, '0');
                const testUrl = `https://imgrojo.tmohentai.com/contents/${mangaId}/${imageNumber}.webp`;
                const proxyUrl = `${this.baseUrl}/api/proxy-image?url=${encodeURIComponent(testUrl)}`;
                
                try {
                    const response = await fetch(proxyUrl, { method: 'HEAD' });
                    if (response.ok) {
                        pageCount = mid;
                        start = mid + 1;
                    } else {
                        end = mid - 1;
                    }
                } catch (error) {
                    end = mid - 1;
                }
                
                // Pausa para no sobrecargar
                await new Promise(resolve => setTimeout(resolve, 150));
            }
            
            // Si no encontramos nada, usar el último punto válido encontrado
            if (pageCount === 0 && lastValidPage > 0) {
                pageCount = lastValidPage;
            }
            
            // Si aún no tenemos páginas, usar un valor por defecto
            if (pageCount === 0) {
                pageCount = 25;
            }
            
            return pageCount;
            
        } catch (error) {
            return 25; // Valor por defecto en caso de error
        }
    }

    // Función para sanitizar nombres de archivo
    sanitizeFilename(filename) {
        return filename.replace(/[/\\?%*:|"<>]/g, '-').trim();
    }

    // Mostrar progreso de descarga
    showDownloadProgress(title) {
        // Crear overlay de progreso si no existe
        let progressOverlay = document.getElementById('downloadProgressOverlay');
        if (!progressOverlay) {
            progressOverlay = document.createElement('div');
            progressOverlay.id = 'downloadProgressOverlay';
            progressOverlay.className = 'download-progress-overlay';
            document.body.appendChild(progressOverlay);
        }
        
        progressOverlay.innerHTML = `
            <div class="download-progress-content">
                <div class="download-spinner"></div>
                <h3>Generando PDF</h3>
                <p>Descargando: ${title}</p>
                <div class="download-status">Preparando descarga...</div>
            </div>
        `;
        
        progressOverlay.classList.remove('hidden');
    }

    // Ocultar progreso de descarga
    hideDownloadProgress() {
        const progressOverlay = document.getElementById('downloadProgressOverlay');
        if (progressOverlay) {
            progressOverlay.classList.add('hidden');
        }
    }

    // Mostrar éxito de descarga
    showDownloadSuccess(title, additionalInfo = '') {
        const statusElement = document.querySelector('.download-status');
        if (statusElement) {
            const message = additionalInfo 
                ? `¡PDF de "${title}" descargado exitosamente! ${additionalInfo}`
                : `¡PDF de "${title}" descargado exitosamente!`;
            statusElement.textContent = message;
            statusElement.style.color = 'var(--success)';
        }
        
        // Ocultar después de 5 segundos para mensajes más largos
        setTimeout(() => {
            this.hideDownloadProgress();
        }, 5000);
    }

    // Mostrar error de descarga
    showDownloadError(errorMessage) {
        const statusElement = document.querySelector('.download-status');
        if (statusElement) {
            statusElement.textContent = `Error: ${errorMessage}`;
            statusElement.style.color = 'var(--error)';
        }
        
        // Ocultar después de 5 segundos
        setTimeout(() => {
            this.hideDownloadProgress();
        }, 5000);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize managers
    const sidebarManager = new SidebarManager();
    const themeManager = new ThemeManager();
    const searchManager = new SearchManager();
    
    // Make search manager globally available
    window.searchManager = searchManager;
});