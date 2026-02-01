export async function decodeAndDecompress<T>(base64String: string): Promise<T> {
    const binaryString = atob(base64String);
    const bytes = Uint8Array.from(binaryString, m => m.charCodeAt(0));

    const stream = new DecompressionStream("gzip");
    const writer = stream.writable.getWriter();

    writer.write(bytes);
    writer.close();

    const response = new Response(stream.readable);
    const decompressedString = await response.text();

    return JSON.parse(decompressedString) as T;
}
