const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.use(cors({
    origin: 'http://127.0.0.1:3000' /*Change this to your local IP address*/
}));


// QUERY-UPDATE STUDENT
app.post('/query/students', async (req, res) => {
    const { studNumber } = req.body;
    let connection;
    try {
        connection = await oracledb.getConnection({
            user: 'system',
            password: 'admin',
            connectString: 'localhost/XE'
        });

        const result = await connection.execute(
            `SELECT studfname, studlname, studhouse FROM Students WHERE studID = :studNum`,
            [studNumber]
        );

        if (result.rows.length > 0) {
            const studentData = {
                firstName: result.rows[0][0],
                lastName: result.rows[0][1],
                house: result.rows[0][2]
            };
            res.status(200).json(studentData);
        } else {
            res.status(404).send('Student not found');
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

// UPDATE STUDENT
app.post('/update/students', async (req, res) => {
    const { studFName, studLName, studHouse, studNum } = req.body;
    let connection;
    try {
        connection = await oracledb.getConnection({
            user: 'system',
            password: 'admin',
            connectString: 'localhost/XE'
        });

        const result = await connection.execute(
            `UPDATE Students SET studFName = :studFName, studLName = :studLName, studHouse = :studHouse WHERE studID = :studNum`,
            { studFName, studLName, studHouse, studNum },
            {autoCommit: true}
        );

        if (result.rowsAffected && result.rowsAffected === 1) {
            res.status(200).send('Student updated successfully');
        } else {
            res.status(404).send('Student not found or update failed');
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

// DELETE STUDENT
app.delete('/delete/students', async (req, res) => {
    const { studNum } = req.body;
    let connection;
    try {
        connection = await oracledb.getConnection({
            user: 'system',
            password: 'admin',
            connectString: 'localhost/XE'
        });

        const result = await connection.execute(
            `DELETE FROM Students WHERE studID = :studNum`,
            [studNum],
            {autoCommit: true}
        );

        if (result.rowsAffected && result.rowsAffected === 1) {
            res.status(200).send('Student deleted successfully');
        } else {
            res.status(404).send('Student not found or delete failed');
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


// USER LOGIN
app.post('/query/users', async (req, res) => {
    const {username, password} = req.body;
    let connection;
    try {
        connection = await oracledb.getConnection({
            user: 'system',
            password: 'admin',
            connectString: 'localhost/XE'
        });

        const result = await connection.execute(`SELECT * FROM userpass WHERE username = :username AND userpass = :password`,
            [username, password]
        );

        if (result.rows.length > 0) {
            res.status(200).send('Success');
        } else {
            res.status(404).send('Wrong Credentials');
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