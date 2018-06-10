module.exports = {
  content: "docs",
  add: (app, middleware, options) => {
    middleware.webpack();
    middleware.content();
  }
};
