<div class="flex min-h-screen flex-col items-center justify-center text-center">
    <h1
        class="
            text-primary-950 mb-8 text-4xl font-bold
            dark:text-primary-500
        ">
        Music Downloader
    </h1>
    <form
        method="post"
        action="?/download"
        class="
            flex w-full max-w-2xl gap-4 rounded-lg bg-white/30 p-6 shadow-lg
            dark:bg-black/30
        ">
        <input
            name="url"
            type="text"
            placeholder="Enter URL"
            class="
                focus:ring-primary-500 focus:ring-2 focus:outline-none
                h-10 w-full rounded-md border border-gray-300 bg-white px-2
                dark:border-gray-700 dark:bg-slate-800 dark:text-gray-200 dark:placeholder-gray-300
            " />
        <button
            formaction="?/download"
            class="
                bg-primary-500 relative flex h-10 items-center justify-center rounded-md px-8
                text-lg font-bold text-white
                dark:text-primary-950
                hover:bg-primary-400
                active:bg-primary-500
            ">
            Download
        </button>
    </form>
</div>
