#!/bin/bash

REGION=us-east-1
AWS_ACCOUNT_ID=
PROFILE=default
#PROFILE=personalAccount
DOCKER_APP_NAME=my-cart-api

AWS_DOCKER_REGISTRY_URL=$AWS_ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com
DOCKER_TAG="$(date +%s)"
DOCKER_LATEST_TAG=latest

# Logout from Docker
docker logout
# Login in AWS container registry with your AWS credentials
aws ecr get-login-password --profile $PROFILE --region $REGION | docker login --username AWS --password-stdin

# Build Docker image
docker build -f "$(dirname "$0")/../../Dockerfiles/Dockerfile" -t $DOCKER_APP_NAME:"$DOCKER_TAG" -t $DOCKER_APP_NAME:$DOCKER_LATEST_TAG "$(dirname "$0")/../../"

# Tag Docker image
docker tag $DOCKER_APP_NAME:"$DOCKER_TAG" $AWS_DOCKER_REGISTRY_URL/$DOCKER_APP_NAME:"$DOCKER_TAG"
docker tag $DOCKER_APP_NAME:$DOCKER_LATEST_TAG $AWS_DOCKER_REGISTRY_URL/$DOCKER_APP_NAME:$DOCKER_LATEST_TAG

# Push/Publish Docker image
docker push $AWS_DOCKER_REGISTRY_URL/$DOCKER_APP_NAME
