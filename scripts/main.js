import { RecipeService } from './services/recipeService.js';

let swiperInstance = null;

// Initialize o Swiper conform necessary
function setupSwiper() {
    if (swiperInstance) swiperInstance.destroy(true, true);

    swiperInstance = new Swiper('.swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        grabCursor: true,
        breakpoints: {
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        }
    });
}
async function renderRecipes() {
    const query = document.getElementById('searchInput').value;
    const container = document.getElementById('resultados');
    const swiperEl = document.getElementById('swiper-container');

    if (!query) return;

    try {
        const meals = await RecipeService.fetchRecipes(query);

        container.innerHTML = '';
        swiperEl.classList.remove('opacity-0');

        if (meals.length === 0) {
            container.innerHTML = '<p class="w-full text-center text-white/40">Nenhum resultado encontrado.</p>';
            return;
        }

        meals.forEach(meal => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide h-auto';
            slide.innerHTML = `
                <div class="glass p-6 rounded-[2.5rem] border border-white/5 hover:border-[var(--orange-neon)]/30 transition-all duration-500 group h-full flex flex-col">
                    <div class="overflow-hidden rounded-[1.8rem] mb-6 aspect-square">
                        <img src="${meal.strMealThumb}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                    </div>
                    <span class="text-[var(--orange-neon)] text-[10px] uppercase font-bold tracking-widest mb-2">${meal.strArea}</span>
                    <h3 class="text-xl font-bold mb-4 line-clamp-1">${meal.strMeal}</h3>
                    <div class="mt-auto">
                        <a href="${meal.strYoutube}" target="_blank" class="block text-center w-full py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all text-xs font-bold uppercase tracking-widest">
                            Assistir Tutorial
                        </a>
                    </div>
                </div>
            `;
            container.appendChild(slide);
        });

        setupSwiper();

    } catch (err) {
        console.error(err);
    }
}

// Events
document.getElementById('searchButton').addEventListener('click', renderRecipes);
document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') renderRecipes();
});
