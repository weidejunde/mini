document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");

    function loadPage(slug) {
        fetch(`/file/${slug}.md`)  // Load file từ thư mục "file/"
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

    // Khi nhấn vào link Markdown
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const slug = event.target.getAttribute("href").split("/").pop().replace(".md", ""); // Lấy slug từ URL
            history.pushState(null, "", "/" + slug);
            loadPage(slug);
        });
    });

    // Xử lý khi người dùng nhấn "Quay lại"
    window.onpopstate = () => {
        const slug = location.pathname.substring(1);
        if (slug) loadPage(slug);
    };
});
