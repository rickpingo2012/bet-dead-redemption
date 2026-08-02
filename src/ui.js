// Get the menus
const menu = document.getElementsByClassName('menu')[0]
export const fightStage = document.getElementsByClassName('fight-stage')[0]
const shop = document.getElementsByClassName('shop')[0]
const cards = document.getElementsByClassName('cards-box')[0]
const death = document.getElementsByClassName('death')[0]
const flash = document.getElementsByClassName('flash')[0]

// Get the display
const display = document.getElementsByClassName('display')[0]
const displayTax = document.getElementsByClassName('display')[1]

// Start the game, changing the menu
export function changeMenu() {
  menu.classList.add('escondido')
  death.classList.add('escondido')
  shop.classList.add('escondido')
  fightStage.classList.remove('escondido')
}

// Restart the game, changing the menu
export function changeMenuRestart() {
  death.classList.add('escondido')
  fightStage.classList.add('escondido')
  shop.classList.add('escondido')
  menu.classList.remove('escondido')
  
  updateDisplay(100, 1)
  updateDisplayTax(150)
}

// Update the display
export function updateDisplay(money, round, txt='0') {
  if (txt != 0) {
    display.innerHTML = txt
  } else {
    display.innerHTML = `Dinheiro: ${money} | Rodada: ${round}`
  }
}
export function updateDisplayTax(tax) {
  displayTax.innerHTML = `Taxa: ${tax}`
}

// Pass to level of select card
export function cardsLevel() {
  cards.classList.remove('escondido')
  fightStage.classList.add('escondido')
}

// Does the same thing that "cardsLevel", but reverse
export function cardsLevelReverse() {
  cards.classList.add('escondido')
  fightStage.classList.remove('escondido')
}

// Clear the cards div
export function clearCards() {
  cards.innerHTML = ''
}

// Create a new card
export function newCard(card) {
  cards.appendChild(card)
}

// Active when the player is dead
export function deadMenu() {
  death.classList.remove('escondido')
  fightStage.classList.add('escondido')
  cards.classList.add('escondido')
}

// Active when the player go to shop
export function shopMenu(honor) {
  shop.classList.remove('escondido')
  death.classList.add('escondido')
  displayTax.innerHTML = ''
  display.innerHTML = `Honor: $  ${honor.toFixed(1)}`
}

// Return the player to menu
export function returnMenu() {
  shop.classList.add('escondido')
  death.classList.remove('escondido')
}

// Active the flash of shot in screen
export function activeFlash() {
  flash.classList.add('ativo')
  
  setTimeout(() => {
    flash.classList.remove('ativo')
  }, 50);
}
