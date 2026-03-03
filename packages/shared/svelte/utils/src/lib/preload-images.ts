export function preloadImage(url: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve();
        img.onerror = reject;
    });
}

export function preloadImages(urls: string[]): Promise<void[]> {
    return Promise.all(urls.map(preloadImage));
}
