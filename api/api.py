#!/usr/bin/env python3
'''
Module that runs a simple Flask app for endpoints to get and update lights and a thermostat.
'''
import logging
import uuid

from flask import Flask, request

from data import LIGHTS, THERMOSTAT

logging.basicConfig(
    level=logging.DEBUG,
    format='%(levelname)-8s - %(asctime)s - %(name)s - %(message)s',
)

logger = logging.getLogger(__file__)

app = Flask(__name__)


def bad_request(msg):
    logger.error(msg)
    return msg, 400

@app.route('/lights/', defaults={'id': None}, methods=['POST', 'GET'])
@app.route('/lights/<id>', methods=['GET', 'PUT', 'DELETE'])
def lights(id):
    '''Handle GET, PUT, POST, and DELETE for /lights route.'''
    if request.method == 'GET':
        return get_lights(id)

    if request.method == 'PUT':
        return update_light(id, request.json)

    if request.method == 'DELETE':
        return delete_light(id)

    return post_lights(request.json)


def get_lights(id):
    '''Get all lights, or one light if id is specified.'''
    if not id:
        logger.debug('received get request for lights')
        return LIGHTS

    logger.debug('received get request for light: %s', id)
    return LIGHTS.get(id, {})


def update_light(id, data):
    '''Update value for a light by id.'''
    logger.debug('received update request for light: %s : %s', id, data)

    if not id:
        return bad_request('Update request missing required id')

    if id not in LIGHTS:
        return bad_request(f'No light found with id: "{id}"')

    for prop in ['status', 'name']:
        LIGHTS[id][prop] = data.get(prop, LIGHTS[id][prop])

    logger.debug('successfully updated light: %s : %s', id, data)
    return {id: LIGHTS[id]}


def delete_light(id):
    '''Delete light by id.'''
    logger.debug('received request to delete light: %s', id)

    if not id:
        return bad_request('missing required id with delete reqeust')

    del LIGHTS[id]

    logger.debug('successfully deleted light record: %s', id)
    return LIGHTS


def post_lights(data):
    '''Create a new light entry.'''
    logger.debug('received request to create new light record: %s', data)

    for prop in ['status', 'name']:
        if prop not in data:
            return bad_request(f'Request to create light missing "{prop}"')

    id = str(uuid.uuid4())

    new_light = {
        'name': data['name'],
        'status': data['status'],
    }

    LIGHTS[id] = new_light

    logger.debug('successfully created light record: %s', new_light)
    return {id: new_light}, 201


@app.route('/thermostat', methods=['GET', 'PUT'])
def get_thermostat():
    '''Get the current temperature value from the thermostat.'''

    if request.method == 'GET':
        logger.debug('received request for thermostat data')
        return THERMOSTAT

    logger.debug('received request to update thermostat data')

    target = request.json.get('target_temperature')

    if type(target) is not int:
        return bad_request('"target_temperature" must be an integer!')

    THERMOSTAT['target_temperature'] = target

    logger.debug('successfully updated thermostat data: %s', THERMOSTAT)
    return THERMOSTAT
