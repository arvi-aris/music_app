App
.controller("GenreController",function($scope,Genre_service,$location,$rootScope,Form,Paginator,growl){
    var list = Genre_service.query({type:'tracks'},function() {
      $scope  = Paginator.init(list.results,$scope);
   });

   $scope.paginate = function(clickEvent){
     $scope = (clickEvent.target.value === "before") ? Paginator.prev(list.results,$scope) :  (clickEvent.target.value === "next") ? Paginator.next(list.results,$scope) : $scope;
   };

   $scope.navigatetoTracks = function(){
     $location.url("/tracks");
   };

   $scope.updateGenre = function(formData){
     var list = Genre_service.save({id:formData.data.id},formData.data,function() {
       growl.success('Genre : '+ formData.data.name + ' is updated', {ttl: 3000,disableCountDown: true});
       $location.url("/genres");
    });
   };

   $scope.createGenre = function(formData){
     var list = Genre_service.save(formData.data,function() {
       growl.success('Genre '+ formData.data.name + ' is created', {ttl: 3000,disableCountDown: true});
       $location.url("/genres");
    });
   };

   $scope.addGenre = function(){
     $location.url("/addGenre");
     Form.setFormValues({
       title:"Create new genre",
       fieldsList:['name'],
       submitMethod:$scope.createGenre
     })

   };

   $scope.editGenre = function(genre){
     Form.setFormValues({
       title:"Edit genre : "+genre.name,
       fieldsList:['name'],
       submitMethod:$scope.updateGenre,
       data:genre
     })
     $location.url("/editGenre");
   };

});
console.log(App)
