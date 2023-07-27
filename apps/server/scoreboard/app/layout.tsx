import "./global.css";

export const metadata = {
    title: "Scoreboard",
    description: "Work Scoreboard",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <title>{metadata.title}</title>
                <link rel={"icon"} href="/favicon.ico" />
            </head>
            <body>{children}</body>
        </html>
    );
}
