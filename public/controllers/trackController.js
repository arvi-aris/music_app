/*
 * Controller for Track window
 * loads TrackList
 * Creates new Track
 * Edits Track
 * param      <$scope> 
 * param      <Track_service> { service to track operations }
 * param      <$location> 
 * param      <$rootScope>
 * param      <Form> { service to render form - shares scope to AddController }
 * param      <Paginator> { service for pagination }
 * param      <growl> { service for notification : third party plugin : http://janstevens.github.io/angular-growl-2/ }
 */
App
    .controller("TrackController", function($scope, Track_service, $location, $rootScope, Form, Paginator, growl) {
        /*
         * Loads track list
         */
        var list = Track_service.query({
            type: 'tracks'
        }, function() {
            //Init pagination 
            $scope = Paginator.init(list.results, $scope);
        }, function(error) {
            //Throws error
            growl.error("Something went wrong..", {
                ttl: 3000,
                disableCountDown: true
            })
        });
        /*
         *  Handles pagination
         *  param      {Object} <clickEvent> {Pagination Button click event}
         */
        $scope.initPagination = function(clickEvent) {
            $scope = (clickEvent.target.value === "before") ? Paginator.prev(list.results, $scope) : (clickEvent.target.value === "next") ? Paginator.next(list.results, $scope) : $scope;
        };
        /*
         * Loads Genres page
         */
        $scope.navigatetoGenre = function() {
            $location.url("/genres");
        };
        /*
         * Updates a track on save
         * param      {Object} <formData> { edited track's data }
         */
        $scope.updateTrack = function(formData) {
            //Converts genres to array if its a string or leave it as it is..
            formData.data.genres = (formData.data.genres.constructor !== Array) ? formData.data.genres.split(',').map(function(elem) {
                return parseInt(elem, 10);
            }) : formData.data.genres;
            //Service call to update track details..
            var list = Track_service.save({
                id: formData.data.id
            }, formData.data, function() {
                //Success notification
                growl.success('Track : ' + formData.data.title + ' is updated', {
                    ttl: 3000,
                    disableCountDown: true
                });
                $location.url("/tracks");
            }, function(error) {
                //Displays what went wrong..
                var field = Object.keys(error.data)[0];
                var message = error.data[field][0]
                growl.error(field + " : " + message, {
                    ttl: 3000,
                    disableCountDown: true
                })
            });
        };
        /*
         * Search on focusout event on search bar
         */
        $scope.search = function(searchEvent) {
            var searchValue = searchEvent.target.value;
            if (searchValue.trim() == "") {
                $scope = Paginator.init(list.results, $scope);
                return;
            }
            var searchList = Track_service.get({
                title: searchValue
            }, function() {
                $scope.list = searchList.results;
            });
        }
        /*
         * Search on enter key press..
         */
        $scope.searchTitle = function(keyEvent) {
            if (keyEvent.keyCode != 13) return;
            var searchValue = keyEvent.target.value;
            if (searchValue.trim() == "") {
                $scope = Paginator.init(list.results, $scope);
                return;
            }
            var searchList = Track_service.get({
                title: searchValue
            }, function() {
                $scope.list = searchList.results;
            }, function(error) {
                growl.error("Something went wrong..", {
                    ttl: 3000,
                    disableCountDown: true
                })
            });
        }
        /*
         * Loads add track page
         * shares data to addController
         */
        $scope.addTrack = function() {
            $location.url("/addTrack");
            Form.setFormValues({
                title: "Create new track",
                fieldsList: ['title', 'rating', 'genres'],
                submitMethod: $scope.createTrack
            })
        };
        /*
         * Loads edit track page
         * shares data to addController  
         */
        $scope.editTrack = function(track) {
            var genre = [];
            track.genres = track.genres.length ? track.genres.map(function(elem) {
                genre.push(elem.id);
            }) : "";
            track.genres = genre.join(",");
            Form.setFormValues({
                title: "Edit track : " + track.title,
                fieldsList: ['title', 'rating', 'genres'],
                submitMethod: $scope.updateTrack,
                data: track
            })
            $location.url("/editTrack");
        };
        /*
         * Creates a new track
         * param      {object} <formData> { formData shared by addController }
         */
        $scope.createTrack = function(formData) {
            //Converts genres to array if its a string or leave it as it is..
            formData.data.genres = (formData.data.genres.constructor !== Array) ? formData.data.genres.split(',').map(function(elem) {
                return parseInt(elem, 10);
            }) : formData.data.genres;
            //Invokes track service to create
            var list = Track_service.save(formData.data, function() {
                growl.success('New track : ' + formData.data.title + ' is added', {
                    ttl: 3000,
                    disableCountDown: true
                });
                $location.url("/tracks");
            }, function(error) {
                var field = Object.keys(error.data)[0];
                var message = error.data[field][0]
                growl.error(field + " : " + message, {
                    ttl: 3000,
                    disableCountDown: true
                })
            });
        };
        /*
         * Util to get range of stars to display rating of a track
         */
        $scope.range = function(max) {
            var rangeArr = [];
            for (var i = 1; i <= max; i++) {
                rangeArr.push(i);
            }
            return rangeArr;
        }
    });
console.log(App)