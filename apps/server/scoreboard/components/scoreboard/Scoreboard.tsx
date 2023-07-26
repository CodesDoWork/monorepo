import { useScoreboard } from "./useScoreboard";

export function Scoreboard() {
    const { dbData } = useScoreboard();

    return (
        <div>
            <h1>{JSON.stringify(dbData)}</h1>
        </div>
    );
}
