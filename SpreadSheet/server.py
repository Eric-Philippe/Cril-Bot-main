from main import App
from datetime import datetime
from flask import Flask, request, jsonify

import json

ENV_ENUM = {
    "USER": 0,
    "BOT": 1
}


myApp = App(ENV_ENUM["BOT"])

app = Flask(__name__)

@app.route('/refresh', methods=['POST'])
def refresh():
    callbackJson = App.cmdHandler(myApp, ["refresh"])
    return jsonify(callbackJson)

@app.route('/load', methods=['POST'])
def load():
    callbackJson = App.cmdHandler(myApp, ["load"])
    return jsonify(callbackJson)

@app.route('/clear', methods=['POST'])
def clear():
    callbackJson = App.cmdHandler(myApp, ["clear"])
    return jsonify(callbackJson)

@app.route('/resize', methods=['POST'])
def resize():
    callbackJson = App.cmdHandler(myApp, ["resize"])
    return jsonify(callbackJson)

@app.route('/get', methods=['POST'])
def get():
    # Get the data from the Activities.json file in the DDMMYYYY format
    with open("Activities.json", "r") as file:
        data = json.load(file)
    today = datetime.today().strftime('%d%m%Y')
    return jsonify(data[today])

if __name__ == '__main__':
    app.run()
