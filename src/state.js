// Save all itens that receive
export function save(itens) {
  localStorage.setItem('playerItens', JSON.stringify(itens))
}

// Get all itens that are saved
export function load() {
  const data = localStorage.getItem('playerItens')
  return data ? JSON.parse(data) : null
}
