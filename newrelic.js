/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
exports.config = {
	/**
	 * Array of application names.
	 */
	app_name : ['techpartysuggestion'],
	/**
	 * Your New Relic license key.
	 */
	license_key : process.env.NEW_RELIC_KEY || 'license_key',
	logging : {
		/**
		 * Level at which to log. 'trace' is most useful to New Relic when diagnosing
		 * issues with the agent, 'info' and higher will impose the least overhead on
		 * production applications.
		 */
		level : 'warn'
	},
	browser_monitoring : {
		enable : false
	}
};
