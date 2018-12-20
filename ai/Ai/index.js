import UtilityAi from './UtilityAi'

export default class Ai {
    constructor(agent) {
        this.agent = agent
        this.ai = new UtilityAi()
    }

    addAction(description, callback) {
        this.ai.addAction(description, callback)
    }

    evaluate(wState, agent) {
        this.ai.evaluate({ wState, agent }).do({ wState, agent })
    }
}