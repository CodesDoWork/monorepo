export function toLinkFriendly(s: string) {
    return s.toLowerCase().replace(" ", "_").replace(/\W/g, "-");
}
