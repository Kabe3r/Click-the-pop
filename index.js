import { data } from './data.js';

const gameArea = {};
const user = {};
let dataObj = data.data;

gameArea.main = document.querySelector('.main');
gameArea.game = document.querySelector('.game');
gameArea.btn = document.querySelector('.btn');
gameArea.score = document.querySelector('.score');
gameArea.life = document.querySelector('.life');
user.score = 0;
user.items = 3;


document.addEventListener('DOMContentLoaded', getData);

gameArea.btn.addEventListener('click', function (e) {
      if (e.target.classList.contains('start')) {
            user.score = 0;
            user.items = 3;
            gameArea.main.classList.remove('visible');
            user.gameOver = false;
            startGame();
            updateScore();
      }
})

function getData()  {
      dataObj;
      gameArea.main.classList.add('visible');
      let rows = 5;
      let cols = 4;
      let count = 0;
      gameArea.game.style.width = '608px';
      gameArea.game.style.margin = 'auto';
      for (let i = 0; i < rows; i++) {
            let content = document.createElement('div');
            content.setAttribute('class', 'content');

            for (let j = 0; j < cols; j++) {
                  let box = document.createElement('div');
                  box.setAttribute('class', 'box');
                  count++;
                  box.innerText = count;
                  box.count = count;
                  content.appendChild(box);
            }
            gameArea.game.appendChild(content);
      }
}

function randomBox() {
      const boxes = document.querySelectorAll('.box');
      const random = Math.floor(Math.random() * boxes.length);
      if (boxes[random].count == gameArea.last) {
            return randomBox();
      }
      gameArea.last = boxes[random].count;
      return boxes[random];
}

function startGame() {
      let newBox = randomBox(); 
      newBox.classList.add('active');
      newBox.addEventListener('click', clickBox);
      const timer = Math.round(Math.random() * (1500) + 750);
      const random = Math.floor(Math.random() * dataObj.length);
      newBox.old = newBox.innerText;
      newBox.value = dataObj[random].value;
      newBox.innerHTML = dataObj[random].icon + '<br>' + dataObj[random].value;
      gameArea.inPlay = setTimeout(function() {
            newBox.classList.remove('active');
            newBox.removeEventListener('click', clickBox);
            newBox.innerText = newBox.old;

            if (user.items <= 0) gameOver();
            if (!user.gameOver) startGame();
            if (newBox.value > 0) {
                  user.items--;
                  updateScore();
            } 
      }, timer);
}

function clickBox(e) {
      let newBox = e.target;
      user.score += newBox.value;
      updateScore();
      newBox.classList.remove('active');
      newBox.removeEventListener('click', clickBox);
      newBox.innerText = newBox.old;
      clearTimeout(gameArea.inPlay);
      if (!user.gameOver) {
            startGame();
      }
}

function updateScore() {
      gameArea.score.innerHTML = '💯 Score: ' + user.score; 
      gameArea.life.innerHTML = '🔴 Lives: ' + user.items; 
}

function gameOver() {
      user.gameOver = true;
      gameArea.main.classList.add('visible');
      document.querySelector('.start').innerText = "New Game";
}



      