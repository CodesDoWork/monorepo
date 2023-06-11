import { z } from "zod";
import { router, procedure } from "shared/trpc";
import { download } from "./download";
import { execSync } from "child_process";

const updateYtDlp = () => execSync("yt-dlp -U").toString();

export const downloaderRouter = router({
    update: procedure.query(updateYtDlp),
    download: procedure.input(z.string().url()).query(({ input }) => download(input)),
});
