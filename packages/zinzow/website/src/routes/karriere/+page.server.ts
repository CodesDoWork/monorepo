import type { Thing } from "schema-dts";
import type { PageServerLoad } from "./$types";
import { defaultNull } from "@cdw/monorepo/shared-utils/default-null";
import { assetUrl } from "@cdw/monorepo/shared-utils/directus";
import { env } from "../../env";
import { queryDefault } from "../../graphql/default/client";
import { GetCareerDataDocument } from "../../graphql/default/generated/graphql";
import { directusImageParams } from "../../lib/common/directus-image";
import { formatWYSIWYG, wysiwygToText } from "../../lib/server/wysiwyg";

export const load: PageServerLoad = async () => {
    const { career, careerBenefits, jobPostings } = await queryDefault({
        query: GetCareerDataDocument,
    });

    return {
        career: {
            ...career,
            teamPhoto: directusImageParams({
                ...defaultNull(career.teamPhoto),
                alt: "Team Photo",
                assetParams: { width: 1024, quality: 50 },
            }),
            cta: formatWYSIWYG(career.cta),
        },
        careerBenefits,
        jobPostings: jobPostings.map(job => ({
            ...job,
            description: formatWYSIWYG(job.description),
            files: job.files?.map(({ file }) => ({
                title: file.title,
                filenameDownload: file.filenameDownload,
                url: assetUrl(file.id, { download: true }),
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
