export default class State {

    constructor(nOfAgents) {
        console.log('creating state');

        this.agents = {}
        for (let i = 0; i < nOfAgents; i++) {
            console.log('creating agent');
            this.createAgent()
        }
    }

    createAgent() {
        throw Error('State#createAgent - Not defined!')
    }

    simulate() {
        throw Error('State#simulate - Not defined!')
    }
}