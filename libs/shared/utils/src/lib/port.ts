import { createServer } from "net";

export const getNextFreePort = (): Promise<number> =>
    new Promise<number>((resolve, reject) => {
        const srv = createServer(sock => sock.end());
        srv.listen(0, () => {
            const address = srv.address();
            if (!address || typeof address === "string") {
                reject("Address must be of type AddressInfo");
            } else {
                resolve(address.port);
            }
        });
    });
