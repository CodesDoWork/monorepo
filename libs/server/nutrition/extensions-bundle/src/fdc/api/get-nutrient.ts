import { FDCItem, FoodNutrient } from "../../types/fdc-api";

export function getNutrient(item: FDCItem, name: string, unit?: string): FoodNutrient | undefined {
    return item.foodNutrients.find(
        nutrient =>
            nutrient.nutrient.name === name && (!unit || nutrient.nutrient.unitName === unit),
    );
}
