const report = require('multiple-cucumber-html-reporter');

report.generate({
  jsonDir: 'test-results',
  reportPath: './',
  reportName: 'Playwright Automation Report',
  pageTitle: 'Spot the BUGS - Automation Report',
  displayDuration: false,
  metadata: {
    browser: {
      name: 'chrome',
      version: '120',
    },
    device: 'Test - PC',
    platform: {
      name: 'Windows',
      version: '11',
    },
  },
  customData: {
    title: 'Datacom Test Execution',
    data: [
      { label: 'Project', value: 'Demo Testing' },
      { label: 'Release', value: '1.0.0' },
      { label: 'Execution Start Time', value: new Date().toLocaleString() },
    ],
  },
});