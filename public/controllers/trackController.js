App
.controller("TrackController",function($scope,Track_service,$location,$rootScope,Form,Paginator,growl){
      var list = Track_service.query({type:'tracks'},function() {
      $scope  = Paginator.init(list.results,$scope);
   });

   $scope.initPagination = function(clickEvent){
     $scope = (clickEvent.target.value === "before") ? Paginator.prev(list.results,$scope) :  (clickEvent.target.value === "next") ? Paginator.next(list.results,$scope) : $scope;
   };

   $scope.navigatetoGenre = function(){
     $location.url("/genres");
   };

   $scope.updateTrack = function(formData){
     formData.data.genres = formData.data.genres.split(',').map(function(elem){
       return parseInt(elem,10);
     })
     var list = Track_service.save({id:formData.data.id},formData.data,function() {
       growl.success('Track : '+ formData.data.title +' is updated', {ttl: 3000,disableCountDown: true});
       $location.url("/tracks");
    });
   };

   $scope.search = function(searchEvent){
     var searchValue = searchEvent.target.value;
     if(searchValue.trim() == ""){
       $scope  = Paginator.init(list.results,$scope);
       return;
     }
     var searchList = Track_service.get({title:searchValue},function() {
       $scope.list = searchList.results;
    });
   }

   $scope.searchTitle = function(keyEvent){
     if(keyEvent.keyCode != 13) return;
     var searchValue = keyEvent.target.value;
     if(searchValue.trim() == ""){
       $scope  = Paginator.init(list.results,$scope);
       return;
     }
     var searchList = Track_service.get({title:searchValue},function() {
       $scope.list = searchList.results;
    });
   }

   $scope.addTrack = function(){
     $location.url("/addTrack");
     Form.setFormValues({
       title:"Create new track",
       fieldsList:['title','rating','genres'],
       submitMethod:$scope.createTrack
     })
   };

   $scope.editTrack = function(track){
     var genre = [];
     track.genres = track.genres.length ? track.genres.map(function(elem){
       genre.push(elem.id);
     }) : "";
     track.genres = genre.join(",");
     Form.setFormValues({
       title:"Edit track : " + track.title,
       fieldsList:['title','rating','genres'],
       submitMethod:$scope.updateTrack,
       data:track
     })
     $location.url("/editTrack");
   };

   $scope.createTrack = function(formData) {
     formData.data.genres = formData.data.genres.split(',').map(function(elem){
       return parseInt(elem,10);
     })
     var list = Track_service.save(formData.data,function() {
       growl.success('New track : '+ formData.data.title + ' is added', {ttl: 3000,disableCountDown: true});
       $location.url("/tracks");
    });
   };

   $scope.range = function(max){
     var rangeArr = [];
     for(var i=1;i<=max;i++){
       rangeArr.push(i);
     }
     return rangeArr;
   }
});
console.log(App)
