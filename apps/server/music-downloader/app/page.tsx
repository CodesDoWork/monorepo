import { DownloadForm } from "../components/DownloadForm";

export default function Index() {
    return (
        <main className="m-8 flex flex-col items-center">
            <h1 className="text-center mb-8 font-bold text-2xl">Music Downloader</h1>
            <DownloadForm />
        </main>
    );
}
