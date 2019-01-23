import { Ai } from '../Ai'
import { State } from '../State'

export class Agent {

    ai: Ai

    constructor(public id: string) {
        this.id = id
    }

    get isBlocked() {
        return false
    }

    tick() {
        return true
    }

    simulate(wState: State) {
        this.tick()
        this.ai.evaluate(wState, this)
    }
}