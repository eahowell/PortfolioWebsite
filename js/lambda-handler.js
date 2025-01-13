import { SES } from '@aws-sdk/client-ses';

const ses = new SES({ region: 'us-east-2' }); 

export const handler = async (event) => {
    // Enable CORS
    const headers = {
        'Access-Control-Allow-Origin': 'https://eahowell.github.io', 
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };
    
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "https://eahowell.github.io",
            "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,Accept",
            "Access-Control-Allow-Methods": "OPTIONS,POST",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Expose-Headers": "Date,X-Amzn-ErrorType"
        }
    };
    
    // Handle OPTIONS request
    if (event.httpMethod === 'OPTIONS') {
        return response;
    }
    
    try {
        const body = JSON.parse(event.body);
        const { name, email, subject, message } = body;
        
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
${message}
                        `
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
        console.error('Error:', error);
        
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ message: 'Error sending email' })
        };
    }
    return response;
};