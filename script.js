document.addEventListener("DOMContentLoaded" , () => {
  const squares = document.querySelectorAll(".grid div")
  const scoreDisplay = document.querySelector("span")
  const startBtn = document.querySelector(".start")
  
  const width = 10 // the size of one piece of the snake
  let currentIndex = 0 // basic starting point for the snake to start at
  let appleIndex = 0 // basic starting point of the apple which is reassigned
  let currentSnake = [2,1,0] // divs with 2 act as head of snake and divs with 0 are the snake tail and all 1's act as the body
  let direction = 1 // snake starts movement to the right
  let score = 0 // score starts at zero and is updated
  let speed = 0.9 // movement speed of the snake
  let intervalTime = 0 // sets interval time initially to 0 until game is started
  let interval = 0
  let i = 30; // time is set to 30 seconds of play time

  //timer function that counts down to end game
  function onTimer() {
    // sets timer to 30 sec when function called when start game is clicked
    document.getElementById("timeLeft").innerHTML = i;
    i--;
    // if time reaches 0 alert pops up
    if (i < 0) {
      alert("time is up game over");
    }
    else {
      setTimeout(onTimer, 1000);
    }
  }


  //start and restart function
  function startGame () {
    // removes the class of snake using foreach method
    currentSnake.forEach(index => squares[index].classList.remove("snake"))
    //removes class of apple in the index and sets it in a random spot
    squares[appleIndex].classList.remove("apple")
    clearInterval(interval)
    // sets score to zero at start
    score = 0
    // starting direction which starts movement to the right
    direction = 1
    // calls the random apple generation function at start of game
    randomApple()
    // sets score to update while game is played
    scoreDisplay.innerText = score
    // sets speed of snake at game start
    intervalTime = 1000
    //sets up initial shape of snake on start
    currentSnake = [2,1,0]
    currentIndex = 0
    // sets the inital snake and adds classes of snake to the divs
    currentSnake.forEach(index => squares[index].classList.add("snake"))
    interval = setInterval(moveOutcomes, intervalTime)
    onTimer()
  }
  


  //deals with all the outcomes when moving
  function moveOutcomes() {

    
    if (
      (currentSnake[0] + width >= (width * width) && direction === width ) || //snake hits the bottom boundy
      (currentSnake[0] % width === width -1 && direction === 1) || // if snake hits right boundry
      (currentSnake[0] % width === 0 && direction === -1) || // if snake hits left boundry
      (currentSnake[0] - width < 0 && direction === -width) || // if snake hits left boundry
      squares[currentSnake[0] + direction].classList.contains('snake') // if snake hits itself
    ) {
      return clearInterval(interval)  // if one of the hit conditions is met it will reset the interval   
    }
    
    const tail = currentSnake.pop() // updates the array and shows new snake
    squares[tail].classList.remove('snake') // updates tge snake tail by updating the class
    currentSnake.unshift(currentSnake[0] + direction) // sets the direction of the head of the snake and array

    
     //handles snake getting the fruit and adding one to the tail end
      if(squares[currentSnake[0]].classList.contains("apple")) {
        squares[currentSnake[0]].classList.remove("apple") // moves apple to new spot after obtained
        squares[tail].classList.add("snake")
        currentSnake.push(tail) // adds extra block to snake after it has eaten apple
        randomApple() // regenerate new random apple after obtained
        score++
        scoreDisplay.textContent = score // score update
        clearInterval(interval) // sets new interval
        intervalTime = intervalTime * speed // increases snake speed
        interval = setInterval(moveOutcomes, intervalTime)
      }
      squares[currentSnake[0]].classList.add("snake")
  }
  
  
 //genreates apple onto the game board inserts it into a new spot and checks to make sure it does not place it in a space part of the snake already is
  function randomApple() {
    do{
      appleIndex = Math.floor(Math.random() * squares.length)
    } while(squares[appleIndex].classList.contains('snake')) 
        squares[appleIndex].classList.add('apple')
  }
  
  
  
  
  
  // controls the movement of the snake using key codes and key up event
  function control(e){
    squares[currentIndex].classList.remove("snake")
    // all only move one div at a time
    if(e.keyCode === 39) {
      direction = 1 // press right arrow
    } else if (e.keyCode === 38){
      direction = -width // press up arrow
    } else if (e.keyCode === 37){
      direction = -1 //press left arrow
    } else if (e.keyCode === 40){
      direction = +width //press down arrow
    }
  }
  
  document.addEventListener("keyup", control)
  startBtn.addEventListener("click", startGame)
})
