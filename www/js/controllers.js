angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$ionicPopup, $timeout,$cordovaSQLite) {
    
    $scope.showAlert = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Restaurante',
       template: 'Datos guardados'
     });
    }
    
    $scope.guardar = function(persona){
        
        $cordovaSQLite.execute(db, 'INSERT INTO restaurante (nombre,descripcion,precio) VALUES (?,?,?)', [persona.nombre,persona.descripcion,persona.precio])
        .then(function(result) {
            $scope.statusMessage = "Registro guardado!";
        }, function(error) {
            $scope.statusMessage = "Error al guardar: " + error.message;
        })
        
        /*
        console.log("Nombre: "+persona.nombre);
        console.log("Descripcion: "+persona.descripcion);
        console.log("Precio: "+persona.precio);
        */
    }
    
})

.controller('ChatsCtrl', function($scope, Chats,$cordovaSQLite) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  //$scope.chats = [];
  
  /*
  $cordovaSQLite.execute(db, 'SELECT * FROM restaurante ORDER BY id DESC')
       .then(
          function(result) {
             if (result.rows.length > 0) {
                      for(var i = 0; i < result.rows.length; i++)
                      { 
                        $scope.chats.push({"nombre":result.rows.item(i).nombre,
                                    "descripcion":result.rows.item(i).descripcion,
                                    "precio":result.rows.item(i).precio});
                      }
                    }
                },
                function(error) {
                    $scope.statusMessage = "Error on loading: " + error.message;
                }
        );
  */

  $scope.getAll = function()
  {
      $scope.chats = Chats.all();
  };
  
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats,$cordovaSQLite) {
  //alert($stateParams.chatId);
  //alert(Chats.get($stateParams.chatId));
  //$scope.chat = Chats.get($stateParams.chatId);
  
  $scope.persona = Chats.get($stateParams.chatId);
  
  $scope.guardar=function(persona){
      
      $cordovaSQLite.execute(db,'UPDATE restaurante set nombre=?,descripcion=?,precio=? where id =?',[persona.nombre,persona.descripcion,persona.precio,persona.id])
      .then(function(result){
         $scope.statusMessage="Registro guardado!";
      },function(error){
           $scope.statusMessage="Error al guardar:"+ error.message;
      })
      
      console.log("Nombre:" +persona.nombre);
      console.log("ID:" +persona.id);
  }
  
  
  
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});