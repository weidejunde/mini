document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");

    // Khi click vào link, ngăn tải lại trang & load Markdown
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const url = this.getAttribute("href"); // Lấy URL file .md
            loadMarkdown(url);
            history.pushState(null, "", url); // Thay đổi URL mà không reload
        });
    });

    // Load file Markdown từ URL
    function loadMarkdown(file) {
        fetch(file)
            .then(response => response.text())
            .then(md => {
                content.innerHTML = marked.parse(md);
            })
            .catch(error => console.error("Lỗi khi tải Markdown:", error));
    }

    // Nếu người dùng tải lại trang, lấy nội dung từ URL
    if (location.pathname.endsWith(".md")) {
        loadMarkdown(location.pathname);
    }
});
