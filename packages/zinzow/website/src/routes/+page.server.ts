import { error } from "@sveltejs/kit";
import { GetHomeSystemData } from "../graphql/system/generated/gql";
import { getAssetUrl } from "../utils/assets";
import { toPromise } from "../utils/graphql";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const { files } = await toPromise(GetHomeSystemData({}));
    const file = files[0];
    if (!file) {
        return error(500, "No hero image found");
    }

    return {
        heroImage: getAssetUrl(file.id),
    };
};
