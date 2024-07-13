const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.use(cors({
    origin: 'http://127.0.0.1:3000' /*Change this to your local IP address*/
}));

// CREATE STUDENT
app.post('/create/students', async (req, res) => {
    const { studNum, studFName, studLName, studHouse } = req.body;
    let connection;
    try {
        connection = await oracledb.getConnection({
            user: 'system',
            password: 'admin',
            connectString: 'localhost/XE'
        });

        const existingResult = await connection.execute(`SELECT COUNT(*) AS count FROM Students WHERE studID = :studNum`, 
            [studNum]);

        if (existingResult.rows[0][0] > 0) {
            res.status(400).send('Student ID already exists');
        } else {
            await connection.execute(`INSERT INTO Students (studID, studFName, studLName, studHouse) VALUES (:studNum, :studFName, :studLName, :studHouse)`, 
                [ studNum, studFName, studLName, studHouse ]);
            await connection.commit();
            res.status(200).send('Student created successfully');
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

// QUERY STUDENT
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
            `SELECT studfname, studlname, studhouse FROM Students WHERE studID = :studNumber`,
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


// CREATE EVENT
app.post('/create/events', async (req, res) => {
    const { eventNum, eventName, eventStart, eventEnd, eventDate } = req.body;
    let connection;
    try {
        connection = await oracledb.getConnection({
            user: 'system',
            password: 'admin',
            connectString: 'localhost/XE'
        });

        const existingResult = await connection.execute(`SELECT COUNT(*) AS count FROM Events WHERE eventID = :eventNum`, 
            [eventNum]);

        if (existingResult.rows[0][0] > 0) {
            res.status(400).send('Event ID already exists');
        } else {
            await connection.execute(`INSERT INTO Events (eventID, eventName, eventStart, eventEnd, eventDate) VALUES (:eventNum, :eventName, :eventStart, :eventEnd, :eventDate)`, 
                [ eventNum, eventName, eventStart, eventEnd, eventDate ]);
            await connection.commit();
            res.status(200).send('Event created successfully');
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

// QUERY EVENT
app.post('/query/events', async (req, res) => {
    const { eventNumber } = req.body;
    let connection;
    try {
        connection = await oracledb.getConnection({
            user: 'system',
            password: 'admin',
            connectString: 'localhost/XE'
        });

        const result = await connection.execute(
            `SELECT eventName, eventStart, eventEnd, eventDate FROM Events WHERE eventID = :eventNumber`,
            [eventNumber]
        );

        if (result.rows.length > 0) {
            const eventData = {
                eventName: result.rows[0][0],
                eventStart: result.rows[0][1],
                eventEnd: result.rows[0][2],
                eventDate: result.rows[0][3]
            };
            res.status(200).json(eventData);
        } else {
            res.status(404).send('Event not found');
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

// UPDATE EVENT
app.post('/update/events', async (req, res) => {
    const { eventName, eventStart, eventEnd, eventDate, eventNum } = req.body;
    let connection;
    try {
        connection = await oracledb.getConnection({
            user: 'system',
            password: 'admin',
            connectString: 'localhost/XE'
        });

        const result = await connection.execute(
            `UPDATE Events SET eventName = :eventName, eventStart = :eventStart, eventEnd = :eventEnd, eventDate = :eventDate WHERE eventID = :eventNum`,
            { eventName, eventStart, eventEnd, eventDate, eventNum },
            {autoCommit: true}
        );

        if (result.rowsAffected && result.rowsAffected === 1) {
            res.status(200).send('Event updated successfully');
        } else {
            res.status(404).send('Event not found or update failed');
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

// DELETE EVENT
app.delete('/delete/events', async (req, res) => {
    const { eventNum } = req.body;
    let connection;
    try {
        connection = await oracledb.getConnection({
            user: 'system',
            password: 'admin',
            connectString: 'localhost/XE'
        });

        const result = await connection.execute(
            `DELETE FROM Events WHERE eventID = :eventNum`,
            [eventNum],
            {autoCommit: true}
        );

        if (result.rowsAffected && result.rowsAffected === 1) {
            res.status(200).send('Event deleted successfully');
        } else {
            res.status(404).send('Event not found or delete failed');
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

// CREATE ATTENDANCE
app.post('/create/attendance', async (req, res) => {
    const { eventNum, studNum } = req.body;
    let connection;
    try {
        connection = await oracledb.getConnection({
            user: 'system',
            password: 'admin',
            connectString: 'localhost/XE'
        });

        const existingResult = await connection.execute(`SELECT COUNT(*) AS count FROM Attendance WHERE eventID = :eventNum AND studID = :studNum`, 
            [eventNum, studNum]);

        if (existingResult.rows[0][0] > 0) {
            res.status(400).send('Attendance already exists');
        } else {
            await connection.execute(`INSERT INTO Attendance (eventID, studID) VALUES (:eventNum, :studNum)`, 
                [ eventNum, studNum ]);
            await connection.commit();
            res.status(200).send('Attendance created successfully');
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

// QUERY ATTENDANCE
app.post('/query/attendance', async (req, res) => {
    const { eventNum } = req.body;
    let connection;

    try {
        connection = await oracledb.getConnection({
            user: 'system',
            password: 'admin',
            connectString: 'localhost/XE'
        });

        const existingResult = await connection.execute(
            `SELECT COUNT(*) AS count FROM Events WHERE eventID = :eventNum`,
            [eventNum]
        );

        if (existingResult.rows[0][0] === 0) {
            res.status(400).json({ attendanceFound: false });
        } else {
            const result = await connection.execute(
                `SELECT studID FROM Attendance WHERE eventID = :eventNum`,
                [eventNum]
            );

            const eventResult = await connection.execute(
                `SELECT eventName FROM Events WHERE eventID = :eventNum`,
                [eventNum]
            );

            const studIDs = result.rows.map(row => row[0]);
            const eventName = eventResult.rows[0][0];
            res.status(200).json({ attendanceFound: true, eventName, studIDs });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ attendanceFound: false });
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

// DELETE ATTENDANCE
app.delete('/delete/attendance', async (req, res) => {
    const { eventNum, studNum } = req.body;
    let connection;
    try {
        connection = await oracledb.getConnection({
            user: 'system',
            password: 'admin',
            connectString: 'localhost/XE'
        });

        const result = await connection.execute(
            `DELETE FROM Attendance WHERE eventID = :eventNum AND studID = :studNum`,
            [eventNum, studNum],
            {autoCommit: true}
        );

        if (result.rowsAffected && result.rowsAffected === 1) {
            res.status(200).send('Attendance deleted successfully');
        } else {
            res.status(404).send('Attendance not found or delete failed');
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