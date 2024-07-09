const api = require('./api');
const di = require('./di');
const migrations = require('./migrations');

(async () => {
    const deps = await di(process.env);
    await migrations(deps);
    await api(deps);
})();