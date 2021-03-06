var app = angular.module('starter.controllers', [])

app.controller('DashCtrl', function($ionicNavBarDelegate, $scope,$rootScope,$state,$http,Articulos,Auten,$cordovaFileTransfer) {
    document.getElementsByTagName("ion-header-bar")[0].style.display = "block";
    $scope.articulos = Articulos.all();
    console.log($scope.articulos);
    cargarPost();

    $scope.CargarNuevosPost =  function()
    {
        var urlNuevosArticulos = 'http://www.preb.mx/message_app/public/articulos';
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
      var urlNuevosArticulos = 'http://www.preb.mx/message_app/public/articulos';
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
       var comUrl = "http://www.preb.mx/message_app/public/articulo.html?id=" +   $scope.articulo.id ;
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
      var url = "http://www.preb.mx/message_app/public/images/"+articulo.images[0].ruta.split('/').pop();
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
           template: 'El horario de atención es de 9:00 a 18:00 horas, puedes mandarnos tu pregunta pero esta será contestada a partir de las 9:00 horas. Gracias.'
         });
    }

    var urlHist = 'http://www.preb.mx/message_app/public/historial/';
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
    var link = 'http://www.preb.mx/message_app/public/messages';
    var linkRespuesta = 'http://www.preb.mx/message_app/public/response';
    var linkHist = 'http://www.preb.mx/message_app/public/historial';

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
             template: 'Aún no tenemos una respuesta para ti :('
           });
        });
    }

    $scope.enviar =  function()
    {
        //creamos el ide unico
        $scope.nota.id =  new Date().getTime().toString();


        if($scope.nota.mensaje ==  ''){
          var alertPopup = $ionicPopup.alert({
            title: 'Oh no!!',
            template: 'Intenta escribiendo un mensaje  :)'
          });
        }
        else{
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
             template: 'Tú mensaje no puede ser enviado por el momento intenta mas tarde :('
           });
          alertPopup.then(function(res) {
             console.log('Thank you for not eating my delicious ice cream cone');
           });
        });
      }
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

app.controller('AccountCtrl', function($scope,$state,Auten, $ionicPopup ,$location,ConfiguracionFact,ionicDatePicker) {
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
      $scope.configuracionDatos.inicio = fechaCorta(new Date($scope.configuracionDatos.inicio));
      var alrevez = calcularDias($scope.configuracionDatos);
      $scope.calculo = alrevez;

      $state.go('tab.account');
    }

      function fechaCorta(fecha){
          return (fecha.getMonth() + 1) +
          "/" +  fecha.getDate() +
          "/" +  fecha.getFullYear();
      }


    var ipObj1 = {
          callback: function (val) {  //Mandatory
            console.log('Return value from the datepicker popup is : ' + val, new Date(val));
            $scope.configuracionDatos.inicio = fechaCorta(new Date(val)) ;
          },
          from: new Date(1980, 1, 1), //Optional
          to: new Date(2018, 10, 30), //Optional
          inputDate: new Date(),      //Optional
          dateFormat: 'dd MMMM yyyy',
          mondayFirst: true,          //Optional
          closeOnSelect: false,       //Optional
          templateType: 'popup'       //Optional
        };

        $scope.openDatePicker = function(){
          console.log("aca");
          ionicDatePicker.openDatePicker(ipObj1);
        };

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
      //ovulation = (parametros.duraP/2) + 1;

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
    // if(Auten.validar().sexo == 'm')
    // {
    //     $scope.rels=false;
    // }
    // else
    // {
    //     $scope.rels=true;
    //   //  console.log("articulo",$scope.rels);
    // }
    console.log("Calendario");
    $scope.rels=Auten.validar().show;
    console.log($scope.rels);
});

app.controller('loginCtrl' ,function($ionicNavBarDelegate, $scope, Auten ,$http, $state, $ionicPopup,$state, ionicDatePicker){

  //activar en productivo

    var gcmid="";
  //   console.log("Device Ready")
  //   var push = PushNotification.init({
  //     "android": {
  //       "senderID": "898342355996",
  //       "icon": 'iconName',  // Small icon file name without extension
  //       "iconColor": '#248BD0'
  //     },
  //     "ios": {"alert": "true", "badge": "true", "sound": "true"}, "windows": {} } );
  //   push.on('registration', function(data) {
  //   console.log(data.registrationId);
  //   gcmid = data.registrationId;
  //   $("#gcm_id").html(data.registrationId);
  //   });
  //
  //   push.on('notification', function(data) {
  //     console.log(data.message);
  //     alert(data.title+" Message: " +data.message);
  //
  //     data.title,
  //     data.count,
  //     data.sound,
  //     data.image,
  //     data.additionalData
  //   });
  //
  //   push.on('error', function(e) {
  //   console.log(e.message);
  // });


  var ipObj1 = {
        callback: function (val) {  //Mandatory
          console.log('Return value from the datepicker popup is : ' + val, new Date(val));
          $scope.aut.fecha = fechaCorta(new Date(val))
          console.log(fechaCorta(new Date(val)));
        },
        from: new Date(1980, 1, 1), //Optional
        to: new Date(2018, 10, 30), //Optional
        inputDate: new Date(),      //Optional
        dateFormat: 'dd MMMM yyyy',
        mondayFirst: true,          //Optional
        closeOnSelect: false,       //Optional
        templateType: 'popup'       //Optional
      };

      $scope.openDatePicker = function(){
        console.log("aca");
        ionicDatePicker.openDatePicker(ipObj1);
      };



      function fechaCorta(fecha){
          return (fecha.getMonth() + 1) +
          "/" +  fecha.getDate() +
          "/" +  fecha.getFullYear();
      }


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
      if (typeof  $scope.aut.telefono == 'undefined' || typeof  $scope.aut.usuario == 'undefined' || typeof  $scope.aut.plantel == 'undefined' || typeof  $scope.aut.semestre == 'undefined' || typeof  $scope.aut.sexo == 'undefined')
      {
         mensajeError("Faltan campos por llenar");
         return;
      }

      //var edad =  calEdad($scope.aut.fecha);



      var url  = 'http://www.preb.mx/message_app/public/user';
      // $http.post(url, { telefono : $scope.aut.telefono, password: $scope.aut.pass, name : $scope.aut.nombre, apeP : $scope.aut.apeP, apeM : $scope.aut.apeM, edad : $scope.aut.edad, sexo : $scope.aut.sexo, nuevo : 1, gcm_id : gcmid })
        $http.post(url, { telefono : $scope.aut.telefono, password: $scope.aut.pass, name : $scope.aut.usuario, fecha :  $scope.aut.fecha, sexo : $scope.aut.sexo , plantel : $scope.aut.plantel, semestre : $scope.aut.semestre, nuevo : 1, gcm_id : gcmid, mobile:1 })
           .then(function successCallback(response)
           {
              console.log("Ya guardo");
              if(response.data.mensaje == -1)
              {
                mensajeError(response.data.message);
              }
              else if(response.data.mensaje == 0)
              {
                mensajeError(response.data.message);
              }
              else if(response.data.mensaje == 1)
              {
                  //Auten.crearSesion($scope.aut.telefono , $scope.aut.pass);
                  $state.go('login');
              }
        },function errorCallback(response) {
            mensajeError(response.data.message);
        });
  }

  $scope.validar =  function(){
    var url  = 'http://www.preb.mx/message_app/public/user';
  //  console.log(gcmid);
      $http.post(url, { telefono : $scope.aut.telefono, password: $scope.aut.pass , gcm_id : gcmid })
           .then(function successCallback(response)
           {
             console.log(response.data);
            if(response.data.mensaje == -1)
            {
              mensajeError(response.data.message);
            }
            else if(response.data.mensaje == 0)
            {
              mensajeError(response.data.message);
            }
            else
            {
                $scope.aut.sexo= response.data.data.sexo;
                $scope.aut.id= response.data.data.id;
                if($scope.aut.sexo == 'm')
                {
                    $scope.aut.show = false;
                }
                if($scope.aut.sexo == 'f')
                {
                    $scope.aut.show = true;
                }
                Auten.crearSesion($scope.aut);
                console.log(Auten.validar());
                $state.go('tab',{},{reload:true});
            }
        },function errorCallback(response) {
            console.log(response);
            mensajeError(response.data.message);
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
       title: '¡ Espera !',
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

	//alert("¡Tienes " + edad + " años!");

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
        var comUrl = "http://www.preb.mx/dashboard/articulo.html?id=" +   $scope.articulo.id ;
       $cordovaSocialSharing.share("Te recomiendo este articulo", "Es muy bueno y te va a gustar", comUrl, comUrl );
   }
});


app.controller('ConfigCtrl', function($scope,$sce,Auten,Preguntas,ArticulosGuardados, $state,$stateParams, Articulos, $http, $cordovaSocialSharing,$ionicHistory,ParadasFact) {

  $scope.cerrar =  function()
  {
     var ids = Auten.validar().id;

     Auten.cerrarSesion();
     Preguntas.delete();
     ParadasFact.delete();

     $ionicHistory.clearCache().then(function()
     {
       var url  = 'http://www.preb.mx/message_app/public/user';
         $http.post(url, { mobile : 1, metodo: 'UPDATE' , id : ids })
              .then(function successCallback(response)
              {
                $state.go('login');
              },
              function errorCallback(response) {
                 console.log("sin internet");
                 $state.go('login');
              });
     });
  }
});

app.controller('MapaCtrl',function($scope,$state,$cordovaGeolocation,$stateParams,$ionicModal,$http,$ionicPopup,ParadasFact,ParadasPrivadas,Auten) {

    gps();
    function gps()
    {
      cordova.plugins.diagnostic.isLocationEnabled(function(enabled)
      {
        if(enabled)
        {
          console.log("GSP activado");
          carga_mapa();
        }
        else
        {
          pregunta();
        }
      },
      function(error)
      {
          console.error("The following error occurred: "+error);
      });
    }
    function pregunta()
    {
        var confirmPopup = $ionicPopup.confirm(
        {
          title: 'Oh no !!',
          template: 'El GPS no esta activado, activalo y da click en Ok para actualizar el mapa'
        });
       confirmPopup.then(function(res)
       {
         if(res)
         {
           gps();
         }
        else
        {
           pregunta();
        }
      });
    }
    function carga_mapa()
    {
      var latLng = new google.maps.LatLng(19.046777, -98.208727);
      $scope.nuevaP =  {id_parada: '', nombre:'', descripcion : '', lat : '' , lng : '', puntuacion : '', id_usuario : '', tipo : '', color : '', comentarios : ''  };
      $scope.nuevaP.lat =  $scope.lat;
      $scope.nuevaP.lng =  $scope.lng;
      var nuevasParadas = [];
      var nuevaParada =  {id_parada: '', nombre:'', descripcion : '', lat : '' , lng : '', puntuacion : '', id_usuario : '', tipo : '', color : '', comentarios : ''  };
      $http.get('http://www.preb.mx/message_app/public/paradas')
      .success(function(paradas)
      {
        console.log(paradas);
        angular.forEach(paradas.data,function(post)
        {
                 nuevaParada.id_parada =  post.parada;
                 nuevaParada.nombre =  post.titulo;
                 nuevaParada.descripcion = post.descripcion;
                 nuevaParada.lat =  post.lat;
                 nuevaParada.lng =  post.lng;
                 nuevaParada.id_usuario =  post.id_usuario;
                 nuevaParada.tipo =  post.tipo;
                 nuevasParadas.push(nuevaParada);
                 nuevaParada =  {id_parada: '', nombre:'', descripcion : '', lat : '' , lng : '', puntuacion : '', id_usuario : '', tipo : '', color : '', comentarios : ''  };
         });
         console.log(nuevasParadas);
         ParadasFact.putall(nuevasParadas);
         $scope.paradas =  ParadasFact.all();
      },
      function errorCallback(response)
      {
        console.log('Sin conexión');
        $scope.paradas =  ParadasFact.all();
      });
      var nuevasParadasp = [];
      var nuevaParadap =  {id_parada: '', nombre:'', descripcion : '', lat : '' , lng : '', puntuacion : '', id_usuario : '', tipo : '', color : '', comentarios : ''  };
      $http.get('  http://www.preb.mx/message_app/public/paradas/'+Auten.validar().id)
      .success(function(paradas)
      {
             angular.forEach(paradas.data,function(post){
             nuevaParadap.id_parada =  post.parada;
             nuevaParadap.nombre =  post.titulo;
             nuevaParadap.descripcion = post.descripcion;
             nuevaParadap.lat =  post.lat;
             nuevaParadap.lng =  post.lng;
             nuevaParadap.id_usuario =  post.id_usuario;
             nuevaParadap.tipo =  post.tipo;
             nuevasParadasp.push(nuevaParadap);
             nuevaParadap =  {id_parada: '', nombre:'', descripcion : '', lat : '' , lng : '', puntuacion : '', id_usuario : '', tipo : '', color : '', comentarios : ''  };
         });
         ParadasPrivadas.putall(nuevasParadasp);
         $scope.paradasp =  ParadasPrivadas.all();
         recorrerParadas();
      },
      function errorCallback(response) {
        console.log('Sin conexión');
        $scope.paradas =  ParadasFact.all();
        recorrerParadas();
      });
      if(Auten.validar().sexo == 'm')
       var image  = 'img/pines/preB4.png';
      if(Auten.validar().sexo == 'f')
       var image  = 'img/pines/preB3.png';
      $scope.paradas =  ParadasFact.all();
      var marker,usuario;
      var infoWindow = new google.maps.InfoWindow();
      var info ;
      var  alertaActiva =  false;
      var mapOptions =
      {
        center: latLng,
        disableDefaultUI: true,
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
      function recorrerParadas()
      {
        for (var i = 0; i < $scope.paradas.length; i++)
        {
          info = crearInfo($scope.paradas[i]);
          agregarMarca(marker,$scope.paradas[i].lat, $scope.paradas[i].lng,infoWindow,info,$scope.paradas[i].tipo);
        }
        for (var i = 0; i < $scope.paradasp.length; i++)
        {
          info = crearInfo($scope.paradasp[i]);
          agregarMarca(marker,$scope.paradasp[i].lat, $scope.paradasp[i].lng,infoWindow,info,$scope.paradasp[i].tipo);
        }
      }
      google.maps.event.addListenerOnce($scope.map, 'idle', function()
      {
        recorrerParadas();
        var direction = 1;
        var rMin = 5, rMax = 30;
      });
      function crearInfo(parada)
      {
        var contentString =
        '<div id="content">'+
          '<div id="siteNotice">'+
          '</div>'+
          '<h1 style="text-align:center;" id="firstHeading" class="firstHeading">'+ parada.nombre +'</h1>'+
          '<div id="bodyContent" style="text-align:center;">';
          contentString +=  '<a class="button button-calm" href="#/tab/mapa/'+parada.id_parada+'">Ver ficha completa</a>'
                            '</div>'+
                          '</div>';
        return contentString;
      }
      function getTotal(parada)
      {
          var totalRate   = 0;
          var acumulador  = 0;
          var promedio    = 0;
          $http.get('http://www.preb.mx/message_app/public/rates/1474064460846')
          .success(function(rates)
          {
            if(rates.data > 0)
            {
              angular.forEach(rates.data,function(rate){
                console.log('rate');
                console.log(rate);
                acumulador =  acumulador + rate.rate;
                promedio++;
               });
               //sacamos el promedio simple
                 totalRate = acumulador /  promedio;
                 acumulador = 0;
                 promedio = 0;
                 return totalRate;
            }
            else
            {
              return 'Sin puntuar';
            }
          },
          function errorCallback(response)
          {
            console.log('Sin conexión');
          });
        }
        function agregarMarca(marker,lat,lng,infoWindow,info,tipo)
        {
          var icono = 'img/flag.png';
          if(tipo == 1)
          {
              icono = 'img/pines/preB2.png';
          }
          else if(tipo == 2)
          {
              icono = 'img/pines/preB1.png';
          }
          else if(tipo == 3)
          {
            icono = 'img/pines/preB5.png';
          }
          marker = new google.maps.Marker(
            {
              position: new google.maps.LatLng(lat, lng),
              map: $scope.map,
              icon: icono,
              animation: google.maps.Animation.DROP
            });
          google.maps.event.addListener(marker, 'click', (function()
          {
            return function()
            {
              infoWindow.setContent(info);
              infoWindow.open($scope.map, marker);
            }
          })(marker));
        }
        $ionicModal.fromTemplateUrl('templates/addLocation.html',
        {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function(modal)
        {
            $scope.modal = modal;
        });
          $scope.preb =  function()
          {
             $scope.desc="Kondoparadas→ Son establecimientos en donde te proporcionan métodos anticonceptivos (condones, pastillas del día siguiente, DIU, etc.), ya sean centros de salud, consultorios o farmacias, públicas o privadas. Las Kondoparadas las puedes compartir, visitar, puntuarlos y comentar tus experiencias en ellos, es muy importante que si las visitas las “evalúes” ya que eso ayudará a la comunidad a acudir a las mejores.";
             $scope.tipo_parada = 1;
             $scope.modal.show();
             $('.btn').removeClass('animacionVer');
             control = true;
          }
          $scope.gim =  function()
          {
            $scope.desc="Gym´s del autoestima→ Son lugares que te ayudan a sentirte bien. En donde puedes disfrutar el paisaje, pasar buenos momentos con tus amigos o familiares, comer algo delicioso, jugar, hacer deporte o lo que más te guste. Los Gym´s los puedes compartir, visitar, puntuarlos y comentar tus experiencias en ellos.";
             $scope.tipo_parada = 2;
             $scope.modal.show();
             $('.btn').removeClass('animacionVer');
             control = true;
          }
          $scope.punto =  function()
          {
            $scope.desc="PuntosR→ Son lugares en donde has tenido (o tienes) relaciones sexuales. Los PuntosR no se comparten, pero te ayudará a encontrar más fácil las Kondoparadas y protegerte.";
             $scope.tipo_parada = 3;
             $scope.modal.show();
             $('.btn').removeClass('animacionVer');
             control = true;
          }
          $scope.guardarParada = function()
          {
            $scope.modal.hide();
            if(validarParada())
            {
              $scope.nuevaP.id_parada   =  '' + new Date().getTime();
              $scope.nuevaP.id_usuario  =  Auten.validar().telefono;
              $scope.nuevaP.tipo = $scope.tipo_parada;
              $scope.nuevaP.color =  '#fff';
              $scope.nuevaP.puntuacion = '';
              $scope.nuevaP.lat=$scope.lat;
              $scope.nuevaP.lng=$scope.lng;
              ParadasFact.post($scope.nuevaP);
              var nueva_parada;
              var url  = 'http://www.preb.mx/message_app/public/paradas';
              $http.post(url, { parada : $scope.nuevaP.id_parada, titulo : $scope.nuevaP.nombre , metodo: 'POST' , tipo : $scope.nuevaP.tipo, color : $scope.nuevaP.color, descripcion : $scope.nuevaP.descripcion, lat : $scope.nuevaP.lat, lng: $scope.nuevaP.lng, id_usuario : Auten.validar().id })
                 .then(function successCallback(response)
                 {
                   console.log("parada guardada");
                   console.log(response);
                 },
                 function errorCallback(response) {
                    console.log("error");
                 });
              info = crearInfo($scope.nuevaP);
              agregarMarca(marker,$scope.nuevaP.lat,$scope.nuevaP.lng,infoWindow,info,$scope.nuevaP.tipo);
               $scope.nuevaP =  {id_parada: '', nombre:'', descripcion : '', lat : '' , lng : '', puntuacion : '', id_usuario : '', tipo : '', color : '', comentarios : ''  };
               $scope.nuevaP.lat =  $scope.lat;
               $scope.nuevaP.lng =  $scope.lng;
            }
           };
           $scope.locate = function()
           {
            $cordovaGeolocation
              .getCurrentPosition()
              .then(function (position) {
                $scope.map.center.lat  = position.coords.latitude;
                $scope.map.center.lng = position.coords.longitude;
                $scope.map.center.zoom = 15;
                usuario = new google.maps.Marker(
                {
                  position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                  map: $scope.map,
                  animation: google.maps.Animation.DROP,
                  focus: true,
                  draggable: false
                });
              }, function(err)
              {
                console.log("Location error!");
                console.log(err);
              });
           };
           $scope.animacion =  function()
           {
             if(control){
               $('.btn').addClass('animacionVer');
               control = false;
             }
             else {
               $('.btn').removeClass('animacionVer');
               control = true;
             }
           }
           var markerPrincipal = null;
           var cityCircle =  null;
           function cambioAlerta()
           {
             alertaActiva =  false;
           }
           function validarParada()
           {
             var flag=true;
             for (var i = 0; i < $scope.paradas.length; i++)
             {
               var puntoCompara = new google.maps.LatLng($scope.paradas[i].lat,$scope.paradas[i].lng)
               if (google.maps.geometry.spherical.computeDistanceBetween( puntoCompara , cityCircle.getCenter()) <= cityCircle.getRadius())
               {
                 flag=false;
                 if(!alertaActiva)
                 {
                   alertaActiva = true;
                   var alertPopup = $ionicPopup.alert({
                     title: '¡Oh no!',
                     template: 'Cuidado parece que estas cerca de una parada, valída que no sea la misma.'
                   });
                   alertPopup.then(function(res) {
                     console.log('Thank you for not eating my delicious ice cream cone');
                   });
                 }
               }
             }
             return flag;
           }
           var al_inicio=true;
           function autoUpdate()
           {
             navigator.geolocation.getCurrentPosition(function(position)
             {
               $scope.lat =  position.coords.latitude;
               $scope.lng = position.coords.longitude;
               var newPoint = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

               $http.get('http://www.preb.mx/message_app/public/paradas')
               .success(function(paradas){
                 console.log(paradas.count, ParadasFact.all().length);
                 if(paradas.count > ParadasFact.all().length)
                 {
                     console.log('entro');
                    angular.forEach(paradas.data,function(post)
                    {
                       if(ParadasFact.get(post.parada) == null)
                       {
                         var nuevaParadap =  {id_parada: '', nombre:'', descripcion : '', lat : '' , lng : '', puntuacion : '', id_usuario : '', tipo : '', color : '', comentarios : ''  };
                         nuevaParadap.id_parada =  post.parada;
                         nuevaParadap.nombre =  post.titulo;
                         nuevaParadap.descripcion = post.descripcion;
                         nuevaParadap.lat =  post.lat;
                         nuevaParadap.lng =  post.lng;
                         nuevaParadap.id_usuario =  post.id_usuario;
                         nuevaParadap.tipo =  post.tipo;
                         ParadasFact.post(nuevaParadap);
                         info = crearInfo(nuevaParadap);
                         console.log(ParadasFact.get(post.paradas),post);
                         agregarMarca(marker,post.lat,post.lng,infoWindow,info,post.tipo);
                       }
                     });
                 }
               },
               function errorCallback(response) {
                 console.log('Sin conexión');
                 $scope.paradas =  ParadasFact.all();

               });

               if (markerPrincipal)
               {
                 markerPrincipal.setPosition(newPoint);
                 for (var i = 0; i < $scope.paradas.length; i++)
                 {
                   if($scope.paradas[i].tipo == 3 )
                   {
                     console.log('entra ?');
                     var puntoCompara = new google.maps.LatLng($scope.paradas[i].lat,$scope.paradas[i].lng)
                     if (google.maps.geometry.spherical.computeDistanceBetween( puntoCompara , cityCircle.getCenter()) <= cityCircle.getRadius())
                     {
                       if(!alertaActiva)
                       {
                       }
                     }
                   }
                 }
               }
               else
               {
                 markerPrincipal = new google.maps.Marker({
                   position: newPoint,
                   map: $scope.map,
                   icon: image
                 });
                 cityCircle = new google.maps.Circle({
                     strokeColor: '#FF0000',
                     strokeOpacity: 0.8,
                     strokeWeight: 1,
                     fillColor: '#FF0000',
                     fillOpacity: 0.35,
                     map: $scope.map,
                     center: newPoint,
                     radius: 20
                   });
               }
               $scope.map.setCenter(newPoint);
               cityCircle.setCenter(newPoint);
             });
             console.log('llamada');
             console.log(alertaActiva);
               setTimeout(autoUpdate, 5000);
           }
           autoUpdate();
    }
});


app.controller('Mapa2Ctrl',function($scope,$state,$cordovaGeolocation,$stateParams,$ionicModal,$http,$ionicPopup,ParadasFact,ParadasPrivadas,Auten) {

  if (typeof Auten.validar().telefono != 'undefined')
    {
      console.log(Auten.validar());
    }
    else{
       $state.go('login');
    }

    prendido_gps();
    console.log('primer');


     var control = true;
     $scope.lat  =  19.058926;
     $scope.lng  = -98.253135;


    //  $scope.$on( "$ionicView.afterEnter", function( scopes, states ) {
    //             // google.maps.event.trigger( $scope.map, 'resize' );
    //             //var latLng = new google.maps.LatLng(19.046777, -98.208727);
    //             console.log('mapa resize');
    //             var mapOptions = {
    //               center: {lat: 19.046777, lng: -98.208727},
    //               disableDefaultUI: true,
    //               zoom: 17,
    //               mapTypeId: google.maps.MapTypeId.ROADMAP
    //             };
     //
    //             $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    //             google.maps.event.trigger( $scope.map, 'resize' );
    //          });

     var latLng = new google.maps.LatLng(19.046777, -98.208727);

     $scope.nuevaP =  {id_parada: '', nombre:'', descripcion : '', lat : '' , lng : '', puntuacion : '', id_usuario : '', tipo : '', color : '', comentarios : ''  };
     $scope.nuevaP.lat =  $scope.lat;
     $scope.nuevaP.lng =  $scope.lng;

     console.log('segundo');

     //variables para crear el arreglo de paradas
     var nuevasParadas = [];
     var nuevaParada =  {id_parada: '', nombre:'', descripcion : '', lat : '' , lng : '', puntuacion : '', id_usuario : '', tipo : '', color : '', comentarios : ''  };

     $http.get('http://www.preb.mx/message_app/public/paradas')
     .success(function(paradas){
       console.log(paradas);
       angular.forEach(paradas.data,function(post){
                //armar la parada local
                nuevaParada.id_parada =  post.parada;
                nuevaParada.nombre =  post.titulo;
                nuevaParada.descripcion = post.descripcion;
                nuevaParada.lat =  post.lat;
                nuevaParada.lng =  post.lng;
                nuevaParada.id_usuario =  post.id_usuario;
                nuevaParada.tipo =  post.tipo;

                nuevasParadas.push(nuevaParada);
                //limpiamos la parada
                nuevaParada =  {id_parada: '', nombre:'', descripcion : '', lat : '' , lng : '', puntuacion : '', id_usuario : '', tipo : '', color : '', comentarios : ''  };
        });
        console.log(nuevasParadas);
        ParadasFact.putall(nuevasParadas);
        $scope.paradas =  ParadasFact.all();

     },
     function errorCallback(response) {
       console.log('Sin conexión');
       $scope.paradas =  ParadasFact.all();

     });

     console.log('tercer');
     var nuevasParadasp = [];
     var nuevaParadap =  {id_parada: '', nombre:'', descripcion : '', lat : '' , lng : '', puntuacion : '', id_usuario : '', tipo : '', color : '', comentarios : ''  };

     $http.get('  http://www.preb.mx/message_app/public/paradas/'+Auten.validar().id)
     .success(function(paradas){

       angular.forEach(paradas.data,function(post){
                //armar la parada local
                nuevaParadap.id_parada =  post.parada;
                nuevaParadap.nombre =  post.titulo;
                nuevaParadap.descripcion = post.descripcion;
                nuevaParadap.lat =  post.lat;
                nuevaParadap.lng =  post.lng;
                nuevaParadap.id_usuario =  post.id_usuario;
                nuevaParadap.tipo =  post.tipo;
                nuevasParadasp.push(nuevaParadap);
                nuevaParadap =  {id_parada: '', nombre:'', descripcion : '', lat : '' , lng : '', puntuacion : '', id_usuario : '', tipo : '', color : '', comentarios : ''  };
        });
        ParadasPrivadas.putall(nuevasParadasp);
        $scope.paradasp =  ParadasPrivadas.all();
        recorrerParadas();
     },
     function errorCallback(response) {
       console.log('Sin conexión');
       $scope.paradas =  ParadasFact.all();
       recorrerParadas();
     });


/*

    http://www.birdev.mx/message_app/public/paradas  -> obtiene todas las paradas


    http://www.birdev.mx/message_app/public/paradas/id   -> obtiene las paradas tipo 3 del usuario con el id especificado


    http://www.birdev.mx/message_app/public/comentarios/id -> obtiene los comentarios de la parada con el id especificado


    http://www.birdev.mx/message_app/public/rates/id -> obtiene los rates de la parada con el id especificado

*/

      console.log('cuarto');

     if(Auten.validar().sexo == 'm')
      var image  = 'img/pines/preB4.png';
     if(Auten.validar().sexo == 'f')
      var image  = 'img/pines/preB3.png';

     console.log($scope.paradas);
     $scope.paradas =  ParadasFact.all();
     var marker,usuario;
     var infoWindow = new google.maps.InfoWindow();
     var info ;
     var  alertaActiva =  false;



      var mapOptions = {
        center: latLng,
        disableDefaultUI: true,
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      function recorrerParadas(){
        //recorremos todos los puntos que tenesmos
        for (var i = 0; i < $scope.paradas.length; i++) {
          info = crearInfo($scope.paradas[i]);
          agregarMarca(marker,$scope.paradas[i].lat, $scope.paradas[i].lng,infoWindow,info,$scope.paradas[i].tipo);
        }

        for (var i = 0; i < $scope.paradasp.length; i++) {
          info = crearInfo($scope.paradasp[i]);
          agregarMarca(marker,$scope.paradasp[i].lat, $scope.paradasp[i].lng,infoWindow,info,$scope.paradasp[i].tipo);
        }
      }
      console.log('quinto');


      //Wait until the map is loaded
      google.maps.event.addListenerOnce($scope.map, 'idle', function(){
        recorrerParadas();

        var direction = 1;
        var rMin = 5, rMax = 30;
        // setInterval(function() {
        //     var radius = cityCircle.getRadius();
        //     if ((radius > rMax) || (radius < rMin)) {
        //         //direction *= -1;
        //         cityCircle.setRadius(5);
        //     }else{
        //       cityCircle.setRadius(radius + direction * 1);
        //     }
        //
        // }, 50);


      });

      function crearInfo(parada){

        var contentString =
        '<div id="content">'+
          '<div id="siteNotice">'+
          '</div>'+
          '<h1 style="text-align:center;" id="firstHeading" class="firstHeading">'+ parada.nombre +'</h1>'+
          '<div id="bodyContent" style="text-align:center;">';
          // if(parada.tipo != 3){
          //   contentString += '<p>'+((parada.puntuacion == '') ? " Sin puntuar" : getTotal(parada))+'</p>';
          // }
          // if(parada.tipo != 3){
          //   contentString += '<p>'+ getTotal(parada)+'</p>';
          // }
          contentString +=  '<a class="button button-calm" href="#/tab/mapa/'+parada.id_parada+'">Ver ficha completa</a>'
                            '</div>'+
                          '</div>';

        return contentString;
        }

        function getTotal(parada)
        {
          var totalRate   = 0;
          var acumulador  = 0;
          var promedio    = 0;

          console.log('calculara rate');

          $http.get('http://www.preb.mx/message_app/public/rates/1474064460846')
          .success(function(rates){
            console.log(rates);
            if(rates.data > 0){
              angular.forEach(rates.data,function(rate){
                console.log('rate');
                console.log(rate);
                acumulador =  acumulador + rate.rate;
                promedio++;
               });
               //sacamos el promedio simple
                 totalRate = acumulador /  promedio;
                 acumulador = 0;
                 promedio = 0;
                 return totalRate;
            }else{
              return 'Sin puntuar';
            }


          },
          function errorCallback(response) {
            console.log('Sin conexión');

          });
          //
          // //limpiara para despues
          // if(parada.puntuacion !=  ""){
          //   for (var i = 0; i <   parada.puntuacion.length; i++) {
          //     acumulador =  acumulador + parada.puntuacion[i].rate;
          //     promedio++;
          //   }
          //   //sacamos el promedio simple
          //   totalRate = acumulador /  promedio;
          //   acumulador = 0;
          //   promedio = 0;
          //
          //   return totalRate;
          // }else{
          //   return 'Sin puntuar';
          // }
        }

        function prendido_gps()
        {
          var bandera_p=false;
          cordova.plugins.diagnostic.isLocationEnabled(function(enabled)
          {
            if(enabled)
            {
              console.log("GSP activado");
              bandera_p=true;
              $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
            }
            else
            {
            //   var alertPopup = $ionicPopup.alert({
            //    title: 'GPS deactivado!',
            //    template: 'El gps esta deactivado, para poder usar la aplicación debes encenderlo'
            //  });


             var confirmPopup = $ionicPopup.confirm({
               title: 'Oh no !!',
               template: 'El GPS no esta activado, activalo y da click en Ok para actualizar el mapa'
             });
            confirmPopup.then(function(res) {
              if(res) {
                console.log('You are sure');
                // $scope.locate();
                $state.reload();
                //$state.go($state.current, $scope, $state, $cordovaGeolocation, $stateParams, $ionicModal, $http, $ionicPopup, ParadasFact, ParadasPrivadas, Auten, {reload: true, inherit: false });
                // $state.go('tab.mapa');
                // $state.transitionTo($state.current, $stateParams, {
                //     reload: true,
                //     inherit: false,
                //     notify: true
                // });

                // $scope.restartApp=function(){
                //     navigator.app.exitApp();
                //     navigator.app.loadUrl("file:///android_asset/www/index.html", {wait:2000, loadingDialog:"Wait,Loading App", loadUrlTimeoutValue: 60000});
                //   }


              } else {
                console.log('You are not sure');
              }
            });

             bandera_p=false;
            }
          }, function(error){
              console.error("The following error occurred: "+error);
          });
          return bandera_p;
        }

        function gps_prendido()
        {
          var bandera_p=false;
          var regreso = cordova.plugins.diagnostic.isLocationEnabled(function(enabled)
          {
            if(enabled)
            {
              bandera_p= true;
              console.log('prendido');
            }
            else
            {
             bandera_p= false;
             console.log('apagado');

           }
          }, function(error){
              console.error("The following error occurred: "+error);
              return false;
          });
          return regreso;
          // console.log(bandera_p,'antes de return');
          // return bandera_p;
        }

        function permiso_localizacion()
        {
          cordova.plugins.diagnostic.requestLocationAuthorization( function(status)
          {
              switch(status)
              {
                  case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
                      console.log("Permission not requested");
                      var alertPopup = $ionicPopup.alert({
                       title: 'Oh no!!',
                       template: 'No hay permisos para la localización'
                     });
                      break;
                  case cordova.plugins.diagnostic.permissionStatus.GRANTED:
                      console.log("Permission granted");
                      // var alertPopup = $ionicPopup.alert({
                      //  title: 'Oh no!!',
                      //  template: 'Permiso concedido'
                      // });
                      // $cordovaGeolocation
                      //   .getCurrentPosition()
                      //   .then(function (position) {
                      //     $scope.map.center.lat  = position.coords.latitude;
                      //     $scope.map.center.lng = position.coords.longitude;
                      //     $scope.map.center.zoom = 15;
                      //     usuario = new google.maps.Marker({
                      //       position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                      //       map: $scope.map,
                      //       animation: google.maps.Animation.DROP,
                      //       focus: true,
                      //       draggable: false
                      //     });
                      //   }, function(err) {
                      //     console.log("Location error!");
                      //     console.log(err);
                      //   });
                      break;
                  case cordova.plugins.diagnostic.permissionStatus.DENIED:
                      console.log("Permission denied");
                      var alertPopup = $ionicPopup.alert({
                       title: 'Oh no!!',
                       template: 'El permiso para la localización fue denegado'
                     });
                      break;
                  case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
                      console.log("Permission permanently denied");
                      var alertPopup = $ionicPopup.alert({
                       title: 'Oh no!!',
                       template: 'El permiso para la localización fue desactivado permanentemente'
                     });
                      break;
              }
          }, function(error){
              console.error(error);
          });
        }

      function agregarMarca(marker,lat,lng,infoWindow,info,tipo){
        var icono = 'img/flag.png';
        if(tipo == 1){
            icono = 'img/pines/preB2.png';
        }
        else if(tipo == 2){
            icono = 'img/pines/preB1.png';
        }
        else if(tipo == 3){
          icono = 'img/pines/preB5.png';
        }

        marker = new google.maps.Marker({
          position: new google.maps.LatLng(lat, lng),
          map: $scope.map,
          icon: icono,
          animation: google.maps.Animation.DROP
        });

        google.maps.event.addListener(marker, 'click', (function() {
          return function() {
            infoWindow.setContent(info);
            infoWindow.open($scope.map, marker);
          }
        })(marker));
      }


      //instancia de la ventana modal para  presentar el formulario de nueva parada
      $ionicModal.fromTemplateUrl('templates/addLocation.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
          $scope.modal = modal;
        });

        $scope.preb =  function(){
           $scope.desc="Kondoparadas→ Son establecimientos en donde te proporcionan métodos anticonceptivos (condones, pastillas del día siguiente, DIU, etc.), ya sean centros de salud, consultorios o farmacias, públicas o privadas. Las Kondoparadas las puedes compartir, visitar, puntuarlos y comentar tus experiencias en ellos, es muy importante que si las visitas las “evalúes” ya que eso ayudará a la comunidad a acudir a las mejores.";
           $scope.tipo_parada = 1;
           $scope.modal.show();
           $('.btn').removeClass('animacionVer');
           control = true;
        }

        $scope.gim =  function(){
          $scope.desc="Gym´s del autoestima→ Son lugares que te ayudan a sentirte bien. En donde puedes disfrutar el paisaje, pasar buenos momentos con tus amigos o familiares, comer algo delicioso, jugar, hacer deporte o lo que más te guste. Los Gym´s los puedes compartir, visitar, puntuarlos y comentar tus experiencias en ellos.";
           $scope.tipo_parada = 2;
           $scope.modal.show();
           $('.btn').removeClass('animacionVer');
           control = true;
        }

        $scope.punto =  function(){
          $scope.desc="PuntosR→ Son lugares en donde has tenido (o tienes) relaciones sexuales. Los PuntosR no se comparten, pero te ayudará a encontrar más fácil las Kondoparadas y protegerte.";
           $scope.tipo_parada = 3;
           $scope.modal.show();
           $('.btn').removeClass('animacionVer');
           control = true;
        }

        $scope.guardarParada = function() {
           //LocationsService.savedLocations.push($scope.newLocation);
          $scope.modal.hide();
          if(validarParada())
          {
            $scope.nuevaP.id_parada   =  '' + new Date().getTime();
            $scope.nuevaP.id_usuario  =  Auten.validar().telefono;
            $scope.nuevaP.tipo = $scope.tipo_parada;
            $scope.nuevaP.color =  '#fff';
            $scope.nuevaP.puntuacion = '';
            $scope.nuevaP.lat=$scope.lat;
            $scope.nuevaP.lng=$scope.lng;
            ParadasFact.post($scope.nuevaP);

            var nueva_parada;
            var url  = 'http://www.preb.mx/message_app/public/paradas';
            $http.post(url, { parada : $scope.nuevaP.id_parada, titulo : $scope.nuevaP.nombre , metodo: 'POST' , tipo : $scope.nuevaP.tipo, color : $scope.nuevaP.color, descripcion : $scope.nuevaP.descripcion, lat : $scope.nuevaP.lat, lng: $scope.nuevaP.lng, id_usuario : Auten.validar().id })
               .then(function successCallback(response)
               {
                 console.log("parada guardada");
                 console.log(response);
               },
               function errorCallback(response) {
                  console.log("error");
               });


            info = crearInfo($scope.nuevaP);
            agregarMarca(marker,$scope.nuevaP.lat,$scope.nuevaP.lng,infoWindow,info,$scope.nuevaP.tipo);
            //limpiamos la variable de la nueva pokeparada
             $scope.nuevaP =  {id_parada: '', nombre:'', descripcion : '', lat : '' , lng : '', puntuacion : '', id_usuario : '', tipo : '', color : '', comentarios : ''  };
             $scope.nuevaP.lat =  $scope.lat;
             $scope.nuevaP.lng =  $scope.lng;
          }
          //$scope.goTo(LocationsService.savedLocations.length - 1);
        //en esta parte tiene que sacar las cordenadas del usuario por movilidad y ejemplificacion
        //se deja al final

         };

      /**
      * Center map on user's current position
      */
      $scope.locate = function(){
       $cordovaGeolocation
         .getCurrentPosition()
         .then(function (position) {
           $scope.map.center.lat  = position.coords.latitude;
           $scope.map.center.lng = position.coords.longitude;
           $scope.map.center.zoom = 15;



           usuario = new google.maps.Marker({
             position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
             map: $scope.map,
             animation: google.maps.Animation.DROP,
             focus: true,
             draggable: false
           });


          //  $scope.map.markers.now = {
          //    lat:position.coords.latitude,
          //    lng:position.coords.longitude,
          //    message: "You Are Here",
          //    focus: true,
          //    draggable: false
          //  };

         }, function(err) {
           // error
           console.log("Location error!");
           console.log(err);
         });

      };

      $scope.animacion =  function(){
        if(control){
          $('.btn').addClass('animacionVer');
          control = false;
        }
        else {
          $('.btn').removeClass('animacionVer');
          control = true;
        }
      }

      var markerPrincipal = null;
      var cityCircle =  null;
function cambioAlerta(){
  alertaActiva =  false;
}


function validarParada(){
  var flag=true;
  for (var i = 0; i < $scope.paradas.length; i++) {
    var puntoCompara = new google.maps.LatLng($scope.paradas[i].lat,$scope.paradas[i].lng)
    if (google.maps.geometry.spherical.computeDistanceBetween( puntoCompara , cityCircle.getCenter()) <= cityCircle.getRadius())
    {
      flag=false;
      if(!alertaActiva)
      {
        //++++++++++++++++++++++++++++   validacion de los puntos rojos cercanos  ++++++++++++++++
        alertaActiva = true;
        var alertPopup = $ionicPopup.alert({
          title: '¡Oh no!',
          template: 'Cuidado parece que estas cerca de una parada, valída que no sea la misma.'
        });
        alertPopup.then(function(res) {
          console.log('Thank you for not eating my delicious ice cream cone');
          //setTimeout(cambioAlerta, 10000);
        });
      }
    }
  }
  return flag;
}
var al_inicio=true;
function autoUpdate() {
  navigator.geolocation.getCurrentPosition(function(position) {
    $scope.lat =  position.coords.latitude;
    $scope.lng = position.coords.longitude;
    var newPoint = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    $http.get('http://www.preb.mx/message_app/public/paradas')
    .success(function(paradas){
      console.log(paradas.count, ParadasFact.all().length);
      if(paradas.count > ParadasFact.all().length)
      {
          console.log('entro');
         angular.forEach(paradas.data,function(post)
         {
            if(ParadasFact.get(post.parada) == null)
            {
              var nuevaParadap =  {id_parada: '', nombre:'', descripcion : '', lat : '' , lng : '', puntuacion : '', id_usuario : '', tipo : '', color : '', comentarios : ''  };
              nuevaParadap.id_parada =  post.parada;
              nuevaParadap.nombre =  post.titulo;
              nuevaParadap.descripcion = post.descripcion;
              nuevaParadap.lat =  post.lat;
              nuevaParadap.lng =  post.lng;
              nuevaParadap.id_usuario =  post.id_usuario;
              nuevaParadap.tipo =  post.tipo;
              ParadasFact.post(nuevaParadap);
              info = crearInfo(nuevaParadap);
              console.log(ParadasFact.get(post.paradas),post);
              agregarMarca(marker,post.lat,post.lng,infoWindow,info,post.tipo);
            }
          });
      }

      //  console.log(nuevasParadas);
      //  ParadasFact.putall(nuevasParadas);
      //  $scope.paradas =  ParadasFact.all();

    },
    function errorCallback(response) {
      console.log('Sin conexión');
      $scope.paradas =  ParadasFact.all();

    });

    if (markerPrincipal) {
      // Marker already created - Move it
      markerPrincipal.setPosition(newPoint);

      for (var i = 0; i < $scope.paradas.length; i++) {
        if($scope.paradas[i].tipo == 3 )
        {
          console.log('entra ?');
          var puntoCompara = new google.maps.LatLng($scope.paradas[i].lat,$scope.paradas[i].lng)
          if (google.maps.geometry.spherical.computeDistanceBetween( puntoCompara , cityCircle.getCenter()) <= cityCircle.getRadius())
          {
            if(!alertaActiva)
            {
              //++++++++++++++++++++++++++++   validacion de los puntos rojos cercanos  ++++++++++++++++
              // alertaActiva = true;
              // var alertPopup = $ionicPopup.alert({
              //   title: '¡Oh no!',
              //   template: 'Cuidado esta cerca de un punto rojo, busca una CondonParada y protégete.'
              // });
              // alertPopup.then(function(res) {
              //   console.log('Thank you for not eating my delicious ice cream cone');
              //   setTimeout(cambioAlerta, 10000);
              // });
            }
          }
        }
      }
    }
    else {
      // Marker does not exist - Create it
      markerPrincipal = new google.maps.Marker({
        position: newPoint,
        map: $scope.map,
        icon: image
      });
      //intentado circulo en el usuario
      cityCircle = new google.maps.Circle({
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 1,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          map: $scope.map,
          center: newPoint,
          radius: 20
        });
    }

    // Center the map on the new position
    $scope.map.setCenter(newPoint);
    cityCircle.setCenter(newPoint);
  });
  console.log('llamada');

  console.log(alertaActiva);
  // Call the autoUpdate() function every 5 seconds

    setTimeout(autoUpdate, 5000);


}

autoUpdate();

    });

//controller de  el despliege de la ficha
app.controller('fichaCtrl', function($scope,$sce,Auten,Preguntas,ArticulosGuardados, $state,$stateParams, Articulos,$http, $cordovaSocialSharing,$ionicHistory,ParadasFact,$ionicPopup) {
      $scope.parada = ParadasFact.get($stateParams.id_parada);

      $scope.comentarioSer = new Array();
      getComentariosSer($stateParams.id_parada);

      function getComentariosSer(id){
        $http.get('http://www.preb.mx/message_app/public/comentarios/'+id)
        .success(function(comentarios){
          if(comentarios.data.length > 0){
              $scope.comentarioSer = comentarios.data;
          }
        },
        function errorCallback(response) {
          console.log('Sin conexión');
        });
      }



      $scope.puntuacionSer = new Array();
      getPuntuacionSer($stateParams.id_parada);

      function getPuntuacionSer(id){
          var totalRate   = 0;
          var acumulador  = 0;
          var promedio    = 0;

          console.log('calculara rate');

          $http.get('http://www.preb.mx/message_app/public/rates/'+id)
          .success(function(rates){
            console.log(rates);
            if(rates.data.length > 0){
              console.log(rates.data);
              $scope.puntuacionSer = rates.data;
            }
          },
          function errorCallback(response) {
            console.log('Sin conexión');

          });

      }

      $scope.comentario = {id_comentario:'', mensaje: '', id_usuario: ''};
      $scope.puntuacion = {id_puntuacion:'', rate: '', id_usuario: ''};

      console.log(  $scope.parada );

      // set the rate and max variables
      $scope.rating = {};
      $scope.rating.rate = 3;
      $scope.rating.max = 5;
      $scope.botonRate =  true;

      $scope.guardarComentario =  function(){
        $scope.comentario.id_comentario =  '' + new Date().getTime();
        $scope.comentario.id_usuario    =  Auten.validar().telefono;

        $scope.comentarioSer.push($scope.comentario);

        // ParadasFact.agregarCoemntario($stateParams.id_parada, $scope.comentario);
        // $scope.parada = ParadasFact.get($stateParams.id_parada);

        var url  = 'http://www.preb.mx/message_app/public/comentarios';
        $http.post(url, { id_parada : $stateParams.id_parada , metodo: 'POST' , mensaje :  $scope.comentario.mensaje, id_user: Auten.validar().id})
           .then(function successCallback(response)
           {
             console.log("comentarios guardados");
             console.log(response);
           },
           function errorCallback(response) {
              console.log("error");
           });


        //limpiamos la variable del comentario para que otro pueda comentar
        $scope.comentario = {id_comentario:'', mensaje: '', id_usuario: ''};
      }

      $scope.guardarPuntuacion = function(){
        console.log($scope.rating.rate);
        $scope.botonRate =  false;



        $scope.puntuacion.id_puntuacion =  '' + new Date().getTime();
        $scope.puntuacion.id_usuario    =  Auten.validar().telefono;
        $scope.puntuacion.rate    =    $scope.rating.rate;

        $scope.puntuacionSer.push($scope.puntuacion);




        // ParadasFact.agregarPuntuacion($stateParams.id_parada, $scope.puntuacion);
        // $scope.parada = ParadasFact.get($stateParams.id_parada);


        var url  = 'http://www.preb.mx/message_app/public/rates';
        $http.post(url, { id_parada : $stateParams.id_parada , metodo: 'POST' , rate :  $scope.puntuacion.rate, id_user: Auten.validar().id})
           .then(function successCallback(response)
           {
             console.log("puntuacion guardada");
             console.log(response);
           },
           function errorCallback(response) {
              console.log("error");
           });

        //modal que de gracias por la calificación
        var alertPopup = $ionicPopup.alert({
           title: '¡Gracias!',
           template: 'Gracias por tu puntuación, esta es muy importante para poder dar un mejor servicio.'
         });

      }

      $scope.getTotal =  function(){
        var totalRate = 0;
        var acumulador =  0;
        var promedio = 0 ;
        console.log('numero de entradas');

        //limpiara para despues
        if($scope.puntuacionSer !=  ""){
          //console.log($scope.parada);
          for (var i = 0; i <   $scope.puntuacionSer.length; i++) {
              acumulador =  acumulador + $scope.puntuacionSer[i].rate;
              promedio++;
          }

          totalRate = acumulador /  promedio;
          acumulador = 0;
          promedio = 0;
          console.log(totalRate);
          console.log($scope.puntuacionSer.length);
          return totalRate;
        }else{
          return '';
        }


      }
    });
