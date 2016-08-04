middleware: [
  {
    route: "/api",
    handle: function (req, res, next) {
      console.log(req);
      // handle any requests at /api
    }
  }
]