/*
 * Common controller for Addition and Update operations
 * Gets the values to be rendered from Form service
 */
App
    .controller("AddController", function($scope, Form) {

        $scope.form = Form.getFormValues();
        /*
         * Passes current scope values to respective controller methods
         */
        $scope.submit = function() {
            $scope.form.submitMethod($scope.form);
        }

    });