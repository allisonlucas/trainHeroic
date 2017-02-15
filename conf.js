exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['spec.js'],
  multiCapabilities: [
  // Enable to run on multiple browsers at the same time.
	  // {
	  //   browserName: 'firefox'
	  // },
	  {
	    browserName: 'chrome'
	  }
  ]
};