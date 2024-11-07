const { defineConfig } = require("cypress");
const dotenv = require('dotenv');

dotenv.config();

module.exports = defineConfig({
  e2e: {
    testIsolation: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: false,
    screenshotOnRunFailure: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    basicAuth: {
      username: process.env.BASIC_AUTH_USERNAME,
      password: process.env.BASIC_AUTH_PASSWORD,
    },
    wpAdmin: {
      username: process.env.WP_ADMIN_USERNAME,
      password: process.env.WP_ADMIN_PASSWORD,
    }, 
    staging: process.env.STAGING_LINK,
    dev: process.env.DEV_LINK
  },
  defaultCommandTimeout: 10000
});
