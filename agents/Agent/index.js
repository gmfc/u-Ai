export default class Agent {
    constructor({id}) {
        this.id = id
    }

    get isBlocked() {
        return false
    }

    tick() {
        return true
    }

    simulate(wState) {
        if (!this.ai) {
            throw Error("Agent#Simulate#AI: Missing AI definition")
        }
        this.tick()
        this.ai.evaluate(wState, this)
    }
}