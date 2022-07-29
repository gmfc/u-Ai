type NodeAct<state> = {
  actions: UAiAction<state>[]
  description: string
  scores: ((state: state) => number)[]
}

type Act<state> = {
  command: string
  description: string
  scores: ((state: state) => number)[]
}

class UAiAction<state> {

  private _command?: string
  private _description: string
  private _actions?: UAiAction<state>[]
  private _scores: ((state: state) => number)[]

  constructor(action: NodeAct<state> | Act<state>) {
    if ((action as Act<state>).command !== undefined) this._command = (action as Act<state>).command
    if ((action as NodeAct<state>).actions !== undefined) this._actions = (action as NodeAct<state>).actions
    this._scores = action.scores
    this._description = action.description
  }

  private score(state: state, debug: boolean): number {
    const scr = this._scores.map(s => s(state)).reduce((a, b) => a + b)
    if (debug) console.log(`score of ${this._description} = ${scr}`);
    return scr
  }

  evaluate(state: state, debug: boolean = false): string {
    const str = this._actions ?
      this._actions.reduce((a, b) => a.score(state, debug) > b.score(state, debug) ? a : b).evaluate(state, debug) :
      this._command!
    if (debug) console.log(`eval result of ${this._description} is ${str}`);
    return str
  }
}

export = UAiAction
