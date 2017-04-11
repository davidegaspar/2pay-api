# 2pay-api
REST API based on AWS SAM for **2pay** (monthly fixed expense tracker)

## cloudformation
```
aws cloudformation package --template-file stack.yml --output-template-file package.yml --s3-bucket 2pay-cformation
aws cloudformation deploy --template-file package.yml --stack-name stack-2pay-sam --capabilities CAPABILITY_IAM --no-execute-changeset
aws cloudformation execute-change-set --change-set-name <arn>
aws cloudformation delete-stack --stack-name stack-2pay-sam
```
