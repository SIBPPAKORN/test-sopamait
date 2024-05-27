import { z } from "zod";

// add app env here and use by `process.env.?` in src/* scope
const appEnvSchema = z.object({
	// NEXT_PUBLIC_KHA_AUTH_API_URL: z.string().url(),
});

export type AppEnvs = z.infer<typeof appEnvSchema>;

(async () => {
	const result = await appEnvSchema.safeParseAsync(process.env);

	if (!result.success) {
		console.error("[Error] :: ", result.error.message);
		process.exit(1);
	}
})();
