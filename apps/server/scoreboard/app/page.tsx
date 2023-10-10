import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import { Content } from "../components/content/Content";
import { env } from "./env";

export default async function Index() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect(`${env.BASE_PATH}/api/auth/signin`);
        return <main />;
    }

    return (
        <div className="flex">
            <Content session={session} />
        </div>
    );
}
