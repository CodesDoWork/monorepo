export enum Severity {
    Unknown = "UNKNOWN",
    Low = "LOW",
    Medium = "MEDIUM",
    High = "HIGH",
    Critical = "CRITICAL",
}

export const severityConfig = {
    0: [Severity.Unknown, Severity.Low, Severity.Medium],
    1: [Severity.High, Severity.Critical],
};
