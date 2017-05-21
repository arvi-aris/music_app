App
.factory('Track_service', ['$resource', function ($resource) {
    return $resource('http://104.197.128.152:8000/v1/tracks/:id',
                    {method: 'POST', isArray: false },
                    {'query': { method: 'GET' }},
                    {'save': { method: 'POST' }},
                    {update: {
                       method: 'PUT' // this method issues a PUT request
                     }}
                    );
}])
.factory('Genre_service', ['$resource', function ($resource) {
    return $resource('http://104.197.128.152:8000/v1/genres/:id',
                    {method: 'POST', isArray: false },
                    {'query': { method: 'GET' }},
                    {'save': { method: 'POST' }},
                    {update: {
                       method: 'PUT' // this method issues a PUT request
                     }}
                    );
}]);