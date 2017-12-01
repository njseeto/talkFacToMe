const databaseConnection = require('../database/db_connections.js');

const postData = (name, cohortNumber, gitterHandle, category, talkInfo, cb) => {
  databaseConnection.query(
    'INSERT INTO mentors (name, cohort, gitter_handle, category, other) VALUES ($1, $2, $3, $4, $5)',
    [name, cohortNumber, gitterHandle, category, talkInfo],
    (err, res) => {
      if (err) {
        return cb(err);
      } else {
        console.log('postData running');
        cb(null, res);
      }
    }
  );
};



// const categoryData = (category1, cb) => {
//   databaseConnection.query(
//     'INSERT INTO categories (selected_category) VALUES ($1)',
//     // ???mentors.id
//     [category1],
//     (err, res) => {
//       if (err) {
//         return cb(err);
//       } else {
//         console.log('categoryData running');
//         cb(null, res);
//       }
//     }
//   );
// };

module.exports = postData;
