const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'event_management_system',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function query(sql, params) {
  const [rows, fields] = await pool.execute(sql, params);
  return rows;
}

async function getUser(email) {
  return query('SELECT * FROM users WHERE email = ?', [email]);
}

async function addUser(email, password) {
  return query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password]);
}

async function addEvent(event) {
  const { name, description, price, eventName, eventDate, eventTime, attendees, eventDescription, location } = event;
  return query(
    'INSERT INTO events (name, description, price, eventName, eventDate, eventTime, attendees, eventDescription, location) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [name, description, price, eventName, eventDate, eventTime, attendees, eventDescription, location]
  );
}

async function getAllEvents() {
  return query('SELECT * FROM events');
}

module.exports = {
  getUser,
  addUser,
  addEvent,
  getAllEvents
};

