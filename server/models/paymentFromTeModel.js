const pool = require('../db');

const fetchPayments = async (course, month) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
        }
  
        const query1 = 'SELECT payscheme FROM course WHERE courseid = ?';
        const query2 = 'SELECT SUM(paidamount) AS collection FROM classfees WHERE courseid = ? AND MONTH = ?';
        const query3 = 'SELECT SUM(amount) AS expenses FROM expense WHERE courseid = ? AND MONTH = ?';
        const query4 = 'SELECT SUM(amountpaid) AS already FROM payment WHERE courseid = ? AND MONTH = ?';
  
        connection.query(query1, [course], (error1, result1) => {
          if (error1) {
            connection.release();
            reject(error1);
          }
  
          connection.query(query2, [course, month], (error2, result2) => {
  
            if (error2) {
              connection.release();
              reject(error2);
            }

            connection.query(query3, [course, month], (error3, result3) => {
      
                if (error3) {
                  connection.release();
                  reject(error3);
                }
      
                connection.query(query4, [course, month], (error4, result4) => {
                  connection.release();
        
                  if (error3) {
                    reject(error4);
                  }
        
                  if (!result1 || !result2 || !result3 || !result4) {
                    reject(new Error('No results found'));
                  }
        
                  resolve({
                    payscheme: result1[0].payscheme,
                    collection: result2[0].collection * 1.00,
                    expenses: result3[0].expenses * 1.00,
                    already: result4[0].already * 1.00,
                    total: ((result2[0].collection * result1[0].payscheme)/100) - result3[0].expenses - result4[0].already
                  });
                });
              });
          });
        });
      });
    });
  };
  
  module.exports = {
    fetchPayments
  };
  