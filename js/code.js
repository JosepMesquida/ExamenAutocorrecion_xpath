var formElement=null;

var divResultados;

var nota = 0;

var pregunta1 = null;
var pregunta2 = [];
var pregunta3 = [];
var pregunta4 = [];
var pregunta5 = null;
var pregunta6 = null;
var pregunta7 = [];
var pregunta8 = null;
var pregunta9 = null;
var pregunta10 = null;

var respuesta1 = null;
var respuesta2 = [];
var respuesta3 = [];
var respuesta4 = [];
var respuesta5 = null;
var respuesta6 = null;
var respuesta7 = [];
var respuesta8 = null;
var respuesta9 = null;
var respuesta10 = null;

var xmlDoc = null;
var xslDoc = null;


//Después de cargar la página (onload) se definen los eventos sobre los elementos entre otras acciones.
window.onload = function(){ 

    divResultados = document.getElementById("resultadosDiv");
    divResultados.style.display = "none";

    // buttonReload.onclick = function(){
    //      window.location.reload(true);
    // }

    //Procede a la realización de la corrección.
    formElement = document.getElementById("myForm");
    formElement.onsubmit = function () {
        //Muestra una ventana emergente pidiendo la confirmación de la correción.
        if (confirm("¿Desea proceder a la corrección del examen?")) {
            if (comprobar()){
                inicializar();
                correction();
                presentarNota();
                enableReloadButton();
            }
        }
        return false;
    }
 
    //LEER XML de xml/preguntas.xml
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            gestionarXml(this);
        }
    };
    xhttp.open("GET", "https://rawgit.com/JosepMesquida/CorreccionExamen/master/preguntas.XML", true);
    xhttp.send();

    var xhttp2 = new XMLHttpRequest();
    xhttp2.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            xslDoc=this.responseXML;
        }
    };
    
    xhttp2.open("GET", "xml/questions.xsl", true);
    xhttp2.send();
    
};

// Recuperamos los datos del fichero XML xml/preguntas.xml
// xmlDOC es el documento leido XML. 
function gestionarXml(dataXml){
    var xmlDoc = dataXml.responseXML; //Parse XML to xmlDoc


    //Pregunta1 - text

      generarTipoTexto(0,"pregunta1");
      pregunta1 = getAnswerText("MVIJ_01");
      respuesta1 = pregunta1;
      console.debug("Respuesta obtenida para la pregunta1: " + respuesta1);

    //Pregunta8 - texto

    generarTipoTexto(7,"pregunta8");
    pregunta8 = getAnswerText("MVIJ_08");
    respuesta8 = pregunta8;
    console.debug("Respuesta obtenida para la pregunta8: " + pregunta8);

    //Pregunta10 - radio 

    generarTipoRadio(9, "pregunta10", "MVIJ_10", "radioDiv2");
    pregunta10 = getAnswerRadio("MVIJ_10");
    respuesta10 = getAnswerDataRadio("MVIJ_10", pregunta10-1);
    console.debug("Respuesta obtenida para la pregunta10: " + pregunta10);

    //Pregunta5 - radio

    generarTipoRadio(4, "pregunta5", "MVIJ_05", "radioDiv1");
    pregunta5 = getAnswerRadio("MVIJ_05");
    respuesta5 = getAnswerDataRadio("MVIJ_05", pregunta5-1);
    console.debug("Respuesta obtenida para la pregunta5: " + pregunta5);



    //Pregunta2 - multiple

    generarTipoMultiple (1, "pregunta2", "MVIJ_02", 0);
    pregunta2 = getAnswerMultiple("MVIJ_02");
    respuesta2 = getAnswerDataMultiple("MVIJ_02", pregunta2);
    console.debug("Respuesta obtenida para la pregunta2: " + pregunta2);

    //Pregunta3 - multiple

    generarTipoMultiple (2, "pregunta3", "MVIJ_03", 1);
    pregunta3 = getAnswerMultiple("MVIJ_03");
    respuesta3 = getAnswerDataMultiple("MVIJ_03", pregunta3);
    console.debug("Respuesta obtenida para la pregunta3: " + pregunta3);

    //Pregunta6 - select

    generarTipoSelect (5, "pregunta6", "MVIJ_06", 2);
    pregunta6 = getAnswerSelect("MVIJ_06");
    respuesta6 = getAnswerDataSelect("MVIJ_06", pregunta6-1);
    console.debug("Respuesta obtenida para la pregunta6: " + pregunta6);

    //Pregunta9 - select

    generarTipoSelect (8, "pregunta9", "MVIJ_09", 3);
    pregunta9 = getAnswerSelect("MVIJ_09");
    respuesta9 = getAnswerDataSelect("MVIJ_09", pregunta9-1);
    console.debug("Respuesta obtenida para la pregunta9: " + pregunta9);

    //Pregunta4 - checkbox

    generarTipoCheckbox (3, "pregunta4", "MVIJ_04", "checkboxDiv1");
    pregunta4 = getAnswerCheckbox("MVIJ_04");
    respuesta4 = getAnswerDataCheckbox("MVIJ_04", pregunta4);
    console.debug("Respuesta obtenida para la pregunta4: " + pregunta4);


    //Pregunta7 - checkbox

    generarTipoCheckbox (6, "pregunta7", "MVIJ_07", "checkboxDiv2");
    pregunta7 = getAnswerCheckbox("MVIJ_07");
    respuesta7 = getAnswerDataCheckbox("MVIJ_07", pregunta7);
    console.debug("Respuesta obtenida para la pregunta7: " + pregunta7);


    //Generan los tipos de datos

    //Carga los datos
    function generarTipoTexto (idTag,idHtml){
        var tituloText = xmlDoc.getElementsByTagName("title")[idTag].innerHTML;
        ponerDatosText(tituloText, idHtml);
    } 

    function generarTipoRadio(idTag,idHtml, idXml, divId){
        var tituloRadio = xmlDoc.getElementsByTagName("title")[idTag].innerHTML;
        var opcionesRadio = [];
        var nopt = xmlDoc.getElementById(idXml).getElementsByTagName('option').length;
        for (i = 0; i < nopt; i++) {
            opcionesRadio[i] = xmlDoc.getElementById(idXml).getElementsByTagName('option')[i].innerHTML;
        }
        ponerDatosRadio(tituloRadio, idHtml, opcionesRadio, divId);
    }   

    function generarTipoMultiple (idTag, idHtml, idXml, numSelect){
        var tituloMultiple = xmlDoc.getElementsByTagName("title")[idTag].innerHTML;
        var opcionesMultiple = [];
        var nopt = xmlDoc.getElementById(idXml).getElementsByTagName('option').length;
        for (i = 0; i < nopt; i++) {
            opcionesMultiple[i] = xmlDoc.getElementById(idXml).getElementsByTagName('option')[i].innerHTML;
        }
        ponerDatosMultiple(tituloMultiple, idHtml, opcionesMultiple, numSelect);    
    }

    function generarTipoSelect (idTag, idHtml, idXml, numSelect){
        var tituloSelect = xmlDoc.getElementsByTagName("title")[idTag].innerHTML;
        var opcionesSelect = [];
        var nopt = xmlDoc.getElementById(idXml).getElementsByTagName('option').length;
        for (i = 0; i < nopt; i++) {
            opcionesSelect[i] = xmlDoc.getElementById(idXml).getElementsByTagName('option')[i].innerHTML;
        }
        ponerDatosSelect(tituloSelect, idHtml, opcionesSelect, numSelect);
    }

    function generarTipoCheckbox (idTag, idHtml, idXml, divId){
        var tituloCheckbox = xmlDoc.getElementsByTagName("title")[idTag].innerHTML;
        var opcionesCheckbox = [];
        nopt = xmlDoc.getElementById(idXml).getElementsByTagName('option').length;
        for (i = 0; i < nopt; i++) { 
            opcionesCheckbox[i]=xmlDoc.getElementById(idXml).getElementsByTagName('option')[i].innerHTML;
        }  
        ponerDatosCheckbox(tituloCheckbox, idHtml, opcionesCheckbox, divId);
    }
    
     
    //Hace el get de la respuesta

    function getAnswerText(idXml){
        return xmlDoc.getElementById(idXml).getElementsByTagName('answer')[0].innerHTML;
    }

    function getAnswerRadio(idXml){
        return parseInt(xmlDoc.getElementById(idXml).getElementsByTagName('answer')[0].innerHTML);
    }

    function getAnswerMultiple (idXml){
        var nres = xmlDoc.getElementById(idXml).getElementsByTagName('answer').length;
        var answer = [];
        for (i = 0; i < nres; i++) {
           answer[i] = xmlDoc.getElementById(idXml).getElementsByTagName('answer')[i].innerHTML;
        }
        return answer;
    }

    function getAnswerSelect (idXml){
        return xmlDoc.getElementById(idXml).getElementsByTagName('answer')[0].innerHTML;
    }

    function getAnswerCheckbox (idXml){
        var nres = xmlDoc.getElementById(idXml).getElementsByTagName('answer').length;
        var answer = [];
        for (i = 0; i < nres; i++) {
           answer[i] = xmlDoc.getElementById(idXml).getElementsByTagName('answer')[i].innerHTML;
        }
        return answer;
    }

    //Realizan el texto de los resultados correctos

    //Hace el get de la respuesta tipo radio

    function getAnswerDataRadio(idXml, id){
        return xmlDoc.getElementById(idXml).getElementsByTagName('option')[id];
    }

    function getAnswerDataMultiple (idXml, id){
        var answer = [];
        for (i = 0; i < id.length; i++) {
            answer[i] = xmlDoc.getElementById(idXml).getElementsByTagName('option')[id[i]-1];
        }
        return answer;
    }

    function getAnswerDataSelect (idXml, id){
        return xmlDoc.getElementById(idXml).getElementsByTagName('option')[id];
    }

    function getAnswerDataCheckbox (idXml, id){
        var answer = [];
        for (i = 0; i < id.length; i++) {
            answer[i] = xmlDoc.getElementById(idXml).getElementsByTagName('option')[id[i]-1];
        }
        return answer;
    }

}

//Inserción de datos


function ponerDatosText(titulo, id) {
    document.getElementById(id).innerHTML = titulo;
}

function ponerDatosRadio(titulo, id, options, divId) {
    document.getElementById(id).innerHTML = titulo;
    var radioContainer = document.getElementById(divId);

    for (i = 0; i < options.length; i++) {
        var input = document.createElement("input");
        var label = document.createElement("label");
        label.innerHTML = options[i];
        label.setAttribute("for", divId + "_" + i);
        input.type = "radio";
        input.id = divId + "_" + i;
        input.className = "radio_opt";
        input.name = divId;
        input.value = i;
        radioContainer.appendChild(input);
        radioContainer.appendChild(label);
        radioContainer.appendChild(document.createElement("br"));
    }
}

function ponerDatosMultiple(titulo, id, options, numSelect) {
    document.getElementById(id).innerHTML = titulo;

    var select = document.getElementsByTagName("select")[numSelect];

    for (i = 0; i < options.length; i++) {
        var option = document.createElement("option");
        option.text = options[i];
        option.value = i;
        select.options.add(option);
    }
}

function ponerDatosSelect(titulo, id, options, numSelect) {
    document.getElementById(id).innerHTML = titulo;

    var select = document.getElementsByTagName("select")[numSelect];

    for (i = 0; i < options.length; i++) {
        var option = document.createElement("option");
        option.text = options[i];
        option.value = i;
        select.options.add(option);
    }
}

function ponerDatosCheckbox(titulo, id, options, divId){
    var checkboxContainer=document.getElementById(divId);
    document.getElementById(id).innerHTML = titulo;
    for (i = 0; i < options.length; i++) { 
        var input = document.createElement("input");
        var label = document.createElement("label");
        label.innerHTML=options[i];
        label.setAttribute("for", "opt_check_"+i);
        input.type="checkbox";
        input.name=divId;
        input.id="opt_check_"+i;
        input.value=i;    
        checkboxContainer.appendChild(input);
        checkboxContainer.appendChild(label);
        checkboxContainer.appendChild(document.createElement("br"));
    }  
}


//Corrección

//Inicialización

function inicializar(){
    divResultados.style.display = "block";
    document.getElementById('resultadosDiv').innerHTML = "";
    nota=0.0;
}

//Corrección de diferentes tipos de inputs

function correction (){
    addTitulo("Corrección Examen");
    corregirTexto("answ_text_01", respuesta1, "pregunta1");
    corregirTexto("multiple1", respuesta2, "pregunta2");
    corregirRadio("multiple2", pregunta3, respuesta3, "pregunta3");
    corregirRadio("checkboxDiv1", pregunta4, respuesta4, "pregunta4");
    corregirMultiple("radioDiv1", pregunta5, respuesta5, "pregunta5");
    corregirMultiple("select1", pregunta6, respuesta6, "pregunta6");
    corregirSelect("checkboxDiv2", pregunta7, respuesta7, "pregunta7");
    corregirSelect("answ_text_02", pregunta8, respuesta8, "pregunta8");
    corregirCheckbox("select2", pregunta9, respuesta9, "pregunta9"); 
    corregirCheckbox("radioDiv2", pregunta10, respuesta10, "pregunta10");
}

//Corregir las preguntas de tipo texto
function corregirTexto(elementId, answer, question){
    var texto = document.getElementById(elementId).value;
    var puntuacion = 0;
    if (texto == answer) {
        nota += 1;
        darRespuestaHtml(question, "Respuesta correcta!", puntuacion);
    } else {
        puntuacion = 0;
        darRespuestaHtml(question, "Respuesta incorrecta! La respuesta correcta es: " + answer, puntuacion);
    }
}

function corregirRadio(elementName, answer, answer1, question){
    var rad = document.getElementsByName(elementName);
    var correcta = false;
    var puntuacion = 0;
    for (var i = 0, length = rad.length; i < length; i++) {
        if (rad[i].checked) {
            if (rad[i].value == answer-1){
                correcta = true;
                puntuacion = 1;
                nota += puntuacion;
                darRespuestaHtml(question, "Correcto!", puntuacion);
            } else {
                puntuacion = 0;
                correcta = false;
            }
            break;
        }
    }
    if (!correcta){
        darRespuestaHtml(question, "Respuesta incorrecta! La respuesta correcta es: " + answer1, puntuacion);
    }
}

function corregirMultiple(elementId, answer, answer1, question){
    var f = formElement;
    var escorrecta = [];
    var mult = document.getElementById(elementId);
    var puntuacion = 0;
    for (var i = 0; i < mult.options.length; i++) {
        if(mult.options[i].selected){
            for (var j = 0; j<answer.length; j++){
                if (mult.options[i].value == answer[j]-1){
                    escorrecta.push(mult.options[i].value);
                }
            }
        }
    }
    if (escorrecta.length > 0) {
        puntuacion = escorrecta.length / answer.length;
        nota += puntuacion;
    } else {
        puntuacion = 0;
        nota += puntuacion;
    }
    
    if (puntuacion == 1){
        darRespuestaHtml(question, "Respuesta correcta!", puntuacion);
    }  else {
        darRespuestaHtmlCombi(question, "Respuestas correctas: " + escorrecta.length + "/" + answer.length + ".", answer1, puntuacion);
    }
    
}

function corregirSelect(elementId, answer, answer1, question){
    var sel = document.getElementById(elementId);
    var puntuacion = 0;
    if (sel.selectedIndex == answer) {
        puntuacion = 1;
        nota += puntuacion;
        darRespuestaHtml(question, "Respuesta correcta!", puntuacion);
    } else {
        puntuacion = 0;
        darRespuestaHtml(question, "Respuesta incorrecta! La respuesta correcta es: " + answer1, puntuacion);
    }
}

function corregirCheckbox(elementName, answer, answer1, question){
    var f = formElement;
    var escorrecta = [];
    var check = document.getElementsByName(elementName);
    var respuestas = answer.length;
    var puntuacion = 0;
    for (var i = 0; i < check.length; i++) {
        if(check[i].checked){
            for (var j = 0; j<answer.length; j++){
                if (check[i].value == answer[j]-1){
                    escorrecta.push(check[i].value);
                }
            }
        }
    }

    if (escorrecta.length > 0) {
        puntuacion = escorrecta.length / answer.length;
        nota += puntuacion;
    } else {
        puntuacion = 0;
        nota += puntuacion;
    }
    
    if (puntuacion == 1){
        darRespuestaHtml(question, "Respuesta correcta!", puntuacion);
    }  else {
        darRespuestaHtmlCombi(question, "Respuestas correctas: " + escorrecta.length + "/" + answer.length + ".", answer1, puntuacion);
    }
}

// Método que imprime si la respuesta es correcta o no. También sirve para imprimir otra informacion en tu <p>.
function darRespuestaHtml(question, str, punt){
    var div = document.createElement("div");
    var p = document.createElement("p");
    var h4 = document.createElement("h4");
    var node = document.createTextNode(str);

    h4.innerHTML=question.toUpperCase();
    if (punt == 1){
        h4.className = "correcta";
    }else if (punt == 0){
        h4.className = "incorrecta";
    }else{
        h4.className = "regular";
    }

    div.id = "anotacion_" + question;
    div.className = "anotacion";
    div.appendChild(h4);
    div.appendChild(p);
    //p.appendChild(h4); 
    p.appendChild(node);
    document.getElementById('resultadosDiv').appendChild(div);
}

// Método que imprime varias respuestas.
function darRespuestaHtmlCombi(question, str, ans, punt){
    var div = document.createElement("div");
    var p = document.createElement("p");
    var h4 = document.createElement("h4");
    var node = document.createTextNode(str);

    h4.innerHTML=question.toUpperCase();
    if (punt == 1){
        h4.className = "correcta";
    }else if (punt == 0){
        h4.className = "incorrecta";
    }else{
        h4.className = "regular";
    }

    div.id = "anotacion_" + question;
    div.className = "anotacion";
    div.appendChild(h4);
    div.appendChild(p);
    p.appendChild(node);
    for (var i = 0; i<ans.length; i++){
        var pr = document.createElement("p");
        var noder = document.createTextNode(ans[i]);
        pr.appendChild(noder);
        div.appendChild(pr);
    }
    document.getElementById('resultadosDiv').appendChild(div);
}

function presentarNota(){
    var div = document.createElement("div");
    var h2 = document.createElement("h2");

    h2.innerHTML="NOTA: " + nota.toFixed(2);
    div.id = "nota";
    if (nota >= 5){
        div.className = "aprobado";
    }else{
        div.className = "suspenso";
    }
    div.appendChild(h2);
    document.getElementById('resultadosDiv').appendChild(div);
}

function addTitulo(str){
    var div = document.createElement("div");
    var h1 = document.createElement("h1");
    var node = document.createTextNode(str);

    div.id = "titulo_correccion";
    div.appendChild(h1);
    h1.appendChild(node); 
    document.getElementById('resultadosDiv').appendChild(div);
}

function enableReloadButton(){
    var div = document.createElement("div");
    var buttonReload = document.createElement("button");

    var buttonReload= document.createElement('input');
    buttonReload.setAttribute('type','button');
    buttonReload.setAttribute('name','reload');
    buttonReload.setAttribute('value','Reload');
    buttonReload.setAttribute('class','button');
    buttonReload.onclick = function(){
        window.location.reload(true);
    };
    div.id = "reload";
    div.appendChild(buttonReload);
    document.getElementById('resultadosDiv').appendChild(div);
}