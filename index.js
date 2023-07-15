// Initialising game
const game = document.getElementById(`game`);
const start = document.getElementById(`start`);
const stop = document.getElementById(`stop`);
const input = document.getElementById(`game-input`);
const correctWords = document.getElementById(`correct-words`);
const score = document.getElementById(`points`);
const errorBox = document.getElementById(`error`);
const activeLetters = [];
let intervalId = false;
let cleanupTimeoutId = false;

let foundWords = JSON.parse(localStorage.getItem(`found-words`)) || {} // { [word]: foundCount } e.g. { hamster: 2 }
const startingScore = Object.keys(foundWords)
  .reduce((runningScore, word) => runningScore + (word.length * foundWords[word]), 0) || 0

correctWords.innerHTML = Object.keys(foundWords)
  .reverse()
  .map(word => `<span>${word}</span>`)
  .join(``)
score.innerText = startingScore.toString()

if (typeof dictionary === `undefined`) {
  console.error(`Could not initialise dictionary`)
  errorBox.innerText = `Error! Could not load dictionary.`
  start.disabled = true
  stop.disabled = true
}

// constants
const alphabet = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`, `l`, `m`, `n`, `o`, `p`, `q`, `r`, `s`, `t`, `u`, `v`, `w`, `x`, `y`, `z`]
const weightedLetters = [`a`, `e`, `i`, `o`, `u`, `s`]
const randomLetterList = [...alphabet, ...weightedLetters, ...weightedLetters]
const animationTime = 4000;


// Game Logic
const stopGame = () => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = false
    input.blur()
    cleanupTimeoutId = setTimeout(() => {
      game.innerHTML = ``
      cleanupTimeoutId = false
    }, animationTime)
  }
}

const startGame = () => {
  if (cleanupTimeoutId) clearTimeout(cleanupTimeoutId)
  intervalId = setInterval(() => {
    const randomLetter = randomLetterList[Math.floor(Math.random() * randomLetterList.length)];
    const randomPosition = Math.floor(Math.random() * 270) / 10;
    game.insertAdjacentHTML(
      `afterbegin`,
      `<div class="falling-letter" style="left: ${randomPosition}rem">${randomLetter}</div>`
    )
    activeLetters.push(randomLetter)
    setTimeout(() => {
      activeLetters.shift()
    }, animationTime)
  }, 400)
  input.focus()
}
start.addEventListener(`click`, () => {
  if (!intervalId) {
    startGame()
  }
})

stop.addEventListener(`click`, stopGame)

document.addEventListener(`keydown`, (e) => {
  if (e.code === `Space`) {
    e.preventDefault()
    if (intervalId) stopGame()
    else startGame()
  } else if (intervalId && e.code === `Escape`) {
    stopGame()
  }
})

input.addEventListener(`keydown`, (e) => {
  if (e.key === `Enter`) {
    const attempt = input.value.trim()
    if (dictionary.includes(attempt.toUpperCase())) {
      input.value = ``
      correctWords.insertAdjacentHTML(`afterbegin`, `<span>${attempt}</span>`)
      foundWords = {...foundWords, [attempt]: foundWords[attempt] || 1 }
      localStorage.setItem(`found-words`, JSON.stringify(foundWords))
      score.innerText = `${parseInt(score.innerText) + attempt.length}`
    } else {
      // else do nothing
      e.preventDefault()
      console.log(attempt)
    }
  } else if (e.code === `Space` || (alphabet.includes(e.key) && !activeLetters.includes(e.key))) {
    e.preventDefault()
  }
})

