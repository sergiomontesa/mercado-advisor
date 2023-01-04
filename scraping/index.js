const res = await fetch('https://kingsleague.pro/estadisticas/clasificacion/')
const text = await res.text()

console.log(text)