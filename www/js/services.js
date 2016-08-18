
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
        console.log(window.localStorage['respuestaId']);
    }

    return {
        list:function(){
              return respuestaId;
          },
        actualiza : function(res){
            respuestaId = res.id;
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

    }());//fin de todo
    










//
// var articulos = [{
//    id: 0,
//    titulo: 'Prevención sexual',
//    extracto :'En los tiempos que corren, el sexo seguro es un deber, no una opción. Las enfermedades de transmisión sexual (ETS) pueden tener efectos permanentes en su salud. Aprenda lo que debe hacer y lo que debe evitar para tener relaciones sexuales seguras',
//    contenido: '<div class="row-fluid"><div class="span6   "><div class="text parbase section"><div class="text-extended ">En los tiempos que corren, el sexo seguro es un deber, no una opción. Las enfermedades de transmisión sexual (ETS) pueden tener efectos permanentes en su salud. Aprenda lo que debe hacer y lo que debe evitar para tener relaciones sexuales seguras.Las enfermedades de transmisión sexual (ETS) constituyen un problema de salud pública mundial. Y nadie es inmune a ellas. Las ETS afectan a personas de todas las edades, razas y niveles económicos.<ul> <li>Analice los datos:Diecinueve millones de personas en los Estados Unidos contraerán una ETS en este año solamente.</li><li>Una de cada cuatro mujeres y uno de cada ocho hombres son portadores del virus del herpes simple 2, el virus que con más frecuencia causa el herpes genital. El virus del herpes simple no tiene cura. Si lo contrae, lo tendrá de por vida.</li><li>La sífilis, una enfermedad que en su día estuvo a punto de ser erradicada, está en aumento, principalmente en adolescentes y adultos jóvenes.</li></ul></div></div></div></div><div class="text parbase section"><div class="text-extended "><b><span class="largeprint">Las ETS tienen efectos permanentes</span></b>Infectarse con una ETS es más que una molestia y una causa de vergüenza. Las ETS pueden dejar secuelas permanentes en su salud. Pueden:<ul> <li>Causar enfermedades graves como el cáncer e incluso la muerte. El virus de la inmunodeficiencia humana o VIH no tiene cura y causa el síndrome de inmunodeficiencia adquirida o SIDA.</li><li>Generar toda una vida de problemas crónicos, como daños en los órganos.</li><li>Producir infertilidad. Los expertos calculan que 24,000 mujeres en los Estados Unidos se vuelven infértiles cada año como consecuencia de las ETS no tratadas.</li><li>Causar problemas en el embarazo y defectos congénitos.</li><li>Perjudicar las relaciones.</li><li>Transmitirse a su pareja.</li></ul><b><span class="largeprint">Sexo seguro: su pasaje a una buena salud.</span></b>La atención médica inmediata es eficaz para tratar algunas ETS, pero no todas. Es por eso que prevenir las ETS es tan importante.La única forma segura de protegerse de las ETS es no tener relaciones sexuales. Pero si elige mantener relaciones, siga estos consejos para reducir su riesgo y el riesgo de su pareja de contraer ETS:<b><span class="largeprint">    Lo que debe hacer:</span></b><ul> <li><b>Usar un preservativo cada vez que practique sexo vaginal, anal u oral.</b> Los métodos anticonceptivos que no son de barrera, como la píldora anticonceptiva o el dispositivo intrauterino (IUD o DIU), no brindan protección frente a las ETS. Los preservativos masculinos y femeninos son las opciones anticonceptivas más eficaces para prevenir las ETS.</li><li><b>Limite la cantidad de parejas sexuales. </b>Cuantas más parejas sexuales tenga, mayor será su riesgo de contraer ETS.</li><li><b>Sea honesto con su pareja</b> sobre cualquier riesgo o infección que haya tenido.<b>Conozca los antecedentes sexuales de su pareja.</b> El dicho “te acuestas con todos los que se hayan acostado con tu pareja” es verdad hasta cierto punto en lo que respecta a las ETS.</li><li><b>Hágase pruebas de detección de ETS periódicamente.</b> No todas las ETS tienen síntomas, así que los exámenes médicos regulares son clave. Por ejemplo, los expertos calculan que nueve de cada 10 personas que tienen el virus del herpes simple no saben que lo tienen.</li><li><b>Si es mujer, visite a su médico para que le realice un examen pélvico una vez al año </b>o con la frecuencia que le sugiera su médico. Sea honesta con su médico acerca de sus prácticas sexuales.</li><li><b>Siga su plan de tratamiento</b> como le indicó su médico si tiene una ETS. Asimismo, busque tratamiento inmediatamente si tiene algún síntoma de ETS.</li><li><b>Practique actividades sexuales seguras.</b> Los besos en la boca y la estimulación genital mutua conllevan muy poco riesgo de transmisión de ETS.</li></ul><b><span class="largeprint">    Lo que debe evitar:</span></b><ul> <li><b>No deje que los líquidos corporales entren en contacto directo con la vagina, el ano o la boca.</b> Esto incluye la sangre, el semen, las secreciones vaginales y cualquier supuración de llagas producidas por ETS.</li><li><b>No tenga relaciones sexuales si tiene llagas u otros signos de infección</b> cerca de la boca, el área genital o anal.</li><li> <b>No toque las llagas o ronchas causadas por ETS.</b></li><li><b>No suponga que podrá darse cuenta de si su pareja tiene una ETS.</b> Es imposible saber a simple vista si alguien tiene una ETS. No todas las personas que tienen una ETS presentan síntomas. La única forma de saber si alguien tiene una ETS o no es por medio de análisis y pruebas.</li><li> <b>No crea que no debe preocuparse por las ETS porque está en una relación monógama.</b> Tanto usted como su pareja deberían realizarse pruebas de detección de ETS antes de tener relaciones sexuales sin preservativo.</li><li> <b>No deje de protegerse durante las relaciones sexuales porque usted o su pareja tiene una ETS.</b> Un preservativo impedirá que usted o su pareja contraigan una nueva ETS o que vuelvan a infectarse con la misma enfermedad. Además, el hecho de tener algunas ETS, como herpes genital o sífilis, hace que sea más propenso de infectarse por VIH.</li><li><b>No consuma drogas ni alcohol. </b>Pueden hacer que tenga conductas arriesgadas como practicar sexo sin protección.</li></ul></div></div>',
//    imagen: 'img/1.jpg'
//  }, {
//    id: 1,
//    titulo: 'Metodos anticonceptivos',
//      extracto : 'Como una "media de goma" para tu órgano sexual. Usa uno que tenga espermicida. Siempre usa un condon de latex, porque los condones de piel de borrego no te protegen contra el VIH o los ETS, y los condones de plastico se rompen con más facilidad que los de latex. Si crees que puedes ser alérgico al látex lée "Solucionando problemas."',
//      contenido: '<h3>Condón/goma:</h3>Como una "media de goma" para tu órgano sexual. Usa uno que tenga espermicida. Siempre usa un condon de latex, porque los condones de piel de borrego no te protegen contra el VIH o los ETS, y los condones de plastico se rompen con más facilidad que los de latex. Si crees que puedes ser alérgico al látex lée "Solucionando problemas." Si usas un lubricante durante el acto sexual, evitarás que el condón se rompa. También reduce la irritación y el malestar vaginal.<h3>Condón de Mujer:</h3>Una bolsita de plastico que se acomoda adentro de la vagina con un plastico circular flexible. Es menos efectivo que el condon de homre y es más caro. Pero si has tenido reacciones alergicas con el latex, puede ser una buena alternativa. Algunas mujeres lo prefieren, otras lo encuentran muy bultoso. No se debe de usar para el sexo anal, y no recomendamos que se use con juguetes de sexo.<h3>Espermicida:</h3>Es un tipo de crema, loción o supositorio que se pone en la vagina para matar el esperma. Usalo con otros métodos de control de la natalidad. Si desarrollas infecciones en la orina deja de usar el espermicida.<h4>En las clínicas de servicios de salud:</h4><h3>Diafragma:</h3>Parece un pequeño "frisbee" de goma y se coloca en la vagina. Debes usarlo con un espermicida.<h3>"Gorra" cervical:</h3>Tiene forma de dedal y es de goma. Se coloca en la vagina y se debe usar con un espermicida.<h3>La píldora:</h3>Es una pastillita que se debe tomar todos los días a la misma hora. Si no la tomas un día, debes usar otro método de control durante el resto del mes. La píldora provoca ciertas reacciones -consulta a tu médico.<h3>La píldora "morning after":</h3>Varias pastillas que se deben tomar tres días después de haber tenido relaciones sexuales sin ningún tipo de protección. Se debe usar sólo en casos de emergencia. Causa ciertas reacciones. Para más información llame a la línea de ayuda sobre anticonceptivos 1-888-NOT-2-LATE (1-888-668-2528).<h3>D.I.U. :</h3>El dispositivo intrauterino (en inglés, I.U.D.) es un pequeño objeto de plástico y en forma de T que tiene un cordón pegado en el extremo, y se coloca dento del útero. A partir de su aplicación, la paciente puede mantener relaciones sexuales sin riesgo de gestación. La colocación puede hacerse en el consultorio durante una visita a su médico. Una vez en su lugar, el DIU se mantiene dentro del útero hasta que su médico lo retira.<h3>Depo Provera:</h3>Una vacuna para prevenir un embarazo que dura 3 meses. Es posible tener riesgos de salud serios y efectos laterales que pueden durar varios meses. Ya tomándose la vacuna, la decisión será final. Una vez puesto lo tienes que mantener por lo menos tres mesese. NO LO RECOMENDAMOS.<h3>"Norplant:"</h3>Un método de protección contra el término largo (5 años). Es un implante debajo de la piel, usualmente en el brazo. Puede causar ciertos riesgos de salud serios y efectos laterals. Puede causar demasiado daño para adolescentes. NO LO RECOMENDAMOS.<h3>Disponible en todas partes, pero no ofrece seguridad:</h3><h4>Sacar antes de eyacular:</h4>Aunque algunos muchachos sienten cuando ya se van a venir no siempre se salen a tiempo. Además cuando el pene se para, empieza a gotear un poquito de semen, mucho tiempo antes de que el muchacho se venga. Este poquito de semen puede causar un embarazo y también puede transmitir el VIH y otras enfermedades transmitidas sexualmente. NO LO RECOMENDAMOS.<h4>Método de Ritmo:</h4>Este método usa el ciclo menstual para predecir qué días tienen mas posibilidad de que la mujer se embarazca, y después solamente tener relaciones sexuales el resto de los días. Este método no es eficaz y seguido resulta en embarazos accidentales. NO LO RECOMENDAMOS.',
//      
//    imagen: 'img/2.jpg'
//  }, {
//    id: 2,
//    titulo: 'Embarazo no deseado',
//    extracto:'De acuerdo con la publicación de “La salud sexual y reproductiva en la adolescencia: un derecho a conquistar, manual para el adolescente” que indica pautas acordadas por el ISSSTE y organizaciones no gubernamentales como el CELSAM y EXPLORA y agencias internacionales como el Fondo de Población de las Naciones Unidas, te presentamos',
//    contenido: '<p class="paragraphWrapper">De acuerdo con la publicación de “La salud sexual y reproductiva en la adolescencia: un derecho a conquistar, manual para el adolescente” que indica pautas acordadas por el ISSSTE y organizaciones no gubernamentales como el CELSAM y EXPLORA y agencias internacionales como el Fondo de Población de las Naciones Unidas, te presentamos algunos pasos que pueden ser de ayuda durante el embarazo no planeado en un adolescente:</p>&nbsp;<p class="paragraphWrapper">-El embarazo entre los 15 y 19 años de edad es clasificado como de<strong> alto riesgo,</strong>por las complicaciones que conlleva en la salud de la madre y el bebé.</p><p class="paragraphWrapper"></p><p class="paragraphWrapper">-Adolescentes que gozan de buena autoestima y tienen una adecuada<strong>comunicación con sus padres</strong>, planean el inicio de su vida sexual.</p><p class="paragraphWrapper"></p><p class="paragraphWrapper">-Aproximadamente 10% de los <strong>abortos </strong>que se practican en nuestro país, ocurren en mujeres de 15 a 19 años.</p><p class="paragraphWrapper"></p><p class="paragraphWrapper">-60% de las mujeres que se embarazan en la adolescencia, <strong>no han asistido a la escuela.</strong></p><p class="paragraphWrapper"></p><p class="paragraphWrapper">-La cobertura anticonceptiva en mujeres jóvenes disminuyó de 45% en 1997 a 39.4% en el año 2006.</p><p class="paragraphWrapper"></p><p class="paragraphWrapper">-La proporción de nacimientos de mujeres menores de 20 años, se ha mantenido sin grandes cambios desde 1990. De 18% a 17.4% en el año 2005, según datos del INEGI 2006.</p><p class="paragraphWrapper"></p><h3>Algunas causas del embarazo adolescente</h3><p class="paragraphWrapper"><strong>Algunas causas por las que una mujer adolescente decide embarazarse según la Secretaría de Salud son:</strong></p><p class="paragraphWrapper"></p><p class="paragraphWrapper">-La maternidad tiene un gran valor en la sociedad mexicana. Si una adolescente se embaraza representa una posibilidad para ser tomada en cuenta por las personas adultas.</p><p class="paragraphWrapper"></p><p class="paragraphWrapper">-Carencia afectiva, no se sienten amadas o aceptadas por las y los demás.</p><p class="paragraphWrapper"></p><p class="paragraphWrapper">-A través de la procreación, buscan encontrar una razón propia por la cual luchar.</p><p class="paragraphWrapper"></p><p class="paragraphWrapper">-Buscan reafirmar su identidad sexual.</p><p class="paragraphWrapper"></p><p class="paragraphWrapper">-Desean trasgredir las normas sociales y familiares impuestas.</p><p class="paragraphWrapper"></p><p class="paragraphWrapper">-Buscan reivindicación por medio de una hija o hijo.</p><p class="paragraphWrapper"></p><p class="paragraphWrapper">-Buscan llenar un vacío afectivo, y por medio del bebé establecer vínculos afectivos fuertes que la satisfagan.</p>',
//    imagen: 'img/5.jpg'
//  }, {
//    id: 3,
//    titulo: 'Enfermedades de trasmision sexual',
//    extracto:'Las enfermedades de transmisión sexual (ETS) son infecciones que se adquieren por tener relaciones sexuales con alguien que esté infectado. Las causas de las ETS son las bacterias, parásitos y virus.',
//    contenido: '<section id="topsum_section"><div class="summary-title"><h2>Introducción</h2></div><div id="topic-summary">Las enfermedades de transmisión sexual (ETS) son infecciones que se adquieren por tener relaciones sexuales con alguien que esté infectado. Las causas de las ETS son las bacterias, parásitos y virus. Existen más de 20 tipos de ETS, que incluyen:<ul> <li>Clamidia</li><li>Gonorrea</li><li>Herpes genital</li><li>VIH/SIDA</li><li>VPH</li><li>Sífilis</li><li>Tricomoniasis</li></ul>La mayoría de las ETS afectan tanto a hombres como a mujeres, pero en muchos casos los problemas de salud que provocan pueden ser más graves en las mujeres. Si una mujer embarazada padece de ETS, puede causarle graves problemas de salud al bebé.Si padece de ETS causada por bacterias o parásitos, el médico puede tratarla con antibióticos u otros medicamentos. Si padece de ETS causada por un virus, no hay curación. Algunas veces los medicamentos pueden mantener la enfermedad bajo control. El uso correcto de preservativos de látex reduce enormemente, aunque no elimina, el riesgo de adquirir y contagiarse con ETS.<p class="attribution">Centros para el Control y la Prevención de Enfermedades</p></div></section>&nbsp;<section id="cat51_section"><div class="section"><div class="section-header expanded"><div class="section-title"><h2>Comience aquí</h2></div></div><div id="section51" class="section-body expanded"><ul class="bulletlist"> <li>Cómo prevenir las enfermedades de transmisión sexual <span class="desc-text"><span class="orgs">(Colegio Americano de Obstetras y Ginecólogos)</span></span><span class="also-lang">Disponible en inglés</span></li><li>Enfermedades de transmisión sexual (ETS) <span class="desc-text"><span class="orgs">(Centros para el Control y la Prevención de Enfermedades)</span></span></li><li>Enfermedades de transmisión sexual (STD por sus siglas en inglés) <span class="desc-text"> <span class="orgs">(Instituto Nacional de Salud Infantil y Desarrollo Humano)</span></span></li><li>Infecciones de transmisión sexual comunes <span class="desc-text"><span class="orgs">(Academia Americana de Médicos de Familia)</span></span></li></ul></div></div></section><section id="cat57_section"><div class="section"><div class="section-header "><div class="section-title"><h2>Últimas noticias</h2></div></div><div id="section57" class="section-body "><ul class="bulletlist"> <li>Abril es el Mes de Concientización sobre las ETS (de transmisión sexual) <span class="desc-text"><span class="orgs">(04/04/2016, Centros para el Control y la Prevención de Enfermedades)</span></span></li></ul></div></div></section><section id="cat95_section"><div class="section"><div class="section-header "><div class="section-title"><h2>Síntomas</h2></div></div><div id="section95" class="section-body "><ul class="bulletlist"> <li>Micción dolorosa <span class="desc-text">- Enciclopedia</span><span class="also-lang">Disponible en inglés</span></li></ul></div></div></section><section id="cat92_section"><div class="section"><div class="section-header "><div class="section-title"><h2>Diagnóstico y exámenes</h2></div></div><div id="section92" class="section-body "><ul class="bulletlist"> <li>Cultivo de secreción uretral <span class="desc-text">- Enciclopedia</span><span class="also-lang">Disponible en inglés</span></li><li>Cultivo endocervical <span class="desc-text">- Enciclopedia</span><span class="also-lang">Disponible en inglés</span></li><li>Picazón y flujo vaginal en mujeres adultas y adolescentes <span class="desc-text">- Enciclopedia</span><span class="also-lang">Disponible en inglés</span></li><li>Problemas de los genitales en la mujer <span class="desc-text"><span class="orgs">(Academia Americana de Médicos de Familia)</span></span><span class="also-lang">Disponible en inglés</span></li><li>Problemas de los genitales en los hombres <span class="desc-text"><span class="orgs">(Academia Americana de Médicos de Familia)</span></span><span class="also-lang">Disponible en inglés</span></li><li>Tinción de Gram de secreción uretral <span class="desc-text">- Enciclopedia</span><span class="also-lang">Disponible en inglés</span></li><li>Úlceras genitales en las mujeres <span class="desc-text">- Enciclopedia</span><span class="also-lang">Disponible en inglés</span></li><li>Úlceras genitales en los hombres <span class="desc-text">- Enciclopedia</span><span class="also-lang">Disponible en inglés</span></li></ul></div></div></section><section id="cat93_section"><div class="section"><div class="section-header "><div class="section-title"><h2>Prevención y factores de riesgo</h2></div></div><div id="section93" class="section-body "><ul class="bulletlist"> <li>Colocación del condón <span class="desc-text">- Enciclopedia - Diapositiva</span></li><li>Comportamiento sexual seguro <span class="desc-text">- Enciclopedia</span><span class="also-lang">Disponible en inglés</span></li><li>Condones femeninos <span class="desc-text">- Enciclopedia</span><span class="also-lang">Disponible en inglés</span></li><li>Escuelas desempeñan un papel clave en la prevención del VIH y las ETS <span class="desc-text"><span class="orgs">(Centros para el Control y la Prevención de Enfermedades)</span></span></li></ul></div></div></section><section id="cat78_section"><div class="section"><div class="section-header "><div class="section-title"><h2>Tratamientos y terapias</h2></div></div><div id="section78" class="section-body "><ul class="bulletlist"> <li>Medicamentos para infecciones de transmisión sexual <span class="desc-text"><span class="orgs">(Academia Americana de Pediatría)</span></span><span class="also-lang">Disponible en inglés</span></li></ul></div></div></section><section id="cat47_section"><div class="section"><div class="section-header "><div class="section-title"><h2>Asuntos relacionados</h2></div></div><div id="section47" class="section-body "><ul class="bulletlist"> <li>Enfermedades de transmisión sexual (ETS) y el VIH <span class="desc-text"><span class="orgs">(Centros para el Control y la Prevención de Enfermedades)</span></span><span class="also-lang">Disponible en inglés</span></li><li>Orquitis <span class="desc-text">- Enciclopedia</span><span class="also-lang">Disponible en inglés</span></li></ul></div></div></section><section id="cat42_section"><div class="section"><div class="section-header "><div class="section-title"><h2>Asuntos específicos</h2></div></div><div id="section42" class="section-body "><ul class="bulletlist"> <li>Cervicitis <span class="desc-text">- Enciclopedia</span><span class="also-lang">Disponible en inglés</span></li><li>Chancroide <span class="desc-text">- Enciclopedia</span><span class="also-lang">Disponible en inglés</span></li><li>Chancroide (chancro blando) <span class="desc-text"><span class="orgs">(Departamento de Salud del Estado de Nueva York)</span></span></li><li>Donovanosis (granuloma inguinal) <span class="desc-text">- Enciclopedia</span><span class="also-lang">Disponible en inglés</span></li><li>Linfogranuloma venéreo <span class="desc-text">- Enciclopedia</span><span class="also-lang">Disponible en inglés</span></li><li>Molusco contagioso <span class="desc-text">- Enciclopedia</span><span class="also-lang">Disponible en inglés</span></li><li>Molusco contagioso <span class="desc-text"><span class="orgs">(Centro para la Educación y Entrenamiento sobre el SIDA de Nuevo México)</span></span><span class="also-lang">Disponible en inglés</span></li><li>Piojos del pubis <span class="desc-text">- Enciclopedia</span><span class="also-lang">Disponible en inglés</span></li><li>Uretritis <span class="desc-text">- Enciclopedia</span><span class="also-lang">Disponible en inglés</span></li><li>Uretritis no gonocócica <span class="desc-text"><span class="orgs">(Departamento de Salud del Estado de Nueva York)</span></span></li></ul></div></div></section><section id="cat83_section"><div class="section"><div class="section-header "><div class="section-title"><h2>Especialistas</h2></div></div><div id="section83" class="section-body "><ul class="bulletlist"> <li>Hágase la prueba: Encuentre la prueba gratis, rápido y confidencial cerca de usted <span class="desc-text"><span class="orgs">(Centros para el Control y la Prevención de Enfermedades)</span></span></li></ul></div></div></section><section id="cat24_section"><div class="section"><div class="section-header "><div class="section-title"><h2>Adolescentes</h2></div></div><div id="section24" class="section-body "><ul class="bulletlist"> <li>Acerca de las enfermedades de transmisión sexual <span class="desc-text"><span class="orgs">(Fundación Nemours)</span></span><span class="also-lang">Disponible en inglés</span></li><li>Cómo decirle a su pareja que tiene una ETS (enfermedad transmitida sexualmente) <span class="desc-text"><span class="orgs">(Fundación Nemours)</span></span><span class="also-lang">Disponible en inglés</span></li><li>Cómo hablar sobre el condón con tu pareja <span class="desc-text"><span class="orgs">(Fundación Nemours)</span></span><span class="also-lang">Disponible en inglés</span></li><li>Condones <span class="desc-text"><span class="orgs">(Fundación Nemours)</span></span><span class="also-lang">Disponible en inglés</span></li><li>Enfermedades de transmisión sexual (ETS) <span class="desc-text"><span class="orgs">(Fundación Nemours)</span></span><span class="also-lang">Disponible en inglés</span></li><li>Enfermedades de transmisión sexual (ETS) <span class="desc-text"><span class="orgs">(Hospital de los Niños de Boston)</span></span></li><li>Ladilla <span class="desc-text"><span class="orgs">(Fundación Nemours)</span></span><span class="also-lang">Disponible en inglés</span></li><li>Preguntas comunes sobre las enfermedades de transmisión sexual (ETS) <span class="desc-text"><span class="orgs">(Oficina de Salud Pública y Ciencias, Oficina de Asuntos de la Población)</span> - <span class="desccode">PDF</span></span></li></ul></div></div></section><section id="cat6_section"><div class="section"><div class="section-header "><div class="section-title"><h2>Hombres</h2></div></div><div id="section6" class="section-body "><ul class="bulletlist"> <li>Epididimitis <span class="desc-text">- Enciclopedia</span><span class="also-lang">Disponible en inglés</span></li></ul></div></div></section><section id="cat7_section"><div class="section"><div class="section-header "><div class="section-title"><h2>Mujeres</h2></div></div><div id="section7" class="section-body "><ul class="bulletlist"> <li>Enfermedades de transmisión sexual y embarazo <span class="desc-text"><span class="orgs">(Centros para el Control y la Prevención de Enfermedades)</span></span><span class="also-lang">Disponible en inglés</span></li></ul></div></div></section>',
//    imagen: 'img/3.jpg'
//  }, {
//    id: 4,
//    titulo: 'Organos sexuales',
//    extracto:'¿Dónde se ubican los órganos sexuales?</strong></p>Los órganos de este aparato o sistema están situados unos dentro de la cavidad corporal y otros fuera de ella, y aunque todos pertenecen a un sistema único, los internos se asocian más a la procreación y los externos más a lo sexual o erótico',
//    contenido: '<p class="Estilo2"><strong>¿Dónde se ubican los órganos sexuales?</strong></p>Los órganos de este aparato o sistema están situados unos dentro de la cavidad corporal y otros fuera de ella, y aunque todos pertenecen a un sistema único, los internos se asocian más a la procreación y los externos más a lo sexual o erótico.Lo que es importante tener claro es que no se puede procrear sin sexo pero sí se puede tener sexo sin la intención de procrear.<p class="Estilo3"> <strong>¿Cuáles son las principales funciones de los órganos </strong><strong><strong>sexuales o reproductivos?</strong></strong></p>Desde el punto de vista biológico:<ul> <li>La producción de óvulos y espermatozoides</li><li>La transportación de estas células hacia el exterior</li><li>La recepción de estas células en caso de ser fecundadas (en la mujer)</li><li>La producción de hormonas sexuales</li><li>Ser receptores y trasmisores de placer  sexual</li></ul>Desde el punto de vista psicológico y cultural:<ul> <li>Son sensibles a los estímulos sexuales</li><li>Su visión y tocamiento puede producir excitación y placer sexual</li></ul><p class="Estilo3"><strong>¿Qué diferencia hay entre la función sexual y la reproductiva?</strong></p><em>La función reproductiva:</em><ul> <li>Consiste en la capacidad que tiene el organismo de engendrar o concebir una nueva vida a través de la unión de un óvulo y un espermatozoide.</li><li>Los seres humanos están físicamente maduros o aptos para procrear a partir de la pubertad, que es cuando los ovarios empiezan a liberar óvulos para ser fecundados, y los testículos a producir espermatozoides capaces de fecundar al óvulo.</li><li>Esta función es eminentemente biológica.</li></ul><em>La función sexual</em>:<ul> <li>A diferencia de la anterior, es emocional, física y afectiva.</li><li>Consiste en la búsqueda de placer y disfrute a través del contacto físico, emocional y de la estimulación de las diferentes partes del cuerpo, incluidas las zonas más sensibles a la estimulación erótica, llamadas zonas erógenas.</li><li>Esta función tiene un valor en sí misma independiente de la función reproductiva.</li></ul><span class="Estilo3"><strong>¿Cuáles son las partes del cuerpo que hacen diferentes </strong><strong><strong>a hombres y mujeres?</strong></strong></span>Los órganos sexuales son los que distinguen a los seres humanos en hombres y mujeres.',
//    imagen: 'img/4.jpg'
//  }];
//

