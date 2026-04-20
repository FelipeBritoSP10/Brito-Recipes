export const RecipeService = {
    async fetchRecipes(query) {
        const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`;

        try {
            const response = await fetch(endpoint);
            if (!response.ok) throw new Error('Network error');
            const data = await response.json();
            return data.meals || [];
        } catch (error) {
            console.error("RecipeService Error:", error);
            throw error;
        }
    }
};