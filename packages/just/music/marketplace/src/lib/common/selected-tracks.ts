export function getSelectedTracks(formData: FormData): number[] {
    return formData
        .entries()
        .filter(([_, value]) => value === "true")
        .map(([key]) => Number(key))
        .toArray();
}
