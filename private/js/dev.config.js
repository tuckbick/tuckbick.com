require.config({
  baseUrl: "./js",
  deps: ['app'],
  paths: {
    "jquery": "lib/jquery",
    "angular": "lib/angular",
    "fastclick": "lib/fastclick",
    "ui.router": "lib/angular-ui-router",
    "MainCtrl": "controller/main",
    "HomeCtrl": "controller/home",
    "ProjectsCtrl": "controller/projects",
    "ResumeCtrl": "controller/resume",
    "ConnectCtrl": "controller/connect"
  },
  shim: {
    "angular": {
      exports: "angular",
      deps: ["jquery"]
    },
    "ui.router": ["angular"]
  }
})
