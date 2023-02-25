#!/bin/bash

# Function to log the function parameters in a log file
function log {
    echo "[ $(date) ] - $1" >> Logs.log
}

# Depending on the arguments, launch the right script
if [ "$1" = "refresh" ]; then
    # Start a timer
    start=$(date +%s)
    python3 RefreshSpread.py 2>&1 | while read line; do log "$line"; done
    # Stop the timer
    end=$(date +%s)
    log "Refreshed the spreadsheet in $((end-start)) seconds"
elif [ "$1" = "clean" ]; then
    # Clean the activities.json file and only let the { } in it
    echo "{}" > activities.json
    log "Cleaned the activities.json file"
elif [ "$1" = "clear-log" ]; then
    # Clear the log file
    echo "" > Logs.log
    log "Cleared the log file"
elif [ "$1" = "help" ]; then
    # Display the help
    echo ""
    echo "Usage: ./Refresher.sh [OPTION]"
    echo "Refresh the spreadsheet with the activities.json file"
    echo ""
    echo "Options:"
    echo "  - refresh     Refresh the spreadsheet"
    echo "  - clean       Clean the activities.json file"
    echo "  - clear-log   Clear the log file"
    echo "  - help        Display this help"
    echo ""
else
    echo "Error please check the Cril-bot-main/SpreadSheet/Logs.log file"
    log "No argument given"
fi