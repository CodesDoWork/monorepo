import { AddressInfo, createServer, Server } from "net";

export const getNextFreePort = (): Promise<number> =>
    new Promise<number>((resolve, reject) => {
        const srv = createServer(sock => sock.end());
        srv.listen(0, () => {
            const address = srv.address();
            isAddressInfo(address)
                ? resolve(address.port)
                : reject("Address must be of type AddressInfo");
        });
    });

function isAddressInfo(address: ReturnType<Server["address"]>): address is AddressInfo {
    return !!address && typeof address !== "string";
}
