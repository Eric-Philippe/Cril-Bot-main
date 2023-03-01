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
    callbackJson = App.cmdHandler("refresh")
    return jsonify(callbackJson)


if __name__ == '__main__':
    app.run()
