import { SimpleAgent } from './SimpleAgent'
import { State } from '../src'

/**
 * SimpleState
 */
export class SimpleState extends State {

    /**
     * constructor
     * @param nOfAgents Number of agents to create
     */
    constructor(nOfAgents: number) {
        super(nOfAgents)
    }

    /**
     * Function called to create an Agent
     */
    createAgent(): void {
        let id = Math.random().toString(36).substring(7)
        this.agents[id] = new SimpleAgent(id)
    }

    /**
     * Function called to run the simulation (a tick)
     */
    simulate(): void {
        this.agents.forEach(agent => agent.simulate(this))
    }
}