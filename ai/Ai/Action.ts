import State from "../../worldState/State";
import Agent from "../../agents/Agent";

export default class Action {

    private _scores: Score[]
    private _condition: Function
    public doFn: Function
    private _print_debug: boolean = false

    constructor(public description: string, callback: Function) {
        this.description = description
        this._scores = []
        this._condition = () => true
        this.doFn = () => true

        callback(this)
    }

    condition(callback: Function) {
        if (!callback) {
            throw Error("Missing callback")
        }

        this._condition = callback
    }

    score(description: string, callback: Function) {

        if (!description) {
            throw Error("UtilityAi#Action#score: Missing description")
        }
        if (!callback) {
            throw Error("UtilityAi#Action#score: Missing callback")
        }

        this._scores.push(new Score(description, callback))

    }

    do(callback: Function) {
        if (!callback) {
            throw Error("UtilityAi#Action#do: Missing callback")
        }
        this.doFn = callback
    }

    _validateScore(score: number) {
        if (isNaN(score)) {
            throw new Error("score NaN")
        }
        return score
    }

    log(...msg: string[]) {
        if (!this._print_debug) return
        console.log(...msg)
    }

    evaluate(worldState: State, agent: Agent, debug: boolean = false): number {
        this._print_debug = debug

        this.log("Evaluate Action: ", this.description)
        if (!this._condition(worldState, agent)) {
            this.log("Condition not fulfilled")
            return -Infinity
        }

        let score: number = this._scores
            .map(score => {
                let _score = score.callback(worldState, agent)
                this.log("- ", score.description, _score)
                return _score
            })
            .reduce((acc, score) => acc + score, 0)

        this.log("Final Score: ", score.toString())

        return score
    }
}

class Score {
    constructor(public description: string, public callback: Function) { }
}