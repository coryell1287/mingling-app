#!/bin/bash
apt-get install -y awscli
aws --version
export PATH:"$PATH"/"$HOME"/.local/bin

add-apt-repository ppa:eugenesan/ppa
apt-get update
apt-get install jq -y

curl https://raw.githubusercontent.com/silinternational/ecs-deploy/master/ecs-deploy | tee -a /usr/bin/ecs-deploy
chmod +x /usr/bin/ecs-deploy

eval "$(aws ecr get-login --region us-east-2)"
# eval "$(aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin 999289053399.dkr.ecr.us-east-2.amazonaws.com)"

docker build -t "$AWS_RESOURCE_NAME_PREFIX" .
docker tag "$AWS_RESOURCE_NAME_PREFIX":latest  "$AWS_ECR_ACCOUNT_URL"
docker push "$AWS_ECR_ACCOUNT_URL"

ecs-deploy -c "${AWS_RESOURCE_NAME_PREFIX}-cluster" -n "${AWS_SERVICE_NAME}-service" -i "$AWS_ECR_ACCOUNT_URL"
