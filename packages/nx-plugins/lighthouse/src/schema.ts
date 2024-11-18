import { z } from "zod";

export const zLighthouseExecutorSchema = z.object({ urls: z.array(z.string()) });
export type LighthouseExecutorSchema = z.infer<typeof zLighthouseExecutorSchema>;
