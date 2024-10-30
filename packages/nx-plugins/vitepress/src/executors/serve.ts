import { buildServeVitepressExecutor } from "./build-serve/executor";

export const buildVitepressExecutor = buildServeVitepressExecutor("dev");

export default buildVitepressExecutor;
