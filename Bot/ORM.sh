#!/bin/bash

# Load environment variables from .env file using dotenv-cli
dotenv -e .env -- sh -c 'typeorm-model-generator -h $DB_HOST -d $DB_NAME -p $DB_PORT -u $DB_USER -x $DB_PASS -e postgres -o src/'
#dotenv -e .env -- sh -c 'echo $DB_HOST'