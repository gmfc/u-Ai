import { State } from '../State'
import { Agent } from '../Agent'

export type BlockingCondition = (wState: State, agent: Agent) => boolean
export type ScoreCalculation = (wState: State, agent: Agent) => number
export type ActionFunction = (wState: State, agent: Agent) => void
export type ActionCallback = (action: Action) => void

export class Action {

    private scores: Score[]
    private blockingCondition: BlockingCondition
    private actionFunction: ActionFunction
    private prt_debug: boolean = false

    constructor(public description: string, action: ActionCallback) {
        this.description = description
        this.scores = []
        this.blockingCondition = () => true
        this.actionFunction = () => true

        action(this)
    }

    setCondition(condition: BlockingCondition) {
        this.blockingCondition = condition
    }

    addScoreFunction(description: string, calculationFunction: ScoreCalculation) {
        this.scores.push({ description, calculationFunction })
    }

    setAction(action: ActionFunction) {
        this.actionFunction = action
    }

    private _validateScore(score: number) {
        return score
    }

    private log(...msg: string[]): void {
        if (!this.prt_debug) return
        console.log(...msg)
    }

    evaluate(worldState: State, agent: Agent, debug: boolean = false): number {
        this.prt_debug = debug

        this.log(`Evaluating Action: ${this.description} for Agent ${agent.id}`)

        if (!this.blockingCondition(worldState, agent)) {
            this.log(`-- Condition not fulfilled`)
            return -Infinity
        }

        let score: number = this.scores
            .map(score => {
                let localScore = score.calculationFunction(worldState, agent)
                this.log(`-- ${score.description}: ${localScore}`)
                return localScore
            })
            .reduce((acc, score) => acc + score)

        this.log(`-- Final Score ${score}`)

        return score
    }

    get do() {
        return this.actionFunction
    }
}

interface Score {
    description: string
    calculationFunction: ScoreCalculation
}