
(function(){
    var app =  angular.module('starter.services', [])

app.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
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
  };
});

app.factory('Preguntas', function(){
    var respuestaId = angular.fromJson(window.localStorage['respuestaId'] || '[]');

    function persist(){
        window.localStorage['respuestaId'] = angular.toJson(respuestaId);

    }

    return {
        list:function(){
              return respuestaId;
          },
        actualiza : function(res){
            respuestaId = res;
            persist();
        },
        delete : function(){
            respuestaId = '[]';
            persist();
        }
    };

} );




app.factory('Articulos', function() {

    var articulos = angular.fromJson(window.localStorage['articulos'] || '[]');

    function persist(){
        window.localStorage['articulos'] = angular.toJson(articulos);
    }

    return {
        all: function() {
            return articulos;
        },
        get: function(articuloId){
            for (var i = 0; i < articulos.length; i++) {
                if (articulos[i].id === parseInt(articuloId)) {
                    return articulos[i];
                }
            }
            return null;
        },
        post: function(art){
            console.log(art);
            console.log('servicios');
            articulos = art;
            persist();
        },
        remove: function(id){
            for(var i = 0 ; i<articulos.length; i++)
            {
                if(articulos[i].id === id){
                    articulos.splice(i,1)
                    persist();
                    return;
                }
            }
        },
    };
});




app.factory('Auten', function(){

    var aut = angular.fromJson(window.localStorage['aut'] || '[]');

    function persist(){
        window.localStorage['aut'] = angular.toJson(aut);
    }

    return {
        validar:function(){
              return aut;
          },
        crearSesion : function(res){
            aut = res;
            persist();
        },
        cerrarSesion : function(){
            aut = '';
            persist();
        }
    };

} );


app.factory('ConfiguracionFact', function(){

    var con = angular.fromJson(window.localStorage['con'] || '[]');

    function persist(){
        window.localStorage['con'] = angular.toJson(con);
    }

    return {
        gett :function(){
              return con;
          },
        postt : function(res){
            con = res;
            persist();
        }
    };

} );


app.factory('DiasFact', function(){

    var dias = angular.fromJson(window.localStorage['dias'] || '[]');

    function persist(){
        window.localStorage['dias'] = angular.toJson(dias);
    }

    return {
        all : function(){
            return dias;
        },
        get: function(fecha){
            console.log(fecha);
            for (var i = 0; i < dias.length; i++) {
                if (dias[i].dia === fecha) {
                    return dias[i];
                }
            }
            return null;
        },
        post : function(dia){
            dias.push(dia);
            persist();
        }
    };

} );


app.factory('ArticulosGuardados', function(){

    var articulosGuardados = angular.fromJson(window.localStorage['articulosGuardados'] || '[]');

    function persist(){
        window.localStorage['articulosGuardados'] = angular.toJson(articulosGuardados);
    }

    return {
        all : function(){
            return articulosGuardados;
        },
        get: function(id){
            console.log(id);
            for (var i = 0; i < articulosGuardados.length; i++) {
                if (articulosGuardados[i].id === parseInt(id)) {
                    return articulosGuardados[i];
                }
            }
            return null;
        },
        post : function(articulosGuardado){
            articulosGuardados.push(articulosGuardado);
            persist();
        },
        remove: function(id){
            for(var i = 0 ; i<articulos.length; i++)
            {
                if(articulos[i].id === id){
                    articulos.splice(i,1)
                    persist();
                    return;
                }
            }
        }
    };
} );


app.factory('ParadasFact', function(){

    var paradas = angular.fromJson(window.localStorage['paradas'] || '[]');
    var comentarios  =  new Array();
    var puntuacion  =  new Array();
    function persist(){
        window.localStorage['paradas'] = angular.toJson(paradas);
    }

    return {
        all : function(){
            return paradas;
        },
        putall : function(putParadas){
          paradas = putParadas;
          persist();
        },
        get: function(id_parada){
            for (var i = 0; i < paradas.length; i++) {
                if (paradas[i].id_parada === id_parada) {
                    return paradas[i];
                }
            }
            return null;
        },
        post : function(parada){
            paradas.push(parada);
            persist();
        },
        agregarCoemntario : function(id_parada, comentario){
            for (var i = 0; i < paradas.length; i++) {
                if (paradas[i].id_parada === id_parada) {
                    if(paradas[i].comentarios ==   ''){
                      comentarios.push(comentario);
                      paradas[i].comentarios = comentarios;
                    }
                    else{
                      paradas[i].comentarios.push(comentario);
                    }
                    console.log(paradas[i].comentarios);
                      persist();
                }
            }

          },
          agregarPuntuacion : function(id_parada, rate){
              for (var i = 0; i < paradas.length; i++) {
                  if (paradas[i].id_parada === id_parada) {
                      if(paradas[i].puntuacion ==   ''){
                        puntuacion.push(rate);
                        paradas[i].puntuacion = puntuacion;
                      }
                      else{
                        paradas[i].puntuacion.push(rate);
                      }
                      console.log(paradas[i].puntuacion);
                        persist();
                  }
              }

            },


    };

} );





    }());//fin de todo
