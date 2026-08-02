// A map to character's names
export const mapNames = {
  'ArthurMorgan': 'Arthur Morgan',
  'MicahBell': 'Micah Bell',
  'DutchLinde': 'Dutch Van Der Linde',
  'JohnMarston': 'John Marston'
}

// A map to cards name
export const mapCards = {
  'Personagem 1, mais chances': 'O primeiro personagem tem mais chances de vencer',
  'Snake Eye Oil': 'O jogador não vai perder na próxima rodada',
  'Aumentar apostas': 'Aumenta as apostas em 25$',
  'Personagem 2, mais chances': 'O segundo personagem tem mais chances de vencer',
  'Tônico': 'O jogador ganha 300$'
}

// List of upgrade cards
const upgCards = [
  'Personagem 1, mais chances',
  'Snake Eye Oil', 
  'Aumentar apostas', 
  'Personagem 2, mais chances', 
  'Tônico'
]

// List of curreny cards in game
export let currentCards = []

// Select a random character
export function randomChar() {
  const randomNumber = Math.floor(Math.random() * 4)
  const imgs = ['ArthurMorgan', 'JohnMarston', 'DutchLinde', 'MicahBell']
  
  return imgs[randomNumber]
}

// Get a random number
export function selectWinner(c1, c2, odd) {
  const randomNumber = Math.floor(Math.random() * 100)
  
  if (randomNumber < odd) {
    return c1
  } else {
    return c2
  }
}

// Get a random card of a list
export function selectCard() {
  const randomNumber = Math.floor(Math.random() * upgCards.length)
  
  if (currentCards.includes(upgCards[randomNumber])) {
    return selectCard()
  }
  
  currentCards.push(upgCards[randomNumber])
  return upgCards[randomNumber]
}

/* Return true if the number is divisible
for 10. Or false if is not */
export function divisibleFor10(n) {
  return n % 10 === 0
}


// Calcule the percentage
export function calculePercentage(n, p) {
  return (n * p) / 100
}
