export default class UAiAction<state> {

    private _command?: string
    private _description: string
    private _actions?: UAiAction<state>[]
    private _scores?: ((state:state) => number)[]
    // private _condition: (state:state) => boolean = (s:state) => true
  
    constructor({command, description, actions, scores}: {command?: string, description: string, actions?: UAiAction<state>[], scores?: ((state:state) => number)[]}) {
      if(command === undefined && actions === undefined) throw new Error("Command or Actions must be defined");
      
      this._command = command
      this._description = description
      this._actions = actions
      this._scores = scores
    }
  
    score(state: state, debug: boolean = false): number {
      let scr: number = this._scores!.map(s => s(state)).reduce((a,b) => a+b)
      if(debug) console.log(`score of ${this._description} = ${scr}`);
      return scr
    }
    
    evaluate(state:state, debug: boolean = false): string {
      if(debug) console.log(`eval of ${this._description}`);
      let str = this._actions ? this._actions.reduce((a, b) => {      
        if(a.score(state, debug) > b.score(state, debug)) return a
        return b
      }).evaluate(state, debug) : this._command!
      if(debug) console.log(`eval result of ${this._description} is ${str}`);
      return str
    }
  }