'use strict';

module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get('/', server.loopback.status());
  server.use(router);
};
module.exports = function(app) {
  
  var mysqlDS = app.dataSources.MysqlDS;
  var profile = app.models.profile;
  var devis = app.models.devis;
  

  // first autoupdate the `Author` model to avoid foreign key constraint failure
  mysqlDS.autoupdate('profile', function(err) {
    if (err) throw err;
    console.log('\nAutoupdated table `profile`.');

    mysqlDS.autoupdate('devis', function(err) {
      if (err) throw err;
      console.log('\nAutoupdated table `devis`.');
      // at this point the database table `Book` should have one foreign key `authorId` integrated
    });
  });
  // profile.nestRemoting('devis');
  

};