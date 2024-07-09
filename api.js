const express = require('express');

module.exports = async ({ sequelize }) => {
  const app = express();
  const port = process.env.API_PORT;
  
  app.get('/', (req, res) => {
    res.send('Balance api. Allowed http methods: GET /balance?user_id=1, PUT /balance?user_id=1&amount=-2')
  });

  app.get('/balance', async (req, res) => {
    try {
      const { user_id } = req.query;
      const [results, metadata] = await sequelize.query('SELECT * FROM users WHERE user_id = ?', {
        replacements: [user_id],
      });
      res.send(results[0]);
    } catch (e) {
      console.error(e);
      res.status(500);
      res.send(e.message);
    }
  });

  app.put('/balance', async (req, res) => {
    try {
      const { user_id, amount } = req.query;
      const [results, metadata] = await sequelize.query('UPDATE users SET balance = balance + ? WHERE user_id = ? RETURNING *', {
        replacements: [amount, user_id],
      });
      res.send(results[0]);
    } catch (e) {
      console.error(e);
      res.status(500);
      res.send(e.message);
    }
  });
  
  app.listen(port, () => {
    console.log(`Balance-api app listening on port ${port}`)
  });
};