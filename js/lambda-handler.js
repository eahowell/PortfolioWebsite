import { SES } from '@aws-sdk/client-ses';

const ses = new SES({ region: 'us-east-2' }); 

export const handler = async (event) => {
    // Log the entire event first
    console.log('Incoming event structure:', {
        httpMethod: event.httpMethod,
        headers: event.headers,
        body: event.body,
        isBase64Encoded: event.isBase64Encoded
    });

    const headers = {
        'Access-Control-Allow-Origin': 'https://eahowell.github.io, http://ehowell-dev.me/, https://ehowell-dev.me/',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,Accept',
        'Access-Control-Allow-Methods': 'OPTIONS,POST',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Expose-Headers': 'Date,X-Amzn-ErrorType',
        'Content-Type': 'application/json'
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
        // Log the raw body
        console.log('Raw event.body:', event.body);
        console.log('Type of event.body:', typeof event.body);

        // Handle potential string or object body
        let parsedBody;
        if (typeof event.body === 'string') {
            try {
                parsedBody = JSON.parse(event.body);
            } catch (parseError) {
                console.error('JSON parsing error:', parseError);
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({
                        message: 'Invalid JSON in request body',
                        error: parseError.message
                    })
                };
            }
        } else if (typeof event.body === 'object') {
            parsedBody = event.body;
        } else {
            console.error('Unexpected body type:', typeof event.body);
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    message: 'Invalid request format',
                    error: `Unexpected body type: ${typeof event.body}`
                })
            };
        }

        console.log('Parsed body:', parsedBody);

        const { name, email, subject, message } = parsedBody;

        // Validate required fields
        if (!name || !email || !subject || !message) {
            console.log('Missing required fields:', { name, email, subject, message });
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    message: 'Missing required fields',
                    receivedFields: { name, email, subject, message }
                })
            };
        }

        const VERIFIED_EMAIL = 'ehowell.webdev@gmail.com';
        
        const params = {
            Destination: {
                ToAddresses: [VERIFIED_EMAIL]
            },
            Message: {
                Body: {
                    Text: {
                        Data: `
New contact form submission:

From: ${name} <${email}>
Subject: ${subject}

Message:
${message}

---
This email was sent from your portfolio contact form. 
To reply, please email ${email} directly.`
                    }
                },
                Subject: {
                    Data: `Portfolio Contact Form: ${subject}`
                }
            },
            Source: VERIFIED_EMAIL
        };

        console.log('Attempting to send email with params:', JSON.stringify(params, null, 2));

        const sesResponse = await ses.sendEmail(params);
        console.log('SES Response:', JSON.stringify(sesResponse, null, 2));

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                message: 'Email sent successfully',
                messageId: sesResponse.MessageId
            })
        };

    } catch (error) {
        console.error('Error in lambda:', {
            name: error.name,
            message: error.message,
            stack: error.stack,
            code: error.code
        });

        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                message: 'Failed to send email. Please try again later.',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            })
        };
    }
};