const {Client} = require('pg')

const client = new Client({
  user: 'postgres',
  host: '192.168.1.139',
  database: 'postgres',
  password: 'password',
  port: '5432'
})

client.connect()

const createTable = `
  DROP TABLE exercise;

  CREATE TABLE IF NOT EXISTS exercise_metric (
    id INTEGER PRIMARY KEY
  );

  CREATE TABLE IF NOT EXISTS exercise (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
  );

  CREATE TABLE IF NOT EXISTS metric (
    type VARCHAR(255) NOT NULL CHECK (type IN ('weight', 'sets', 'reps', 'time', 'distance', 'velocity', 'custom')),
    custom_name VARCHAR(255)
  );

  CREATE TABLE IF NOT EXISTS container (
    id INTEGER PRIMARY KEY,
    list_order INTEGER
  );

  INSERT INTO metric (type) VALUES ('weight');
  INSERT INTO exercise (name) VALUES ('backsquat');
`


async function makeTable() {
  try {
    await client.query(createTable)
    res = await client.query('select * from exercise')
    console.log(res.rows[0].name)
  } catch (err) {
    console.log(err)
  } finally {
    client.end()
  }
}

makeTable()
