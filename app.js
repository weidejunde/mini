document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");

    function loadPage(slug) {
        fetch(`/file/${slug}.md`)
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

    // Khi vào trang, kiểm tra slug trong URL
    let slug = location.pathname.substring(1); // Bỏ dấu '/'
    if (!slug) slug = "index"; // Nếu là trang chủ thì load index.md
    loadPage(slug);

    // Xử lý khi nhấn vào link
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const slug = event.target.getAttribute("href").replace(".md", "").replace("/file/", "");
            history.pushState(null, "", "/" + slug);
            loadPage(slug);
        });
    });

    // Xử lý khi người dùng nhấn "Quay lại"
    window.onpopstate = () => {
        let slug = location.pathname.substring(1);
        if (!slug) slug = "index";
        loadPage(slug);
    };
});
