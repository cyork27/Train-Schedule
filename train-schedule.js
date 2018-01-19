  var config = {
    apiKey: "AIzaSyB59bSXzVAEcDauEFWPAr-qXMtfxbvkGVI",
    authDomain: "test-project-3a9dc.firebaseapp.com",
    databaseURL: "https://test-project-3a9dc.firebaseio.com",
    projectId: "test-project-3a9dc",
    storageBucket: "test-project-3a9dc.appspot.com",
    messagingSenderId: "669744633014"
  };
  firebase.initializeApp(config);


    var database = firebase.database();

$("#add-train").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain = moment($("#first-train-input").val().trim()).format("HH:mm");
  //need to figure out proper time format
  var frequency = $("#frequency-input").val().trim();

  var newTrain = {
    trainName: trainName,
    destination: destination,
    start: firstTrain,
    frequency: frequency,
  };

  database.ref().push(newTrain);

 
  console.log(newTrain.trainName);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frequency);

  alert("Train successfully added");

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#firstTrain-input").val("");
  $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().trainName;
  var destination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firstTrain;
  var frequency = childSnapshot.val().frequency;

  
  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);

  var firstTrainPretty = moment.unix().format("HH:mm");


  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  firstTrainPretty + "</td><td>" + frequency + "</td></tr>");
});

//need to convert frequency to seconds, find difference between firstTrain and frequency seconds, then append to table