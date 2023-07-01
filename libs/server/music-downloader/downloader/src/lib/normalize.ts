import { readdirSync, rmSync, renameSync } from "fs";
import { join } from "path";
import { executeCmd } from "shared/utils";
import { path } from "@ffmpeg-installer/ffmpeg";

export const normalize = async (dir: string): Promise<void> => {
    for (const file of readdirSync(dir)) {
        const musicFile = join(dir, file);
        const { extension, fileName } = getFileNameAndExtension(musicFile);
        const outputFile = join(dir, `${fileName}-normalized.${extension}`);
        await executeCmd(
            [
                path,
                ["-i", musicFile],
                [
                    "-af",
                    "loudnorm=I=-16:TP=-1.5:LRA=11:measured_I=-27:measured_TP=-13:measured_LRA=4:measured_thresh=-33:offset=1.5",
                ],
                ["-q:a", "0"],
                outputFile,
            ].flat(),
        );

        rmSync(musicFile);
        renameSync(outputFile, musicFile);
    }
};

type FileInfo = {
    fileName: string;
    extension: string;
};

const getFileNameAndExtension = (filePath: string): FileInfo => {
    const fileNameWithExtension = filePath.split("/").pop();
    const fileName = fileNameWithExtension.split(".").slice(0, -1).join(".");
    const extension = fileNameWithExtension.split(".").pop();

    return { fileName, extension };
};
