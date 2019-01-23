import { Ai, State, Action } from '../src'
import { SimpleAgent } from './SimpleAgent'

export class SimpleAi extends Ai {
    /**
     * constructor
     * @param agent Agent reference
     */
    constructor(agent: SimpleAgent) {
        super(agent)
        // Ai debug flag
        this.debug = false

        /**
         * Adds an action called "Flee"
         * e.g "Move to", "Fire at", "Talk", "Flee"
         */
        this.addAction('Flee', (action: Action) => {

            // pre-condition, if not fulfilled action will be skipped
            action.setCondition((wState: State, agent: SimpleAgent) => !agent.isBlocked )

            // the higher the score better the action will be weighted
            action.addScoreFunction('Distance to monster', (wState: State, agent: SimpleAgent) => {
                return agent.getDistanceToEnemy(wState) < 60 ? 100 : 0
            })

            // consequence if action triggers
            action.setAction((wState: State, agent: SimpleAgent) => {
                agent.talk('Flee!!!')
            })
        })

        this.addAction('Eat', (action: Action) => {

            action.addScoreFunction('Hunger high', (wState: State, agent: SimpleAgent) => {
                return agent.hunger
            })

            action.addScoreFunction('Random chance', (wState: State, agent: SimpleAgent) => Math.random() * 25)
            
            action.setAction((wState: State, agent: SimpleAgent) => {
                agent.talk('Eating')
            })
        })
    }
}