App
.controller("AddController",function($scope,Form){

  $scope.form = Form.getFormValues();

  $scope.submit = function(){
    $scope.form.submitMethod($scope.form);
  }

});
