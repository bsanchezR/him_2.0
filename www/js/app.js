(function(){
var app =  angular.module('starter', ['ionic','ngCordova', 'starter.controllers', 'starter.services','onezone-datepicker','youtube-embed','igTruncate','ionic.rating','ionic-datepicker'])

app.run(function($ionicPlatform,Auten) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

// app.config(function (ionicDatePickerProvider) {
//     var datePickerObj = {
//       inputDate: new Date(),
//       titleLabel: 'Select a Date',
//       setLabel: 'Set',
//       todayLabel: 'Today',
//       closeLabel: 'Close',
//       mondayFirst: false,
//       weeksList: ["S", "M", "T", "W", "T", "F", "S"],
//       monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
//       templateType: 'popup',
//       from: new Date(1980, 8, 1),
//       to: new Date(2018, 8, 1),
//       showTodayButton: true,
//       dateFormat: 'dd MMMM yyyy',
//       closeOnSelect: false,
//       disableWeekdays: []
//     };
//     ionicDatePickerProvider.configDatePicker(datePickerObj);
//   });

app.config(function($ionicConfigProvider, $stateProvider, $urlRouterProvider, ionicDatePickerProvider) {

  var datePickerObj = {
        inputDate: new Date(),
        titleLabel: 'Selecciona una fecha',
        setLabel: 'Listo',
        todayLabel: 'Hoy',
        closeLabel: 'Cerrar',
        mondayFirst: false,
        weeksList: ["D", "L", "M", "M", "J", "V", "S"],
        monthsList: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"],
        templateType: 'popup',
        from: new Date(1980, 1, 1),
        to: new Date(2018, 8, 1),
        showTodayButton: true,
        dateFormat: 'dd MMMM yyyy',
        closeOnSelect: false,
        disableWeekdays: []
      };
      ionicDatePickerProvider.configDatePicker(datePickerObj);

   $ionicConfigProvider.tabs.position('bottom');



  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.backButton.previousTitleText(false);
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('login', {
    url: '/login',
    cache: false,
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('inicio', {
    url: '/inicio',
    cache: false,
    templateUrl: 'templates/inicio.html',
    controller: 'inicioCtrl'
  })

  .state('register', {
    url: '/register',
    cache: false,
    templateUrl: 'templates/register.html',
    controller: 'loginCtrl'
  })

    .state('tab', {
    url: '/tab',
    //abstract: true,
    cache: false,
    templateUrl: 'templates/tabs.html',
    controller: 'tabController'
  })
  // Each tab has its own nav history stack:
 .state('tab.articulos', {
    url: '/articulos',
    views: {
      'tab-articulos': {
        templateUrl: 'templates/tab-articulos.html',
        controller: 'DashCtrl'
      }
    }
  })
  .state('tab.articulo-completo', {
      url: '/articulos/:articuloId',
      views: {
        'tab-articulos': {
          templateUrl: 'templates/articulo-completo.html',
          controller: 'articuloCompletoCtrl'
        }
      }
    })
    .state('tab.articulos-guardados', {
        url: '/guardados',
        views: {
          'tab-articulos': {
            templateUrl: 'templates/articulos-guardados.html',
            controller: 'articulosGuardados'
          }
        }
      })
      .state('tab.articulo-completo-guardado', {
          url: '/guardados/:id',
          views: {
            'tab-articulos': {
              templateUrl: 'templates/articulo-completo-guardado.html',
              controller: 'articuloCompletoGuardado'
            }
          }
        })




  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
//    .state('tab.chat-detail', {
//      url: '/chats/:chatId',
//      views: {
//        'tab-chats': {
//          templateUrl: 'templates/chat-detail.html',
//          controller: 'ChatDetailCtrl'
//        }
//      }
//    })

.state('tab.calendario-detalle', {
    url: '/dia/:fecha',
    views: {
      'tab-account': {
        templateUrl: 'templates/calendario-detalle.html',
        controller: 'DiaCtrl'
      }
    }
  })


.state('tab.configuracion-calendario', {
    url: '/configuracion',
    views: {
      'tab-account': {
        templateUrl: 'templates/configuracion-calendario.html',
        controller: 'AccountCtrl'
      }
    }
  })



.state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('slide', {
      url: '/slide',
      cache: false,
      templateUrl: 'templates/slide.html',
      controller: 'slideCtrl'
    })

    .state('tab.config', {
          url: '/config',
          views: {
            'tab-config': {
              templateUrl: 'templates/tab-config.html',
              controller: 'ConfigCtrl'
            }
          }
        })
    .state('tab.mapa', {
              url: '/mapa',
              views: {
                'tab-mapa': {
                  templateUrl: 'templates/tab-mapa.html',
                  controller: 'MapaCtrl'
                }
              }
            })
    .state('tab.mapa-ficha', {
            url: '/mapa/:id_parada',
            views: {
              'tab-mapa': {
                templateUrl: 'templates/ficha.html',
                controller: 'fichaCtrl'
              }
            }
          })
      ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/inicio');

});


}());
