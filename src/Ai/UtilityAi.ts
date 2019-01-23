import { Action } from './Action'
import { State } from '../State'
import { Agent } from '../Agent'
import { ActionCallback } from './Action'

export class UtilityAi {

    private _actions: Action[]

    constructor() {
        this._actions = []
    }

    addAction(description: string, callback: ActionCallback) {
        this._actions.push(new Action(description, callback))
    }

    evaluate(worldState: State, agent: Agent, debug: boolean = false): Action {
        return this._actions.reduce((acc, action) => acc.evaluate(worldState, agent, debug) > action.evaluate(worldState, agent, debug) ? acc : action)
    }

}
