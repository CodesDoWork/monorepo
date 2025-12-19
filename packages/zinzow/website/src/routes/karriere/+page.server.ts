import type { PageServerLoad } from "./$types";
import { defaultNull } from "@cdw/monorepo/shared-utils/default-null";
import { assetUrl } from "@cdw/monorepo/shared-utils/directus";
import { queryDefault } from "../../graphql/default/client";
import { GetCareerDataDocument } from "../../graphql/default/generated/graphql";
import { directusImageParams } from "../../lib/common/directus-image";
import { formatWYSIWYG } from "../../lib/server/wysiwyg";

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
    };
};
