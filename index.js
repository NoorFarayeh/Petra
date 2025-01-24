const AWS = require('aws-sdk');
const ses = new AWS.SES();

exports.handler = async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    const email = event.email;
    const code = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit code

    const params = {
        Destination: {
            ToAddresses: [email]
        },
        Message: {
            Body: {
                Text: { Data: `Your verification code is: ${code}` }
            },
            Subject: { Data: "Verification Code" }
        },
        Source: "noorfarayeh2012@gmail.com" // Use your verified email address
    };

    try {
        await ses.sendEmail(params).promise();
        console.log('Email sent successfully:', params);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Code sent successfully', code: code })
        };
    } catch (error) {
        console.log('Failed to send email:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to send code', error: error.message })
        };
    }
};
