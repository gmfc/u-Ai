import SimpleAgent from '../agents/SimpleAgent'
import State from './State'

export default class SimpleState extends State {

    constructor(nOfAgents) {
        super(nOfAgents)
    }

    createAgent() {
        let id = Math.random().toString(36).substring(7)
        this.agents[id] = new SimpleAgent({ id })
    }

    simulate() {
        for (const id in this.agents) {
            this.agents[id].simulate(this)
        }
    }
}