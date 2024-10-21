export class SaleService {
    calculateTotalValue(suggestedPrice: number, quantity: number): number {
        return suggestedPrice * quantity;
    }
}   