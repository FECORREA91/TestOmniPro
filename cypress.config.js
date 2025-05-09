const { defineConfig } = require("cypress");
const path = require("path");
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');

module.exports = defineConfig({
  projectId: "qotcp1",
  chromeWebSecurity: false,
  e2e: {
    baseUrl: "https://www.dafiti.com.co/",
    supportFile: "cypress/support/e2e.js",
    specPattern: "cypress/e2e/**/*.cy.js",
    defaultCommandTimeout: 20000,
    retries: {
      runMode: 2,
      openMode: 1,
    },
    video: true,
    screenshotOnRunFailure: true,
    
    // Configuración del reporter
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',
      charts: true,
      reportPageTitle: 'Dafiti Test Report - ${device}',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
    },

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
      require('cypress-mochawesome-reporter/plugin')(on);
      
      on('before:run', async (details) => {
        await beforeRunHook(details);
      });

      on('after:run', async () => {
        await afterRunHook();
      });

      // Configuración mejorada de dispositivos
      const device = config.env.device || "web";
      const isMobile = device !== "web";
      
      const deviceProfiles = {
        mobile: {
          name: 'Mobile',
          viewportWidth: 430,
          viewportHeight: 932,
          userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
          isMobile: true,
          defaultCommandTimeout: 30000,
          deviceType: 'mobile'
        },
        tablet: {
          name: 'Tablet',
          viewportWidth: 768,
          viewportHeight: 1024,
          userAgent: "Mozilla/5.0 (iPad; CPU OS 13_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Mobile/15E148 Safari/604.1",
          isMobile: true,
          deviceType: 'tablet'
        },
        web: {
          name: 'Web',
          viewportWidth: 1440,
          viewportHeight: 900,
          userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
          isMobile: false,
          deviceType: 'web'
        }
      };

      // Aplica configuración del dispositivo
      const deviceConfig = deviceProfiles[device] || deviceProfiles.web;
      Object.assign(config, deviceConfig);
      
      // Configurar el título del reporte con el dispositivo
      config.reporterOptions.reportPageTitle = `Dafiti Test Report - ${deviceConfig.name}`;

      // Tasks personalizados (versión mejorada)
      on("task", {
        mobileScroll({ x, y }) {
          if (config.isMobile) {
            window.scrollTo(x, y);
          }
          return null;
        },
        
        getDeviceType: () => {
          return deviceConfig.deviceType;
        },
        
        readFileIfExists(params) {
          const fs = require('fs');
          try {
            // Modo borrado (nueva funcionalidad)
            if (typeof params === 'object' && params.action === 'delete') {
              if (fs.existsSync(params.path)) {
                fs.unlinkSync(params.path);
                return 'deleted';
              }
              return 'not_found';
            }
            
            // Comportamiento original (leer archivo)
            const filePath = typeof params === 'string' ? params : params.path;
            if (fs.existsSync(filePath)) {
              return fs.readFileSync(filePath, 'utf8');
            }
            return null;
          } catch (error) {
            console.error('Error en readFileIfExists:', error);
            return null;
          }
        }
      });

      on("before:browser:launch", (browser = {}, launchOptions) => {
        if (browser.name === "chrome") {
          launchOptions.args.push(
            `--user-agent=${config.userAgent}`,
            "--disable-gpu",
            "--disable-dev-shm-usage",
            "--disable-web-security",
            "--disable-site-isolation-trials"
          );
          
          // Emulación móvil mejorada
          if (config.isMobile) {
            launchOptions.args.push(
              `--window-size=${config.viewportWidth},${config.viewportHeight}`,
              '--force-device-scale-factor=1'
            );
            
            launchOptions.args.push('--enable-touch-events');
            launchOptions.args.push('--enable-viewport');
            launchOptions.args.push('--enable-use-zoom-for-dsf=false');
          }
        }

        return launchOptions;
      });

      return config;
    },
  },
});