const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function(app) {
  app.use(
    "/olo_api",
    createProxyMiddleware({
      target: `${process.env.REACT_APP_PROXY_URL}/olo_api`,
      changeOrigin: true
    })
  );
  app.use(
    "/punchh_api",
    createProxyMiddleware({
      target: `${process.env.REACT_APP_PROXY_URL}/punchh_api`,
      changeOrigin: true
    })
  );
};
