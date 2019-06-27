const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy("/api", { target: "http://localhost:7000/", changeOrigin: true })
  );
};
/* 
    http://localhost:5000/api/users/register
    --> proxy
    http://localhost:7000/api/users/register

    react server: http://localhost:3000
    proxy : http://localhost:3000
*/
