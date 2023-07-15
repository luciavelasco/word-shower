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

if (typeof dictionary === `undefined`) {
  console.error(`Could not initialise dictionary`)
  errorBox.innerText = `Error! Could not load dictionary.`
  start.disabled = true
  stop.disabled = true
}

const alphabet = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`, `l`, `m`, `n`, `o`, `p`, `q`, `r`, `s`, `t`, `u`, `v`, `w`, `x`, `y`, `z`]
const weightedLetters = [`a`, `e`, `i`, `o`, `u`, `s`]
const randomLetterList = [...alphabet, ...weightedLetters, ...weightedLetters]

const stopGame = () => {
  if (intervalId) {
    clearInterval(intervalId)
    // todo: cleanup html?
    //  If I do, I'll have to clear this timeout on startGame().
    // setTimeout(() => {
    //   game.innerHTML = ``
    //   console.log(activeLetters)
    //   activeLetters.splice(0)
    //   console.log(activeLetters)
    // }, 3000)
  }
}

const startGame = () =>
  setInterval(() => {
    const randomLetter = randomLetterList[Math.floor(Math.random() * randomLetterList.length)];
    const randomPosition = Math.floor(Math.random() * 270) / 10;
    game.insertAdjacentHTML(
      `afterbegin`,
      `<div class="falling-letter" style="left: ${randomPosition}rem">${randomLetter}</div>`
    )
    activeLetters.push(randomLetter)
    setTimeout(() => {
      activeLetters.shift()
    }, 4000)
  }, 400)

start.addEventListener(`click`, () => {
  if (!intervalId) {
    intervalId = startGame()
    input.focus()
  }
})

stop.addEventListener(`click`, stopGame)

document.addEventListener(`keydown`, (e) => {
  if (intervalId && e.key === `Escape`) stopGame()
})

input.addEventListener(`keydown`, (e) => {
  if (intervalId && e.key === `Escape`) {
    stopGame()
  } else if (e.key === `Enter`) {
    // if valid word
    // const search = new RegExp(`^${input.value}$`, `i`)
    const attempt = input.value
    if (dictionary.includes(attempt.toUpperCase())) {
      // TODO: add to matches array and increase score
      input.value = ``
      correctWords.innerText = attempt + "\n" + correctWords.innerText
      score.innerText = `${parseInt(score.innerText) + attempt.length}`
    } else {
      // else do nothing
      e.preventDefault()
      console.log(attempt)
    }
  } else if (alphabet.includes(e.key) && !activeLetters.includes(e.key) || e.key === `Space`) {
    e.preventDefault()
  }
})

