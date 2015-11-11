angular.module('starter.services', [])

.factory('Chats', function($cordovaSQLite) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [];
  var chatObj = "0";

  
  return {
    all: function() {

      chats = [];

      $cordovaSQLite.execute(db, 'SELECT * FROM restaurante ORDER BY id DESC')
       .then(
          function(result) {
             if (result.rows.length > 0) {
                      for(var i = 0; i < result.rows.length; i++)
                      { 
                        chats.push({"id":result.rows.item(i).id,
                                    "nombre":result.rows.item(i).nombre,
                                    "descripcion":result.rows.item(i).descripcion,
                                    "precio":result.rows.item(i).precio});
                      }
                    }
                },
                function(error) {
                    statusMessage = "Error on loading: " + error.message;
                }
        );

      return chats;
    },
    remove: function(chat) {
      $cordovaSQLite.execute(db, 'DELETE FROM restaurante where id = ?',[chat.id])
      .then(function(result){
          statusMessage = "Borrado";
          chats.splice(chats.indexOf(chat), 1);
      },
      function(error){
          statusMessage = "Error: " + error.message;
      });
    },
    
    get: function(chatId) {

        chats = [];
        
        $cordovaSQLite.execute(db, 'SELECT * FROM restaurante where id = ?',[chatId])
       .then(
          function(result) {
               
             if (result.rows.length > 0) {
                        chats.push({"id":result.rows.item(0).id,
                                    "nombre":result.rows.item(0).nombre,
                                    "descripcion":result.rows.item(0).descripcion,
                                    "precio":result.rows.item(0).precio});                 
                
                    }
                    
                },
                function(error) {
                    statusMessage = "Error on loading: " + error.message;
                }
        );

      return chats;

    }

  };


  /*
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];
  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };*/
});