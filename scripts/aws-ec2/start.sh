#!/bin/bash

source ../../.env
echo "Connecting to $AWS_EC2_INSTANCE_ID"
aws ec2 start-instances --instance-ids "$AWS_EC2_INSTANCE_ID"
