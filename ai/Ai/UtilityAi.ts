import Action from './Action'
import State from '../../worldState/State'
import Agent from '../../agents/Agent'

type ActionCallback = (action:Action) => void

export default class UtilityAi {

    private _actions: Action[]

    constructor() {
        this._actions = []
    }

    addAction(description: string, callback: ActionCallback) {
        if (!description) {
            throw Error("Missing description")
        }
        if (!callback) {
            throw Error("Missing callback")
        }

        this._actions.push(new Action(description, callback))
    }

    evaluate(worldState: State, agent: Agent, debug: boolean = false): Action {
        return this._actions.reduce((acc, action) => acc.evaluate(worldState, agent, debug) > action.evaluate(worldState, agent, debug) ? acc : action)
    }

}
