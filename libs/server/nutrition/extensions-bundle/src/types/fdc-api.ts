export interface FDCItem {
    fdcId: number;
    description: string;
    publicationDate: string; // MM/DD/YYYY
    foodNutrients: FoodNutrient[];
    inputFoods: unknown[];
    ndbNumber: number;
    isHistoricalReference: boolean;
    foodCategory: FoodCategory;
}

export interface FoodNutrient {
    type: "FoodNutrient";
    nutrient: Nutrient;
    foodNutrientDerivation?: FoodNutrientDerivation;
    id: number;
    amount: number;
    dataPoints: number;
    max?: number;
    min?: number;
}

export interface Nutrient {
    id: number;
    number: string;
    name: string;
    rank: number;
    unitName: string;
}

export interface FoodNutrientDerivation {
    id: number;
    code: string;
    description: string;
    foodNutrientSource: {
        id: number;
        code: string;
        description: string;
    };
}

export interface FoodCategory {
    id: number;
    code: string;
    description: string;
}
