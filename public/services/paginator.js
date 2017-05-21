/*
 * Pagination service
 * Calculates start and end indexes 
 */
App.
factory('Paginator', function() {
    return {
        init: function(list, scope) {
            scope.list = list.slice(0, 5);
            scope.index = 0;
            return scope
        },
        next: function(list, scope) {
            var totalLen = list.length;
            var nextIndex = (scope.index + 5 < totalLen) ? scope.index + 5 : scope.index;
            scope.list = list.slice(nextIndex, nextIndex + 5);
            scope.index = nextIndex;
            return scope;
        },
        prev: function(list, scope) {
            var totalLen = list.length;
            var previndex = (scope.index !== 0) ? scope.index - 5 : scope.index;
            scope.list = list.slice(previndex, previndex + 5);
            scope.index = previndex;
            return scope;
        }
    };
});