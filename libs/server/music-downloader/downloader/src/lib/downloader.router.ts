import { z } from "zod";
import { router, procedure } from "shared/trpc";
import { download } from "./download";
import { execSync } from "child_process";
import { normalize } from "./normalize";

const updateYtDlp = () => execSync("yt-dlp -U").toString();

export const downloaderRouter = router({
    update: procedure.query(updateYtDlp),
    download: procedure.input(z.string().url()).query(({ input }) => download(input)),
    normalize: procedure.input(z.string()).query(({ input }) => {
        setTimeout(() => normalize(input), 0);
    }),
});
