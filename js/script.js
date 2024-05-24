document.addEventListener('DOMContentLoaded', () => {
    const digimonContainer = document.getElementById('digimon-container');
    const searchInput = document.getElementById('search');
    const categoryButtons = document.querySelectorAll('.categories button')

    let allDigimons = []

    /***********Função responsável por extrair os digimons da API***********/

    async function fetchDigimons() {
        const response = await fetch('https://digimon-api.vercel.app/api/digimon');
        const digimons = await response.json();
        allDigimons = digimons;
        displayDigimons(digimons);
    }

    /***********Função Responsável por mostrar criar e mostrar os cards dos digimons na tela***********/

    function displayDigimons(digimons){
        digimonContainer.innerHTML = '';
        digimons.forEach(digimon => {
            const digimonCard = document.createElement('div');
            digimonCard.classList.add('digimon-card');

            digimonCard.innerHTML = `
                <p>${digimon.name}<p>
                <img src="${digimon.img}" alt="${digimon.name}">
                <button class="details-button" data-name="${digimon.name}">Ver Detalhes</button>
            `;

            digimonContainer.appendChild(digimonCard);
        });
    }

    /***********Função responsável por filtrar os digimons pelas categorias e pela barra de pesquisa***********/

    function filterDigimons() {
        const searchValue = searchInput.value.toLowerCase();
        const selectedCategory = document.querySelector('.categories button.active')?.dataset.category || 'All';

        const filteredDigimons = allDigimons.filter(digimon => {
            const matchesCategory = selectedCategory === 'All' || digimon.level === selectedCategory;
            const matchesSearch = digimon.name.toLowerCase().includes(searchValue);
            return matchesCategory && matchesSearch;
        });

        displayDigimons(filteredDigimons);
    }

    searchInput.addEventListener('input', filterDigimons);

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterDigimons();
        });
    });

    fetchDigimons();
});