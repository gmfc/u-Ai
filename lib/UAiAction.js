"use strict";
class UAiAction {
    constructor(action) {
        if (action.command !== undefined)
            this._command = action.command;
        if (action.actions !== undefined)
            this._actions = action.actions;
        this._scores = action.scores;
        this._description = action.description;
    }
    score(state, debug) {
        const scr = this._scores.map(s => s(state)).reduce((a, b) => a + b);
        if (debug)
            console.log(`score of ${this._description} = ${scr}`);
        return scr;
    }
    evaluate(state, debug = false) {
        const str = this._actions ?
            this._actions.reduce((a, b) => a.score(state, debug) > b.score(state, debug) ? a : b).evaluate(state, debug) :
            this._command;
        if (debug)
            console.log(`eval result of ${this._description} is ${str}`);
        return str;
    }
}
module.exports = UAiAction;
