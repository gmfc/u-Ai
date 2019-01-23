[![CodeFactor](https://www.codefactor.io/repository/github/gmfc/u-ai/badge)](https://www.codefactor.io/repository/github/gmfc/u-ai)

# u-Ai
World state aware, simple Utility AI framework

## Usage

u-Ai works with 3 basic objects:

* World State (State)
  * Houses all Agents and contains world data
* Agent
  * Ai Agents, with actions and stuff..
* Ai
  * Agent behavior definitions

### Bootstrap

```typescript
import { SimpleState } from './SimpleState'

let world = new SimpleState(5)

setInterval(() => {
    world.simulate()
}, 1000)
```

### State

```typescript
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
        for (const id in this.agents) {
            this.agents[id].simulate(this)
        }
    }
}
```

### Agent

```typescript
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
```

### Ai

```typescript
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
            action.setCondition((wState: State, agent: SimpleAgent) => { return !agent.isBlocked })

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
```