#!/bin/bash
. ./build/__secrets/build-env
echo "------------------------------------------"
echo "801-docker-deploy-aws-ecr.sh"
echo " - DOCKER_IMAGE_NAME  = $DOCKER_IMAGE_NAME"
echo " - DOCKER_REPO_URL    = $DOCKER_REPO_URL"
echo " - AWS_PROFILE        = $AWS_PROFILE"
echo "------------------------------------------"

docker login -u AWS -p $(aws ecr get-login-password --profile $AWS_PROFILE) $DOCKER_REPO_URL
docker push $DOCKER_REPO_URL/$DOCKER_IMAGE_NAME
