var app = angular.module('starter.controllers', [])

app.controller('DashCtrl', function($scope,$state,$http,Articulos,Auten,$cordovaFileTransfer) {
    $scope.articulos = Articulos.all();

    if (typeof Auten.validar().telefono != 'undefined')
    {
      console.log(Auten.validar());
    }
    else{
       $state.go('login');
    }

    $scope.CargarNuevosPost =  function()
    {
        var urlNuevosArticulos = 'http://www.birdev.mx/message_app/public/articulos';

        $http.get(urlNuevosArticulos)
        .success(function(posts){
            var nuevosArticulos = [];



            angular.forEach(posts.data,function(post){
                    nuevosArticulos.push(post);
            });

            //guardamos todo los nuevo en local
            $scope.articulos = nuevosArticulos;
            Articulos.post($scope.articulos);


//            angular.forEach(posts.data,function(post){
//                if(Articulos.get(post.id) == null ){
//                    console.log('entro');
//                    nuevosArticulos.push(post);
//                }
//            });
//
//            //guardamos todo los nuevo en local
//            $scope.articulos = nuevosArticulos.concat($scope.articulos);
//            Articulos.post($scope.articulos);

            //validamos los articulos que deben ser eliminados
//            var existe = null;
//            angular.forEach(Articulos.all() ,function(articulo){
//
//                for (var i = 0; i < posts.data.length; i++) {
//                    if (posts.data[i].id === parseInt(articulo.id)) {
//                        existe = posts.data[i];
//                    }
//                }
//
//                if(existe == null){
//                    Articulos.remove(articulo.id);
//                }
//            });
//
            $scope.$broadcast('scroll.refreshComplete');
        });
    };


    //vamos hacer pruebas de file con cordova
 // function testFileDownload(url) {
 //
 //  //utilidad para saber que plataforma estamos trabajando
 //  var deviceInformation = ionic.Platform.device();
 //  var isWebView = ionic.Platform.isWebView();
 //  var isIPad = ionic.Platform.isIPad();
 //  var isIOS = ionic.Platform.isIOS();
 //  var isAndroid = ionic.Platform.isAndroid();
 //  var isWindowsPhone = ionic.Platform.isWindowsPhone();
 //  var currentPlatform = ionic.Platform.platform();
 //  var currentPlatformVersion = ionic.Platform.version();
 //
 //
 //    console.log(deviceInformation);
 //    console.log(isAndroid);
 //    console.log(isWebView);
 //    console.log(isIOS);
 //    console.log(isIPad);
 //
 //
 //        // Function code goes here
 //        // File for download
 //        var url = "http://www.gajotres.net/wp-content/uploads/2015/04/logo_radni.png";
 //
 //        // File name only
 //        var filename = url.split("/").pop();
 //
 //
 //        // Save location
 //        var targetPath = cordova.file.externalRootDirectory + filename;
 //
 //        $cordovaFileTransfer.download(url, targetPath, {}, true).then(function (result) {
 //            console.log('Success');
 //        }, function (error) {
 //            console.log('Error');
 //        }, function (progress) {
 //            // PROGRESS HANDLING GOES HERE
 //        });
 //    }


});

app.controller('articuloCompletoCtrl', function($scope,$sce,Auten,ArticulosGuardados, $state,$stateParams, Articulos, $cordovaSocialSharing, $cordovaFileTransfer) {
  if (typeof Auten.validar().telefono != 'undefined')
    {
      console.log(Auten.validar());
    }
    else{
       $state.go('login');
    }

  $scope.articulo = Articulos.get($stateParams.articuloId);

  $scope.shareAnywhere = function() {
       $cordovaSocialSharing.share("Este es un mensaje", "Esto es mi asunto", "www/img/logo.png", "birdev.mx");
   }

  $scope.guardarArticulo = function(id){
      //ArticulosGuardados.
      console.log(id);
      var articulo = Articulos.get(id)
      ArticulosGuardados.post(articulo);

      //vamos hacer pruebas de file con cordova
      var url = "http://birdev.mx/message_app/public/images/"+articulo.images[0].ruta.split('/').pop();
      console.log(url);
      testFileDownload(url);
  }


  function testFileDownload(url)
  {


//     cordova.plugins.diagnostic.runtimePermission.WRITE_EXTERNAL_STORAGE
//     cordova.plugins.diagnostic.runtimePermission.READ_EXTERNAL_STORAGE
//
//
//
//
//
// cordova.plugins.diagnostic.requestRuntimePermission(function(status){
//     switch(status){
//         case cordova.plugins.diagnostic.runtimePermissionStatus.GRANTED:
//             console.log("Permission granted to use the camera");
//             break;
//         case cordova.plugins.diagnostic.runtimePermissionStatus.NOT_REQUESTED:
//             console.log("Permission to use the camera has not been requested yet");
//             break;
//         case cordova.plugins.diagnostic.runtimePermissionStatus.DENIED:
//             console.log("Permission denied to use the camera - ask again?");
//             break;
//         case cordova.plugins.diagnostic.runtimePermissionStatus.DENIED_ALWAYS:
//             console.log("Permission permanently denied to use the camera - guess we won't be using it then!");
//             break;
//     }
// }, function(error){
//     console.error("The following error occurred: "+error);
// }, cordova.plugins.diagnostic.runtimePermission.CAMERA);

   //utilidad para saber que plataforma estamos trabajando
   // var deviceInformation = ionic.Platform.device();
   // var isWebView = ionic.Platform.isWebView();
   // var isIPad = ionic.Platform.isIPad();
   // var isIOS = ionic.Platform.isIOS();
   // var isAndroid = ionic.Platform.isAndroid();
   // var isWindowsPhone = ionic.Platform.isWindowsPhone();
   // var currentPlatform = ionic.Platform.platform();
   // var currentPlatformVersion = ionic.Platform.version();
   //
   //
   //   console.log(deviceInformation);
   //   console.log(isAndroid);
   //   console.log(isWebView);
   //   console.log(isIOS);
   //   console.log(isIPad);


         //Function code goes here
         //File for download
         //var url = "http://www.gajotres.net/wp-content/uploads/2015/04/logo_radni.png";

         //File name only
         var filename = url.split("/").pop();


         // Save location
         var targetPath = cordova.file.externalRootDirectory+"/him/"+filename;

         $cordovaFileTransfer.download(url, targetPath, {}, true).then(function (result) {
             console.log('Success');
         }, function (error) {
             console.log(error);
         }, function (progress) {
             // PROGRESS HANDLING GOES HERE
             console.log(progress);
         });

         console.log(targetPath);

    // var url = "http://ngcordova.com/img/ngcordova-logo.png",
    //     filename = url.split("/").pop;
    //     targetPath = cordova.file.externalRootDirectory + filename;
    //     options = {},
    //     trustHosts = true;
    //
    // $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
    //   .then(
    //     function(result) {
    //       alert('Download success');
    //       refreshMedia.refresh(targetPath);
    //     },
    //     function(err) {
    //       alert('Error: ' + JSON.stringify(err));
    //     },
    //     function(progress) {
    //       // progressing download...
    //     }
    //   );



     }



});

app.controller('ChatsCtrl', function($scope, $state, Preguntas ,Auten,$http,$sce,$ionicPopup,$ionicLoading)
{
    if (typeof Auten.validar().telefono != 'undefined')
    {
      console.log(Auten.validar());
    }
    else{
       $state.go('login');
    }
    //constantes y cosas que se tienen que inicializar para el modulo
    $scope.nota =  {id: '', mensaje:''};
    $scope.respuesta = {id:'' , mensaje: ''};
    var link = 'http://www.birdev.mx/message_app/public/messages';
    var linkRespuesta = 'http://www.birdev.mx/message_app/public/response';

    $scope.respuesta.id = Preguntas.list();

    console.log("local : " + $scope.respuesta.id);

    $scope.actualiza = function(){
      linkGet = linkRespuesta +'/'+ $scope.respuesta.id;
      console.log($scope.respuesta);
       $http.get(linkGet).then(function successCallback(response) {
           $scope.respuesta.mensaje = response.data.data.mensaje;
           angular.forEach(response.data.children,function(response){
                  $scope.response.push(response.data);
                });

            //tenemos que elimiara el id o ponerlo vacio
           $scope.respuesta.id = '';
           Preguntas.actualiza( $scope.respuesta);


           $scope.$broadcast('scroll.refreshComplete');

        },function errorCallback(response) {
           $scope.$broadcast('scroll.refreshComplete');
           var alertPopup = $ionicPopup.alert({
             title: 'Oh no!!',
             template: 'Ahun no tenemos una respuesta para ti :('
           });
        });
    }

    $scope.enviar =  function()
    {
        //creamos el ide unico
        $scope.nota.id =  new Date().getTime().toString();

        $ionicLoading.show({
            template: 'Enviando...'
          }).then(function(){
             console.log("The loading indicator is now displayed");
          });

        $http.post(link, {telefono : Auten.validar().telefono, mensaje : $scope.nota.mensaje, identificador: $scope.nota.id, metodo : 'POST' }).then(function successCallback(res){
            $scope.response = res.data;
            $scope.respuesta.id =  $scope.nota.id;
            $scope.respuesta.mensaje =  '';
            $scope.nota.id = '';
            $scope.nota.mensaje = '';

            console.log("primer consol : " + $scope.respuesta.id);

            Preguntas.actualiza($scope.respuesta);
            var temp = Preguntas.list();
            //console.log('lista : '+Preguntas.list());
            console.log(temp);
            $ionicLoading.hide().then(function(){
              console.log("The loading indicator is now hidden");
            });

        },function errorCallback(response) {
          $ionicLoading.hide().then(function(){
              console.log("The loading indicator is now hidden");
          });
            var alertPopup = $ionicPopup.alert({
             title: 'Oh no!!',
             template: 'Ahun no tenemos una respuesta para ti :('
           });
          alertPopup.then(function(res) {
             console.log('Thank you for not eating my delicious ice cream cone');
           });
        });
    };
});


app.controller('ChatDetailCtrl', function($scope,Auten, $state,$stateParams, Chats) {
  if (typeof Auten.validar().telefono != 'undefined')
    {
      console.log(Auten.validar());
    }
    else{
       $state.go('login');
    }
  $scope.chat = Chats.get($stateParams.chatId);
});


//controlador de datos por cada dia
app.controller('DiaCtrl', function($scope,$state,Auten,DiasFact,$stateParams,$state, $location,   $ionicPopover) {
  //validacion de la sesion
  if (typeof Auten.validar().telefono != 'undefined')
    {
      console.log(Auten.validar());
    }
    else{
       $state.go('login');
    }

    //formateamos la fecha que fue seleccionada
    var fecha = new Date($stateParams.fecha);
    var day = fecha.getDate();
    var monthIndex = fecha.getMonth();
    var year = fecha.getFullYear();

    $scope.fecha = day + '/' + monthIndex + '/' + year;

    $scope.diaDatos = DiasFact.get($stateParams.fecha) || {inicioFin:"",relaciones : "" ,  usoMetodo : "", queMetodo :"" ,relaciones :"" , dia : $stateParams.fecha } ;

//    var dias = angular.fromJson(window.localStorage['dias'] || '[]');

    console.log('diaDatos');
    console.log($scope.diaDatos);

    $scope.guardaDia =  function()
    {
      DiasFact.post($scope.diaDatos);
      console.log( DiasFact.all());
      var temp = {date: new Date(fecha),color: '#000',textColor: '#fff'};
      $state.go('tab.account', {nuevoColor:'uno'});
    }


});

app.controller('AccountCtrl', function($scope,$state,Auten, $ionicPopup ,$location,ConfiguracionFact,$ionicHistory) {
    if (typeof Auten.validar().telefono != 'undefined')
    {
      console.log(Auten.validar());
    }
    else{
       $state.go('login');
    }

    if( typeof ConfiguracionFact.gett().inicio == 'undefined')
    {
      $scope.configuracionDatos = {inicio : '' ,peso: '', altura :  '',duraP :  '',duraS :  '', anti :  '' };
      $scope.calculo = [];
    }else{

      $scope.configuracionDatos = ConfiguracionFact.gett();
      $scope.configuracionDatos.inicio = new Date($scope.configuracionDatos.inicio);
      var alrevez = calcularDias($scope.configuracionDatos);
      $scope.calculo = alrevez;

      $state.go('tab.account');
    }

    console.log($state.nuevoColor);

      // $scope.configuracionDatos = ConfiguracionFact.gett();
      // $scope.onezoneDatepicker.highlights = calcularDias($scope.configuracionDatos);

    // creacion de variables



        //crea el objeto para el datepiker
//  $scope.onezoneDatepicker = {
//    date: date, // MANDATORY
//    mondayFirst: false,
//    months: months,
//    daysOfTheWeek: daysOfTheWeek,
//    startDate: startDate,
//    endDate: endDate,
//    disablePastDays: false,
//    disableSwipe: false,
//    disableWeekend: false,
//    disableDates: disableDates,
//    disableDaysOfWeek: disableDaysOfWeek,
//    showDatepicker: false,
//    showTodayButton: true,
//    calendarMode: false,
//    hideCancelButton: false,
//    hideSetButton: false,
//    highlights: highlights
//    callback: function(value){
//        // your code
//    }
//};
var meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
var dias = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];


// var hi = [
//     {
//         date: new Date('Sun Jun 06 2016 00:00:00 GMT-0500 (CDT)'),
//         color: '#8FD4D9',
//         textColor: '#fff'
//     },
//     {
//         date: new Date(2016, 5, 18)
//     },
//     {
//         date: new Date(2016, 5, 19)
//     },
//     {
//         date: new Date(2016, 5, 20)
//     }
// ];

    $scope.onezoneDatepicker = {
    date: new Date(),
    mondayFirst: false,
    months: meses,
    daysOfTheWeek: dias,
    disablePastDays: false,
    disableSwipe: true,
    disableWeekend: false,
    showDatepicker: true,
    showTodayButton: true,
    calendarMode: true,
    hideCancelButton: false,
    hideSetButton: false,
    highlights:  $scope.calculo,

    callback: function(value){
        console.log(value);
        pulsado(value);
    }
};

    $scope.irCalendario = function(){
      $state.go('tab.account');
    }

    $scope.configuracion =  function(){
      $state.go('tab.configuracion-calendario');

      console.log('*************  hacer ***************')
    }

    $scope.guardaConfiguracion = function(){
      console.log('vamos a guardar');
      console.log($scope.configuracionDatos);
      ConfiguracionFact.postt($scope.configuracionDatos);

       // $ionicHistory.nextViewOptions({
       //  disableBack: true
       // });
       $state.go('tab.account');
    }

    function pulsado(fecha)
    {
      // var nuevo  = { date: fecha, color: '#8FD4D9', textColor: '#fff'};
      // hi.push(nuevo);
      // console.log(hi)
      // $scope.onezoneDatepicker.highlights = hi;
        // $scope.onezoneDatepicker.highlights = [{
        //     date: fecha,
        //     color: '#8FD4D9',
        //     textColor: '#fff'
        //     }];
        $state.go('tab.calendario-detalle',{fecha : fecha});
    }


      var periodCycleDays ;
      var bleedingDays ;
      var fertilePhaseStart;
      var fertilePhaseEnd ;
      var ovulation ;

      var periodStartDate = new Date();



    function calcularDias(parametros)
    {

      periodCycleDays = parametros.duraP;
      bleedingDays = parametros.duraS;
      fertilePhaseStart = periodCycleDays - 20;
      fertilePhaseEnd = periodCycleDays - 13;
      ovulation = (fertilePhaseStart-1) + (fertilePhaseEnd - fertilePhaseStart)/2;

      periodStartDate = new Date(parametros.inicio);

      InitialEvents = createEventsForDate(periodStartDate);

      console.log(InitialEvents);


      return diasPintados(InitialEvents);
    }

    function createEventsForDate(date){
      var timeBetween = Math.abs((date.getTime()) - (periodStartDate.getTime()));
      var daysBetween = Math.ceil(timeBetween / (1000 * 3600 * 24));
      var cyclesBetween = Math.floor((daysBetween / periodCycleDays));
      var events = [];
      // Create next two events to handle multiple sets within one month
      for(var i=0;i<12;i++){
        var cycleDaysBetween = periodCycleDays * (cyclesBetween + i);
        var p = addDays(periodStartDate, cycleDaysBetween);
        var bleedingEnd = addDays(p, bleedingDays);
        var fertilePhaseStartDate = addDays(p, fertilePhaseStart);
        var fertilePhaseEndDate = addDays(p, fertilePhaseEnd);
        var ovulationDayStart = addDays(p, ovulation)
        var ovulationDayEnd = new Date(new Date(ovulationDayStart).setHours(23,59,59,999));
        events.push({
          "summary": "Period",
          "begin": p,
          "end": bleedingEnd
        });
        events.push({
          "summary": "Fertile",
          "begin": fertilePhaseStartDate,
          "end": fertilePhaseEndDate
        });
        events.push({
          "summary": "Ovulation",
          "begin": ovulationDayStart,
          "end": ovulationDayEnd
        });
      }
      return events;
    }

    function addDays(date, days){
      var d = new Date(date.valueOf());
      d.setDate(d.getDate() + days)
      d.setHours(0,0,0,0);  // set to start of day
      return d;
    }


    //background: repeating-linear-gradient(45deg,transparent,transparent 10px,#ccc 10px,#ccc 20px), linear-gradient( to bottom,#eee,#999);

  //  background: repeating-linear-gradient(45deg,#606dbc,#606dbc 10px,#465298 10px,#465298 20px);
    function diasPintados(InitialEvents){
      var fechaParaPintar = [];
      var fin;
      var inicio;
      InitialEvents.forEach(function(eventos)
      {
        // var desc = Object.getOwnPropertyDescriptor(o, name);
        // Object.defineProperty(copy, name, desc);
        //console.log(eventos.begin);

        inicio = eventos.begin.getTime();
        fin = eventos.end.getTime();


        for (var i = inicio; i < fin; i = i + 86400000) {

          if(eventos.summary == "Period"){
            var temp = { date: new Date(i),color: 'red',textColor: '#fff'};
            fechaParaPintar.push(temp);
          }else if(eventos.summary == "Fertile"){
            var temp = {date: new Date(i),color: '#DA0203',textColor: '#fff'};
            fechaParaPintar.push(temp);
          }else if(eventos.summary == "Ovulation"){
            var temp = {date: new Date(i),color: '#DA0203',textColor: '#fff'};
            fechaParaPintar.push(temp);
          }
        }
      });
      console.log(fin);
      inicio = InitialEvents[0].begin.getTime();
      console.log(inicio);
        for (var i = inicio; i < fin; i = i + 86400000) {
          var temp = {date: new Date(i),color: '#FBD504',textColor: '#fff'};
          fechaParaPintar.push(temp);
        }
      return fechaParaPintar;
    }
});

app.controller('loginCtrl' ,function($scope, Auten ,$http, $state, $ionicPopup,$state){
    //console.log(Auten.valida());
    if (typeof Auten.validar().telefono != 'undefined')
    {
       $state.go('tab.articulos');
    }
    document.getElementsByTagName("ion-nav-bar")[0].style.display = "block";
  $scope.aut = {telefono: '', pass :  '' };
  // $scope.nota =  {id: '', mensaje:''};

  $scope.registrar =  function(){
      $state.go("register");
  }

  $scope.guardar =  function(){
      console.log($scope.aut);
      if (typeof  $scope.aut.telefono == 'undefined' || typeof  $scope.aut.nombre == 'undefined')
      {
         mensajeError("Faltan campos por llenar");
         exit();
      }
      var url  = 'http://www.birdev.mx/message_app/public/user';
      $http.post(url, { telefono : $scope.aut.telefono, password: $scope.aut.pass, name : $scope.aut.nombre, apeP : $scope.aut.apeP, apeM : $scope.aut.apeM, edad : $scope.aut.edad, sexo : $scope.aut.sexo, nuevo : 1})
           .then(function successCallback(response)
           {
              console.log("Ya guardo");
              if(response.data.mensaje == -1)
              {
                accesoError();
              }
              else if(response.data.mensaje == 0)
              {
                accesoError();
              }
              else if(response.data.mensaje == 1)
              {
                  //Auten.crearSesion($scope.aut.telefono , $scope.aut.pass);
                  $state.go('login');
              }
        },function errorCallback(response) {
            accesoError();
        });
  }

  $scope.validar =  function(){
    var url  = 'http://www.birdev.mx/message_app/public/user';

      $http.post(url, { telefono : $scope.aut.telefono, password: $scope.aut.pass })
           .then(function successCallback(response)
           {
            if(response.data.mensaje == -1)
            {
              accesoError();
            }
            else if(response.data.mensaje == 0)
            {
              accesoError();
            }
            else
            {
                Auten.crearSesion($scope.aut);
                $state.go('tab.articulos');
            }
        },function errorCallback(response) {
            accesoError();
        });
  }

  function accesoError(){
    var alertPopup = $ionicPopup.alert({
       title: 'Oh no!!',
       template: 'El telefono o Contraseña son incorrectas :('
     });
  }

  function mensajeError(mensaje){
    var alertPopup = $ionicPopup.alert({
       title: 'Oh no!!',
       template: mensaje+' :('
     });
  }

});

app.controller('inicioCtrl', function($scope, Auten ,$http, $state, $ionicPopup,$state) {
  document.getElementsByTagName("ion-nav-bar")[0].style.display = "none";

  $scope.comienza =  function(){
      $state.go('slide');
  }

  $scope.login =  function(){
      $state.go('login');
  }

//activar en productivo
  // console.log("Device Ready")
  // var push = PushNotification.init({
  //   "android": {
  //     "senderID": "898342355996",
  //     "icon": 'iconName',  // Small icon file name without extension
  //     "iconColor": '#248BD0'
  //   },
  //   "ios": {"alert": "true", "badge": "true", "sound": "true"}, "windows": {} } );
  //
  // push.on('registration', function(data) {
  // console.log(data.registrationId);
  // $("#gcm_id").html(data.registrationId);
  // });
  //
  // push.on('notification', function(data) {
  // console.log(data.message);
  // alert(data.title+" Message: " +data.message);

  // data.title,
  // data.count,
  // data.sound,
  // data.image,
  // data.additionalData
  // });
  //
  // push.on('error', function(e) {
  // console.log(e.message);
  // });

  });

app.controller('slideCtrl', function($scope, Auten ,$http, $state, $ionicPopup,$state) {
  document.getElementsByTagName("ion-nav-bar")[0].style.display = "none";
  $scope.options = {
  loop: false,
  effect: 'fade',
  speed: 500,
  }

  $scope.$on("$ionicSlides.sliderInitialized", function(event, data){
    // data.slider is the instance of Swiper
    $scope.slider = data.slider;
  });

  $scope.$on("$ionicSlides.slideChangeStart", function(event, data){
    console.log('Slide change is beginning');
  });

  $scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
    // note: the indexes are 0-based
    $scope.activeIndex = data.slider.activeIndex;
    $scope.previousIndex = data.slider.previousIndex;
  });
});


app.controller('articulosGuardados', function($scope,ArticulosGuardados, Auten ,$http, $state, $ionicPopup,$state) {
  $scope.articulos = ArticulosGuardados.all();

  if (typeof Auten.validar().telefono != 'undefined')
  {
    console.log(Auten.validar());
  }
  else{
     $state.go('login');
  }

});


app.controller('articuloCompletoGuardado', function($scope,$sce,Auten,ArticulosGuardados, $state,$stateParams, Articulos, $cordovaSocialSharing) {
  if (typeof Auten.validar().telefono != 'undefined')
    {
      console.log(Auten.validar());
    }
    else{
       $state.go('login');
    }

  $scope.articulo = ArticulosGuardados.get($stateParams.id);

  $scope.shareAnywhere = function() {
       $cordovaSocialSharing.share("Este es un mensaje", "Esto es mi asunto", "www/img/logo.png", "birdev.mx");
   }

  $scope.guardarArticulo = function(id){
      //ArticulosGuardados.
  //     console.log(id);
  //     ArticulosGuardados.post(Articulos.get(id));
  }

});
