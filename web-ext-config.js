module.exports = {
  // Global options
  verbose: false,
  
  // Command options
  build: {
    overwriteDest: true,
    filename: 'cyberinject-firefox-{version}.zip'
  },
  
  run: {
    firefox: 'firefox-developer-edition',
    startUrl: ['about:debugging#/runtime/this-firefox'],
    pref: {
      'xpinstall.signatures.required': false,
      'devtools.chrome.enabled': true,
      'devtools.debugger.remote-enabled': true
    }
  },
  
  //sign: {
    // Add your API credentials when ready for AMO
    // apiKey: 'your-jwt-issuer',
    // apiSecret: 'your-jwt-secret'
  //},
  
  lint: {
    pretty: true,
    warningsAsErrors: false
  }
};