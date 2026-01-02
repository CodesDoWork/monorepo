import type { Thing } from "schema-dts";
import type { PageServerLoad } from "./$types";
import { assetUrl } from "@cdw/monorepo/shared-directus";
import { directusImageParams } from "@cdw/monorepo/shared-svelte-components";
import { defaultNull } from "@cdw/monorepo/shared-utils/default-null";
import { formatWYSIWYG, wysiwygToText } from "@cdw/monorepo/shared-utils/html/common";
import { env } from "../../env";
import { queryDefault } from "../../graphql/default/client";
import { GetCareerDataDocument } from "../../graphql/default/generated/graphql";
import { stylesMap } from "../../lib/common/styles";

export const load: PageServerLoad = async () => {
    const { career, careerBenefits, jobPostings } = await queryDefault({
        query: GetCareerDataDocument,
    });

    return {
        career: {
            ...career,
            teamPhoto: directusImageParams(env.CMS_URL, {
                ...defaultNull(career.teamPhoto),
                alt: "Team Photo",
                assetParams: { width: 1024, quality: 50 },
            }),
            cta: formatWYSIWYG(stylesMap, career.cta),
        },
        careerBenefits,
        jobPostings: jobPostings.map(job => ({
            ...job,
            description: formatWYSIWYG(stylesMap, job.description),
            files: job.files?.map(({ file }) => ({
                title: file.title,
                filenameDownload: file.filenameDownload,
                url: assetUrl(env.CMS_URL, file.id, { download: true }),
            })),
        })),
        jsonldThings: createJsonLdThings(jobPostings),
    };
};

interface JsonLdJobPosting {
    title: string;
    description: string;
    dateCreated?: string;
}

function createJsonLdThings(jobPostings: JsonLdJobPosting[]): Thing[] {
    return jobPostings.map(jobPosting => ({
        "@type": "JobPosting",
        title: jobPosting.title,
        datePosted: jobPosting.dateCreated,
        description: wysiwygToText(jobPosting.description),
        hiringOrganization: {
            "@id": `${env.URL}/#organization`,
        },
        url: `${env.URL}/karriere`,
        jobLocation: {
            "@type": "Place",
            address: {
                "@id": `${env.URL}/#address`,
            },
        },
    }));
}
