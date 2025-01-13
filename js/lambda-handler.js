import { SES } from '@aws-sdk/client-ses';

const ses = new SES({ region: 'us-east-2' }); 

export const handler = async (event) => {
    console.log('Event received:', JSON.stringify(event, null, 2));
    
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
        console.log('Parsing request body');
        const body = JSON.parse(event.body);
        const { name, email, subject, message } = body;
        
        console.log('Validating input fields');
        if (!name || !email || !subject || !message) {
            console.log('Missing required fields:', { name, email, subject, message });
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
        
        console.log('Attempting to send email with params:', JSON.stringify(params, null, 2));
        
        try {
            const sesResponse = await ses.sendEmail(params);
            console.log('SES Response:', JSON.stringify(sesResponse, null, 2));
        } catch (sesError) {
            console.error('SES Error:', {
                name: sesError.name,
                message: sesError.message,
                code: sesError.code,
                statusCode: sesError.$metadata?.httpStatusCode,
                requestId: sesError.$metadata?.requestId
            });
            throw sesError;
        }
        
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: 'Email sent successfully' })
        };
    } catch (error) {
        console.error('Error details:', {
            name: error.name,
            message: error.message,
            code: error.code,
            stack: error.stack
        });
        
        let errorMessage = 'Failed to send email. Please try again later.';
        let statusCode = 500;
        
        if (error.code === 'MessageRejected') {
            errorMessage = 'Email sending failed: Invalid email configuration';
        } else if (error.code === 'InvalidParameterValue') {
            errorMessage = 'Invalid email parameters';
            statusCode = 400;
        } else if (error.code === 'AccessDenied') {
            errorMessage = 'Email sending failed: Permission denied';
            console.error('SES permissions may not be properly configured');
        }
            
        return {
            statusCode,
            headers,
            body: JSON.stringify({ 
                message: errorMessage,
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            })
        };
    }
};