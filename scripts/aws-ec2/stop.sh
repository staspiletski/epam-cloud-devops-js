#!/bin/bash

source ../../.env
echo "Stopping $AWS_EC2_INSTANCE_ID"
aws ec2 stop-instances --instance-ids "$AWS_EC2_INSTANCE_ID"
