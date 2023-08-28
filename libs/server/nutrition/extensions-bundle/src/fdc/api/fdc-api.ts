import axios from "axios";
import { FDCItem } from "../../types/fdc-api";

export class FDCApi {
    private static readonly API_PATH = "/fdc/v1";

    constructor(private readonly baseUrl: string, private readonly apiKey: string) {}

    async getItem(fdcId: string): Promise<FDCItem> {
        return this.get(`/food/${fdcId}`);
    }

    private async get<T>(path: string): Promise<T> {
        return axios
            .get(`${this.baseUrl}${FDCApi.API_PATH}${path}`, { params: { api_key: this.apiKey } })
            .then(res => res.data);
    }
}
