export const config = {
    // ==================
    // Runner Configuration
    // ==================
    runner: 'local',

    // ==================
    // Specify Test Files
    // ==================
    // Cucumber feature files are the entry point for test discovery.
    specs: [
        './test/features/**/*.feature'
    ],

    exclude: [],

    // ============
    // Capabilities
    // ============
    maxInstances: 1,

    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--no-sandbox',
                '--disable-infobars',
                '--disable-gpu',
                '--window-size=1920,1080'
            ]
        }
    }],

    // ===================
    // Test Configurations
    // ===================
    logLevel: 'warn',

    bail: 0,

    baseUrl: 'https://www.demoblaze.com',

    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    // ==========
    // Framework
    // ==========
    // Using @wdio/cucumber-framework for BDD with Gherkin feature files.
    framework: 'cucumber',

    // ==================
    // Reporters
    // ==================
    reporters: [
        'spec',
        ['html-nice', {
            outputDir: './reports/',
            filename: 'wdio-report.html',
            reportTitle: 'DemoBlaze Test Report',
            linkScreenshots: true,
            showInBrowser: false,
            collapseTests: false,
            useOnAfterCommandForScreenshot: false
        }]
    ],

    // ==================
    // Cucumber Options
    // ==================
    cucumberOpts: {
        // Location of step definitions
        require: ['./test/step-definitions/**/*.js'],

        // Enable TypeScript support (set to false for plain JS)
        backtrace: false,

        // Require modules prior to requiring any support files
        requireModule: [],

        // Fail immediately (bail) on first failure
        dryRun: false,
        failFast: false,

        // Show snippets for pending steps
        snippets: true,

        // Hide step text on failures (show only step summary)
        source: true,

        // Fail if there are any pending or undefined steps
        strict: false,

        // Set the tag expression to run only specific tagged scenarios
        // Example: '@smoke' or '@smoke and not @wip'
        tags: '',

        // Increase the default Cucumber step timeout
        timeout: 60000,

        // Enable verbose error output
        ignoreUndefinedDefinitions: false
    },

    // =====
    // Hooks
    // =====

    /**
     * Gets executed before all workers get launched.
     */
    // onPrepare: function (config, capabilities) {},

    /**
     * Gets executed before a test begins.
     * Good place to take a screenshot on failure.
     */
    afterScenario: async function (world, result) {
        if (result.passed === false) {
            await browser.takeScreenshot();
        }
    }
};
