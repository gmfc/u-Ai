import { SimpleState } from './SimpleState'

let world = new SimpleState(5)

setInterval(() => {
    world.simulate()
}, 1000)