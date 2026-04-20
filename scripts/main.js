import { RecipeService } from './services/recipeService.js';

const input = document.querySelector('#searchInput');
const button = document.querySelector('#searchButton');
const container = document.querySelector('#resultados');

async function searchEngine() {
    const query = input.value.trim();
    
    if (!query) {
        container.innerHTML = `<p class="col-span-full opacity-40 font-brutal">Aguardando entrada...</p>`;
        return;
    }

    container.innerHTML = `<div class="col-span-full animate-pulse text-[var(--orange-neon)] font-brutal">Brito Engine: Localizando Dados...</div>`;

    try {
        const meals = await RecipeService.fetchRecipes(query);
        renderResults(meals);
    } catch (error) {
        container.innerHTML = `<p class="col-span-full text-red-500">Erro crítico na Engine. Tente novamente.</p>`;
    }
}

function renderResults(meals) {
    if (meals.length === 0) {
        container.innerHTML = `<p class="col-span-full opacity-40">Nenhum registro elite encontrado.</p>`;
        return;
    }

    container.innerHTML = meals.map(meal => `
        <div class="glass rounded-[2rem] overflow-hidden group transition-all hover:border-[var(--orange-neon)]">
            <div class="relative h-64 overflow-hidden">
                <img src="${meal.strMealThumb}" class="w-full h-full object-cover transition duration-700 group-hover:scale-110">
                <div class="absolute top-4 right-4 badge-tech bg-black/60 backdrop-blur-md">${meal.strArea}</div>
            </div>
            <div class="p-8 text-left">
                <span class="text-[var(--orange-neon)] text-[10px] uppercase tracking-[0.3em] font-bold">${meal.strCategory}</span>
                <h3 class="font-brutal text-xl mt-2 mb-6 line-clamp-1 text-white">${meal.strMeal}</h3>
                <button class="btn-neon w-full">Explorar Receita</button>
            </div>
        </div>
    `).join('');
}

button.addEventListener('click', searchEngine);
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchEngine();
});