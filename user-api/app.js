const { database, middlewares, routes, app } = require('./conf/server');

database();
middlewares();
routes();

// app.listen(8001,() => {
//     console.log(`user API listenning to ${ 8081 } port `)
// })

module.exports.initialApp = app;


