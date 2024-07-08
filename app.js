document.addEventListener('DOMContentLoaded', () => {
    const queryStudentButton = document.getElementById('query-student');
    if (queryStudentButton) {
        queryStudentButton.addEventListener('click', async function(event){
            try {
                const res = await fetch('http://localhost:3000/query/students', {
                    method: 'GET'
                });

                if (res.ok) {
                    const data = await res.json();
                    console.log('Students:', data); // Replace with your actual logic to display or use the data
                } else {
                    console.error('Failed to fetch students:', res.status);
                }
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        });
    } else {
        console.error('Currently not in correct page');
    }
});

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
                    var error_message = document.createElement("label")
                    error_message.classList.add('error');
                    error_message.textContent = 'Incorrect Username or Password!';
                    const error_div = document.getElementById('error-message');
                    error_div.appendChild(error_message);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        });
    } else {
        console.error('Login button not found.');
    }
});