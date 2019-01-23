import UtilityAi from './UtilityAi'
import Agent from '../../agents/Agent'
import State from '../../worldState/State'

export default class Ai {
    ai: UtilityAi
    constructor(public agent: Agent) {
        this.ai = new UtilityAi()
    }

    addAction(description: string, callback: Function) {
        this.ai.addAction(description, callback)
    }

    evaluate(wState: State, agent: Agent) {
        this.ai.evaluate(wState, agent).doFn(wState, agent)
    }
}