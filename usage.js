const UAiAction = require('./lib/UAiAction.js')

console.log(UAiAction);

const state = {
    num: 0.1
}
const run = new UAiAction({
    description: 'run',
    command: 'command run',
    scores: [(s) => Math.sin(s.num), (s) => Math.sin(s.num)]
})
const fight = new UAiAction({
    description: 'fight',
    command: 'command fight',
    scores: [(s) => Math.cos(s.num), (s) => Math.cos(s.num)]
})
const fightOrFlight = new UAiAction({
    description: 'fightOrFlight',
    actions: [run, fight],
    scores: [(s) => Math.cos(s.num), (s) => Math.cos(s.num)]
})
const eat = new UAiAction({
    description: 'eat',
    command: 'command eat',
    scores: [(s) => Math.sin(s.num), (s) => Math.sin(s.num)]
})
const eatOrFlee = new UAiAction({
    description: 'eatOrFlee',
    actions: [fightOrFlight, eat],
    scores: [(s) => 1, (s) => 1]
})
const value = eatOrFlee.evaluate(state, true)
console.log(value);
