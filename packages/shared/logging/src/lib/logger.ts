import pino from "pino";

export const logger = pino(
    process.env.NODE_ENV === "production"
        ? {
              timestamp: pino.stdTimeFunctions.isoTime,
          }
        : {
              transport: {
                  target: "pino-pretty",
                  options: {
                      translateTime: "SYS:yyyy-mm-dd HH:MM:ss",
                  },
              },
          },
);

export function createLogger(name: string) {
    return logger.child({ name });
}
