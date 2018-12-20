import Agent from "./Agent"
import SimpleAi from '../ai/SimpleAi'

export default class SimpleAgent extends Agent {
    constructor(params) {
        super(params)
        // AI instance and behavior
        this.ai = new SimpleAi(this)
    }

    // Agent method
    talk(s) {
        console.log(`Agent: ${this.id} Sais: ${s}`);
    }
}