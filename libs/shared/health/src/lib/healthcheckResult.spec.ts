import { commitFile, createHealthcheckResult, formatBytes } from "./healthcheckResult";
import { HealthStatus } from "./HealthStatus";
import { writeFileSync, rmSync } from "fs";

describe("createHealthcheckResult", () => {
    it("should create with status", () => {
        Object.values<HealthStatus>(HealthStatus).forEach(status => {
            const result = createHealthcheckResult(status);
            expect(result.status).toStrictEqual(status);
        });
    });

    it("should respect commit file in version", () => {
        const testSha = "test-sha";
        writeFileSync(commitFile, testSha);

        const shaResult = createHealthcheckResult(HealthStatus.Up);
        expect(shaResult.version).toMatch(new RegExp(`\\w+ \\(${testSha}\\)`));

        rmSync(commitFile);

        const devResult = createHealthcheckResult(HealthStatus.Up);
        expect(devResult.version).toMatch(new RegExp("\\w+ \\(development\\)"));
    });

    it("should use package version", () => {
        const version = "1.0.0";
        process.env.npm_package_version = version;
        const result = createHealthcheckResult(HealthStatus.Up);
        expect(result.version).toMatch(new RegExp(`${version}.+`));
    });
});

describe("formatBytes", () => {
    it("should return '0 Bytes' for 0", () => {
        expect(formatBytes(0)).toBe("0 Bytes");
    });

    it("should use correct units", () => {
        expect(formatBytes(1)).toBe("1 Bytes");
        expect(formatBytes(Math.pow(1024, 1))).toBe("1 KB");
        expect(formatBytes(Math.pow(1024, 2))).toBe("1 MB");
        expect(formatBytes(Math.pow(1024, 3))).toBe("1 GB");
        expect(formatBytes(Math.pow(1024, 4))).toBe("1 TB");
        expect(formatBytes(Math.pow(1024, 5))).toBe("1 PB");
        expect(formatBytes(Math.pow(1024, 6))).toBe("1 EB");
        expect(formatBytes(Math.pow(1024, 7))).toBe("1 ZB");
        expect(formatBytes(Math.pow(1024, 8))).toBe("1 YB");
    });

    it("should use decimals", () => {
        expect(formatBytes(1024 * 1.23456789)).toBe("1.23 KB");
        expect(formatBytes(1024 * 1.23456789, -1)).toBe("1 KB");
        expect(formatBytes(1024 * 1.23456789, 0)).toBe("1 KB");
        expect(formatBytes(1024 * 1.23456789, 1)).toBe("1.2 KB");
        expect(formatBytes(1024 * 1.23456789, 2)).toBe("1.23 KB");
        expect(formatBytes(1024 * 1.23456789, 3)).toBe("1.235 KB");
        expect(formatBytes(1024 * 1.23456789, 4)).toBe("1.2346 KB");
    });
});
