const doorOpenSpeed = 3

var Elevator = function() {
	this.currentFloor = 1;
	// 1 floor ever 3 seconds
	this.speed = 3;
	this.doorOpenTime = 3;
	this.doorsOpen = false;
	this.isMoving = false;
	this.availableFloors = Array.from({length: 10}, (min, max) => max+1); 
	
	this.openDoors = function(doors) {
		for (let i = 0; i < doors.length; i++) {
			doors[i].classList.add(doors[i].id + "-moved");
		} 
		this.doorsOpen = true;

	}
	this.closeDoors = function(doors) {
		for (let i = 0; i < doors.length; i++) {
			doors[i].classList.remove(doors[i].id + "-moved");
		}
		this.doorsOpen = false;
	}
}

var Panel = function(elevator) {

	var enter = document.querySelector("#enter");
	var inputButtons = document.querySelectorAll(".panel-input-button");

	this.updateDisplay = function(floor) {
		var floorNumber = document.querySelector("#floor-number");
		floorNumber.innerHTML = floor;
	}
	this.displayInput = function(button) {
		var display = document.querySelector("#panel-display");
		display.innerHTML = button.id;
	}

	this.pauseInput = function() {
		elevator.isMoving = false;
		var arrivalNotification = document.querySelector("#arrived-notification");
		arrivalNotification.innerHTML = "*";
	}

	this.moveElevator = function() {
		var requestedFloor = document.querySelector("#panel-display").innerHTML;
		if (!elevator.isMoving) {
			if (requestedFloor in elevator.availableFloors) {
				if (requestedFloor != elevator.currentFloor) {
					elevator.isMoving = true;
					var arrivalNotification = document.querySelector("#arrived-notification");
					var upArrow = document.querySelector("#up-arrow");
					var downArrow = document.querySelector("#down-arrow");
					arrivalNotification.innerHTML = "";
					this.updateDisplay(requestedFloor);

					if (requestedFloor > elevator.currentFloor) {
						upArrow.classList.remove("hide");
						downArrow.classList.add("hide");
					}
					else {
						downArrow.classList.remove("hide");
						upArrow.classList.add("hide");
					}

					var travelTime = (Math.abs(requestedFloor - elevator.currentFloor) * 
					                         (elevator.speed * 1000)) + 
											 (doorOpenSpeed * 1000) +
					                         (elevator.doorOpenTime * 1000);
					var arrivalTime = (Math.abs(requestedFloor - elevator.currentFloor) * 
					                         (elevator.speed * 1000)) + 
											 (doorOpenSpeed * 1000) +
					                         (elevator.doorOpenTime * 2000);

					setTimeout(this.pauseInput.bind(this), travelTime);
					elevator.currentFloor = requestedFloor;
					var elevatorDoors = document.querySelectorAll(".elevator-door");
					elevator.openDoors(elevatorDoors);
					setTimeout(elevator.closeDoors.bind(this, elevatorDoors), elevator.doorOpenTime * 1000);
					setTimeout(elevator.openDoors.bind(this, elevatorDoors), arrivalTime);
					setTimeout(elevator.closeDoors.bind(this, elevatorDoors), arrivalTime + (elevator.doorOpenTime * 1000));
				}
			}
		}
	}

	enter.addEventListener("click", this.moveElevator.bind(this), true);
	for (let i = 0; i < inputButtons.length; i++) {
		inputButtons[i].addEventListener("click", this.displayInput.bind(this, inputButtons[i]), true);
	}
}

var elevator = new Elevator;
var panel = new Panel(elevator);