const databaseConnection = require('../database/db_connections.js');

const getInternship = cb => {
  databaseConnection.query(`SELECT mentors.name, mentors.cohort, mentors.gitter_handle, string_agg(categories.selected_category, ', '), mentors.other FROM mentors INNER JOIN categories ON categories.mentors_id = mentors.id WHERE categories.selected_category='Internship' GROUP BY mentors.name, mentors.cohort, mentors.gitter_handle, mentors.other`, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

module.exports = getInternship;
