import { composePlugins, withNx } from "@nx/next";

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 */
const nextConfig = {
    nx: {
        // Set this to true if you would like to to use SVGR
        // See: https://github.com/gregberge/svgr
        svgr: false,
    },
    distDir: "../../../../dist/packages/just/music/downloader",
    output: "standalone",
};

const plugins = [
    // Add more Next.js plugins to this list if needed.
    withNx,
];

export default composePlugins(...plugins)(nextConfig);
