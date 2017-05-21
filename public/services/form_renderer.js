App.
factory('Form', function () {

    var Form = {
    };

    return {
        setFormValues: function (obj) {
            Form = obj;
        },
        getFormValues: function () {
            return Form;
        }
    };
});
