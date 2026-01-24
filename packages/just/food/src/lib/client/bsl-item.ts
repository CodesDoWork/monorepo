export interface RawBSLItem {
    "BLS Code": string;
    Lebensmittelbezeichnung: string;
    "Food name": string;
    "ENERCJ Energie (Kilojoule) [kJ/100g]": bigint;
    "ENERCJ Datenherkunft": string;
    "ENERCJ Referenz": string;
    "ENERCC Energie (Kilokalorien) [kcal/100g]": bigint;
    "ENERCC Datenherkunft": string;
    "ENERCC Referenz": string;
    "WATER Wasser [g/100g]": string;
    "WATER Datenherkunft": string;
    "WATER Referenz": string;
    "PROT625 Protein (Nx6,25) [g/100g]": string;
    "PROT625 Datenherkunft": string;
    "PROT625 Referenz": string;
    "FAT Fett [g/100g]": string;
    "FAT Datenherkunft": string;
    "FAT Referenz": string;
    "CHO Kohlenhydrate, verfügbar [g/100g]": number;
    "CHO Datenherkunft": string;
    "CHO Referenz": string;
    "FIBT Ballaststoffe, gesamt [g/100g]": string;
    "FIBT Datenherkunft": string;
    "FIBT Referenz": string;
    "ALC Alkohol (Ethanol) [g/100g]": string;
    "ALC Datenherkunft": string;
    "ALC Referenz": string;
    "OA Organische Säuren, gesamt [g/100g]": string;
    "OA Datenherkunft": string;
    "OA Referenz": string;
    "ASH Rohasche [g/100g]": string;
    "ASH Datenherkunft": string;
    "ASH Referenz": string;
    "VITA Vitamin A, Retinol-Äquivalent (RE) [µg/100g]": string;
    "VITA Datenherkunft": string;
    "VITA Referenz": string;
    "VITAA Vitamin A, Retinol-Aktivitäts-Äquivalent (RAE) [µg/100g]": string;
    "VITAA Datenherkunft": string;
    "VITAA Referenz": string;
    "RETOL Retinol [µg/100g]": string;
    "RETOL Datenherkunft": string;
    "RETOL Referenz": string;
    "CARTB Beta‑Carotin [µg/100g]": string;
    "CARTB Datenherkunft": string;
    "CARTB Referenz": string;
    "CAROTPAXB Carotinoide, außer Beta-Carotin [µg/100g]": string;
    "CAROTPAXB Datenherkunft": string;
    "CAROTPAXB Referenz": string;
    "VITD Vitamin D [µg/100g]": string;
    "VITD Datenherkunft": string;
    "VITD Referenz": string;
    "CHOCAL Vitamin D3 (Cholecalciferol) [µg/100g]": string;
    "CHOCAL Datenherkunft": string;
    "CHOCAL Referenz": string;
    "ERGCAL Vitamin D2 (Ergocalciferol) [µg/100g]": string;
    "ERGCAL Datenherkunft": string;
    "ERGCAL Referenz": string;
    "VITE Vitamin E (Alpha-Tocopherol) [mg/100g]": string;
    "VITE Datenherkunft": string;
    "VITE Referenz": string;
    "TOCPHA Alpha‑Tocopherol [mg/100g]": string;
    "TOCPHA Datenherkunft": string;
    "TOCPHA Referenz": string;
    "TOCPHB Beta-Tocopherol [mg/100g]": string;
    "TOCPHB Datenherkunft": string;
    "TOCPHB Referenz": string;
    "TOCPHG Gamma-Tocopherol [mg/100g]": string;
    "TOCPHG Datenherkunft": string;
    "TOCPHG Referenz": string;
    "TOCPHD Delta-Tocopherol [mg/100g]": string;
    "TOCPHD Datenherkunft": string;
    "TOCPHD Referenz": string;
    "TOCTRA Alpha-Tocotrienol [mg/100g]": string;
    "TOCTRA Datenherkunft": string;
    "TOCTRA Referenz": string;
    "VITK Vitamin K [µg/100g]": string;
    "VITK Datenherkunft": string;
    "VITK Referenz": string;
    "VITK1 Vitamin K1 (Phyllochinon) [µg/100g]": string;
    "VITK1 Datenherkunft": string;
    "VITK1 Referenz": string;
    "VITK2 Vitamin K2 (Menachinone) [µg/100g]": string;
    "VITK2 Datenherkunft": string;
    "VITK2 Referenz": string;
    "THIA Vitamin B1 (Thiamin) [mg/100g]": string;
    "THIA Datenherkunft": string;
    "THIA Referenz": string;
    "RIBF Vitamin B2 (Riboflavin) [mg/100g]": string;
    "RIBF Datenherkunft": string;
    "RIBF Referenz": string;
    "NIAEQ Niacin-Äquivalent [mg/100g]": string;
    "NIAEQ Datenherkunft": string;
    "NIAEQ Referenz": string;
    "NIA Niacin [mg/100g]": string;
    "NIA Datenherkunft": string;
    "NIA Referenz": string;
    "PANTAC Pantothensäure [mg/100g]": string;
    "PANTAC Datenherkunft": string;
    "PANTAC Referenz": string;
    "VITB6 Vitamin B6 [µg/100g]": string;
    "VITB6 Datenherkunft": string;
    "VITB6 Referenz": string;
    "BIOT Biotin [µg/100g]": string;
    "BIOT Datenherkunft": string;
    "BIOT Referenz": string;
    "FOL Folat-Äquivalent [µg/100g]": string;
    "FOL Datenherkunft": string;
    "FOL Referenz": string;
    "FOLFD Folat [µg/100g]": string;
    "FOLFD Datenherkunft": string;
    "FOLFD Referenz": string;
    "FOLAC Folsäure, synthetisch [µg/100g]": string;
    "FOLAC Datenherkunft": string;
    "FOLAC Referenz": string;
    "VITB12 Vitamin B12 (Cobalamine) [µg/100g]": string;
    "VITB12 Datenherkunft": string;
    "VITB12 Referenz": string;
    "VITC Vitamin C [mg/100g]": string;
    "VITC Datenherkunft": string;
    "VITC Referenz": string;
    "NACL Salz (Natriumchlorid) [g/100g]": number;
    "NACL Datenherkunft": string;
    "NACL Referenz": string;
    "NA Natrium [mg/100g]": string;
    "NA Datenherkunft": string;
    "NA Referenz": string;
    "CLD Chlorid [mg/100g]": string;
    "CLD Datenherkunft": string;
    "CLD Referenz": string;
    "K Kalium [mg/100g]": string;
    "K Datenherkunft": string;
    "K Referenz": string;
    "CA Calcium [mg/100g]": string;
    "CA Datenherkunft": string;
    "CA Referenz": string;
    "MG Magnesium [mg/100g]": string;
    "MG Datenherkunft": string;
    "MG Referenz": string;
    "P Phosphor [mg/100g]": string;
    "P Datenherkunft": string;
    "P Referenz": string;
    "S Schwefel [mg/100g]": string;
    "S Datenherkunft": string;
    "S Referenz": string;
    "FE Eisen [mg/100g]": string;
    "FE Datenherkunft": string;
    "FE Referenz": string;
    "ZN Zink [mg/100g]": number;
    "ZN Datenherkunft": string;
    "ZN Referenz": string;
    "ID Iodid [µg/100g]": string;
    "ID Datenherkunft": string;
    "ID Referenz": string;
    "CU Kupfer [µg/100g]": string;
    "CU Datenherkunft": string;
    "CU Referenz": string;
    "MN Mangan [µg/100g]": string;
    "MN Datenherkunft": string;
    "MN Referenz": string;
    "FD Fluorid [µg/100g]": string;
    "FD Datenherkunft": string;
    "FD Referenz": string;
    "CR Chrom [µg/100g]": string;
    "CR Datenherkunft": string;
    "CR Referenz": string;
    "MO Molybdän [µg/100g]": string;
    "MO Datenherkunft": string;
    "MO Referenz": string;
    "ACEAC Essigsäure [g/100g]": string;
    "ACEAC Datenherkunft": string;
    "ACEAC Referenz": string;
    "CITAC Zitronensäure [g/100g]": string;
    "CITAC Datenherkunft": string;
    "CITAC Referenz": string;
    "LACAC Milchsäure [g/100g]": string;
    "LACAC Datenherkunft": string;
    "LACAC Referenz": string;
    "MALAC Äpfelsäure [g/100g]": string;
    "MALAC Datenherkunft": string;
    "MALAC Referenz": string;
    "TARAC Weinsäure [g/100g]": string;
    "TARAC Datenherkunft": string;
    "TARAC Referenz": string;
    "POLYL Zuckeralkohole, gesamt [g/100g]": string;
    "POLYL Datenherkunft": string;
    "POLYL Referenz": string;
    "MANTL Mannit [g/100g]": string;
    "MANTL Datenherkunft": string;
    "MANTL Referenz": string;
    "SORTL Sorbit [g/100g]": string;
    "SORTL Datenherkunft": string;
    "SORTL Referenz": string;
    "XYLTL Xylit [g/100g]": string;
    "XYLTL Datenherkunft": string;
    "XYLTL Referenz": string;
    "MNSAC Monosaccharide, gesamt [g/100g]": string;
    "MNSAC Datenherkunft": string;
    "MNSAC Referenz": string;
    "GLUS Glucose [g/100g]": string;
    "GLUS Datenherkunft": string;
    "GLUS Referenz": string;
    "FRUS Fructose [g/100g]": string;
    "FRUS Datenherkunft": string;
    "FRUS Referenz": string;
    "GALS Galactose [g/100g]": string;
    "GALS Datenherkunft": string;
    "GALS Referenz": string;
    "DISAC Disaccharide, gesamt [g/100g]": string;
    "DISAC Datenherkunft": string;
    "DISAC Referenz": string;
    "SUCS Saccharose [g/100g]": string;
    "SUCS Datenherkunft": string;
    "SUCS Referenz": string;
    "MALS Maltose [g/100g]": string;
    "MALS Datenherkunft": string;
    "MALS Referenz": string;
    "LACS Lactose [g/100g]": string;
    "LACS Datenherkunft": string;
    "LACS Referenz": string;
    "SUGAR Zucker (Mono- und Disaccharide), gesamt [g/100g]": number;
    "SUGAR Datenherkunft": string;
    "SUGAR Referenz": string;
    "OLSAC Oligosaccharide, verfügbar [g/100g]": string;
    "OLSAC Datenherkunft": string;
    "OLSAC Referenz": string;
    "STARCH Stärke (Stärke, Glykogen, Dextrine) [g/100g]": string;
    "STARCH Datenherkunft": string;
    "STARCH Referenz": string;
    "FIBLMW Ballaststoffe, niedermolekular [g/100g]": string;
    "FIBLMW Datenherkunft": string;
    "FIBLMW Referenz": string;
    "FIBHMW Ballaststoffe, hochmolekular [g/100g]": string;
    "FIBHMW Datenherkunft": string;
    "FIBHMW Referenz": string;
    "FIBINS Ballaststoffe, wasserunlöslich [g/100g]": string;
    "FIBINS Datenherkunft": string;
    "FIBINS Referenz": string;
    "FIBSOL Ballaststoffe, wasserlöslich [g/100g]": string;
    "FIBSOL Datenherkunft": string;
    "FIBSOL Referenz": string;
    "FIBHMWS Ballaststoffe, hochmolekular, wasserlöslich [g/100g]": string;
    "FIBHMWS Datenherkunft": string;
    "FIBHMWS Referenz": string;
    "FIBHMWI Ballaststoffe, hochmolekular, wasserunlöslich [g/100g]": string;
    "FIBHMWI Datenherkunft": string;
    "FIBHMWI Referenz": string;
    "FASAT Fettsäuren, gesättigt, gesamt [g/100g]": string;
    "FASAT Datenherkunft": string;
    "FASAT Referenz": string;
    "F4:0 Fettsäure C4:0 (Buttersäure) [g/100g]": string;
    "F4:0 Datenherkunft": string;
    "F4:0 Referenz": string;
    "F6:0 Fettsäure C6:0 (Capronsäure) [g/100g]": string;
    "F6:0 Datenherkunft": string;
    "F6:0 Referenz": string;
    "F8:0 Fettsäure C8:0 (Caprylsäure) [g/100g]": string;
    "F8:0 Datenherkunft": string;
    "F8:0 Referenz": string;
    "F10:0 Fettsäure C10:0 (Caprinsäure) [g/100g]": string;
    "F10:0 Datenherkunft": string;
    "F10:0 Referenz": string;
    "F12:0 Fettsäure C12:0 (Laurinsäure) [g/100g]": string;
    "F12:0 Datenherkunft": string;
    "F12:0 Referenz": string;
    "F14:0 Fettsäure C14:0 (Myristinsäure) [g/100g]": string;
    "F14:0 Datenherkunft": string;
    "F14:0 Referenz": string;
    "F15:0 Fettsäure C15:0 (Pentadecylsäure) [g/100g]": string;
    "F15:0 Datenherkunft": string;
    "F15:0 Referenz": string;
    "F16:0 Fettsäure C16:0 (Palmitinsäure) [g/100g]": string;
    "F16:0 Datenherkunft": string;
    "F16:0 Referenz": string;
    "F17:0 Fettsäure C17:0 (Margarinsäure) [g/100g]": string;
    "F17:0 Datenherkunft": string;
    "F17:0 Referenz": string;
    "F18:0 Fettsäure C18:0 (Stearinsäure) [g/100g]": string;
    "F18:0 Datenherkunft": string;
    "F18:0 Referenz": string;
    "F20:0 Fettsäure C20:0 (Arachinsäure) [g/100g]": string;
    "F20:0 Datenherkunft": string;
    "F20:0 Referenz": string;
    "F22:0 Fettsäure C22:0 (Behensäure) [g/100g]": string;
    "F22:0 Datenherkunft": string;
    "F22:0 Referenz": string;
    "F24:0 Fettsäure C24:0 (Lignocerinsäure) [g/100g]": string;
    "F24:0 Datenherkunft": string;
    "F24:0 Referenz": string;
    "FAMS Fettsäure, einfach ungesättigt, gesamt [g/100g]": string;
    "FAMS Datenherkunft": string;
    "FAMS Referenz": string;
    "F14:1CN5 Fettsäure C14:1 n-5 cis (Myristoleinsäure) [g/100g]": string;
    "F14:1CN5 Datenherkunft": string;
    "F14:1CN5 Referenz": string;
    "F16:1CN7 Fettsäure C16:1 n-7 cis (Palmitoleinsäure) [g/100g]": string;
    "F16:1CN7 Datenherkunft": string;
    "F16:1CN7 Referenz": string;
    "F18:1CN7 Fettsäure C18:1 n-7 cis (Vaccensäure) [g/100g]": string;
    "F18:1CN7 Datenherkunft": string;
    "F18:1CN7 Referenz": string;
    "F18:1CN9 Fettsäure C18:1 n-9 cis (Ölsäure) [g/100g]": string;
    "F18:1CN9 Datenherkunft": string;
    "F18:1CN9 Referenz": string;
    "F20:1CN9 Fettsäure C20:1 n-9 cis (Gondosäure) [g/100g]": string;
    "F20:1CN9 Datenherkunft": string;
    "F20:1CN9 Referenz": string;
    "F22:1CN9 Fettsäure C22:1 n-9 cis (Erucasäure) [g/100g]": string;
    "F22:1CN9 Datenherkunft": string;
    "F22:1CN9 Referenz": string;
    "FAPU Fettsäuren, mehrfach ungesättigt, gesamt [g/100g]": string;
    "FAPU Datenherkunft": string;
    "FAPU Referenz": string;
    "FAPUN3 Fettsäuren, mehrfach ungesättigt n-3 (Omega-3), gesamt [g/100g]": string;
    "FAPUN3 Datenherkunft": string;
    "FAPUN3 Referenz": string;
    "F18:3CN3 Fettsäure C18:3 n-3 all-cis (Alpha-Linolensäure) [g/100g]": string;
    "F18:3CN3 Datenherkunft": string;
    "F18:3CN3 Referenz": string;
    "F18:4CN3 Fettsäure C18:4 n-3 all-cis (Stearidonsäure) [g/100g]": string;
    "F18:4CN3 Datenherkunft": string;
    "F18:4CN3 Referenz": string;
    "F20:5CN3 Fettsäure C20:5 n-3 all-cis (Eicosapentaensäure) [g/100g]": string;
    "F20:5CN3 Datenherkunft": string;
    "F20:5CN3 Referenz": string;
    "F22:5CN3 Fettsäure C22:5 n-3 all-cis (Docosapentaensäure) [g/100g]": string;
    "F22:5CN3 Datenherkunft": string;
    "F22:5CN3 Referenz": string;
    "F22:6CN3 Fettsäure C22:6 n-3 all-cis (Docosahexaensäure) [g/100g]": string;
    "F22:6CN3 Datenherkunft": string;
    "F22:6CN3 Referenz": string;
    "FAPUN6 Fettsäuren, mehrfach ungesättigt n-6 (Omega-6), gesamt [g/100g]": string;
    "FAPUN6 Datenherkunft": string;
    "FAPUN6 Referenz": string;
    "F18:2CN6 Fettsäure C18:2 n-6 cis, cis (Linolsäure) [g/100g]": string;
    "F18:2CN6 Datenherkunft": string;
    "F18:2CN6 Referenz": string;
    "F18:2C9T11 Fettsäure C18:2 n-7 cis 9, trans 11 (konjugierte Linolsäure) [g/100g]": string;
    "F18:2C9T11 Datenherkunft": string;
    "F18:2C9T11 Referenz": string;
    "F18:3CN6 Fettsäure C18:3 n-6 all-cis (Gamma-Linolensäure) [g/100g]": string;
    "F18:3CN6 Datenherkunft": string;
    "F18:3CN6 Referenz": string;
    "F20:2CN6 Fettsäure C20:2 n-6 all-cis (Eicosadiensäure) [g/100g]": string;
    "F20:2CN6 Datenherkunft": string;
    "F20:2CN6 Referenz": string;
    "F20:3CN6 Fettsäure C20:3 n-6 all-cis (Dihomogamma-Linolensäure) [g/100g]": string;
    "F20:3CN6 Datenherkunft": string;
    "F20:3CN6 Referenz": string;
    "F20:4CN6 Fettsäure C20:4 n-6 all-cis (Arachidonsäure) [g/100g]": string;
    "F20:4CN6 Datenherkunft": string;
    "F20:4CN6 Referenz": string;
    "FAX Fettsäuren, sonstige [g/100g]": string;
    "FAX Datenherkunft": string;
    "FAX Referenz": string;
    "CHORL Cholesterin [mg/100g]": string;
    "CHORL Datenherkunft": string;
    "CHORL Referenz": string;
    "AAE9 Aminosäuren, unentbehrlich, gesamt [g/100g]": string;
    "AAE9 Datenherkunft": string;
    "AAE9 Referenz": string;
    "ALA Alanin [g/100g]": string;
    "ALA Datenherkunft": string;
    "ALA Referenz": string;
    "ARG Arginin [g/100g]": string;
    "ARG Datenherkunft": string;
    "ARG Referenz": string;
    "ASP Asparaginsäure, inklusive Asparagin [g/100g]": string;
    "ASP Datenherkunft": string;
    "ASP Referenz": string;
    "CYSTE Cystein [g/100g]": string;
    "CYSTE Datenherkunft": string;
    "CYSTE Referenz": string;
    "GLU Glutaminsäure, inklusive Glutamin [g/100g]": string;
    "GLU Datenherkunft": string;
    "GLU Referenz": string;
    "GLY Glycin [g/100g]": string;
    "GLY Datenherkunft": string;
    "GLY Referenz": string;
    "HIS Histidin [g/100g]": string;
    "HIS Datenherkunft": string;
    "HIS Referenz": string;
    "ILE Isoleucin [g/100g]": string;
    "ILE Datenherkunft": string;
    "ILE Referenz": string;
    "LEU Leucin [g/100g]": string;
    "LEU Datenherkunft": string;
    "LEU Referenz": string;
    "LYS Lysin [g/100g]": string;
    "LYS Datenherkunft": string;
    "LYS Referenz": string;
    "MET Methionin [g/100g]": string;
    "MET Datenherkunft": string;
    "MET Referenz": string;
    "PHE Phenylalanin [g/100g]": string;
    "PHE Datenherkunft": string;
    "PHE Referenz": string;
    "PRO Prolin [g/100g]": string;
    "PRO Datenherkunft": string;
    "PRO Referenz": string;
    "SER Serin [g/100g]": string;
    "SER Datenherkunft": string;
    "SER Referenz": string;
    "THR Threonin [g/100g]": string;
    "THR Datenherkunft": string;
    "THR Referenz": string;
    "TRP Tryptophan [g/100g]": string;
    "TRP Datenherkunft": string;
    "TRP Referenz": string;
    "TYR Tyrosin [g/100g]": string;
    "TYR Datenherkunft": string;
    "TYR Referenz": string;
    "VAL Valin [g/100g]": string;
    "VAL Datenherkunft": string;
    "VAL Referenz": string;
    "NT Stickstoff, gesamt [g/100g]": string;
    "NT Datenherkunft": string;
    "NT Referenz": string;
    Hinweis: string | null;
}

export const BSL_NAMES: Record<string, string> = {
    // ────────────────── General
    code: "Code",
    description: "Beschreibung",
    name: "Name",
    water_g: "Wasser",
    protein_g: "Protein",
    fat_total_g: "Fett gesamt",
    alcohol_g: "Alkohol",
    organicAcids_total_g: "Organische Säuren gesamt",
    ash_g: "Asche",
    nitrogen_total_g: "Stickstoff",
    cholesterol_mg: "Cholesterin",

    // ────────────────── Energy
    energy: "Energie",
    "energy.energy_kJ": "Energie (kJ)",
    "energy.energy_kcal": "Energie (kcal)",

    // ────────────────── Carbohydrates
    carbohydrates: "Kohlenhydrate",
    "carbohydrates.available_total_g": "Kohlenhydrate verfügbar",
    "carbohydrates.sugar_total_g": "Zucker gesamt",
    "carbohydrates.monosaccharides_total_g": "Monosaccharide",
    "carbohydrates.glucose_g": "Glukose",
    "carbohydrates.fructose_g": "Fruktose",
    "carbohydrates.galactose_g": "Galaktose",
    "carbohydrates.disaccharides_total_g": "Disaccharide",
    "carbohydrates.sucrose_g": "Saccharose",
    "carbohydrates.maltose_g": "Maltose",
    "carbohydrates.lactose_g": "Laktose",
    "carbohydrates.oligosaccharides_available_g": "Oligosaccharide",
    "carbohydrates.starch_g": "Stärke",

    "carbohydrates.sugarAlcohols": "Zuckeralkohole",
    "carbohydrates.sugarAlcohols.total_g": "Zuckeralkohole gesamt",
    "carbohydrates.sugarAlcohols.mannitol_g": "Mannit",
    "carbohydrates.sugarAlcohols.sorbitol_g": "Sorbit",
    "carbohydrates.sugarAlcohols.xylitol_g": "Xylit",

    // ────────────────── Fiber
    fiber: "Ballaststoffe",
    "fiber.total_g": "Ballaststoffe gesamt",
    "fiber.soluble_g": "Ballaststoffe löslich",
    "fiber.insoluble_g": "Ballaststoffe unlöslich",
    "fiber.low_molecular_g": "Niedermolekulare Ballaststoffe",
    "fiber.high_molecular_g": "Hochmolekulare Ballaststoffe",
    "fiber.high_molecular_soluble_g": "Hochmolekular löslich",
    "fiber.high_molecular_insoluble_g": "Hochmolekular unlöslich",

    // ────────────────── Vitamins
    vitamins: "Vitamine",
    "vitamins.a_re_µg": "Vitamin A (RE)",
    "vitamins.a_rae_µg": "Vitamin A (RAE)",
    "vitamins.retinol_µg": "Retinol",
    "vitamins.betaCarotene_µg": "Beta-Carotin",
    "vitamins.carotenoids_µg": "Carotinoide",

    "vitamins.d_µg": "Vitamin D",
    "vitamins.d3_µg": "Vitamin D3 (Cholecalciferol)",
    "vitamins.d2_µg": "Vitamin D2 (Ergocalciferol)",

    "vitamins.e_mg": "Vitamin E",
    "vitamins.alphaTocopherol_mg": "α-Tocopherol",
    "vitamins.betaTocopherol_mg": "β-Tocopherol",
    "vitamins.gammaTocopherol_mg": "γ-Tocopherol",
    "vitamins.deltaTocopherol_mg": "δ-Tocopherol",
    "vitamins.alphaTocotrienol_mg": "α-Tocotrienol",

    "vitamins.k_µg": "Vitamin K",
    "vitamins.k1_µg": "Vitamin K1 (Phyllochinon)",
    "vitamins.k2_µg": "Vitamin K2 (Menachinon)",

    "vitamins.b1_mg": "Vitamin B1 (Thiamin)",
    "vitamins.b2_mg": "Vitamin B2 (Riboflavin)",
    "vitamins.b3_mg": "Vitamin B3 (Niacin)",
    "vitamins.b3Equivalent_mg": "Niacin-Äquivalent",
    "vitamins.b5_mg": "Vitamin B5 (Pantothensäure)",
    "vitamins.b6_µg": "Vitamin B6",
    "vitamins.b7_µg": "Vitamin B7 (Biotin)",
    "vitamins.b9_folate_µg": "Folat",
    "vitamins.b9_folateEquivalent_µg": "Folat-Äquivalent",
    "vitamins.b9_synthetic_µg": "Synthetische Folsäure",
    "vitamins.b12_µg": "Vitamin B12",
    "vitamins.c_mg": "Vitamin C",

    // ────────────────── Minerals
    minerals: "Mineralstoffe",
    "minerals.salt_g": "Salz",
    "minerals.natrium_mg": "Natrium",
    "minerals.chloride_mg": "Chlorid",
    "minerals.kalium_mg": "Kalium",
    "minerals.calcium_mg": "Kalzium",
    "minerals.magnesium_mg": "Magnesium",
    "minerals.phosphor_mg": "Phosphor",
    "minerals.sulfur_mg": "Schwefel",
    "minerals.iron_mg": "Eisen",
    "minerals.zinc_mg": "Zink",
    "minerals.iodide_µg": "Jod",
    "minerals.copper_µg": "Kupfer",
    "minerals.manganese_µg": "Mangan",
    "minerals.fluoride_µg": "Fluorid",
    "minerals.chromium_µg": "Chrom",
    "minerals.molybdenum_µg": "Molybdän",

    // ────────────────── Organic Acids
    organicAcids: "Organische Säuren",
    "organicAcids.acetic_g": "Essigsäure",
    "organicAcids.citric_g": "Zitronensäure",
    "organicAcids.lactic_g": "Milchsäure",
    "organicAcids.malic_g": "Apfelsäure",
    "organicAcids.tartaric_g": "Weinsäure",

    // ────────────────── Fatty Acids
    fattyAcids: "Fettsäuren",
    // ────────────────── Saturated Fatty Acids
    "fattyAcids.saturated": "Gesättigte Fettsäuren",
    "fattyAcids.saturated.total_g": "Gesättigte Fettsäuren gesamt",
    "fattyAcids.saturated.butyric_C4_0_g": "Buttersäure (C4:0)",
    "fattyAcids.saturated.caproic_C6_0_g": "Capronsäure (C6:0)",
    "fattyAcids.saturated.caprylic_C8_0_g": "Caprylsäure (C8:0)",
    "fattyAcids.saturated.capric_C10_0_g": "Caprinsäure (C10:0)",
    "fattyAcids.saturated.lauric_C12_0_g": "Laurinsäure (C12:0)",
    "fattyAcids.saturated.myristic_C14_0_g": "Myristinsäure (C14:0)",
    "fattyAcids.saturated.pentadecanoic_C15_0_g": "Pentadecansäure (C15:0)",
    "fattyAcids.saturated.palmitic_C16_0_g": "Palmitinsäure (C16:0)",
    "fattyAcids.saturated.margaric_C17_0_g": "Margarinsäure (C17:0)",
    "fattyAcids.saturated.stearic_C18_0_g": "Stearinsäure (C18:0)",
    "fattyAcids.saturated.arachidic_C20_0_g": "Arachinsäure (C20:0)",
    "fattyAcids.saturated.behenic_C22_0_g": "Behensäure (C22:0)",
    "fattyAcids.saturated.lignoceric_C24_0_g": "Lignocerinsäure (C24:0)",

    // ────────────────── Monounsaturated Fatty Acids
    "fattyAcids.monounsaturated": "Einfach ungesättigte Fettsäuren",
    "fattyAcids.monounsaturated.total_g": "Einfach ungesättigte Fettsäuren gesamt",
    "fattyAcids.monounsaturated.myristoleic_C14_1_g": "Myristoleinsäure (C14:1)",
    "fattyAcids.monounsaturated.palmitoleic_C16_1_g": "Palmitoleinsäure (C16:1)",
    "fattyAcids.monounsaturated.vaccenic_C18_1_n7_g": "Vaccensäure (C18:1 n-7)",
    "fattyAcids.monounsaturated.oleic_C18_1_n9_g": "Ölsäure (C18:1 n-9)",
    "fattyAcids.monounsaturated.gondoic_C20_1_g": "Gondoinsäure (C20:1)",
    "fattyAcids.monounsaturated.erucic_C22_1_g": "Erucasäure (C22:1)",

    // ────────────────── Polyunsaturated Fatty Acids
    "fattyAcids.polyunsaturated": "Mehrfach ungesättigte Fettsäuren",
    "fattyAcids.polyunsaturated.total_g": "Mehrfach ungesättigte Fettsäuren gesamt",

    // Omega-3
    "fattyAcids.polyunsaturated.omega3": "Omega-3-Fettsäuren",
    "fattyAcids.polyunsaturated.omega3.total_g": "Omega-3-Fettsäuren gesamt",
    "fattyAcids.polyunsaturated.omega3.alphaLinolenic_ALA_C18_3_g":
        "α-Linolensäure (ALA, C18:3 n-3)",
    "fattyAcids.polyunsaturated.omega3.stearidonic_SDA_C18_4_g": "Stearidonsäure (SDA, C18:4 n-3)",
    "fattyAcids.polyunsaturated.omega3.eicosapentaenoic_EPA_C20_5_g":
        "Eicosapentaensäure (EPA, C20:5 n-3)",
    "fattyAcids.polyunsaturated.omega3.docosapentaenoic_DPA_C22_5_g":
        "Docosapentaensäure (DPA, C22:5 n-3)",
    "fattyAcids.polyunsaturated.omega3.docosahexaenoic_DHA_C22_6_g":
        "Docosahexaensäure (DHA, C22:6 n-3)",

    // Omega-6
    "fattyAcids.polyunsaturated.omega6": "Omega-6-Fettsäuren",
    "fattyAcids.polyunsaturated.omega6.total_g": "Omega-6-Fettsäuren gesamt",
    "fattyAcids.polyunsaturated.omega6.linoleic_LA_C18_2_g": "Linolsäure (LA, C18:2 n-6)",
    "fattyAcids.polyunsaturated.omega6.gammaLinolenic_GLA_C18_3_g":
        "γ-Linolensäure (GLA, C18:3 n-6)",
    "fattyAcids.polyunsaturated.omega6.conjugatedLinoleic_CLA_C18_2_g":
        "Konjugierte Linolsäure (CLA, C18:2)",
    "fattyAcids.polyunsaturated.omega6.eicosadienoic_C20_2_g": "Eicosadiensäure (C20:2 n-6)",
    "fattyAcids.polyunsaturated.omega6.dihomoGammaLinolenic_DGLA_C20_3_g":
        "Dihomo-γ-Linolensäure (DGLA, C20:3 n-6)",
    "fattyAcids.polyunsaturated.omega6.arachidonic_AA_C20_4_g": "Arachidonsäure (AA, C20:4 n-6)",

    // ────────────────── Other
    "fattyAcids.other_g": "Sonstige Fettsäuren",

    // ────────────────── Amino Acids
    aminoAcids: "Aminosäuren",
    "aminoAcids.essential_total_g": "Essenzielle Aminosäuren",
    "aminoAcids.alanine_g": "Alanin",
    "aminoAcids.arginine_g": "Arginin",
    "aminoAcids.asparticAcid_g": "Asparaginsäure",
    "aminoAcids.cysteine_g": "Cystein",
    "aminoAcids.glutamicAcid_g": "Glutaminsäure",
    "aminoAcids.glycine_g": "Glycin",
    "aminoAcids.histidine_g": "Histidin",
    "aminoAcids.isoleucine_g": "Isoleucin",
    "aminoAcids.leucine_g": "Leucin",
    "aminoAcids.lysine_g": "Lysin",
    "aminoAcids.methionine_g": "Methionin",
    "aminoAcids.phenylalanine_g": "Phenylalanin",
    "aminoAcids.proline_g": "Prolin",
    "aminoAcids.serine_g": "Serin",
    "aminoAcids.threonine_g": "Threonin",
    "aminoAcids.tryptophan_g": "Tryptophan",
    "aminoAcids.tyrosine_g": "Tyrosin",
    "aminoAcids.valine_g": "Valin",
};

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

export type NutrientPaths = Exclude<PathsOf<PerfectBSLItem>, "code" | "name" | "description">;

type DeepNullable<T> = {
    [K in keyof T]: T[K] extends object ? DeepNullable<T[K]> : T[K] | null;
};

export interface BSLItem extends DeepNullable<PerfectBSLItem> {
    topNutrients: NutrientPaths[];
    _searchStr: string;
}

type PathsOf<T> = T extends object
    ? {
          [K in keyof T & (string | number)]: T[K] extends object
              ? `${K}` | `${K}.${PathsOf<T[K]>}`
              : `${K}`;
      }[keyof T & (string | number)]
    : never;

function num(val: string | number | undefined | null): number | null {
    if (typeof val === "number") {
        return val;
    }

    if (!val) {
        return null;
    }

    const parsed = Number.parseFloat(val.replace(",", "."));
    return Number.isNaN(parsed) ? null : parsed;
}

export function rawBSLItemToBSLItem(raw: RawBSLItem): BSLItem {
    return {
        topNutrients: [],
        _searchStr: `${raw["BLS Code"]} ${raw.Lebensmittelbezeichnung} ${raw["Food name"]}`
            .replaceAll(" ", "")
            .toLowerCase(),
        code: raw["BLS Code"],
        description: raw.Lebensmittelbezeichnung,
        name: raw["Food name"],
        energy: {
            energy_kJ: raw["ENERCJ Energie (Kilojoule) [kJ/100g]"],
            energy_kcal: raw["ENERCC Energie (Kilokalorien) [kcal/100g]"],
        },
        water_g: num(raw["WATER Wasser [g/100g]"]),
        protein_g: num(raw["PROT625 Protein (Nx6,25) [g/100g]"]),
        fat_total_g: num(raw["FAT Fett [g/100g]"]),
        alcohol_g: num(raw["ALC Alkohol (Ethanol) [g/100g]"]),
        organicAcids_total_g: num(raw["OA Organische Säuren, gesamt [g/100g]"]),
        ash_g: num(raw["ASH Rohasche [g/100g]"]),
        nitrogen_total_g: num(raw["NT Stickstoff, gesamt [g/100g]"]),
        cholesterol_mg: num(raw["CHORL Cholesterin [mg/100g]"]),

        carbohydrates: {
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
        },

        fiber: {
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
        },

        vitamins: {
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
        },

        minerals: {
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
        },

        organicAcids: {
            acetic_g: num(raw["ACEAC Essigsäure [g/100g]"]),
            citric_g: num(raw["CITAC Zitronensäure [g/100g]"]),
            lactic_g: num(raw["LACAC Milchsäure [g/100g]"]),
            malic_g: num(raw["MALAC Äpfelsäure [g/100g]"]),
            tartaric_g: num(raw["TARAC Weinsäure [g/100g]"]),
        },

        fattyAcids: {
            saturated: {
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
            },
            monounsaturated: {
                total_g: num(raw["FAMS Fettsäure, einfach ungesättigt, gesamt [g/100g]"]),
                myristoleic_C14_1_g: num(
                    raw["F14:1CN5 Fettsäure C14:1 n-5 cis (Myristoleinsäure) [g/100g]"],
                ),
                palmitoleic_C16_1_g: num(
                    raw["F16:1CN7 Fettsäure C16:1 n-7 cis (Palmitoleinsäure) [g/100g]"],
                ),
                vaccenic_C18_1_n7_g: num(
                    raw["F18:1CN7 Fettsäure C18:1 n-7 cis (Vaccensäure) [g/100g]"],
                ),
                oleic_C18_1_n9_g: num(raw["F18:1CN9 Fettsäure C18:1 n-9 cis (Ölsäure) [g/100g]"]),
                gondoic_C20_1_g: num(raw["F20:1CN9 Fettsäure C20:1 n-9 cis (Gondosäure) [g/100g]"]),
                erucic_C22_1_g: num(raw["F22:1CN9 Fettsäure C22:1 n-9 cis (Erucasäure) [g/100g]"]),
            },
            polyunsaturated: {
                total_g: num(raw["FAPU Fettsäuren, mehrfach ungesättigt, gesamt [g/100g]"]),
                omega3: {
                    total_g: num(
                        raw[
                            "FAPUN3 Fettsäuren, mehrfach ungesättigt n-3 (Omega-3), gesamt [g/100g]"
                        ],
                    ),
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
                },
                omega6: {
                    total_g: num(
                        raw[
                            "FAPUN6 Fettsäuren, mehrfach ungesättigt n-6 (Omega-6), gesamt [g/100g]"
                        ],
                    ),
                    linoleic_LA_C18_2_g: num(
                        raw["F18:2CN6 Fettsäure C18:2 n-6 cis, cis (Linolsäure) [g/100g]"],
                    ),
                    gammaLinolenic_GLA_C18_3_g: num(
                        raw["F18:3CN6 Fettsäure C18:3 n-6 all-cis (Gamma-Linolensäure) [g/100g]"],
                    ),
                    conjugatedLinoleic_CLA_C18_2_g: num(
                        raw[
                            "F18:2C9T11 Fettsäure C18:2 n-7 cis 9, trans 11 (konjugierte Linolsäure) [g/100g]"
                        ],
                    ),
                    eicosadienoic_C20_2_g: num(
                        raw["F20:2CN6 Fettsäure C20:2 n-6 all-cis (Eicosadiensäure) [g/100g]"],
                    ),
                    dihomoGammaLinolenic_DGLA_C20_3_g: num(
                        raw[
                            "F20:3CN6 Fettsäure C20:3 n-6 all-cis (Dihomogamma-Linolensäure) [g/100g]"
                        ],
                    ),
                    arachidonic_AA_C20_4_g: num(
                        raw["F20:4CN6 Fettsäure C20:4 n-6 all-cis (Arachidonsäure) [g/100g]"],
                    ),
                },
            },
            other_g: num(raw["FAX Fettsäuren, sonstige [g/100g]"]),
        },

        aminoAcids: {
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
        },
    };
}
