#!/usr/bin/env python3
from flask import Flask, jsonify

from data import LIGHTS, THERMOSTAT


app = Flask(__name__)


@app.route('/lights')
def get_lights():
    return {'lights': LIGHTS}


@app.route('/thermostat')
def get_thermostat():
    return {'thermostat': THERMOSTAT}
