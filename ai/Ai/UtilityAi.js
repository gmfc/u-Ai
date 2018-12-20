import Action from './Action'

export default class UtilityAi {

    constructor() {
        this._actions = []
    }

    addAction(description, callback) {
        if (!description) {
            throw Error("UtilityAi#addAction: Missing description")
        }
        if (!callback) {
            throw Error("UtilityAi#addAction: Missing callback")
        }

        const action = new Action(description, callback)

        this._actions.push(action)
    }

    evaluate(data, debug = false) {
        return this._actions
            .map(action => ({
                action: action.description,
                score: action.evaluate(data, debug),
                do: action._do
            }))
            .reduce((acc, action) => acc.score !== undefined && acc.score > action.score ? acc : action, {})
    }

}
