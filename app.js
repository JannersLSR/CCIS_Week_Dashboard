// CREATE STUDENT
document.addEventListener('DOMContentLoaded', () => {
    const createStudentButton = document.getElementById('create-student');
    if (createStudentButton) {
        createStudentButton.addEventListener('click', async function(event){
            const studNum = document.getElementById('studNum').value;
            const studFName = document.getElementById('studFName').value;
            const studLName = document.getElementById('studLName').value;
            const studHouse = document.getElementById('studHouse').value;

            try {
                const res = await fetch('http://localhost:3000/create/students', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ studNum, studFName, studLName, studHouse })
                });

                if (res.ok) {
                    console.log('Student created successfully');
                } else {
                    //console.error('Failed to create student:', res.status);
                    displayErrorMessage('Student already exists or Missing parameters.', 'error-message');
                }
            } catch (error) {
                //console.error('Error creating student:', error);
                displayErrorMessage('Error creating student. Please try again.', 'error-message');
            }
        });
    } else {
        console.error('Create student button not found.');
    }
});

// QUERY STUDENT
document.addEventListener('DOMContentLoaded', () => {
    const queryStudentButton = document.getElementById('query-student');
    if (queryStudentButton) {
        queryStudentButton.addEventListener('click', async function(event){
            const studNumber = document.getElementById('studNum').value;

            try {
                const res = await fetch('http://localhost:3000/query/students', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ studNumber })
                });

                if (res.ok) {
                    const data = await res.json();

                    clearErrorMessage();

                    document.getElementById('q-fname').textContent = data.firstName;
                    document.getElementById('q-lname').textContent = data.lastName;
                    document.getElementById('q-house').textContent = data.house;
                } else {
                    console.error('Failed to fetch students:', res.status);
                    displayErrorMessage('Student Number not Found!');
                }
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        });
    } else {
        console.error('Currently not in correct page');
    }
});

// UPDATE STUDENT
document.addEventListener('DOMContentLoaded', () => {
    const updateStudentButton = document.getElementById('update-student');
    if (updateStudentButton) {
        updateStudentButton.addEventListener('click', async function(event){
            const studNum = document.getElementById('studNum').value;
            const studFName = document.getElementById('studFName').value;
            const studLName = document.getElementById('studLName').value;
            const studHouse = document.getElementById('studHouse').value;

            try {
                const res = await fetch('http://localhost:3000/update/students', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ studFName, studLName, studHouse, studNum })
                });

                if (res.ok) {
                    const data = await res.json();
                    console.log('Student updated successfully:', data);
                } else {
                    console.error('Failed to update student:', res.status);
                    displayErrorMessage('Missing parameters. Please try again.', 'error-message');
                }
            } catch (error) {
                //console.error('Error updating student:', error);
                
            }
        });
    } else {
        console.error('Update student button not found.');
    }
});

// DELETE STUDENT
document.addEventListener('DOMContentLoaded', () => {
    const deleteStudentButton = document.getElementById('delete-student');
    if (deleteStudentButton) {
        deleteStudentButton.addEventListener('click', async function(event){
            const studNumber = document.getElementById('studNum').value;

            try {
                const res = await fetch('http://localhost:3000/delete/students', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ studNum: studNumber })
                });

                if (res.ok) {
                    console.log('Student deleted successfully');
                } else {
                    console.error('Failed to delete student:', res.status);
                    displayErrorMessage('Student does not exist.', 'error-message');
                }
            } catch (error) {
                console.error('Error deleting student:', error);
                displayErrorMessage('Error deleting student. Please try again.', 'error-message');
            }
        });
    } else {
        console.error('Delete student button not found.');
    }
});

// CREATE EVENT
document.addEventListener('DOMContentLoaded', () => {
    const createEventButton = document.getElementById('create-event');
    if (createEventButton) {
        createEventButton.addEventListener('click', async function(event){
            const eventNum = document.getElementById('eventNum').value;
            const eventName = document.getElementById('eventName').value;
            const eventStart = document.getElementById('eventStart').value;
            const eventEnd = document.getElementById('eventEnd').value;
            const eventDate = document.getElementById('eventDate').value;

            try {
                const res = await fetch('http://localhost:3000/create/events', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ eventNum, eventName, eventStart, eventEnd, eventDate })
                });

                if (res.ok) {
                    console.log('Event created successfully');
                } else {
                    //console.error('Failed to create student:', res.status);
                    displayErrorMessage('Event already exists or Missing parameters.', 'error-message');
                }
            } catch (error) {
                //console.error('Error creating student:', error);
                displayErrorMessage('Error creating event. Please try again.', 'error-message');
            }
        });
    } else {
        console.error('Create event button not found.');
    }
});


// QUERY EVENT
document.addEventListener('DOMContentLoaded', () => {
    const queryEventButton = document.getElementById('query-event');
    if (queryEventButton) {
        queryEventButton.addEventListener('click', async function(event){
            const eventNumber = document.getElementById('eventNum').value;

            try {
                const res = await fetch('http://localhost:3000/query/events', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ eventNumber })
                });

                if (res.ok) {
                    const data = await res.json();

                    clearErrorMessage();

                    document.getElementById('q-ename').textContent = data.eventName;
                    document.getElementById('q-estart').textContent = data.eventStart;
                    document.getElementById('q-eend').textContent = data.eventEnd;
                    document.getElementById('q-edate').textContent = data.eventDate;
                } else {
                    console.error('Failed to fetch event:', res.status);
                    displayErrorMessage('Event Number not Found!');
                }
            } catch (error) {
                console.error('Error fetching event:', error);
            }
        });
    } else {
        console.error('Currently not in correct page');
    }
});

// UPDATE EVENT
document.addEventListener('DOMContentLoaded', () => {
    const updateEventButton = document.getElementById('update-event');
    if (updateEventButton) {
        updateEventButton.addEventListener('click', async function(event){
            const eventNum = document.getElementById('eventNum').value;
            const eventName = document.getElementById('eventName').value;
            const eventStart = document.getElementById('eventStart').value;
            const eventEnd = document.getElementById('eventEnd').value;
            const eventDate = document.getElementById('eventDate').value;

            try {
                const res = await fetch('http://localhost:3000/update/events', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ eventNum, eventName, eventStart, eventEnd, eventDate })
                });

                if (res.ok) {
                    const data = await res.json();
                    console.log('Event updated successfully:', data);
                } else {
                    console.error('Failed to update event:', res.status);
                    displayErrorMessage('Missing parameters. Please try again.', 'error-message');
                }
            } catch (error) {
                //console.error('Error updating student:', error);
                
            }
        });
    } else {
        console.error('Update event button not found.');
    }
});

// DELETE EVENTS
document.addEventListener('DOMContentLoaded', () => {
    const deleteEventButton = document.getElementById('delete-event');
    if (deleteEventButton) {
        deleteEventButton.addEventListener('click', async function(event){
            const eventNumber = document.getElementById('eventNum').value;

            try {
                const res = await fetch('http://localhost:3000/delete/events', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ eventNum: eventNumber })
                });

                if (res.ok) {
                    console.log('Event deleted successfully');
                } else {
                    console.error('Failed to delete event:', res.status);
                    displayErrorMessage('Event does not exist.', 'error-message');
                }
            } catch (error) {
                console.error('Error deleting event:', error);
                displayErrorMessage('Error deleting event. Please try again.', 'error-message');
            }
        });
    } else {
        console.error('Delete event button not found.');
    }
});

// CREATE ATTENDANCE
document.addEventListener('DOMContentLoaded', () => {
    const createAttendanceButton = document.getElementById('create-attendance');
    if (createAttendanceButton) {
        createAttendanceButton.addEventListener('click', async function(event){
            const eventNum = document.getElementById('eventNum').value;
            const studNum = document.getElementById('studNum').value;

            try {
                const res = await fetch('http://localhost:3000/create/attendance', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ eventNum, studNum})
                });

                if (res.ok) {
                    console.log('Attendance created successfully');
                } else {
                    //console.error('Failed to create student:', res.status);
                    displayErrorMessage('Attendance already exists or Missing parameters.', 'error-message');
                }
            } catch (error) {
                //console.error('Error creating student:', error);
                displayErrorMessage('Error creating attendance. Please try again.', 'error-message');
            }
        });
    } else {
        console.error('Create attendance button not found.');
    }
});

// QUERY ATTEDANCE
document.addEventListener('DOMContentLoaded', () => {
    const queryAttendanceButton = document.getElementById('query-attendance');
    const eventNameDisplay = document.getElementById('q-ename');
    const attendanceList = document.getElementById('att-list');

    if (queryAttendanceButton) {
        queryAttendanceButton.addEventListener('click', async function(event){
            const eventNumber = document.getElementById('eventNum').value;

            try {
                const res = await fetch('http://localhost:3000/query/attendance', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ eventNum: eventNumber })
                });

                if (res.ok) {
                    const data = await res.json();

                    if (data.attendanceFound) {

                        clearErrorMessage();

                        eventNameDisplay.textContent = `${data.eventName}`;

                        attendanceList.innerHTML = '';

                        data.studIDs.forEach(studID => {
                            const listItem = document.createElement('li');
                            listItem.textContent = `${studID}`;
                            attendanceList.appendChild(listItem);
                        });
                    } else {
                        displayErrorMessage('Attendance not found for Event Number.', 'error-message');
                    }
                } else {
                    console.error('Failed to fetch event:', res.status);
                    displayErrorMessage('Event Number not Found!', 'error-message');
                }
            } catch (error) {
                console.error('Error fetching event:', error);
                displayErrorMessage('Error fetching event. Please try again.', 'error-message' );
            }
        });
    } else {
        console.error('Currently not in correct page');
    }
});

// DELETE ATTENDANCE
document.addEventListener('DOMContentLoaded', () => {
    const deleteAttendanceButton = document.getElementById('delete-attendance');
    if (deleteAttendanceButton) {
        deleteAttendanceButton.addEventListener('click', async function(event){
            const eventNumber = document.getElementById('eventNum').value;
            const studNumber = document.getElementById('studNum').value

            try {
                const res = await fetch('http://localhost:3000/delete/attendance', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ eventNum: eventNumber, studNum: studNumber })
                });

                if (res.ok) {
                    console.log('Attendance deleted successfully');
                } else {
                    console.error('Failed to delete attendance:', res.status);
                    displayErrorMessage('Attendance does not exist.', 'error-message');
                }
            } catch (error) {
                console.error('Error deleting attendance:', error);
                displayErrorMessage('Error deleting attendance. Please try again.', 'error-message');
            }
        });
    } else {
        console.error('Delete attendance button not found.');
    }
});

// CREATE PARTICIPANTS
document.addEventListener('DOMContentLoaded', () => {
    const createParticipantsButton = document.getElementById('create-participants');
    if (createParticipantsButton) {
        createParticipantsButton.addEventListener('click', async function(event){
            const eventNum = document.getElementById('eventNum').value;
            const studNum = document.getElementById('studNum').value;

            try {
                const res = await fetch('http://localhost:3000/create/participants', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ eventNum, studNum})
                });

                if (res.ok) {
                    console.log('Participants created successfully');
                } else {
                    //console.error('Failed to create student:', res.status);
                    displayErrorMessage('Participants already exists or Missing parameters.', 'error-message');
                }
            } catch (error) {
                //console.error('Error creating student:', error);
                displayErrorMessage('Error creating participants. Please try again.', 'error-message');
            }
        });
    } else {
        console.error('Create participants button not found.');
    }
});

// QUERY PARTICIPANTS
document.addEventListener('DOMContentLoaded', () => {
    const queryParticipantsButton = document.getElementById('query-participants');
    const eventNameDisplay = document.getElementById('q-ename');
    const participantsList = document.getElementById('part-list');

    if (queryParticipantsButton) {
        queryParticipantsButton.addEventListener('click', async function(event){
            const eventNumber = document.getElementById('eventNum').value;

            try {
                const res = await fetch('http://localhost:3000/query/participants', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ eventNum: eventNumber })
                });

                if (res.ok) {
                    const data = await res.json();

                    if (data.participantsFound) {

                        clearErrorMessage();

                        eventNameDisplay.textContent = `${data.eventName}`;

                        participantsList.innerHTML = '';

                        data.studIDs.forEach(studID => {
                            const listItem = document.createElement('li');
                            listItem.textContent = `${studID}`;
                            participantsList.appendChild(listItem);
                        });
                    } else {
                        displayErrorMessage('Participants not found for Event Number.', 'error-message');
                    }
                } else {
                    console.error('Failed to fetch event:', res.status);
                    displayErrorMessage('Event Number not Found!', 'error-message');
                }
            } catch (error) {
                console.error('Error fetching event:', error);
                displayErrorMessage('Error fetching event. Please try again.', 'error-message' );
            }
        });
    } else {
        console.error('Currently not in correct page');
    }
});

// DELETE PARTICIPANT
document.addEventListener('DOMContentLoaded', () => {
    const deleteParticipantsButton = document.getElementById('delete-participants');
    if (deleteParticipantsButton) {
        deleteParticipantsButton.addEventListener('click', async function(event){
            const eventNumber = document.getElementById('eventNum').value;
            const studNumber = document.getElementById('studNum').value

            try {
                const res = await fetch('http://localhost:3000/delete/participants', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ eventNum: eventNumber, studNum: studNumber })
                });

                if (res.ok) {
                    console.log('Participants deleted successfully');
                } else {
                    console.error('Failed to delete participants:', res.status);
                    displayErrorMessage('Participants does not exist.', 'error-message');
                }
            } catch (error) {
                console.error('Error deleting participants:', error);
                displayErrorMessage('Error deleting participants. Please try again.', 'error-message');
            }
        });
    } else {
        console.error('Delete participants button not found.');
    }
});

// LOGIN USER
document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login-dash');
    if (loginButton) {
        loginButton.addEventListener('click', async function(event) {
            const username = document.getElementById('user').value;
            const password = document.getElementById('pwd').value;

            try {
                const res = await fetch('http://localhost:3000/query/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });

                if (res.ok) {
                    window.location.href = 'index.html';

                } else {
                    console.error('Failed to authenticate:', res.status);
                    displayErrorMessage('Incorrect Username or Password!', 'error-message');
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        });
    } else {
        console.error('Login button not found.');
    }
});





function displayErrorMessage(message) {

    clearErrorMessage();

    const error_message = document.createElement("label");
    error_message.classList.add('error');
    error_message.textContent = message;
    const error_div = document.getElementById('error-message');
    error_div.appendChild(error_message);
}

function clearErrorMessage() {
    const error_div = document.getElementById('error-message');
    while (error_div.firstChild) {
        error_div.removeChild(error_div.firstChild);
    }
}