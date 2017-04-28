//1. Initialize Firebase"
var config = {
	apiKey: "AIzaSyDQSbvetO8y40F7UkwQ1b2S8jHGH9XZ9ug",
	authDomain: "train-scheduler-ba1f5.firebaseapp.com",
	databaseURL: "https://train-scheduler-ba1f5.firebaseio.com",
	projectId: "train-scheduler-ba1f5",
	storageBucket: "train-scheduler-ba1f5.appspot.com",
	messagingSenderId: "161133675177"
};
firebase.initializeApp(config);
var database = firebase.database();
//console.log(database);	


// 2. On click event with Button for adding new train variables for new train inputs
$(document).ready(function(){

	// Populating data for Train schedule grid from firebase database.
 	database.ref().on("value", function(snap){
 		populateTrainScheduler(snap.val());
 	})

 	var populateTrainScheduler = function(data){
 		
 		console.log(JSON.stringify(data));

 		for (var row in data) {
			var item = data[row];
			var tds = "";
			tds = tds + "<td>" + item.name + "</td>";
			tds = tds + "<td>" + item.destination + "</td>";
			tds = tds + "<td>" + item.frequency + "</td>";
			tds = tds + "<td>" + getNextArrival(item) + "</td>"; 
			tds = tds + "<td>" + getMinutesAway(item) + "</td>";
			$("#train-table").append("<tr>" + tds + "</tr>");
		}

 	}

 	var getNextArrival = function(item){
 		var nextArrival = "WIP"
 		// TO DO !!!
		// var minutesAway
		// var diffInMinutes = moment().diff(moment(item.firstTrainTime), "minutes");
		// var currTime = moment()
		// while(currTime<moment().diff(moment(item.nextArrival) )){
		// nextArrival = item.firstTrainTime + item.frequency;
		// minutesAway = moment().diff(moment(nextArrival), "minutes");;
		// if (nextArrival>currTime){
		// 	minutesAway =  moment().diff(moment(nextArrival));
		// 	return nextArrival;
		// }
		// else{
		// 	nextArrival = item.firstTrainTime + item.frequency;
		// }	
		// }
 		return nextArrival;
 	}

 	var getMinutesAway = function(item){
 		var minutesAway = "WIP";
 		// TO DO !!!
	    // // Difference between the times
	    // var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	    // console.log("DIFFERENCE IN TIME: " + diffTime);

	    // // Time apart (remainder)
	    // var tRemainder = diffTime % tFrequency;
	    // console.log(tRemainder);

	    // // Minute Until Train
	    // var tMinutesTillTrain = tFrequency - tRemainder;
	    // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

	    // // Next Train
	    // var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


 		return minutesAway
 	}




 	// Add new train
	$("#btnAddTrain").click( function(event) {

		event.preventDefault();

		var trName = $("#trainName").val();
		var trDestination = $("#destination").val();
		var trFirstTrainTime = $("#firstTrainTime").val();
		var tnFrequency = $("#frequency").val();

		var newTrain = {
			name: trName,
			destination: trDestination,
			firstTrainTime: trFirstTrainTime,
			frequency: tnFrequency
		};

		console.log("Save newTrain to database:\n" + newTrain)	
		database.ref().push(newTrain, function(err){
			if(err){
				console.warn('error!',err);
			}
			else{
				console.log("Train saved successfully!!!")
				// Clears all of the text-boxes
				$("#trainName").val("");
				$("#destination").val("");
				$("#firstTrainTime").val("");
				$("#frequency").val("");
			}
		});
	});
});

	







