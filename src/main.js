// Connect and get itens of ui.js
import { changeMenu, changeMenuRestart, fightStage, updateDisplay, updateDisplayTax, newCard, cardsLevel, cardsLevelReverse, clearCards, deadMenu, shopMenu, returnMenu, activeFlash } from './ui.js'
// Connect and get itens of utils.js
import { randomChar, mapNames, selectWinner, selectCard, mapCards, divisibleFor10, calculePercentage, currentCards } from './utils.js'

// Connect and get itens of state.js
import { save, load } from './state.js'

// Set if the changed display is active
let displayTimeout = null

// Variables of inicial state
let money = 200
let round = 1
let tax = 150
let taxInc = 120 // Tax incremental
let honor = 0
let playerBet = 50
let oddsChar1 = 50 //Odds of character 1

// Upgrades
let snakeEye = false
let superSnakeEye = false
let emergencyFund = false
let salary = false
let salaryMoney = 50
let moreMoney = false

// Set the actually fighting characters
let fightingCharacters = []

// Buttons of the HTML
const btnStart = document.getElementById('start')
const btnRestart = document.getElementById('restart')
const btnShop = document.getElementById('shop')
const btnReturn = document.getElementById('return')
const btnBuy = document.querySelectorAll('.btn-buy')

// Sounds
const shot = new Audio('assets/shot.wav')

// Create a card to character
function makeCharCard(charName) {
  const card = document.createElement('div')
  card.className = 'character-card'
  
  const img = document.createElement('img')
  img.alt = mapNames[charName]
  img.src = `assets/${charName}.png`
  
  const btnBet = document.createElement('button')
  btnBet.className = 'btn-bet'
  btnBet.innerText = `Apostar em ${mapNames[charName]}`
  
  btnBet.addEventListener('click', () => {
    doBet(charName)
  })
  
  card.appendChild(img)
  card.appendChild(btnBet)
  fightStage.appendChild(card)
}

// Create a upgrade card
function makeUpgradeCard() {
  if (salary) money += salaryMoney
  
  clearCards()
  currentCards.length = 0
  
  money -= tax
  
  if (money < 0) {
    if (emergencyFund) {
      money += 100
      emergencyFund = false
    }
    
    if (money <= 0) {
      killPlayer('Você não pagou a taxa corretamente!')
      return true
    }
  }
  
  tax += Math.floor(calculePercentage(tax, taxInc))
  
  for (let i = 0; i < 3; i++) {
    const upgCardSelected = selectCard()
    const card = document.createElement('div')
    card.className = 'upgrade-card'
    
    card.innerHTML = `<h3>${upgCardSelected}</h3> <br> <p>${mapCards[upgCardSelected]}</p>`
    
    card.addEventListener('click', () => {
      choiseCard(upgCardSelected)
    })
    
    newCard(card)
  }
  cardsLevel()
  return false
}

// Let the player choise one card
function choiseCard(card) {
  switch (card) {
    case 'Tonic' :
      money += 300
      break
      
    case 'Raise the bets' :
      playerBet += 25
      break
      
    case 'Character 1, more odds':
      oddsChar1 += calculePercentage(oddsChar1, 20)
      break
      
    case 'Character 2, more odds':
      oddsChar1 -= calculePercentage(oddsChar1, 20)
      break
      
    case 'Snake Eye Oil':
      snakeEye = true
      break
      
    default:
      console.log('Carta desconhecida', card)
  }
  updateDisplay(money, round)
  updateDisplayTax(tax)
  cardsLevelReverse()
}

/* Do a bet, if the sorted name is equal
the "charName" in parameter, the player 
get it right */
function doBet(charName) {
  if (!snakeEye && !superSnakeEye) {
    money -= playerBet
  } else {
    money -= 0
  }
  
  const winMultiplier = moreMoney ? 3 : 2
  
  shotFlash()
  
  round += 1
  const winner = selectWinner(fightingCharacters[0], fightingCharacters[1], oddsChar1)
  
  snakeEye = false
  
  setupNewRound()
  
  if (round >= 5) superSnakeEye = false
  
  if (money <= 0) {
    if (emergencyFund) {
      money += 100
      emergencyFund = false
    }
    
    if (money <= 0) {
      killPlayer('O seu dinheiro acabou! Não vai conseguir nos pagar.')
      return
    }
  }
  
  if (divisibleFor10(round)) {
    const isDead = makeUpgradeCard()
    if (isDead) return
    return
  }
  
  if (winner === charName) {
    money += (playerBet * winMultiplier)
    updateDisplay(money, round, 'Você venceu a aposta!')
    updateDisplayTax(tax)
    
    if (displayTimeout) clearTimeout(displayTimeout)
    
    displayTimeout = setTimeout(() => {
      updateDisplay(money, round)
    }, 1000)
  } else {
    updateDisplay(money, round, 'Você perdeu a aposta!')
    updateDisplayTax(tax)
    
    if (displayTimeout) clearTimeout(displayTimeout)
    
    displayTimeout = setTimeout(() => {
      updateDisplay(money, round)
    }, 1000)
  }
}

// Active the flash in screen and the sound
function shotFlash() {
  shot.currentTime = 0
  shot.play()
  activeFlash()
}

// Kill the player
function killPlayer(deathMessage) {
  updateDisplay(money, round, deathMessage)
  honor += round / 10
  deadMenu()
}

// This works to set the fight stage
function setupNewRound() {
  fightStage.innerHTML = ''
  clearCards()
  cardsLevelReverse()
  
  const char1 = randomChar()
  let char2 = randomChar()
  
  while (char2 == char1) {
    char2 = randomChar()
  }
  
  fightingCharacters = [char1, char2]
  makeCharCard(char1)
  makeCharCard(char2)
  
  // Update the displays
  updateDisplay(money, round)
  updateDisplayTax(tax)
}

// Reset the state of game
function resetGameState() {
  money = 200
  round = 1
  tax = 150
  playerBet = 50
  oddsChar1 = 50
  snakeEye = false
  if (displayTimeout) clearTimeout(displayTimeout)
}

// Save the game itens
function saveState() {
  const itens = {
    money,
    round,
    tax,
    taxInc,
    honor,
    playerBet,
    oddsChar1,
    snakeEye,
    superSnakeEye,
    emergencyFund,
    salary,
    salaryMoney,
    moreMoney
  }
  save(itens)
}

// Load the saved game itens
function loadState() {
  const data = load()
  
  if (data) {
    money = data.money ?? money
    round = data.round ?? round
    tax = data.tax ?? tax
    taxInc = data.taxInc ?? taxInc
    honor = data.honor ?? honor
    playerBet = data.playerBet ?? playerBet
    oddsChar1 = data.oddsChar1 ?? oddsChar1
    
    snakeEye = data.snakeEye ?? snakeEye
    superSnakeEye = data.superSnakeEye ?? superSnakeEye
    emergencyFund = data.emergencyFund ?? emergencyFund
    salary = data.salary ?? salary
    salaryMoney = data.salaryMoney ?? salaryMoney
    moreMoney = data.moreMoney ?? moreMoney
    
    updateDisplay(money, round)
    updateDisplayTax(tax)
  }
}

// Buy a card that was clicked
function buyItem(item) {
  switch (item) {
    case '1':
      if (!haveHonor(2)) return
      superSnakeEye = true
      honor -= 2
      break
      
    case '2':
      if (!haveHonor(2.5)) return
      taxInc -= 10
      honor -= 2.5
      break
      
    case '3':
      if (!haveHonor(5)) return
      emergencyFund = true
      honor -= 5
      break
      
    case '4':
      if (!haveHonor(3)) return
      salary = true
      honor -= 3
      break
      
    case '5':
      if (!haveHonor(10)) return
      moreMoney = true
      honor -= 10
      break
    
    default:
    console.log(`Erro. Item comprado não identificado. ID: ${item}`)
  }
  shopMenu(honor)
  function haveHonor(honorNeed) {
    if (honor < honorNeed) {
      return false
    }
    return true
  }
}

// Active when the button is clicked
btnStart.addEventListener('click', () => {
  changeMenu()
  setupNewRound()
})
btnRestart.addEventListener('click', () => {
  resetGameState()
  saveState()
  changeMenuRestart()
})
btnShop.addEventListener('click', () => {
  shopMenu(honor)
})
btnReturn.addEventListener('click', () => {
  returnMenu()
})
btnBuy.forEach(item => {
  item.addEventListener('click', () => {
    const idItem = item.dataset.id
    buyItem(idItem)
  })
})

// Set an interval to save
setInterval(() => {
  saveState()
}, 5000);


// Load when the body is loaded
window.onload = () => {
  loadState()
}
