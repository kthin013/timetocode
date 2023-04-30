const express = require('express');
const mysql = require('mysql');

const app = express();
const cors = require('cors');

app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  // user: 'testing1',
  // password: 'password',
  user: 'root',
  password: '',
  database: 'timetocode'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  connection.query(
    'SELECT user_id, first_name, last_name FROM user WHERE username = ? AND BINARY password = ?',
    [username, password],
    (error, results, fields) => {
      console.log(results, "result>>>!!!")
      if (error) {
        res.status(500).send({ error: 'Internal Server Error' });
      } else if (results.length > 0) {
        const user = {
          name: `${results[0].first_name} ${results[0].last_name}`,
          user_id: results[0].user_id
        };
        res.send({ message: 'Login success', success: 1, user });
      } else {
        res.send({ error: 'Incorrect username or password' });
      }
    }
  );
});


app.post('/register', (req, res) => {
  const { firstname, lastname, username, password } = req.body;
  const ctime = Math.floor(Date.now() / 1000); // current Unix time in seconds
  const utime = ctime; // same as ctime since this is a new registration

  connection.query(
    'SELECT MAX(user_id) as max_user_id FROM user',
    (error, results, fields) => {
      if (error) {
        res.status(500).send({ error: 'Internal Server Error' });
      } else {
        let user_id = results[0].max_user_id ? results[0].max_user_id + 1 : 1;
        connection.query(
          'SELECT * FROM user WHERE username = ?',
          [username],
          (error, results, fields) => {
            if (error) {
              res.status(500).send({ error: 'Internal Server Error' });
            } else if (results.length > 0) {
              res.send({ error: 'Username already exists' });
              console.log('Username already exists')
            } else {
              connection.query(
                'INSERT INTO user (first_name, last_name, username, password, ctime, utime, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [firstname, lastname, username, password, ctime, utime, user_id],
                (error, results, fields) => {
                  if (error) {
                    res.status(500).send({ error: 'Internal Server Error' });
                  } else {
                    res.send({ message: 'Registration success', redirectTo: '/login', success: 1 });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

app.post('/tutorial_progress', (req, res) => {
  const { user_id, chapter_number, section_number } = req.body;

  // Check if the record already exists
  connection.query(
    'SELECT * FROM tutorial_progress WHERE user_id = ? AND chapter_number = ? AND section_number = ?',
    [user_id, chapter_number, section_number],
    (error, results, fields) => {
      if (error) {
        res.status(500).send({ error: 'Internal Server Error' });
      } else if (results.length > 0) {
        res.send({ message: 'Record already exists', success: 1 });
      } else {
        // Insert the new record
        connection.query(
          'INSERT INTO tutorial_progress (user_id, chapter_number, section_number) VALUES (?, ?, ?)',
          [user_id, chapter_number, section_number],
          (error, results, fields) => {
            if (error) {
              res.status(500).send({ error: 'Internal Server Error' });
            } else {
              res.send({ message: 'Record inserted successfully', success: 1 });
            }
          }
        );
      }
    }
  );
});

app.get('/tutorial_progress/:user_id', (req, res) => {
  const userId = req.params.user_id;

  connection.query(
    'SELECT * FROM tutorial_progress WHERE user_id = ?',
    [userId],
    (error, results, fields) => {
      if (error) {
        res.status(500).send({ error: 'Internal Server Error' });
      } else {
        res.send(results);
      }
    }
  );
});

app.post('/stage_progress', (req, res) => {
  try {
    const { user_id, stage_number, stage_star } = req.body;

    // Check if there is an existing record with the same user and stage number
    connection.query(
      'SELECT * FROM stage_progress WHERE user_id = ? AND stage_number = ?',
      [user_id, stage_number],
      (error, results, fields) => {
        if (error) {
          res.status(500).send({ error: 'Internal Server Error' });
        } else if (results.length > 0) {
          // If there is an existing record, check if the new stage_star is higher
          const currentStar = results[0].stage_star;
          if (stage_star > currentStar) {
            // If the new stage_star is higher, update the existing record
            connection.query(
              'UPDATE stage_progress SET stage_star = ? WHERE user_id = ? AND stage_number = ?',
              [stage_star, user_id, stage_number],
              (error, results, fields) => {
                if (error) {
                  res.status(500).send({ error: 'Internal Server Error' });
                } else {
                  res.send({ message: 'Record updated successfully', success: 1 });
                }
              }
            );
          } else {
            // If the new stage_star is not higher, do nothing
            res.send({ message: 'Record already exists', success: 1 });
          }
        } else {
          // If there is no existing record, insert a new one
          connection.query(
            'INSERT INTO stage_progress (user_id, stage_number, stage_star) VALUES (?, ?, ?)',
            [user_id, stage_number, stage_star],
            (error, results, fields) => {
              if (error) {
                res.status(500).send({ error: 'Internal Server Error' });
              } else {
                res.send({ message: 'Record inserted successfully', success: 1 });
              }
            }
          );
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

app.get('/stage_progress/:user_id/:island', (req, res) => {
  const userId = req.params.user_id;
  const island = req.params.island;

  let query;
  if (island === 'island1') {
    query = 'SELECT * FROM stage_progress WHERE user_id = ? AND stage_number >= 1 AND stage_number <= 10';
  } else if (island === 'island2') {
    query = 'SELECT * FROM stage_progress WHERE user_id = ? AND stage_number >= 11 AND stage_number <= 20';
  } else if (island === 'island3') {
    query = 'SELECT * FROM stage_progress WHERE user_id = ? AND stage_number >= 21 AND stage_number <= 30';
  } else if (island === 'island4') {
    query = 'SELECT * FROM stage_progress WHERE user_id = ? AND stage_number >= 31 AND stage_number <= 35';
  } else {
    res.status(400).send({ error: 'Invalid island name' });
    return;
  }

  connection.query(
    query,
    [userId],
    (error, results, fields) => {
      if (error) {
        res.status(500).send({ error: 'Internal Server Error' });
      } else {
        res.send(results);
      }
    }
  );
});

app.get('/register', (req, res) => {
  res.send('Register page');
});

app.listen(3003, () => {
  console.log('Server is running on port 3003');
});
