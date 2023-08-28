<template>
    <div v-if="item">
        {{ getNutrientString("Energy", "kcal") }} | {{ getNutrientString("Total lipid (fat)") }} |
        {{ getNutrientString("Carbohydrate, by difference") }} | {{ getNutrientString("Protein") }}
    </div>
    <div v-else-if="error">
        {{ error }}
    </div>
    <div v-else>
        {{ loadItem(value) }}
        Loading...
    </div>
</template>

<script lang="ts" setup>
import { useApi } from "@directus/extensions-sdk";
import { ref } from "vue";
import { getNutrient } from "../../fdc/api/get-nutrient";
import { FDCItem } from "../../types/fdc-api";

const api = useApi();

const item = ref<FDCItem | undefined>();
const error = ref<string | undefined>();

function loadItem(value: string) {
    api.get(`/fdc/food/${value}`)
        .then(res => (item.value = res.data))
        .catch(e => (error.value = e.res.statusMessage));
}

function getNutrientString(name: string, unit?: string): string {
    const nutrient = getNutrient(item.value, name, unit);
    return `${name}: ${nutrient?.amount ?? "?"} ${nutrient?.nutrient.unitName}`;
}
</script>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        value: {
            type: String,
        },
    },
});
</script>
