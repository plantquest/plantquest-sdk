

# Plantquest Python Geofence

class Geofence:
    def __init__(self, sdk, data = {}):
        self.sdk = sdk
        self.definition = {
          'name': 'geofence'
        }
        self.id = data.get('id') or ''
        self.data = data

    def handle_result(self, op, res, spec, handler):
        status = res['status']
        if(200 == status):
            json = res['json']

            return handler(json)
        else:
            raise Exception('HTTP-ERROR: ' + op + 'geofence: ' + str(statusCode))

    def create(self, data):
        op = 'create'
        self.data = data
        # TODO: validate data

        spec = self.sdk.fetchSpec(op, self)
        res = self.sdk.options['fetch'](spec['url'], spec)

        return self.handle_result(op, res, spec, lambda json: json)

    def save(self, data):
        op = 'save'
        self.data = data
        # TODO: validate data

        spec = self.sdk.fetchSpec(op, self)
        res = self.sdk.options['fetch'](spec['url'], spec)

        return self.handle_result(op, res, spec, lambda json: json)

    def load(self, data):
        op = 'load'
        self.data = data
        # TODO: validate data

        spec = self.sdk.fetchSpec(op, self)
        res = self.sdk.options['fetch'](spec['url'], spec)

        return self.handle_result(op, res, spec, lambda json: json)

    def list(self, data = {}):
        op = 'list'
        self.data = data
        # TODO: validate data

        spec = self.sdk.fetchSpec(op, self)
        res = self.sdk.options['fetch'](spec['url'], spec)

        return self.handle_result(op, res, spec, lambda json: json)


