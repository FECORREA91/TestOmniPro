const { defineConfig } = require("cypress");
const path = require("path");

module.exports = defineConfig({
  projectId: "qotcp1",
  e2e: {
    baseUrl: "https://www.dafiti.com.co/",
    supportFile: "cypress/support/e2e.js",
    specPattern: "cypress/e2e/**/*.cy.js",
    chromeWebSecurity: false,
    defaultCommandTimeout: 20000,
    retries: {
      runMode: 2,
      openMode: 1,
    },
    video: true,
    screenshotOnRunFailure: true,

    webpack: {
      resolve: {
        alias: {
          "@pages": path.resolve(__dirname, "./cypress/support/pages"),
          "@support": path.resolve(__dirname, "./cypress/support"),
          "@utils": path.resolve(__dirname, "./cypress/support/utils"),
        },
      },
    },

    setupNodeEvents(on, config) {
      const device = config.env.device || "web";
      const deviceProfiles = {
        mobile: {
          viewportWidth: 430,
          viewportHeight: 932,
          userAgent:
            "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
        },
        web: {
          viewportWidth: 1440,
          viewportHeight: 900,
          userAgent:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
        },
      };

      Object.assign(config, deviceProfiles[device]);

      // Tasks personalizados
      on("task", {
        // Nuevo task para eliminar archivos
        deleteFile(path) {
          const fs = require("fs");
          if (fs.existsSync(path)) {
            fs.unlinkSync(path);
          }
          return null;
        },
        // Tasks existentes
        forceHover({ selector }) {
          const el = document.querySelector(selector);
          if (el) {
            const rect = el.getBoundingClientRect();
            const event = new MouseEvent("mouseover", {
              view: window,
              bubbles: true,
              cancelable: true,
              clientX: rect.left + rect.width / 2,
              clientY: rect.top + rect.height / 2,
            });
            el.dispatchEvent(event);
          }
          return null;
        },
        forceVisible({ selector }) {
          const el = document.querySelector(selector);
          if (el) {
            el.style.display = "block";
            el.style.visibility = "visible";
            el.style.opacity = "1";
          }
          return null;
        },
      });

      // Configuración del navegador
      on("before:browser:launch", (browser = {}, launchOptions) => {
        if (browser.name === "chrome") {
          launchOptions.args.push(
            `--user-agent=${config.userAgent}`,
            "--disable-gpu",
            "--disable-dev-shm-usage",
            "--disable-web-security",
            "--disable-site-isolation-trials"
          );
        }

        if (browser.name === "electron") {
          launchOptions.preferences = {
            ...launchOptions.preferences,
            defaultWebPreferences: {
              ...launchOptions.preferences?.defaultWebPreferences,
              userAgent: config.userAgent,
              webSecurity: false,
              nodeIntegration: false,
            },
          };
        }

        return launchOptions;
      });

      return config;
    },
  },
});