const AWS = require('aws-sdk');
const SES = new AWS.SES({ region: 'us-east-1' }); // Update with your region

exports.handler = async (event) => {
    // Enable CORS
    const headers = {
        'Access-Control-Allow-Origin': 'https://eahowell.github.io', // Replace with your domain
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };
    
    // Handle preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }
    
    try {
        const body = JSON.parse(event.body);
        const { name, email, subject, message } = body;
        
        const params = {
            Destination: {
                ToAddresses: ['ehowell.webdev@gmail.com'] // Your verified email
            },
            Message: {
                Body: {
                    Text: {
                        Data: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
                        `
                    }
                },
                Subject: {
                    Data: `Portfolio Contact Form: ${subject}`
                }
            },
            Source: 'ehowell.webdev@gmail.com' // Must be your verified SES email
        };
        
        await SES.sendEmail(params).promise();
        
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: 'Email sent successfully' })
        };
    } catch (error) {
        console.error('Error:', error);
        
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ message: 'Error sending email' })
        };
    }
};