/*
 *  Services for CRUD operations in Track and Genre modules..
 */
App
    .factory('Track_service', ['$resource', function($resource) {
        return $resource('//104.197.128.152:8000/v1/tracks/:id', {
            method: 'POST',
            isArray: false
        }, {
            'query': {
                method: 'GET'
            }
        }, {
            'save': {
                method: 'POST'
            }
        }, {
            update: {
                method: 'PUT' 
            }
        });
    }])
    .factory('Genre_service', ['$resource', function($resource) {
        return $resource('//104.197.128.152:8000/v1/genres/:id', {
            method: 'POST',
            isArray: false
        }, {
            'query': {
                method: 'GET'
            }
        }, {
            'save': {
                method: 'POST'
            }
        }, {
            update: {
                method: 'PUT' 
            }
        });
    }]);