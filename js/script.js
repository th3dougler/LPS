const choices = ["Lapis", "Papyrus", "Scalpellus"];
const player = {
  currentChoice: null,
  wins: 0
}
const computer = {
  currentChoice: null,
  wins: 0
};
document.addEventListener("DOMContentLoaded", ready);
function ready(){
const playerBtns = document.querySelectorAll('.player');
const computerBtns = document.querySelectorAll('.computer')
//add event listener to all buttons used to select a throw
playerBtns.forEach(
  function(e){
    e.addEventListener('click',startGame);
  }
);
console.log("ready did dun run");
}

//adjust colors on buttons to highlight clicked and black out the rest
//generate computers throw then start a countdown to reveal the results
function startGame(e){
  alert("click!");
  adjustBtns(parseInt(e.target.id), playerBtns);
  player.currentChoice = parseInt(e.target.id);
  computer.currentChoice = getChoice();
  document.querySelector('.results').innerText = "";
  countDown(3);
}

function getChoice() {
  return Math.floor(Math.random()*choices.length);
}

//set clicked button bg to yellow, the rest to black
//unless null is passed to function, then reset all to white

function adjustBtns(clickedId, buttonSet){
  let l = buttonSet.length
  for(i = 0; i < l; i++){
    if(clickedId==null)
      buttonSet[i].classList.remove('blocked', 'choice');
    else if (clickedId == i)
      buttonSet[i].classList.add('choice');
    else
      buttonSet[i].classList.add('blocked'); 
  }
}
function resetAllBtns() {
  adjustBtns(null,computerBtns);
  adjustBtns(null,playerBtns);
}
//recursive countdown function, breaks loop when interation reaches zero
//revealing the computers throw and the winner by calling the comparePlays function
function countDown(iteration){
  if (iteration != 0){
    document.querySelector('.results').innerText += (iteration) + "...";
    let t = setTimeout(countDown.bind(null,iteration-1),500);
  }
  else {

    adjustBtns(computer.currentChoice,computerBtns);
    document.querySelector('.results').innerText = comparePlays(player.currentChoice,  computer.currentChoice);
    setTimeout(resetAllBtns,2000);
  }
}
function comparePlays(playX, playY){
  //where playX is the users throw, playY is the computers throw
  //rather than look for all possible outcomes, check for a tie game
  //if it is not a tie, check for the 3 possible winning outcomes
  //otherwise return losing game
  let sum = playX + playY;
  if(playX != playY){
    if ((sum === 3 && playX === 2) ||
        (sum === 2 && playX === 0) ||
        (sum === 1 && playX === 1))
      return "Player Wins!";
    else
      return "Computer Wins!";
  }
  else
    return "Tie Game!";
}