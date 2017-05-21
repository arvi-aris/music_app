/*
 * Controller for Genre window
 * loads genreList
 * Creates new genre
 * Edits genre
 * param      <$scope> 
 * param      <Genre_service> { service to genre operations }
 * param      <$location> 
 * param      <$rootScope>
 * param      <Form> { service to render form - shares scope to AddController }
 * param      <Paginator> { service for pagination }
 * param      <growl> { service for notification : third party plugin : http://janstevens.github.io/angular-growl-2/ }
 */
App
    .controller("GenreController", function($scope, Genre_service, $location, $rootScope, Form, Paginator, growl) {
        /*
         * loads genres list
         */
        var list = Genre_service.query({
            type: 'tracks'
        }, function() {
            // Init pagination once the list is ready
            $scope = Paginator.init(list.results, $scope);
        }, function(error) {
            //throws error on failure
            growl.error("Something went wrong..", {
                ttl: 3000,
                disableCountDown: true
            })
        });
        /*
         * Handles pagination
         */
        $scope.paginate = function(clickEvent) {
            $scope = (clickEvent.target.value === "before") ? Paginator.prev(list.results, $scope) : (clickEvent.target.value === "next") ? Paginator.next(list.results, $scope) : $scope;
        };
        /*
         * Loads tracks page
         */
        $scope.navigatetoTracks = function() {
            $location.url("/tracks");
        };
        /*
         * Updates a genre on save
         * param      {Object} <formData> { edited genre's data }
         */
        $scope.updateGenre = function(formData) {
            //Invokes Genre_service
            var list = Genre_service.save({
                id: formData.data.id
            }, formData.data, function() {
                // Notifies success 
                growl.success('Genre : ' + formData.data.name + ' is updated', {
                    ttl: 3000,
                    disableCountDown: true
                });
                $location.url("/genres");
            }, function(error) {
                // Displays what went wrong..
                var field = Object.keys(error.data)[0];
                var message = error.data[field][0]
                growl.error(field + " : " + message, {
                    ttl: 3000,
                    disableCountDown: true
                })
            });
        };
        /*
         * Creates a new genre
         * param      {Object} <formData> { new genre form data }
         */
        $scope.createGenre = function(formData) {
            // Invokes Genre_service
            var list = Genre_service.save(formData.data, function() {
                // Notifies success 
                growl.success('Genre ' + formData.data.name + ' is created', {
                    ttl: 3000,
                    disableCountDown: true
                });
                $location.url("/genres");
            }, function(error) {
                // Displays what went wrong..
                var field = Object.keys(error.data)[0];
                var message = error.data[field][0]
                growl.error(field + " : " + message, {
                    ttl: 3000,
                    disableCountDown: true
                })
            });
        };  
        /*
         * Loads genre add window
         * shares scope to Addcontroller
         */
        $scope.addGenre = function() {
            $location.url("/addGenre");
            Form.setFormValues({
                title: "Create new genre",
                fieldsList: ['name'],
                submitMethod: $scope.createGenre
            })

        };
        /*
         * Loads genre edit window
         * shares scope to Addcontroller
         */
        $scope.editGenre = function(genre) {
            Form.setFormValues({
                title: "Edit genre : " + genre.name,
                fieldsList: ['name'],
                submitMethod: $scope.updateGenre,
                data: genre
            })
            $location.url("/editGenre");
        };

    });
