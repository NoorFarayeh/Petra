document.addEventListener('DOMContentLoaded', function() {
    const timerElement = document.getElementById('timer');
    let timeLeft = 60;

    const countdown = setInterval(function() {
        if (timeLeft <= 0 && !localStorage.getItem('isRegistered')) {
            clearInterval(countdown);
            // Display a user-friendly message instead of an alert
            document.body.innerHTML = `
                <div style="text-align: center; margin-top: 50px;">
                    <h2>Session expired. Please sign up.</h2>
                    <button onclick="window.location.href='signup.html'">Sign Up</button>
                </div>
            `;
        } else if (localStorage.getItem('isRegistered')) {
            clearInterval(countdown);
            document.getElementById('timer-container').style.display = 'none';
        } else {
            timerElement.textContent = timeLeft;
            timeLeft--;
        }
    }, 1000); // Update every second
});
