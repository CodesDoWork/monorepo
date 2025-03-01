import "./global.css";

export const metadata = {
    title: "Music Downloader",
    description: "Music Downloader",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <title>{metadata.title}</title>
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body>{children}</body>
        </html>
    );
}
