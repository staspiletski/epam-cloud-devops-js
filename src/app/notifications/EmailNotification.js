const aws = require('aws-sdk');
const ses = new aws.SES({ region: 'eu-central-1' });

const saveToS3 = (data, fileName) => {
	const s3 = new aws.S3();
	const params = {
		Bucket: 'email-notification-quotes',
		Key: fileName + '.json',
		Body: data,
	};
	s3.putObject(params, (err, data) => {
		if (err) console.log(err, err.stack);
		else console.log('Updated bucket with data: ' + { ...data });
	});
};

exports.handler = async (event) => {
	try {
		const data = JSON.parse(event.body);
		console.log('Payload data: ', data);
		const source = data.from;
		const toAddresses = data.email.split(',');
		const templateName = data.templateName;

		saveToS3(JSON.stringify(data.quote, null, 2), 'quotes');

		const params = {
			Destination: {
				ToAddresses: toAddresses,
			},
			Source: source,
			Template: templateName,
			TemplateData: JSON.stringify({
				firstName: data.firstName,
				quote: data.quote,
			}),
			Tags: [
				{
					Name: 'STRING_VALUE',
					Value: 'STRING_VALUE',
				},
			],
		};

		const emailResponse = await ses.sendTemplatedEmail(params).promise();
		console.log('Email successfully sent: ', emailResponse);
		return {
			statusCode: 200,
			body: JSON.stringify({ message: 'Email successfully sent' }),
		};
	} catch (e) {
		console.log('Error sending email: ', e.stack);
		return {
			statusCode: 400,
			body: JSON.stringify({ message: 'Error sending email', trace: e }),
		};
	}
};
