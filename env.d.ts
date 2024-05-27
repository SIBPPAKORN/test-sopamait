import type { AppEnvs } from "./env";

declare global {
	namespace NodeJS {
		interface ProcessEnv extends AppEnvs {}
	}
}
