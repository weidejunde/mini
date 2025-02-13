// Logic tìm kiếm
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('tim');
    const searchableElements = document.querySelectorAll('[data-searchable="true"]');
    
    if (!searchInput) return;

    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        searchableElements.forEach(element => {
            const text = element.textContent.toLowerCase();
            if (searchTerm === '' || text.includes(searchTerm)) {
                element.style.display = 'block';
                if (searchTerm !== '') {
                    highlightText(element, searchTerm);
                } else {
                    removeHighlight(element);
                }
            } else {
                element.style.display = 'none';
            }
        });
    });
});

function highlightText(element, searchTerm) {
    if (!element.dataset.originalHtml) {
        element.dataset.originalHtml = element.innerHTML;
    }
    let html = element.dataset.originalHtml;
    const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi');
    html = html.replace(regex, '<mark class="search-highlight">$1</mark>');
    element.innerHTML = html;
}

function removeHighlight(element) {
    if (element.dataset.originalHtml) {
        element.innerHTML = element.dataset.originalHtml;
    }
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}