const jogos = Array.from(document.querySelectorAll('.jogo'));
const searchInput = document.getElementById('search');
const searchButton = document.querySelector('.search-area button');
const tags = document.querySelectorAll('.tag');
const hero = document.querySelector('.hero');

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
     if (query || activeCategory) {
        hero.style.display = 'none';
    } else {
        hero.style.display = 'flex';
    }
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
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

const cartCount = document.getElementById('cart-count');


function atualizarCarrinhoUI() {
    cartCount.textContent = carrinho.length;
}


function salvarDados() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
}


function getGameData(jogo) {
    return {
        nome: jogo.querySelector('h3').textContent,
        preco: jogo.querySelector('.preco').textContent,
        img: jogo.querySelector('img').src
    };
}


document.querySelectorAll('.jogo').forEach(jogo => {
    const btnCart = jogo.querySelector('.btn-cart');
    const btnFav = jogo.querySelector('.btn-fav');

    const data = getGameData(jogo);


    btnCart.addEventListener('click', () => {
        carrinho.push(data);
        salvarDados();
        atualizarCarrinhoUI();
        alert('Adicionado ao carrinho!');
    });


    btnFav.addEventListener('click', () => {
        const existe = favoritos.find(f => f.nome === data.nome);

        if (existe) {
            favoritos = favoritos.filter(f => f.nome !== data.nome);
            btnFav.style.background = '#ff4d6d';
        } else {
            favoritos.push(data);
            btnFav.style.background = '#00c853';
        }

        salvarDados();
    });


    if (favoritos.find(f => f.nome === data.nome)) {
        btnFav.style.background = '#00c853';
    }
});

atualizarCarrinhoUI();

const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

// Abrir carrinho ao clicar no ícone
document.querySelector('.cart-icon').addEventListener('click', abrirCarrinho);

function abrirCarrinho() {
    cartModal.classList.remove('hidden');
    renderCarrinho();
}

function fecharCarrinho() {
    cartModal.classList.add('hidden');
}

// Fechar botão
document.getElementById('fechar-btn').addEventListener('click', fecharCarrinho);
document.getElementById('close-x').addEventListener('click', fecharCarrinho);

// Fechar clicando fora
cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        fecharCarrinho();
    }
});

// Renderizar carrinho
function renderCarrinho() {
    cartItemsContainer.innerHTML = '';

    let total = 0;

    carrinho.forEach((item, index) => {
        const preco = parseFloat(item.preco.replace('R$', '').replace(',', '.'));
        total += preco;

        const div = document.createElement('div');
        div.classList.add('cart-item');

        div.innerHTML = `
            <span>${item.nome}</span>
            <span>${item.preco}</span>
            <button onclick="removerItem(${index})">X</button>
        `;

        cartItemsContainer.appendChild(div);
    });

    cartTotal.textContent = "Total: R$ " + total.toFixed(2);
}

// Remover item
function removerItem(index) {
    carrinho.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinhoUI();
    renderCarrinho();
}
const favModal = document.getElementById('fav-modal');
const favItemsContainer = document.getElementById('fav-items');

// Abrir favoritos
document.querySelector('.fav-icon').addEventListener('click', abrirFavoritos);

function abrirFavoritos() {
    favModal.classList.remove('hidden');
    renderFavoritos();
}

function fecharFavoritos() {
    favModal.classList.add('hidden');
}

// Fechar
document.getElementById('fechar-fav-btn').addEventListener('click', fecharFavoritos);
document.getElementById('close-fav').addEventListener('click', fecharFavoritos);

// Fechar clicando fora
favModal.addEventListener('click', (e) => {
    if (e.target === favModal) {
        fecharFavoritos();
    }
});

// Renderizar favoritos
function renderFavoritos() {
    favItemsContainer.innerHTML = '';

    favoritos.forEach((item, index) => {
        const div = document.createElement('div');
        div.classList.add('fav-item');

        div.innerHTML = `
            <span>${item.nome}</span>
            <button onclick="removerFavorito(${index})">X</button>
        `;

        favItemsContainer.appendChild(div);
    });
}

// Remover favorito
function removerFavorito(index) {
    favoritos.splice(index, 1);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    renderFavoritos();
}