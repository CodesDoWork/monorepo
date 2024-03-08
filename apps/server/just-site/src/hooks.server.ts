import { sequence } from "@sveltejs/kit/hooks";
import * as Sentry from "@sentry/sveltekit";
import { handleErrorWithSentry, sentryHandle } from "@sentry/sveltekit";

Sentry.init({
    dsn: "https://63571ec8897a6099e4895c03a07a5168@o4506876429795328.ingest.us.sentry.io/4506876431695872",
    tracesSampleRate: 1.0,
});

// If you have custom handlers, make sure to place them after `sentryHandle()` in the `sequence` function.
export const handle = sequence(sentryHandle());

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = handleErrorWithSentry();
