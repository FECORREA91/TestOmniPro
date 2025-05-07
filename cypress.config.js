const { defineConfig } = require("cypress");
const path = require("path");

module.exports = defineConfig({
  projectId: "qotcp1",
  e2e: {
    baseUrl: "https://www.dafiti.com.co/",
    supportFile: "cypress/support/e2e.js",
    specPattern: "cypress/e2e/**/*.cy.js",
    chromeWebSecurity: false,
    defaultCommandTimeout: 10000,
    
    // Configuración de Webpack para alias
    webpack: {
      resolve: {
        alias: {
          "@pages": path.resolve(__dirname, "./cypress/support/pages"),
          "@support": path.resolve(__dirname, "./cypress/support")
        }
      }
    },

    setupNodeEvents(on, config) {
      const device = config.env.device || "web"; // Nota: Hay un typo en "device" (debería ser "device")
      const deviceProfiles = {
        mobile: {
          viewportWidth: 430,
          viewportHeight: 932,
          userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
        },
        web: {
          viewportWidth: 1440,
          viewportHeight: 900,
          userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36"
        }
      };

      // Aplicar configuración del dispositivo
      Object.assign(config, deviceProfiles[device]);

      // Configurar User-Agent
      on("before:browser:launch", (browser = {}, launchOptions) => {
        if (browser.name === "chrome") {
          launchOptions.args.push(`--user-agent=${config.userAgent}`);
        }

        if (browser.name === "electron") {
          launchOptions.preferences.default.webPreferences.userAgent = config.userAgent;
        }

        return launchOptions;
      });

      return config;
    }
  }
});