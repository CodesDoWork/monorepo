import type { Track } from "../../../lib/common/track";

export interface IndexedTrack extends Track {
    idx: number;
    has: boolean;
}
