import { SES } from '@aws-sdk/client-ses';

const ses = new SES({ region: 'us-east-2' }); 

export const handler = async (event) => {
    // Set CORS headers
    const headers = {
        'Access-Control-Allow-Origin': 'https://eahowell.github.io',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,Accept',
        'Access-Control-Allow-Methods': 'OPTIONS,POST',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Expose-Headers': 'Date,X-Amzn-ErrorType'
    };

    // Handle OPTIONS request
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
        
        if (!name || !email || !subject || !message) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ message: 'Missing required fields' })
            };
        }

        const params = {
            Destination: {
                ToAddresses: ['ehowell.webdev@gmail.com']
            },
            Message: {
                Body: {
                    Text: {
                        Data: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}`
                    }
                },
                Subject: {
                    Data: `Portfolio Contact Form: ${subject}`
                }
            },
            Source: 'ehowell.webdev@gmail.com'
        };
        
        await ses.sendEmail(params);
        
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: 'Email sent successfully' })
        };
    } catch (error) {
        console.error('Error details:', error);
        
        // Return specific error message based on the type of error
        const errorMessage = error.name === 'MessageRejected' 
            ? 'Email sending failed: Invalid email configuration'
            : 'Failed to send email. Please try again later.';
            
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                message: errorMessage,
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            })
        };
    }
};