export function isMusicFile(path: string): boolean {
    return /\.(?:mp3|wav|ogg|flac)$/.test(path);
}
