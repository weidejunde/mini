// Thêm thông tin user và datetime vào global context
window.APP_CONTEXT = {
    currentUser: 'ducquanmax',
    currentDateTime: '2025-02-13 19:30:54'
};

// Hàm toggle sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    sidebar?.classList.toggle('active');
    overlay?.classList.toggle('active');
}

// Hàm khởi tạo header
function initializeHeader() {
    const headerLeft = document.querySelector('.header-left');
    if (!headerLeft) return;

    // Đảm bảo tỉ lệ cố định cho các phần tử trong header
    const searchContainer = document.querySelector('.header-search');
    if (searchContainer) {
        searchContainer.style.width = '272px';
        searchContainer.style.flex = '0 0 272px';
    }
}

// Thêm event listener khi DOM đã load
document.addEventListener('DOMContentLoaded', () => {
    initializeHeader();
});

// Thêm event listener khi chuyển trang (nếu sử dụng HTML5 History API)
window.addEventListener('popstate', () => {
    initializeHeader();
});