prediction1="";
prediction2="";
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach('#camera');
function takephoto() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="Cprediction" src="'+data_uri+'"/>';
    });
}
console.log('ml5 version:',ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/galS2RXgv/model.json',modelloaded);
function modelloaded(){
    console.log("modelloaded");
}
function speak() {
    var synth=window.speechSynthesis;
    speak1_data1="The first prediction is "+prediction1;
    speak2_data2="The second prediction is "+prediction2;
    var utter=new SpeechSynthesisUtterance(speak1_data1+speak2_data2);
    utter.rate=0.5;
    synth.speak(utter);
}
function check(){
 img=document.getElementById("Cprediction");
 classifier.classify(img,gotResult);
}
function gotResult(){
    if (error){
        console.error(error);
    }else{
        console.log(results);
        document.getElementById("Result_emotion_name1").innerHTML=results[0].label;
        document.getElementById("Result_emotion_name2").innerHTML=results[1].label;
        prediction1=results[0].label;
        prediction2=results[1].label;
        speak();
        if(results[0].label=="happy"){
            document.getElementById("Update_emoji").innerHTML="&#128522;";
        }
        if(results[0].label=="sad"){
            document.getElementById("Update_emoji").innerHTML="&#128532;"
        }
        if(results[0].label=="angry"){
            document.getElementById("Update_emoji").innerHTML="&#128548;";
        }
        if(results[1].label=="happy"){
            document.getElementById("Update_emoji2").innerHTML="&#128522;";
        }
        if(results[1].label=="sad"){
            document.getElementById("Update_emoji2").innerHTML="&#128532;"
        }
        if(results[1].label=="angry"){
            document.getElementById("Update_emoji2").innerHTML="&#128548;";
        }
    }
}