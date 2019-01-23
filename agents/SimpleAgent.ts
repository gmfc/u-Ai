import Agent from "./Agent"
import SimpleAi from '../ai/SimpleAi'

export default class SimpleAgent extends Agent {
    constructor(id: string) {
        super(id)
        // AI instance and behavior
        this.ai = new SimpleAi(this)
    }

    // Agent method
    talk(s: string) {
        console.log(`Agent: ${this.id} Sais: ${s}`);
    }
}