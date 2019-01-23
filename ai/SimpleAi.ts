import Ai from "./Ai"
import State from "../worldState/State"
import SimleAgent from '../agents/SimpleAgent'
import Action from "./Ai/Action"

export default class SimpleAi extends Ai {
    constructor(agent: SimleAgent) {
        super(agent)

        this.addAction('Will do', (action: Action) => {

            /*
             * Condition blocking the action, only one per action
             *
             * wState - World State Object
             * agent - agent Object Reference
             */
            action.condition((wState: State, agent: SimleAgent) => {
                return !agent.isBlocked
            })


            /*
             * Action score. Hi score -> Action will trigger
             * As many as you want 
             *
             * wState - World State Object
             * agent - agent Object Reference
             */
            action.score('100%', (wState: State, agent: SimleAgent) => 100)


            /*
             * The action 
             *
             * wState - World State Object
             * agent - agent Object Reference
             */
            action.do((wState: State, agent: SimleAgent) => {
                agent.talk('doing it!')
            })

        })

        this.addAction('Wont do', (action: Action) => {

            action.condition((wState: State, agent: SimleAgent) => {
                return true
            })

            action.score('0%', (wState: State, agent: SimleAgent) => 0)

            action.do((wState: State, agent: SimleAgent) => {
                agent.talk('not doing it!')
            })

        })
    }
}