// Creating an array with five tasks name
let arr= ["Task1", "Task2", "Task3","Task4", "Task5"]

// Removing the 1st task form an array
arr.shift()

// Now adding new 2 task at the starting of an array
arr.unshift("First Task", "Second Task")

// Replacing the last task with the Name new Task
arr[arr.length-1] = "NewTask"

//Printing now the final result of an array
console.log(arr)
