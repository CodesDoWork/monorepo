import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { LogoutButton } from "shared/web/components";
import { Content } from "../components/content/Content";

export default async function Index() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/api/auth/signin");
        return <main />;
    }

    return (
        <div className="flex">
            <header className="z-10 w-full p-3">
                <nav className="flex justify-end">
                    <LogoutButton />
                </nav>
            </header>
            <main className="absolute h-screen w-screen flex items-center justify-center">
                <Content className="m-auto" />
            </main>
        </div>
    );
}
