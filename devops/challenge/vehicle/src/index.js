const config = require('config');
const pg = require('pg');
const express = require('express');

const api = express();

api.use(express.json());

const dbConfig = config.get('services.database');

const pool = new pg.Pool(dbConfig);

pool.query('SELECT NOW()').then(() => {
  console.log('Connected to db\n', dbConfig);
});

async function getVehicles(userId) {
  const queryString = `SELECT * FROM vehicle WHERE user_id = ${userId}`;
  const result = await pool.query(queryString);

  return {
    vehicles: result.rows,
  };
}

async function postVehicle(userId, vehicle) {
  const queryString = `INSERT INTO public."vehicle" (user_id, model) VALUES (${userId}, '${vehicle.model}')`;
  await pool.query(queryString)
    .catch((error) => {
      console.log('Error on Query\n\n', error);
    });

  console.log(`inserted vehicle '${vehicle.model}' of user: ${userId}`);
}

api.get('/user/:userId/vehicle', (req, res) => {
  getVehicles(req.params.userId).then(user => res.send(user));
});

api.post('/user/:userId/vehicle', (req, res) => {
  postVehicle(req.params.userId, req.body).then(() => res.send('ok')).catch((error) => {
    res.status(400);
    res.send('error');
    console.log(error);
  });
});

api.listen(config.api.port);
