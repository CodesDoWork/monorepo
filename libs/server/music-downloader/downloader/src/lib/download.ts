import { executeCmd } from "shared/utils";

export const download = (url: string): Promise<void> => {
    const downloadDir = process.env.DOWNLOAD_DIR || "downloads";
    const downloadCommandParts = [
        "yt-dlp",
        "--extract-audio",
        ["--audio-format", "mp3"],
        ["--audio-quality", "0"],
        "--embed-metadata",
        "--embed-thumbnail",
        ["--output", `${downloadDir}/%(artist)s - %(title)s.%(ext)s`],
        "--no-overwrites",
        ["--metadata-from-title", "%(artist)s - %(title)s"],
        ["--replace-in-metadata", "album", ".*", ""],
        ["--replace-in-metadata", "title", `\\[(?:${stopWords.join("|")})\\]`, ""],
        ["--replace-in-metadata", "title", `\\((?:${stopWords.join("|")})\\)`, ""],
        ["--replace-in-metadata", "title", " $", ""],
        url,
    ].flat();

    return executeCmd(downloadCommandParts);
};

const stopWords = [
    "Lyrics",
    "Lyric Video",
    "Official Video",
    "Official Music Video",
    "Official Lyric Video",
    "Audio",
    "Live",
    "HD",
    "4K",
];