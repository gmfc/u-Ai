import { Agent } from '../src'
import { SimpleAi } from './SimpleAi'
import { SimpleState } from './SimpleState'

/**
 * SimpleAgent
 */
export class SimpleAgent extends Agent {
    /**
     * constructor
     * @param id Agent unique ID
     */
    constructor(id: string) {
        super(id)
        // AI instance and behavior
        this.ai = new SimpleAi(this)
    }

    /**
     * (Mock) Get distance to nearest enemy
     * @param wState worldState
     */
    getDistanceToEnemy(wState:SimpleState): number {
        return Math.random() * 100
    }

    /**
     * (Mock) Get hunger
     */
    get hunger():number {
        return Math.random() * 100
    }

    /**
     * Agent specific function/action
     * @param s String to talk
     */
    talk(s: string): void {
       console.log(`Agent: ${this.id}: ${s}`);
    }
}