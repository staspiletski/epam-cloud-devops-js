#!/bin/bash
aws ses update-template --cli-input-json fileb://EmailNotificationTemplate.json
aws ses get-template --template-name EmailNotificationTemplate
aws ses list-templates
