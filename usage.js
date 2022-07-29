const UAiAction = require('./lib/UAiAction.js')

// define a state to be used by the ai.
// here we have a state variable 'num' = 0.1
const state = { num: 0.1 }

// Define run action, with a total score function of 2 * sin(num)
// the score functions recieve the state as parameter and return a number.
// The total score of an action is the sum of all of its score functions
const run = new UAiAction({
    description: 'run',
    command: 'command run',
    scores: [({ num }) => Math.sin(num), ({ num }) => Math.sin(num)]
})


// Define the fight function
const fight = new UAiAction({
    description: 'fight',
    command: 'command fight',
    scores: [({ num }) => Math.cos(num), ({ num }) => Math.cos(num)]
})

// An Action can have nested actions. In this case if the action gets choosen
// it wont return a command but recursively run its nested actions to determine witch
// one will be choosen
// This process is recursive
const fightOrFlight = new UAiAction({
    description: 'fightOrFlight',
    actions: [run, fight],
    scores: [({ num }) => Math.cos(num), ({ num }) => Math.cos(num)]
})

const eat = new UAiAction({
    description: 'eat',
    command: 'command eat',
    scores: [({ num }) => Math.sin(num), ({ num }) => Math.sin(num)]
})

// This is the main action.
// It recieves fightOrFlight and eat actions
// In this deterministic configuration:
// fightOrFlight score is 1.99 and will be choosen
// fight (nested in fightOrFlight) score is 1.99 and will be choosen
// fight cas a command (command fight), that will be returned as the decision / action to take
const eatOrFlee = new UAiAction({
    description: 'eatOrFlee',
    actions: [fightOrFlight, eat],
    scores: [() => 1]
})

const value = eatOrFlee.evaluate(state, true)
console.log(value);
