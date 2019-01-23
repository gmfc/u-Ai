import UtilityAi from './UtilityAi'
import Agent from '../../agents/Agent'
import State from '../../worldState/State'
import Action from './Action';

type ActionCallback = (action:Action) => void

export default class Ai {
    ai: UtilityAi
    constructor(public agent: Agent) {
        this.ai = new UtilityAi()
    }

    addAction(description: string, callback: ActionCallback) {
        this.ai.addAction(description, callback)
    }

    evaluate(wState: State, agent: Agent) {
        this.ai.evaluate(wState, agent).doFn(wState, agent)
    }
}