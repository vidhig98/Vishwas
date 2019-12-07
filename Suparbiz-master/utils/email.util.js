const AWS = require("aws-sdk");

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});
const ses = new AWS.SES({ apiVersion: "2010-12-01" });
module.exports.sendEmail = (emailAddress, subject, message) => {
    const params = {
        Destination: {
            ToAddresses: [emailAddress]
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: message
                },
                Text: {
                    Charset: "UTF-8",
                    Data: message
                }
            },
            Subject: {
                Charset: "UTF-8",
                Data: subject
            }
        },
        Source: "auth@suparbiz.com"
    };

    return ses.sendEmail(params).promise();
};
