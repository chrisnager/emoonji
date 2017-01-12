const phases = [
  {emoji: '🌚', name: 'new moon', weight: 1},
  {emoji: '🌒', name: 'waxing crescent', weight: 6.3825},
  {emoji: '🌓', name: 'first quarter', weight: 1},
  {emoji: '🌔', name: 'waxing gibbous', weight: 6.3825},
  {emoji: '🌝', name: 'full moon', weight: 1},
  {emoji: '🌖', name: 'waning gibbous', weight: 6.3825},
  {emoji: '🌗', name: 'last quarter', weight: 1},
  {emoji: '🌘', name: 'waning crescent', weight: 6.3825},
]

const oneDay = 24 * 60 * 60 * 1000
const today = new Date()
const tomorrow = new Date(today.getTime() + oneDay)
const yesterday = new Date(today.getTime() - oneDay)

const phase = day => SunCalc.getMoonIllumination(day).phase
const moon = phases[stepPhase(phase(today))]

function stepPhase(phase) {
  const weight = phases.reduce((a, b) => a + b.weight, 0)

  phase *= weight

  for (var rv = 0; rv < phases.length; rv++) {
    phase -= phases[rv].weight

    if (phase <= 0) break
  }

  return rv
}

console.log(
  moon,
  '\nTonight\'s moon', phase(today),
  '\nTomorrow\'s moon', phase(tomorrow),
  '\nYesterday\'s moon', phase(yesterday)
)

