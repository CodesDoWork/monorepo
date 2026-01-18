export interface Track {
    paths: string[];
    meta: {
        title?: string;
        artist?: string;
        genre?: string[];
        year?: number;
        album?: string;
        bitrate?: number;
        duration?: number;
    };
}

export function displayTrack(track: Track): string {
    return `${track.meta.artist} - ${track.meta.title}${getYearText(track)}`;
}

function getYearText(track: Track) {
    return track.meta.year ? ` - ${track.meta.year}` : "";
}
