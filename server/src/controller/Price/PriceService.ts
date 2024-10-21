export class PriceService {
    calculateIngredientCosts(ingredients: { price: number; quantity: number; usedQuantity: number; }[]): number {
        return ingredients.reduce((sum, ingredient) => {
            const proportionalCost = (ingredient.price / ingredient.quantity) * ingredient.usedQuantity;
            return sum + proportionalCost;
        }, 0);
    }

    calculateTotalCost(ingredientCosts: number, laborCosts: number, packagingCosts: number, indirectCosts: number): number {
        return ingredientCosts + laborCosts + packagingCosts + indirectCosts;
    }

    calculateSuggestedPrice(totalCost: number, margin: number): number {
        return parseFloat((totalCost * (1 + (margin / 100))).toFixed(2));
    }
}   