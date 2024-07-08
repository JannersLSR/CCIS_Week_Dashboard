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
        console.error('Element with id "query-student" not found.');
    }
});