import { bindings, defineConfig, exports, triggers } from "cf/config";

export default defineConfig({
	worker: {
		name: "cloudpaste-backend",
		compatibilityDate: "2025-09-01",
		compatibilityFlags: [
			"nodejs_compat",
		],
		entrypoint: "unified-entry.js",
		triggers: [
			triggers.scheduled({
				schedule: "*/5 * * * *",
			}),
		],
		env: {
			ENCRYPTION_SECRET: bindings.text("default-encryption-key"),
			ADMIN_TOKEN_EXPIRY_DAYS: bindings.text("7"),
			DB: bindings.d1({
				name: "cloudpaste-db",
				id: "xxxxxxxxxxxxxxxxx",
			}),
			JOB_WORKFLOW: bindings.workflow({
				name: "job-workflow",
				worker: "cloudpaste-backend",
				exportName: "JobWorkflow",
			}),
		},
		exports: {
			JobWorkflow: exports.workflow({
				name: "job-workflow",
			}),
		},
	},
});
