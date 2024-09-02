
import json

from dotenv import dotenv_values

import plantquest_sdk

from Fetch import fetch


def makeClient(config = {}):
    client = plantquest_sdk.PlantquestSDK.make({
        'endpoint': config['PLANTQUEST_ENDPOINT'],
        'apikey': config['PLANTQUEST_APIKEY'],
        'fetch': fetch
    })
    return client


def test_happy():
    config = dotenv_values('../.env.local')
    client = makeClient(config)
    
def test_asset():
    config = dotenv_values('../.env.local')
    client = makeClient(config)

    # create
    out = client.Asset().create({ 'title': 'T03' })
    print('create', out)
    assert out == {'id': 'n03', 'title': 'T03'}

    # save
    out = client.Asset().save({ 'id': 'n03', 'title': 'T03_3'})
    print('save', out)
    assert out == { 'id': 'n03', 'title': 'T03_3' }

    # load
    out = client.Asset().load({ 'id': 't01' })
    print('load', out)
    assert out == {'id': 't01', 'title': 'T01'}

    # list
    out = client.Asset().list()
    assert out['list'] != None and len(out['list']) != 0
    assert out['name'] == "asset"
    print('list', out)
    # raise Exception('4')


def test_geofence():
    config = dotenv_values('../.env.local')
    client = makeClient(config)

    # create
    out = client.Geofence().create({ 'title': 'T03' })
    print('create', out)
    assert out == {'id': 'n03', 'title': 'T03'}

    # save
    out = client.Geofence().save({ 'id': 'n03', 'title': 'T03_3'})
    print('save', out)
    assert out == { 'id': 'n03', 'title': 'T03_3' }

    # load
    out = client.Geofence().load({ 'id': 't01' })
    print('load', out)
    assert out == {'id': 't01', 'title': 'T01'}

    # list
    out = client.Geofence().list()
    assert out['list'] != None and len(out['list']) != 0
    assert out['name'] == "geofence"
    print('list', out)
    # raise Exception('4')


def test_room():
    config = dotenv_values('../.env.local')
    client = makeClient(config)

    # create
    out = client.Room().create({ 'title': 'T03' })
    print('create', out)
    assert out == {'id': 'n03', 'title': 'T03'}

    # save
    out = client.Room().save({ 'id': 'n03', 'title': 'T03_3'})
    print('save', out)
    assert out == { 'id': 'n03', 'title': 'T03_3' }

    # load
    out = client.Room().load({ 'id': 't01' })
    print('load', out)
    assert out == {'id': 't01', 'title': 'T01'}

    # list
    out = client.Room().list()
    assert out['list'] != None and len(out['list']) != 0
    assert out['name'] == "room"
    print('list', out)
    # raise Exception('4')

