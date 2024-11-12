const { defineConfig } = require("cypress");
const dotenv = require('dotenv');

dotenv.config();

module.exports = defineConfig({
  projectId: 'loft-cypress',
  e2e: {
    video: true,
    videoCompression: 32,
    videoCompression: true,
    videosFolder: 'cypress/videos',
    testIsolation: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
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
    dev: process.env.DEV_LINK,
    live: process.env.LIVE_LINK
  },
  defaultCommandTimeout: 10000,
});
