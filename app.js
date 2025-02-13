document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");

    // Khi click vào link, ngăn tải lại trang & load Markdown
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const page = this.getAttribute("href"); // Lấy URL ngắn (không có .md)
            loadMarkdown(page);
            history.pushState(null, "", page); // Cập nhật URL nhưng không reload
        });
    });

    // Load file Markdown từ URL (thêm .md để tải đúng file)
    function loadMarkdown(page) {
        fetch(page + ".md") // Tự động thêm .md khi tải file
            .then(response => response.text())
            .then(md => {
                content.innerHTML = marked.parse(md);
            })
            .catch(error => console.error("Lỗi khi tải Markdown:", error));
    }

    // Nếu người dùng tải lại trang, lấy nội dung từ URL
    if (location.pathname !== "/") {
        loadMarkdown(location.pathname);
    }

    // Xử lý khi người dùng bấm Back/Forward trên trình duyệt
    window.addEventListener("popstate", () => {
        loadMarkdown(location.pathname);
    });
});
