import "./global.css";

export const metadata = {
    title: "Scoreboard",
    description: "Work Scoreboard",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
