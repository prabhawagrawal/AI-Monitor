img = "";
status = "";
objects = [];

function preload(){
    console.log("Preloading...");
    alert = loadSound('alert.mp3');
}

function setup(){
    canvas = createCanvas(500, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(500, 380);
    video.hide();
    console.log("Setup Complete!");
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelReady);
    document.getElementById("status").innerHTML = "Status: Detecting objects...";
    console.log("Detecting objects...");
}

function modelReady(){
    console.log("Model Loaded!");
    // status = true;
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}

function draw(){
    image(video, 0, 0, 500, 380);

    if(status != ""){
        objectDetector.detect(video, gotResults); 
        console.log("Working1");
        for(i = 0; i < objects.length; i++){
            fill(0, 0, 255);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(0, 0, 255);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            console.log("Working2");

            if(objects[i].label == "person"){
                alert.stop();
                document.getElementById("status").innerHTML = "Status: Person detected!";
                console.log("Working3");
            }
            else{
                alert.play();
                document.getElementById("status").innerHTML = "Status: Person not detected";
                console.log("Working4");
            }

            if(objects.length == 0){
                alert.play();
                document.getElementById("status").innerHTML = "Status: No objects detected";
                console.log("Working5");
            }
        }
    }
}