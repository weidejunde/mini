document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");

    function loadPage(slug) {
        fetch(`/file/${slug}.md`) // Load từ thư mục file/
            .then(response => {
                if (!response.ok) {
                    throw new Error("Không tìm thấy nội dung.");
                }
                return response.text();
            })
            .then(md => {
                content.innerHTML = marked.parse(md);
            })
            .catch(error => {
                console.error(error);
                content.innerHTML = "Không tìm thấy nội dung.";
            });
    }

    // Khi tải trang, tự động xử lý URL
    const slug = location.pathname.substring(1); // Bỏ dấu '/'
    if (slug) {
        loadPage(slug);
    }

    // Xử lý khi nhấn vào link
    document.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const path = event.target.getAttribute("href").replace(".md", ""); // Bỏ ".md"
            history.pushState(null, "", "/" + path);
            loadPage(path);
        });
    });

    // Xử lý khi người dùng nhấn "Quay lại"
    window.onpopstate = () => {
        const slug = location.pathname.substring(1);
        loadPage(slug);
    };
});
