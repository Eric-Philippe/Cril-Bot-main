#!/bin/bash

# Ask the user if he wants to launch the bot only, or the server only, or both
echo "Do you want to launch the bot only, or the server only, or both?"
echo "1) Bot only"
echo "2) Server only"
echo "3) Both"
echo "4) Quit Both"

# Read the user's choice
read choice

# If the user wants to launch the bot only
if [ $choice -eq 1 ]
then
    # Launch the bot
    node index.js

# If the user wants to launch the server only
elif [ $choice -eq 2 ]
then
    # The file is in the SpreadSheet folder, so we need to go there
    cd SpreadSheet
    # Launch the server
    python3 server.py &
    # Go back to the main folder
    cd ..

# If the user wants to launch both
elif [ $choice -eq 3 ]
then
    # Launch the bot
    node index.js &
    # The file is in the SpreadSheet folder, so we need to go there
    cd SpreadSheet
    # Launch the server
    python3 server.py &
    # Go back to the main folder
    cd ..

# If the user wants to quit both
elif [ $choice -eq 4 ]
then
    # Kill the node process
    killall node
    # Kill the server
    killall python3

# If the user entered a wrong number
else
    # Tell him that he entered a wrong number
    echo "You entered a wrong number"
fi



