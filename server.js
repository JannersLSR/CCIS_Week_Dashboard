const express = require('express')
const oracledb = require('oracledb')
const app = express()
const port = 3000

app.get('/select/eventname', async (req, res) => {
    let connection;
    try {
        connection = await oracledb.getConnection({
            user: 'system',
            password: 'admin',
            connectString: 'localhost/XE'
        });

        const result = await connection.execute(`SELECT EventName FROM EventInfo`);

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