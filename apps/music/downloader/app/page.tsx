import { DownloadForm } from "../components/DownloadForm";

export default function page() {
    return (
        <main className="m-8 flex flex-col items-center">
            <h1 className="mb-8 text-center text-2xl font-bold">Music Downloader</h1>
            <DownloadForm />
        </main>
    );
}
