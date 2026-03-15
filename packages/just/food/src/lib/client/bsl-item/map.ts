import type { Maybe } from "graphql/jsutils/Maybe";
import type { BSLItem } from "./bsl-item";
import type { RawBSLItem } from "./raw";

export function rawBSLItemToBSLItem(raw: RawBSLItem): BSLItem {
    return {
        isSelected: false,
        topNutrients: [],
        _searchStr: createSearchString(raw),
        code: raw["BLS Code"],
        description: raw.Lebensmittelbezeichnung,
        name: raw["Food name"],
        energy: mapEnergy(raw),
        water_g: num(raw["WATER Wasser [g/100g]"]),
        protein_g: num(raw["PROT625 Protein (Nx6,25) [g/100g]"]),
        fat_total_g: num(raw["FAT Fett [g/100g]"]),
        alcohol_g: num(raw["ALC Alkohol (Ethanol) [g/100g]"]),
        organicAcids_total_g: num(raw["OA Organische Säuren, gesamt [g/100g]"]),
        ash_g: num(raw["ASH Rohasche [g/100g]"]),
        nitrogen_total_g: num(raw["NT Stickstoff, gesamt [g/100g]"]),
        cholesterol_mg: num(raw["CHORL Cholesterin [mg/100g]"]),
        carbohydrates: mapCarbohydrates(raw),
        fiber: mapFiber(raw),
        vitamins: mapVitamin(raw),
        minerals: mapMinerals(raw),
        organicAcids: mapOrganicAcids(raw),
        fattyAcids: mapFattyAcids(raw),
        aminoAcids: mapAminoAcids(raw),
    };
}

function createSearchString(raw: RawBSLItem): string {
    return `${raw["BLS Code"]} ${raw.Lebensmittelbezeichnung} ${raw["Food name"]}`
        .replaceAll(" ", "")
        .toLowerCase();
}

function mapEnergy(raw: RawBSLItem) {
    return {
        energy_kJ: raw["ENERCJ Energie (Kilojoule) [kJ/100g]"],
        energy_kcal: raw["ENERCC Energie (Kilokalorien) [kcal/100g]"],
    };
}

function mapCarbohydrates(raw: RawBSLItem) {
    return {
        available_total_g: num(raw["CHO Kohlenhydrate, verfügbar [g/100g]"]),
        sugar_total_g: num(raw["SUGAR Zucker (Mono- und Disaccharide), gesamt [g/100g]"]),
        monosaccharides_total_g: num(raw["MNSAC Monosaccharide, gesamt [g/100g]"]),
        glucose_g: num(raw["GLUS Glucose [g/100g]"]),
        fructose_g: num(raw["FRUS Fructose [g/100g]"]),
        galactose_g: num(raw["GALS Galactose [g/100g]"]),
        disaccharides_total_g: num(raw["DISAC Disaccharide, gesamt [g/100g]"]),
        sucrose_g: num(raw["SUCS Saccharose [g/100g]"]),
        maltose_g: num(raw["MALS Maltose [g/100g]"]),
        lactose_g: num(raw["LACS Lactose [g/100g]"]),
        oligosaccharides_available_g: num(raw["OLSAC Oligosaccharide, verfügbar [g/100g]"]),
        starch_g: num(raw["STARCH Stärke (Stärke, Glykogen, Dextrine) [g/100g]"]),
        sugarAlcohols: {
            total_g: num(raw["POLYL Zuckeralkohole, gesamt [g/100g]"]),
            mannitol_g: num(raw["MANTL Mannit [g/100g]"]),
            sorbitol_g: num(raw["SORTL Sorbit [g/100g]"]),
            xylitol_g: num(raw["XYLTL Xylit [g/100g]"]),
        },
    };
}

function mapFiber(raw: RawBSLItem) {
    return {
        total_g: num(raw["FIBT Ballaststoffe, gesamt [g/100g]"]),
        soluble_g: num(raw["FIBSOL Ballaststoffe, wasserlöslich [g/100g]"]),
        insoluble_g: num(raw["FIBINS Ballaststoffe, wasserunlöslich [g/100g]"]),
        low_molecular_g: num(raw["FIBLMW Ballaststoffe, niedermolekular [g/100g]"]),
        high_molecular_g: num(raw["FIBHMW Ballaststoffe, hochmolekular [g/100g]"]),
        high_molecular_soluble_g: num(
            raw["FIBHMWS Ballaststoffe, hochmolekular, wasserlöslich [g/100g]"],
        ),
        high_molecular_insoluble_g: num(
            raw["FIBHMWI Ballaststoffe, hochmolekular, wasserunlöslich [g/100g]"],
        ),
    };
}

function mapVitamin(raw: RawBSLItem) {
    return {
        a_re_µg: num(raw["VITA Vitamin A, Retinol-Äquivalent (RE) [µg/100g]"]),
        a_rae_µg: num(raw["VITAA Vitamin A, Retinol-Aktivitäts-Äquivalent (RAE) [µg/100g]"]),
        retinol_µg: num(raw["RETOL Retinol [µg/100g]"]),
        betaCarotene_µg: num(raw["CARTB Beta‑Carotin [µg/100g]"]),
        carotenoids_µg: num(raw["CAROTPAXB Carotinoide, außer Beta-Carotin [µg/100g]"]),
        d_µg: num(raw["VITD Vitamin D [µg/100g]"]),
        d3_µg: num(raw["CHOCAL Vitamin D3 (Cholecalciferol) [µg/100g]"]),
        d2_µg: num(raw["ERGCAL Vitamin D2 (Ergocalciferol) [µg/100g]"]),
        e_mg: num(raw["VITE Vitamin E (Alpha-Tocopherol) [mg/100g]"]),
        alphaTocopherol_mg: num(raw["TOCPHA Alpha‑Tocopherol [mg/100g]"]),
        betaTocopherol_mg: num(raw["TOCPHB Beta-Tocopherol [mg/100g]"]),
        gammaTocopherol_mg: num(raw["TOCPHG Gamma-Tocopherol [mg/100g]"]),
        deltaTocopherol_mg: num(raw["TOCPHD Delta-Tocopherol [mg/100g]"]),
        alphaTocotrienol_mg: num(raw["TOCTRA Alpha-Tocotrienol [mg/100g]"]),
        k_µg: num(raw["VITK Vitamin K [µg/100g]"]),
        k1_µg: num(raw["VITK1 Vitamin K1 (Phyllochinon) [µg/100g]"]),
        k2_µg: num(raw["VITK2 Vitamin K2 (Menachinone) [µg/100g]"]),
        b1_mg: num(raw["THIA Vitamin B1 (Thiamin) [mg/100g]"]),
        b2_mg: num(raw["RIBF Vitamin B2 (Riboflavin) [mg/100g]"]),
        b3_mg: num(raw["NIA Niacin [mg/100g]"]),
        b3Equivalent_mg: num(raw["NIAEQ Niacin-Äquivalent [mg/100g]"]),
        b5_mg: num(raw["PANTAC Pantothensäure [mg/100g]"]),
        b6_µg: num(raw["VITB6 Vitamin B6 [µg/100g]"]),
        b7_µg: num(raw["BIOT Biotin [µg/100g]"]),
        b9_folate_µg: num(raw["FOLFD Folat [µg/100g]"]),
        b9_folateEquivalent_µg: num(raw["FOL Folat-Äquivalent [µg/100g]"]),
        b9_synthetic_µg: num(raw["FOLAC Folsäure, synthetisch [µg/100g]"]),
        b12_µg: num(raw["VITB12 Vitamin B12 (Cobalamine) [µg/100g]"]),
        c_mg: num(raw["VITC Vitamin C [mg/100g]"]),
    };
}

function mapMinerals(raw: RawBSLItem) {
    return {
        salt_g: num(raw["NACL Salz (Natriumchlorid) [g/100g]"]),
        natrium_mg: num(raw["NA Natrium [mg/100g]"]),
        chloride_mg: num(raw["CLD Chlorid [mg/100g]"]),
        kalium_mg: num(raw["K Kalium [mg/100g]"]),
        calcium_mg: num(raw["CA Calcium [mg/100g]"]),
        magnesium_mg: num(raw["MG Magnesium [mg/100g]"]),
        phosphor_mg: num(raw["P Phosphor [mg/100g]"]),
        sulfur_mg: num(raw["S Schwefel [mg/100g]"]),
        iron_mg: num(raw["FE Eisen [mg/100g]"]),
        zinc_mg: num(raw["ZN Zink [mg/100g]"]),
        iodide_µg: num(raw["ID Iodid [µg/100g]"]),
        copper_µg: num(raw["CU Kupfer [µg/100g]"]),
        manganese_µg: num(raw["MN Mangan [µg/100g]"]),
        fluoride_µg: num(raw["FD Fluorid [µg/100g]"]),
        chromium_µg: num(raw["CR Chrom [µg/100g]"]),
        molybdenum_µg: num(raw["MO Molybdän [µg/100g]"]),
    };
}

function mapOrganicAcids(raw: RawBSLItem) {
    return {
        acetic_g: num(raw["ACEAC Essigsäure [g/100g]"]),
        citric_g: num(raw["CITAC Zitronensäure [g/100g]"]),
        lactic_g: num(raw["LACAC Milchsäure [g/100g]"]),
        malic_g: num(raw["MALAC Äpfelsäure [g/100g]"]),
        tartaric_g: num(raw["TARAC Weinsäure [g/100g]"]),
    };
}

function mapFattyAcids(raw: RawBSLItem) {
    return {
        saturated: mapSaturatedFattyAcids(raw),
        monounsaturated: mapMonounsaturatedFattyAcids(raw),
        polyunsaturated: mapPolyunsaturatedFattyAcids(raw),
        other_g: num(raw["FAX Fettsäuren, sonstige [g/100g]"]),
    };
}

function mapSaturatedFattyAcids(raw: RawBSLItem) {
    return {
        total_g: num(raw["FASAT Fettsäuren, gesättigt, gesamt [g/100g]"]),
        butyric_C4_0_g: num(raw["F4:0 Fettsäure C4:0 (Buttersäure) [g/100g]"]),
        caproic_C6_0_g: num(raw["F6:0 Fettsäure C6:0 (Capronsäure) [g/100g]"]),
        caprylic_C8_0_g: num(raw["F8:0 Fettsäure C8:0 (Caprylsäure) [g/100g]"]),
        capric_C10_0_g: num(raw["F10:0 Fettsäure C10:0 (Caprinsäure) [g/100g]"]),
        lauric_C12_0_g: num(raw["F12:0 Fettsäure C12:0 (Laurinsäure) [g/100g]"]),
        myristic_C14_0_g: num(raw["F14:0 Fettsäure C14:0 (Myristinsäure) [g/100g]"]),
        pentadecanoic_C15_0_g: num(raw["F15:0 Fettsäure C15:0 (Pentadecylsäure) [g/100g]"]),
        palmitic_C16_0_g: num(raw["F16:0 Fettsäure C16:0 (Palmitinsäure) [g/100g]"]),
        margaric_C17_0_g: num(raw["F17:0 Fettsäure C17:0 (Margarinsäure) [g/100g]"]),
        stearic_C18_0_g: num(raw["F18:0 Fettsäure C18:0 (Stearinsäure) [g/100g]"]),
        arachidic_C20_0_g: num(raw["F20:0 Fettsäure C20:0 (Arachinsäure) [g/100g]"]),
        behenic_C22_0_g: num(raw["F22:0 Fettsäure C22:0 (Behensäure) [g/100g]"]),
        lignoceric_C24_0_g: num(raw["F24:0 Fettsäure C24:0 (Lignocerinsäure) [g/100g]"]),
    };
}

function mapMonounsaturatedFattyAcids(raw: RawBSLItem) {
    return {
        total_g: num(raw["FAMS Fettsäure, einfach ungesättigt, gesamt [g/100g]"]),
        myristoleic_C14_1_g: num(
            raw["F14:1CN5 Fettsäure C14:1 n-5 cis (Myristoleinsäure) [g/100g]"],
        ),
        palmitoleic_C16_1_g: num(
            raw["F16:1CN7 Fettsäure C16:1 n-7 cis (Palmitoleinsäure) [g/100g]"],
        ),
        vaccenic_C18_1_n7_g: num(raw["F18:1CN7 Fettsäure C18:1 n-7 cis (Vaccensäure) [g/100g]"]),
        oleic_C18_1_n9_g: num(raw["F18:1CN9 Fettsäure C18:1 n-9 cis (Ölsäure) [g/100g]"]),
        gondoic_C20_1_g: num(raw["F20:1CN9 Fettsäure C20:1 n-9 cis (Gondosäure) [g/100g]"]),
        erucic_C22_1_g: num(raw["F22:1CN9 Fettsäure C22:1 n-9 cis (Erucasäure) [g/100g]"]),
    };
}

function mapPolyunsaturatedFattyAcids(raw: RawBSLItem) {
    return {
        total_g: num(raw["FAPU Fettsäuren, mehrfach ungesättigt, gesamt [g/100g]"]),
        omega3: mapOmega3(raw),
        omega6: mapOmega6(raw),
    };
}

function mapOmega3(raw: RawBSLItem) {
    return {
        total_g: num(raw["FAPUN3 Fettsäuren, mehrfach ungesättigt n-3 (Omega-3), gesamt [g/100g]"]),
        alphaLinolenic_ALA_C18_3_g: num(
            raw["F18:3CN3 Fettsäure C18:3 n-3 all-cis (Alpha-Linolensäure) [g/100g]"],
        ),
        stearidonic_SDA_C18_4_g: num(
            raw["F18:4CN3 Fettsäure C18:4 n-3 all-cis (Stearidonsäure) [g/100g]"],
        ),
        eicosapentaenoic_EPA_C20_5_g: num(
            raw["F20:5CN3 Fettsäure C20:5 n-3 all-cis (Eicosapentaensäure) [g/100g]"],
        ),
        docosapentaenoic_DPA_C22_5_g: num(
            raw["F22:5CN3 Fettsäure C22:5 n-3 all-cis (Docosapentaensäure) [g/100g]"],
        ),
        docosahexaenoic_DHA_C22_6_g: num(
            raw["F22:6CN3 Fettsäure C22:6 n-3 all-cis (Docosahexaensäure) [g/100g]"],
        ),
    };
}

function mapOmega6(raw: RawBSLItem) {
    return {
        total_g: num(raw["FAPUN6 Fettsäuren, mehrfach ungesättigt n-6 (Omega-6), gesamt [g/100g]"]),
        linoleic_LA_C18_2_g: num(
            raw["F18:2CN6 Fettsäure C18:2 n-6 cis, cis (Linolsäure) [g/100g]"],
        ),
        gammaLinolenic_GLA_C18_3_g: num(
            raw["F18:3CN6 Fettsäure C18:3 n-6 all-cis (Gamma-Linolensäure) [g/100g]"],
        ),
        conjugatedLinoleic_CLA_C18_2_g: num(
            raw["F18:2C9T11 Fettsäure C18:2 n-7 cis 9, trans 11 (konjugierte Linolsäure) [g/100g]"],
        ),
        eicosadienoic_C20_2_g: num(
            raw["F20:2CN6 Fettsäure C20:2 n-6 all-cis (Eicosadiensäure) [g/100g]"],
        ),
        dihomoGammaLinolenic_DGLA_C20_3_g: num(
            raw["F20:3CN6 Fettsäure C20:3 n-6 all-cis (Dihomogamma-Linolensäure) [g/100g]"],
        ),
        arachidonic_AA_C20_4_g: num(
            raw["F20:4CN6 Fettsäure C20:4 n-6 all-cis (Arachidonsäure) [g/100g]"],
        ),
    };
}

function mapAminoAcids(raw: RawBSLItem) {
    return {
        essential_total_g: num(raw["AAE9 Aminosäuren, unentbehrlich, gesamt [g/100g]"]),
        alanine_g: num(raw["ALA Alanin [g/100g]"]),
        arginine_g: num(raw["ARG Arginin [g/100g]"]),
        asparticAcid_g: num(raw["ASP Asparaginsäure, inklusive Asparagin [g/100g]"]),
        cysteine_g: num(raw["CYSTE Cystein [g/100g]"]),
        glutamicAcid_g: num(raw["GLU Glutaminsäure, inklusive Glutamin [g/100g]"]),
        glycine_g: num(raw["GLY Glycin [g/100g]"]),
        histidine_g: num(raw["HIS Histidin [g/100g]"]),
        isoleucine_g: num(raw["ILE Isoleucin [g/100g]"]),
        leucine_g: num(raw["LEU Leucin [g/100g]"]),
        lysine_g: num(raw["LYS Lysin [g/100g]"]),
        methionine_g: num(raw["MET Methionin [g/100g]"]),
        phenylalanine_g: num(raw["PHE Phenylalanin [g/100g]"]),
        proline_g: num(raw["PRO Prolin [g/100g]"]),
        serine_g: num(raw["SER Serin [g/100g]"]),
        threonine_g: num(raw["THR Threonin [g/100g]"]),
        tryptophan_g: num(raw["TRP Tryptophan [g/100g]"]),
        tyrosine_g: num(raw["TYR Tyrosin [g/100g]"]),
        valine_g: num(raw["VAL Valin [g/100g]"]),
    };
}

function num(val: Maybe<string | number>): number | null {
    if (typeof val === "number") {
        return val;
    }

    if (!val) {
        return null;
    }

    const parsed = Number.parseFloat(val.replace(",", "."));
    return Number.isNaN(parsed) ? null : parsed;
}
