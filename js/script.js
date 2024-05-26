document.addEventListener('DOMContentLoaded', () => {
    const digimonContainer = document.getElementById('digimon-container');
    const searchInput = document.getElementById('search');
    const categoryButtons = document.querySelectorAll('.categories button');

    const modal = document.getElementById('modal');
    const modalName = document.getElementById('modal-name');
    const modalImg = document.getElementById('modal-img');
    const modalLevel = document.getElementById('modal-level');
    const modalDescription = document.getElementById('modal-description');
    const closeModal = document.querySelector('.close');

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

        document.querySelectorAll('.details-button').forEach(button => {
            button.addEventListener('click', event => {
                const digimonName = event.target.dataset.name;
                const digimon = allDigimons.find(d => d.name === digimonName);
                showModal(digimon);
            });
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

    /***********Função responsável por mostrar com mais detalhes o digmon ao ser apertado o botão "Ver detalhes"***********/

    function showModal(digimon) {
        modalName.textContent = digimon.name;
        modalImg.src = digimon.img;
        modalLevel.innerHTML = `<span class="point">•</span> ${digimon.level}`;
        modalDescription.innerHTML = `<span style="color: black;">Descrição:</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nulla eros, pulvinar id magna sed, sagittis tempus elit. Nulla lacinia laoreet magna quis maximus. Morbi non arcu ullamcorper justo commodo feugiat a id tellus. Ut id scelerisque urna. In ac nunc venenatis, lobortis ipsum vitae, sagittis quam.`;
        modal.style.display = 'block';
    }

    /**********Fecha tela de detalhes ao apertar no "x" do mesmo***********/

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    /***********Fecha a tela de detalhes ao apertar fora da mesma***********/

    window.addEventListener('click', event => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    fetchDigimons();
});