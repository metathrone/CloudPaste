import { defineWranglerConfig } from "wrangler/experimental-config";

export default defineWranglerConfig({
	dev: {
		localProtocol: "http",
		port: 8787,
	},
});
