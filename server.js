const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.use(cors({
    origin: 'http://127.0.0.1:3000' /*Change this to your local IP address*/
}));

app.get('/query/students', async (req, res) => {
    let connection;
    try {
        connection = await oracledb.getConnection({
            user: 'system',
            password: 'admin',
            connectString: 'localhost/XE'
        });

        const result = await connection.execute(`SELECT studLName FROM Students`);

        if (result.rows.length > 0) {
            res.status(200).json(result.rows.map(row => row[0]));
        } else {
            res.status(404).json([]);
        }
    } catch (err) {
        res.status(500).send('An error occurred. Please try again later.');
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
});


app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});