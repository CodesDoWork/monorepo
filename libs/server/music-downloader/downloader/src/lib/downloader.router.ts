import { z } from "zod";
import { procedure, router } from "shared/trpc";
import { download } from "./download";
import { execSync } from "child_process";

const updateYtDlp = () => execSync("yt-dlp -U").toString();

export const downloaderRouter = router({
    update: procedure
        .meta({ openapi: { method: "GET", path: "/update" } })
        .input(z.object({}))
        .output(z.object({ output: z.string() }))
        .query(() => ({ output: updateYtDlp() })),
    download: procedure
        .meta({ openapi: { method: "GET", path: "/download" } })
        .input(z.object({ url: z.string().url() }))
        .output(z.object({}))
        .query(({ input }) => download(input.url)),
});
