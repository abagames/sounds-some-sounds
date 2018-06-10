module.exports = {
  content: "docs",
  dev: {
    publicPath: "/samples"
  },
  add: (app, middleware, options) => {
    middleware.webpack();
    middleware.content();
  }
};
