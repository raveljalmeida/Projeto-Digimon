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

    fetchDigimons();
});