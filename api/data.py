import uuid

LIGHTS = [
    {
        'id': uuid.uuid4(),
        'name': 'Kitchen',
        'status': 1,
    },
    {
        'id': uuid.uuid4(),
        'name': 'Living Room',
        'status': 0,
    },
]

THERMOSTAT = {
    'current_temperature': 73,
    'target_temperature': 78,
}
