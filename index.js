'use strict'
const SDK = require('aws-sdk')

exports.handler = (event, context, callback) => {
    const ses = new SDK.SES({ region: 'ap-southeast-2' })
    const email = {
        // From
        Source: "YOUR_EMAIL_ADDRESS",
        // To
        Destination: { ToAddresses: [event.form.to] },
        Message: {
            Subject: { Data: event.form.subject },
            Body: {
                Text: { Data: event.form.body }
            },
        },
    };
    ses.sendEmail(email, callback);
};
