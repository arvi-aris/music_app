/*
 * Service to share formData/$scope across moduleControllers and AddController
 */
App.
factory('Form', function() {

    var Form = {};

    return {
        //setter
        setFormValues: function(obj) {
            Form = obj;
        },
        //getter
        getFormValues: function() {
            return Form;
        }
    };
});