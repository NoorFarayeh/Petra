document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signup-form');
    const codeContainer = document.getElementById('code-container');
    const emailInput = document.getElementById('email');
    const codeInput = document.getElementById('code');

    signupForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const email = emailInput.value;

        try {
            const response = await fetch('https://your-api-gateway-endpoint/send-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email })
            });
            const data = await response.json();
            alert(`Code sent to ${email}`);
            codeContainer.style.display = 'flex';
        } catch (error) {
            alert('Failed to send code');
        }
    });

    document.getElementById('verify-code').addEventListener('click', async function () {
        const code = codeInput.value;
        try {
            const response = await fetch('https://9eca1430j9.execute-api.us-east-1.amazonaws.com', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: code })
            });
            const data = await response.json();
            if (data.message === 'Code verified successfully') {
                alert('Code verified successfully');
            } else {
                alert('Invalid code');
            }
        } catch (error) {
            alert('Failed to verify code');
        }
    });

    // Deactivate everything after 1 minute if the visitor did not sign up
    setTimeout(function () {
        if (!localStorage.getItem('isRegistered')) {
            alert('Session expired. Please sign up again.');
            window.location.href = 'index.html';
        }
    }, 60000); // 1 minute in milliseconds
});

