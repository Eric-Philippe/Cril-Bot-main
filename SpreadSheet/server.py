from main import App
from flask import Flask, request, jsonify

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


if __name__ == '__main__':
    app.run()
