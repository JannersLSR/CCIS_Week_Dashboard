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
                    body: JSON.stringify({ studNum, studFName, studLName, studHouse })
                });

                if (res.ok) {
                    const data = await res.json();
                    console.log('Student updated successfully:', data);
                } else {
                    console.error('Failed to update student:', res.status);
                    displayErrorMessage('Failed to update student. Please try again.', 'error-message');
                }
            } catch (error) {
                console.error('Error updating student:', error);
                displayErrorMessage('Error updating student. Please try again.', 'error-message');
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
                    displayErrorMessage('Failed to delete student. Please try again.', 'error-message');
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