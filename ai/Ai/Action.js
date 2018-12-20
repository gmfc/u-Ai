export default class Action {

    constructor(description, callback) {
        this.description = description
        this._scores = []
        this._condition = () => true
        this._do = () => true

        callback(this)
    }

    condition(callback) {
        if (!callback) {
            throw Error("UtilityAi#Action#condition: Missing callback")
        }

        this._condition = callback
    }

    score(description, callback) {

        if (!description) {
            throw Error("UtilityAi#Action#score: Missing description")
        }
        if (!callback) {
            throw Error("UtilityAi#Action#score: Missing callback")
        }

        this._scores.push({
            description,
            callback
        })

    }

    do(callback) {
        if (!callback) {
            throw Error("UtilityAi#Action#do: Missing callback")
        }
        this._do = callback
    }

    _validateScore(score) {
        if (!isNaN(score) && typeof score === "number") {
            return score
        }
        return 0
    }

    log(...msg) {
        if (!this._print_debug) return
        console.log(...msg)
    }

    evaluate(data, debug = false) {
        this._print_debug = debug

        this.log("Evaluate Action: ", this.description)
        if (!this._condition(data)) {
            this.log("Condition not fulfilled")
            return -Infinity
        }

        const score = this._scores
            .map(score => {
                const _score = this._validateScore(score.callback(data))
                this.log("- ", score.description, _score)
                return _score
            })
            .reduce((acc, score) => acc + score, 0)

        this.log("Final Score: ", score)

        return score
    }
}