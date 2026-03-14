export interface PerfectBSLItem {
    code: string;
    description: string;
    name: string;
    energy: {
        energy_kJ: bigint;
        energy_kcal: bigint;
    };
    water_g: number;
    protein_g: number;
    fat_total_g: number;
    alcohol_g: number;
    organicAcids_total_g: number;
    ash_g: number;
    nitrogen_total_g: number;
    cholesterol_mg: number;

    carbohydrates: {
        available_total_g: number;
        sugar_total_g: number;
        monosaccharides_total_g: number;
        glucose_g: number;
        fructose_g: number;
        galactose_g: number;
        disaccharides_total_g: number;
        sucrose_g: number;
        maltose_g: number;
        lactose_g: number;
        oligosaccharides_available_g: number;
        starch_g: number;
        sugarAlcohols: {
            total_g: number;
            mannitol_g: number;
            sorbitol_g: number;
            xylitol_g: number;
        };
    };

    fiber: {
        total_g: number;
        soluble_g: number;
        insoluble_g: number;
        low_molecular_g: number;
        high_molecular_g: number;
        high_molecular_soluble_g: number;
        high_molecular_insoluble_g: number;
    };

    vitamins: {
        a_re_µg: number;
        a_rae_µg: number;
        retinol_µg: number;
        betaCarotene_µg: number;
        carotenoids_µg: number;
        d_µg: number;
        d3_µg: number;
        d2_µg: number;
        e_mg: number;
        alphaTocopherol_mg: number;
        betaTocopherol_mg: number;
        gammaTocopherol_mg: number;
        deltaTocopherol_mg: number;
        alphaTocotrienol_mg: number;
        k_µg: number;
        k1_µg: number;
        k2_µg: number;
        b1_mg: number;
        b2_mg: number;
        b3_mg: number;
        b3Equivalent_mg: number;
        b5_mg: number;
        b6_µg: number;
        b7_µg: number;
        b9_folate_µg: number;
        b9_folateEquivalent_µg: number;
        b9_synthetic_µg: number;
        b12_µg: number;
        c_mg: number;
    };

    minerals: {
        salt_g: number;
        natrium_mg: number;
        chloride_mg: number;
        kalium_mg: number;
        calcium_mg: number;
        magnesium_mg: number;
        phosphor_mg: number;
        sulfur_mg: number;
        iron_mg: number;
        zinc_mg: number;
        iodide_µg: number;
        copper_µg: number;
        manganese_µg: number;
        fluoride_µg: number;
        chromium_µg: number;
        molybdenum_µg: number;
    };

    organicAcids: {
        acetic_g: number;
        citric_g: number;
        lactic_g: number;
        malic_g: number;
        tartaric_g: number;
    };

    fattyAcids: {
        saturated: {
            total_g: number;
            butyric_C4_0_g: number;
            caproic_C6_0_g: number;
            caprylic_C8_0_g: number;
            capric_C10_0_g: number;
            lauric_C12_0_g: number;
            myristic_C14_0_g: number;
            pentadecanoic_C15_0_g: number;
            palmitic_C16_0_g: number;
            margaric_C17_0_g: number;
            stearic_C18_0_g: number;
            arachidic_C20_0_g: number;
            behenic_C22_0_g: number;
            lignoceric_C24_0_g: number;
        };
        monounsaturated: {
            total_g: number;
            myristoleic_C14_1_g: number;
            palmitoleic_C16_1_g: number;
            vaccenic_C18_1_n7_g: number;
            oleic_C18_1_n9_g: number;
            gondoic_C20_1_g: number;
            erucic_C22_1_g: number;
        };
        polyunsaturated: {
            total_g: number;
            omega3: {
                total_g: number;
                alphaLinolenic_ALA_C18_3_g: number;
                stearidonic_SDA_C18_4_g: number;
                eicosapentaenoic_EPA_C20_5_g: number;
                docosapentaenoic_DPA_C22_5_g: number;
                docosahexaenoic_DHA_C22_6_g: number;
            };
            omega6: {
                total_g: number;
                linoleic_LA_C18_2_g: number;
                gammaLinolenic_GLA_C18_3_g: number;
                conjugatedLinoleic_CLA_C18_2_g: number;
                eicosadienoic_C20_2_g: number;
                dihomoGammaLinolenic_DGLA_C20_3_g: number;
                arachidonic_AA_C20_4_g: number;
            };
        };
        other_g: number;
    };

    aminoAcids: {
        essential_total_g: number;
        alanine_g: number;
        arginine_g: number;
        asparticAcid_g: number;
        cysteine_g: number;
        glutamicAcid_g: number;
        glycine_g: number;
        histidine_g: number;
        isoleucine_g: number;
        leucine_g: number;
        lysine_g: number;
        methionine_g: number;
        phenylalanine_g: number;
        proline_g: number;
        serine_g: number;
        threonine_g: number;
        tryptophan_g: number;
        tyrosine_g: number;
        valine_g: number;
    };
}
