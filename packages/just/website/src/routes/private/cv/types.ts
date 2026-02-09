import { z } from "zod";

export enum CvSectionType {
    SimpleList = "simple_list",
    Languages = "languages",
    DetailList = "detail_list",
    ThesisList = "thesis_list",
    TechStack = "tech_stack",
}

const zSimpleList = z.array(z.string());
const zLanguages = z.array(
    z
        .object({
            name: z.string(),
            level: z.string(),
            code: z.string(),
        })
        .strict(),
);
const zDetailList = z.array(
    z
        .object({
            title: z.string(),
            details: z.string(),
        })
        .strict(),
);
const zThesisList = z.array(
    z
        .object({
            type: z.string(),
            title: z.string(),
            keywords: z.string(),
            grade: z.string().optional(),
        })
        .strict(),
);
const zTechStack = z.array(z.string());

export const CvSectionTypes = {
    [CvSectionType.SimpleList]: zSimpleList,
    [CvSectionType.Languages]: zLanguages,
    [CvSectionType.DetailList]: zDetailList,
    [CvSectionType.ThesisList]: zThesisList,
    [CvSectionType.TechStack]: zTechStack,
};

export type CvSectionItems<T extends CvSectionType> = z.infer<(typeof CvSectionTypes)[T]>;
