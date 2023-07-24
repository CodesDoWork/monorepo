import { Login } from "../components/login/Login";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Index() {
    getServerSession(authOptions).then(session => console.log(session?.user));

    return (
        <main>
            <Login />
        </main>
    );
}
