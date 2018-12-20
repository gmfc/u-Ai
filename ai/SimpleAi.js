import Ai from "./Ai"

export default class SimpleAi extends Ai {
    constructor(agent) {
        super(agent)

        this.addAction('Will do', action => {

            /*
             * Condition blocking the action, only one per action
             *
             * wState - World State Object
             * agent - agent Object Reference
             */
            action.condition(({wState, agent}) => {                
                return !agent.isBlocked
            })

            
            /*
             * Action score. Hi score -> Action will trigger
             * As many as you want 
             *
             * wState - World State Object
             * agent - agent Object Reference
             */
            action.score('100%', ({ wState, agent }) => 100)

            
            /*
             * The action 
             *
             * wState - World State Object
             * agent - agent Object Reference
             */
            action.do(({ wState, agent }) => {
                agent.talk('doing it!')
            })

        })

        this.addAction('Wont do', action => {

            action.condition(({wState, agent}) => {
                return true
            })

            action.score('0%', ({ wState, agent }) => 0)

            action.do(({ wState, agent }) => {
                agent.talk('not doing it!')
            })
            
        })
    }
}