document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");

    function loadPage(path) {
        fetch(path)
            .then(response => response.text())
            .then(md => {
                content.innerHTML = marked.parse(md); // Chuyển đổi Markdown thành HTML
            })
            .catch(error => content.innerHTML = "Không tìm thấy nội dung.");
    }

    // Khi tải trang, kiểm tra nếu URL có chứa file .md thì tự động tải
    if (location.pathname.endsWith(".md")) {
        loadPage(location.pathname);
    }

    // Xử lý khi nhấn vào link Markdown
    document.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", (event) => {
            if (event.target.getAttribute("href").endsWith(".md")) {
                event.preventDefault();
                const path = event.target.getAttribute("href");
                history.pushState(null, "", path);
                loadPage(path);
            }
        });
    });

    // Xử lý khi người dùng nhấn "Quay lại" trên trình duyệt
    window.onpopstate = () => {
        if (location.pathname.endsWith(".md")) {
            loadPage(location.pathname);
        }
    };
});
