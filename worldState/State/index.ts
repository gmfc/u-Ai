import Agent from "../../agents/Agent";

export default class State {

    agents: Agent[]

    constructor(nOfAgents: number) {
        this.agents = []
        for (let i = 0; i < nOfAgents; i++) {
            this.createAgent()
        }
    }

    createAgent(): void {
        throw Error('State#createAgent - Not defined!')
    }

    simulate(): void {
        throw Error('State#simulate - Not defined!')
    }
}