#!/bin/bash
find ./EmailNotification.js | zip -@ EmailNotification.zip
aws lambda update-function-code --function-name "EmailNotification" --zip-file "fileb://EmailNotification.zip" --region "eu-central-1"
