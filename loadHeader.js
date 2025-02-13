class HeaderLoader {
    async init() {
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (!headerPlaceholder) return;

        headerPlaceholder.innerHTML = this.getHeaderHTML();
        this.updateElements();
        this.initializeEvents();
        this.hidePageSearch();
    }

    getHeaderHTML() {
        const currentUser = 'ducquanmax';
        return `
        <header class="header">
            <div class="header-content">
                <div class="header-left">
                    <button class="hamburger-menu" onclick="toggleSidebar()" aria-label="Menu">
                        <svg width="24" height="24" viewBox="0 0 16 16">
                            <path fill="currentColor" d="M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75ZM1.75 12h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5Z"></path>
                        </svg>
                    </button>
                    <a href="/" class="header-logo">
                        <svg height="32" aria-hidden="true" viewBox="0 0 16 16" width="32">
                            <path fill="currentColor" d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
                        </svg>
                    </a>
                    <div class="header-title">
                        <span id="header-title-text">瑶族 Yaozu</span>
                    </div>
                </div>
                <div class="header-search">
                    <div class="search-wrapper">
                        <svg class="search-icon" width="16" height="16" viewBox="0 0 16 16">
                            <path fill="currentColor" d="M11.5 7a4.499 4.499 0 11-8.997 0A4.499 4.499 0 0111.5 7zm-.82 4.74a6 6 0 111.06-1.06l3.04 3.04a.75.75 0 11-1.06 1.06l-3.04-3.04z"></path>
                        </svg>
                        <input type="search" id="header-search" placeholder="Tìm kiếm..." aria-label="Search">
                    </div>
                </div>
            </div>
        </header>
        <div id="sidebar" class="sidebar">
            <div class="sidebar-header">
                <span>Danh mục</span>
                <button class="close-sidebar" onclick="toggleSidebar()">✕</button>
            </div>
            <nav class="sidebar-nav">
                <div class="nav-section">
                    <h3>Tra cứu</h3>
                    <ul>
                        <li><a onclick="loadPage('ci')" href="javascript:void(0)">Từ điển tiếng Dao</a></li>
                        <li><a onclick="loadPage('ipa')" href="javascript:void(0)">Phát âm tiếng Dao</a></li>
                    </ul>
                </div>
            </nav>
        </div>
        <div id="overlay" class="overlay"></div>`;
    }

    hidePageSearch() {
        const pageSearch = document.getElementById('timkiemx');
        if (pageSearch) {
            // Thêm style để ẩn phần tử nhưng vẫn giữ chức năng
            pageSearch.style.position = 'absolute';
            pageSearch.style.opacity = '0';
            pageSearch.style.pointerEvents = 'none';
            pageSearch.style.height = '0';
            pageSearch.style.width = '0';
            pageSearch.style.overflow = 'hidden';
        }
    }

    updateElements() {
        // Cập nhật tiêu đề
        const titleElement = document.getElementById('tieudex');
        const headerTitleText = document.getElementById('header-title-text');
        
        if (titleElement && headerTitleText) {
            headerTitleText.textContent = titleElement.textContent;
            headerTitleText.style.cursor = 'pointer';
            headerTitleText.addEventListener('click', () => {
                const currentPage = window.location.pathname.split('/').pop() || 'index.html';
                if (currentPage !== 'index.html') {
                    history.pushState({}, '', window.location.pathname);
                    window.location.reload();
                }
            });
        }

        // Cập nhật các thuộc tính tìm kiếm
        const headerSearch = document.getElementById('header-search');
        const pageSearch = document.getElementById('timkiemx');

        if (headerSearch && pageSearch) {
            // Đồng bộ placeholder
            headerSearch.placeholder = pageSearch.placeholder || "Tìm kiếm...";
            
            // Đồng bộ các thuộc tính khác
            ['maxLength', 'minLength', 'required', 'pattern'].forEach(attr => {
                if (pageSearch.hasAttribute(attr)) {
                    headerSearch.setAttribute(attr, pageSearch.getAttribute(attr));
                }
            });

            // Sao chép các class liên quan đến validation
            const validationClasses = Array.from(pageSearch.classList)
                .filter(className => className.includes('valid') || className.includes('invalid'));
            headerSearch.classList.add(...validationClasses);

            // Đồng bộ giá trị nếu có
            if (pageSearch.value) {
                headerSearch.value = pageSearch.value;
            }

            // Đồng bộ trạng thái disabled
            headerSearch.disabled = pageSearch.disabled;
        }
    }

    initializeEvents() {
        window.toggleSidebar = () => {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('overlay');
            sidebar?.classList.toggle('active');
            overlay?.classList.toggle('active');
        };

        window.loadPage = (page) => {
            const currentPath = window.location.pathname;
            const newPath = currentPath.substring(0, currentPath.lastIndexOf('/') + 1) + page + '.html';
            history.pushState({}, '', newPath);
            window.location.reload();
        };

        const overlay = document.getElementById('overlay');
        overlay?.addEventListener('click', toggleSidebar);

        const headerSearch = document.getElementById('header-search');
        const pageSearch = document.getElementById('timkiemx');
        
        if (headerSearch && pageSearch) {
            // Xử lý sự kiện input
            headerSearch.addEventListener('input', (e) => {
                pageSearch.value = e.target.value;
                const inputEvent = new Event('input', { bubbles: true });
                pageSearch.dispatchEvent(inputEvent);
            });

            pageSearch.addEventListener('input', (e) => {
                headerSearch.value = e.target.value;
            });

            // Xử lý sự kiện Enter
            headerSearch.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    pageSearch.focus();
                    const searchEvent = new KeyboardEvent('keydown', {
                        key: 'Enter',
                        code: 'Enter',
                        keyCode: 13,
                        which: 13,
                        bubbles: true,
                        cancelable: true
                    });
                    pageSearch.dispatchEvent(searchEvent);
                }
            });

            // Theo dõi thay đổi thuộc tính của pageSearch
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes') {
                        const attr = mutation.attributeName;
                        const value = pageSearch.getAttribute(attr);
                        if (value) {
                            headerSearch.setAttribute(attr, value);
                        } else {
                            headerSearch.removeAttribute(attr);
                        }
                    }
                });
            });

            observer.observe(pageSearch, {
                attributes: true,
                attributeFilter: ['placeholder', 'maxLength', 'minLength', 'required', 'pattern', 'disabled', 'class']
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const headerLoader = new HeaderLoader();
    headerLoader.init();
});