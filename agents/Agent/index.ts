import Ai from "../../ai/Ai";
import State from "../../worldState/State";

export default class Agent {

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
        if (!this.ai) {
            throw Error("Missing AI definition")
        }
        this.tick()
        this.ai.evaluate(wState, this)
    }
}