const api = require('./api');
const di = require('./di');
const migrations = require('./migrations');

(async () => {
    const deps = await di(process.env);
    await migrations(deps);
    await api(deps);
})();

// (async () => {
//     const sequelize = new Sequelize('postgres://dmetreereeves@localhost:5432/test1') // Example for postgres
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//         const [results, metadata] = await sequelize.query('SELECT NOW()');
//         console.log(results, metadata);
//         sequelize.close();
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//         sequelize.close()
//     }
// })();