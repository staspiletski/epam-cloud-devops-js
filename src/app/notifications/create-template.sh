#!/bin/bash
aws ses update-template --cli-input-json fileb://EmailNotificationTemplate.json --region eu-central-1
aws ses list-templates
aws ses get-template --template-name EmailNotificationTemplate
