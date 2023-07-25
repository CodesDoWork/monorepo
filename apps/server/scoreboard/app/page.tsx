import { Login } from "../components/login/Login";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { LogoutButton } from "shared/web/components";

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
                <Login className="m-auto" />
            </main>
        </div>
    );
}
