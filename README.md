# aws-lambda-ses-contact-form

A AWS Lambda function for contact forms with Amazon Simple Email Service (SES)

## Setup

### SES 

* Add and verify your sender email address on SES.
* [Setting Up Easy DKIM for a Domain](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/send-email-authentication-dkim-easy-setup-domain.html) to avoid the "via amazon.com" alert in the mail client.

### Lambda

* Create a new IAM role with the JSON below:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*"
    }
    ,{
       "Effect": "Allow",
       "Action": ["ses:Send*"],
       "Resource":"*"
     }
  ]
}
```

* Create a new Lambda function with the IAM role.
* Update `index.js`.

### API Gateway

* Create a new API.
* Add a new resource `/send`.
* Add a POST method to it applying the Lambda function above.
* Add a `application/json` response mapping template to the POST method:

```
# application/json
{
    "form": $input.json('$')
}
```

* Add `Access-Control-Allow-Origin: "*"` to the request header mapping of the POST method.
* Deploy the API Gateway.

### Web Client

* Call the API Gateway endpoint from the web client like: 

```
function submitContact(url, to, subject, body) {
  const jsonData = JSON.stringify({
    'to':      to,
    'subject': subject,
    'body':    body
  })

  $.ajax({
    type: "POST",
    url:   url,
    async: true,
    contentType: 'application/json',
    dataType: 'json',
    data: jsonData,
    error: function(data)　{ 
      console.log(data)
    },
    success: function(data)　{
      console.log(data)
    }
  })
}
```

