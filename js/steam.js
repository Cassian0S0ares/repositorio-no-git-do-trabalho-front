const jogos = Array.from(document.querySelectorAll('.jogo'));
const searchInput = document.getElementById('search');
const searchButton = document.querySelector('.search-area button');
const tags = document.querySelectorAll('.tag');

let activeCategory = null;

function filterGames() {
    const query = searchInput.value.trim().toLowerCase();

    jogos.forEach(jogo => {
        const nome = jogo.querySelector('h3').textContent.toLowerCase();
        const cat = jogo.dataset.categoria.toLowerCase();

        const matchesSearch = !query || nome.includes(query);
        const matchesCategory = !activeCategory || cat === activeCategory.toLowerCase();

        jogo.style.display = matchesSearch && matchesCategory ? '' : 'none';
    });
}

searchButton.addEventListener('click', filterGames);
searchInput.addEventListener('keyup', e => {
    if (e.key === 'Enter') filterGames();
});

tags.forEach(tag => {
    tag.addEventListener('click', () => {
        if (tag.classList.contains('active')) {
            tag.classList.remove('active');
            activeCategory = null;
        } else {
            tags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            activeCategory = tag.textContent;
        }
        filterGames();
    });
});
