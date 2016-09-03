var app = angular.module('starter.controllers', [])

app.controller('DashCtrl', function($ionicNavBarDelegate, $scope,$rootScope,$state,$http,Articulos,Auten,$cordovaFileTransfer) {
    document.getElementsByTagName("ion-header-bar")[0].style.display = "block";
    $scope.articulos = Articulos.all();
    console.log($scope.articulos);
    cargarPost();

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
            //console.log($scope.articulos);
            $scope.articulos = nuevosArticulos;
            Articulos.post($scope.articulos);
            $scope.$broadcast('scroll.refreshComplete');
        });
    };

    function cargarPost()
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
     });
    }

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

app.controller('articuloCompletoCtrl', function($scope,$sce,$ionicPopup,Auten,ArticulosGuardados, $state,$stateParams, Articulos, $cordovaSocialSharing, $cordovaFileTransfer) {
  if (typeof Auten.validar().telefono != 'undefined')
    {
      console.log(Auten.validar());
    }
    else{
       $state.go('login');
    }

  $scope.articulo = Articulos.get($stateParams.articuloId);

  $scope.shareAnywhere = function() {
        var comUrl = "http://www.birdev.mx/message_app/articulo.html?id=" +   $scope.articulo.id ;
       $cordovaSocialSharing.share("Te recomiendo este articulo", "Es muy bueno y te va a gustar", comUrl, comUrl);
   }

  $scope.guardarArticulo = function(id){
      //ArticulosGuardados.
      console.log("valida articulo" + ArticulosGuardados.get(id));
      var articulo;
      if(!ArticulosGuardados.get(id)){
        articulo = Articulos.get(id)
        ArticulosGuardados.post(articulo);
        var alertPopup = $ionicPopup.alert({
           title: '¡Listo!',
           template: 'El artículo ha sido guardado !!'
         });
      }else{
        var alertPopup = $ionicPopup.alert({
           title: '¡Oh no!',
           template: 'El artículo que intentas guardar ya esta guardado'
         });
      }

      //vamos hacer pruebas de file con cordova
      var url = "http://birdev.mx/message_app/public/images/"+articulo.images[0].ruta.split('/').pop();
      testFileDownload(url);
  }


  function testFileDownload(url)
  {

    cordova.plugins.diagnostic.requestCameraAuthorization(function(status){
        console.log("Successfully requested camera authorization: authorization was " + status);
        //alert("Checado");
        //checkState();
        var filename = url.split("/").pop();


        // Save location
        var targetPath = cordova.file.externalRootDirectory+"him/"+filename;
        console.log(targetPath);
        $cordovaFileTransfer.download(url, targetPath, {}, true).then(function (result) {
            console.log('Success');
        }, function (error) {
            console.log(error);
        }, function (progress) {
            // PROGRESS HANDLING GOES HERE
            console.log(progress);
        });

    }, function(error){
        console.error(error);
        //alert("no checado");
    });

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

    var fechaActual = new Date();
    var hora = fechaActual.getHours();

    if(hora >= 18 || hora < 9)
    {
        var alertPopup = $ionicPopup.alert({
           title: '¡Oh no!',
           template: 'El horario de atención es de 9 a 18 horas puedes mandarnos tu pregunta pero esta sera respuesta apartir de las 9 horas. Gracias'
         });
    }

    var urlHist = 'http://www.birdev.mx/message_app/public/historial/';
    console.log(Auten.validar());
    $http.get(urlHist+Auten.validar().telefono)
    .success(function(data){
        Preguntas.actualiza(data.data);
        $scope.mensajes = Preguntas.list();
    });

    $scope.mensajes = Preguntas.list();


    //constantes y cosas que se tienen que inicializar para el modulo
    $scope.nota =  {id: '', mensaje:''};
    $scope.respuesta = {id:'' , mensaje: ''};
    var link = 'http://www.birdev.mx/message_app/public/messages';
    var linkRespuesta = 'http://www.birdev.mx/message_app/public/response';
    var linkHist = 'http://www.birdev.mx/message_app/public/historial';

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

           $http.get(urlHist+Auten.validar().telefono)
           .success(function(data){
               Preguntas.actualiza(data.data);
               $scope.mensajes = Preguntas.list();
           });



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


            $http.get(urlHist+Auten.validar().telefono)
            .success(function(data){
              Preguntas.actualiza(data.data);
              $scope.mensajes = Preguntas.list();
            });



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

app.controller('AccountCtrl', function($scope,$state,Auten, $ionicPopup ,$location,ConfiguracionFact) {
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
            var temp = { date: new Date(i),color: '#DA0203',textColor: '#fff'};
            fechaParaPintar.push(temp);
          }else if(eventos.summary == "Fertile"){
            var temp = {date: new Date(i),color: '#ff9900',textColor: '#fff'};
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

app.controller('tabController' ,function($scope, Auten ,$http, $state, $ionicPopup,$state)
{
    //console.log("log", Auten.validar());
    if(Auten.validar().sexo == 'm')
    {
        $scope.rels=false;
    }
    else
    {
        $scope.rels=true;
      //  console.log("articulo",$scope.rels);
    }
});

app.controller('loginCtrl' ,function($ionicNavBarDelegate, $scope, Auten ,$http, $state, $ionicPopup,$state){

  //activar en productivo

    var gcmid;
    console.log("Device Ready")
    var push = PushNotification.init({
      "android": {
        "senderID": "898342355996",
        "icon": 'iconName',  // Small icon file name without extension
        "iconColor": '#248BD0'
      },
      "ios": {"alert": "true", "badge": "true", "sound": "true"}, "windows": {} } );
    push.on('registration', function(data) {
    console.log(data.registrationId);
    gcmid = data.registrationId;
    $("#gcm_id").html(data.registrationId);
    });

    push.on('notification', function(data) {
      console.log(data.message);
      alert(data.title+" Message: " +data.message);

      data.title,
      data.count,
      data.sound,
      data.image,
      data.additionalData
    });

    push.on('error', function(e) {
    console.log(e.message);
    });


  document.getElementsByTagName("ion-header-bar")[0].style.display = "block";
    $ionicNavBarDelegate.showBackButton(true);
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
      if (typeof  $scope.aut.telefono == 'undefined' || typeof  $scope.aut.usuario == 'undefined')
      {
         mensajeError("Faltan campos por llenar");
         return;
      }

      var edad =  calEdad($scope.aut.fecha);

      var url  = 'http://www.birdev.mx/message_app/public/user';
      // $http.post(url, { telefono : $scope.aut.telefono, password: $scope.aut.pass, name : $scope.aut.nombre, apeP : $scope.aut.apeP, apeM : $scope.aut.apeM, edad : $scope.aut.edad, sexo : $scope.aut.sexo, nuevo : 1, gcm_id : gcmid })
        $http.post(url, { telefono : $scope.aut.telefono, password: $scope.aut.pass, usuario : $scope.aut.usuario, edad : edad, sexo : $scope.aut.sexo, nuevo : 1, gcm_id : gcmid })
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
  //  console.log(gcmid);
      $http.post(url, { telefono : $scope.aut.telefono, password: $scope.aut.pass , gcm_id : gcmid })
           .then(function successCallback(response)
           {
             console.log(response.data);
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
                $scope.aut.sexo= response.data.data.sexo;
                // if($scope.aut.sexo == 'm')
                // {
                //     $scope.variable=false;
                //     $scope.rels=false;
                // }
                // if($scope.aut.sexo == 'f')
                // {
                //     $scope.rels=true;
                //     $scope.variable=true;
                // }
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
       title: 'Espera !!',
       template: mensaje
     });
  }

  function calEdad(fecha){
    console.log(fecha);



var dia = fecha.getDate();
var mes = fecha.getMonth();
var ano = fecha.getYear();

fecha_hoy = new Date();
ahora_ano = fecha_hoy.getYear();
ahora_mes = fecha_hoy.getMonth();
ahora_dia = fecha_hoy.getDate();

edad = (ahora_ano + 1900) - ano;

	if ( ahora_mes < (mes - 1)){
	  edad--;
	}
	if (((mes - 1) == ahora_mes) && (ahora_dia < dia)){
	  edad--;
	}
	if (edad > 1900){
		edad -= 1900;
	}

	alert("¡Tienes " + edad + " años!");

return edad;

  }

});

app.controller('inicioCtrl', function($ionicNavBarDelegate, $scope, Auten ,$http, $state, $ionicPopup,$state, $ionicHistory) {

  document.getElementsByTagName("ion-nav-bar")[0].style.display = "none";
  $ionicNavBarDelegate.showBackButton(false);
  $scope.comienza =  function(){
      $state.go('slide');
  }

  $scope.login =  function(){
      $state.go('login');
  }
//
// <<<<<<< HEAD
// =======
// //activar en productivo
//   console.log("Device Ready")
//   var push = PushNotification.init({
//     "android": {
//       "senderID": "898342355996",
//       "icon": 'iconName',  // Small icon file name without extension
//       "iconColor": '#248BD0'
//     },º
//     "ios": {"alert": "true", "badge": "true", "sound": "true"}, "windows": {} } );
//
//   push.on('registration', function(data) {
//   console.log(data.registrationId);
//   $("#gcm_id").html(data.registrationId);
//   });
//
//   push.on('notification', function(data) {
//   console.log(data.message);
//   alert(data.title+" Message: " +data.message);
//
//   data.title,
//   data.count,
//   data.sound,
//   data.image,
//   data.additionalData
//   });
//
//   push.on('error', function(e) {
//   console.log(e.message);
//   });
//
// >>>>>>> qa
  });

app.controller('slideCtrl', function($scope, Auten ,$http, $state, $ionicPopup,$state) {
  document.getElementsByTagName("ion-nav-bar")[0].style.display = "none";
  $scope.options = {
  loop: false,
  //effect: 'cube',
  speed: 500,
  }

  $scope.irlogin = function ()
  {
    $state.go('login');
  }

  $scope.$on("$ionicSlides.sliderInitialized", function(event, data){
    // data.slider is the instance of Swiper
    $scope.slider = data.slider;
    console.log(data.slider);
  });

  $scope.$on("$ionicSlides.slideChangeStart", function(event, data){
    console.log('Slide change is beginning');
  });

  $scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
    // note: the indexes are 0-based
    $scope.activeIndex = data.slider.activeIndex;
    $scope.previousIndex = data.slider.previousIndex;
    // if(data.slider.isEnd)
    // {
    //
    // }
    console.log(data.slider.isEnd);
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


  $scope.imgSrc =  "file:///storage/emulated/0//him/" + $scope.articulo.images[0].ruta.split('/').pop();
  // $scope.imgSrc =  cordova.file.dataDirectory +"him/"+ $scope.articulo.images[0].ruta.split('/').pop();

  $scope.shareAnywhere = function() {
        var comUrl = "http://www.birdev.mx/message_app/articulo.html?id=" +   $scope.articulo.id ;
       $cordovaSocialSharing.share("Te recomiendo este articulo", "Es muy bueno y te va a gustar", comUrl, comUrl );
   }
});


app.controller('ConfigCtrl', function($scope,$sce,Auten,Preguntas,ArticulosGuardados, $state,$stateParams, Articulos, $cordovaSocialSharing,$ionicHistory) {
  $scope.cerrar =  function(){
     Auten.cerrarSesion();
     Preguntas.delete();
     $ionicHistory.clearCache().then(function()
     {
       $state.go('login');
     });
  }
});


//
// <?php
// $to="ebbjjHzXzvo:APA91bHavOf29c5vFh5gSgn7E_qOg_9PXfLKX-Gz36rrgPkLeNh-uH7h6_1HA4S-LnzvnVeu17UfYdwno-byNXsCI3sQvGFBidtncflSSqvmA-MKU7E3OPZfIhlZHctpCkljihcIdbrV";
// $title="Hola yo 2";
// $message="Este es un mensaje para yo";
//
// $to2 = "crrAOfDofEk:APA91bHNWcRQNu_VOY9VBXK3D1velsew-mCeFlWMYzKEoigZctkvOLAMrhA4Z4d5zsvIGpWsRCrOS8NkleKpiKljirkprIH1zLrzLSLSEYUbh-j4WwdBWrM47mct28D0GxEi5SGE0zVz";
// $title2="Hola maria";
// $message2="si jala esa maria la del barrio";
//
// $to3 = "e8pLfJ5QfkI:APA91bHbybrs582yq6MWU60KD-5rTzL6a7U1MzWAZ7v-qGE65dVmK-YKv-pAd-Eqm8xj2YGV4J-fFFaEffizW2Qb78kf8DaOr0OI39DFto51VKtqmrxb9sD8y3uulm0BRbQ33f1xF2H1";
// $title3="a huevo puto duy";
// $message3="Este es un mensaje para duy";
//
//
//
// sendPush($to,$title,$message);
// sendPush($to2,$title2,$message2);
// sendPush($to3,$title3,$message3);
//
// function sendPush($to,$title,$message)
// {
// // API access key from Google API's Console
// // replace API
// define( 'API_ACCESS_KEY', 'AIzaSyCXWLGR0Pg1jGk52C7kVRjPOnkwRCCcMs4');
// $registrationIds = array($to);
// $msg = array
// (
// 'message' => $message,
// 'title' => $title,
// 'vibrate' => 1,
// 'sound' => 1
// // you can also add images, additionalData
// );
// $fields = array
// (
// 'registration_ids' => $registrationIds,
// 'data' => $msg
// );
// $headers = array
// (
// 'Authorization: key=' . API_ACCESS_KEY,
// 'Content-Type: application/json'
// );
// $ch = curl_init();
// curl_setopt( $ch,CURLOPT_URL, 'https://android.googleapis.com/gcm/send' );
// curl_setopt( $ch,CURLOPT_POST, true );
// curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
// curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
// curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
// curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode( $fields ) );
// $result = curl_exec($ch );
// curl_close( $ch );
// echo $result;
// }
// ?>
//
// <?php
//
// //phpinfo()
//
//  ?>
