import assert from "assert";
import UAiAction from "../src/UAiAction"


describe("testing UAiAction debug mode ON", () => {
  it("UAiAction", async () => {
    const state = {
      num: 0.1
    }
    const run = new UAiAction<{ num: number }>({
      description: 'run',
      command: 'command run',
      scores: [(s) => Math.sin(s.num), (s) => Math.sin(s.num)]
    })
    const fight = new UAiAction<{ num: number }>({
      description: 'fight',
      command: 'command fight',
      scores: [(s) => Math.cos(s.num), (s) => Math.cos(s.num)]
    })
    const fightOrFlight = new UAiAction<{ num: number }>({
      description: 'fightOrFlight',
      actions: [run, fight],
      scores: [(s) => Math.cos(s.num), (s) => Math.cos(s.num)]
    })
    const eat = new UAiAction<{ num: number }>({
      description: 'eat',
      command: 'command eat',
      scores: [(s) => Math.sin(s.num), (s) => Math.sin(s.num)]
    })
    const eatOrFlee = new UAiAction<{ num: number }>({
      description: 'eatOrFlee',
      actions: [fightOrFlight, eat],
      scores: [(s) => 1, (s) => 1]
    })
    const value = eatOrFlee.evaluate(state, true)
    console.log(value);
    assert.strictEqual(value, "command fight")
  })
});

describe("testing UAiAction debug mode OFF", () => {
  it("UAiAction", async () => {
    const state = {
      num: 0.1
    }
    const run = new UAiAction<{ num: number }>({
      description: 'run',
      command: 'command run',
      scores: [(s) => Math.sin(s.num), (s) => Math.sin(s.num)]
    })
    const fight = new UAiAction<{ num: number }>({
      description: 'fight',
      command: 'command fight',
      scores: [(s) => Math.cos(s.num), (s) => Math.cos(s.num)]
    })
    const fightOrFlight = new UAiAction<{ num: number }>({
      description: 'fightOrFlight',
      actions: [run, fight],
      scores: [(s) => Math.cos(s.num), (s) => Math.cos(s.num)]
    })
    const eat = new UAiAction<{ num: number }>({
      description: 'eat',
      command: 'command eat',
      scores: [(s) => Math.sin(s.num), (s) => Math.sin(s.num)]
    })
    const eatOrFlee = new UAiAction<{ num: number }>({
      description: 'eatOrFlee',
      actions: [fightOrFlight, eat],
      scores: [(s) => 1, (s) => 1]
    })
    const value = eatOrFlee.evaluate(state)
    console.log(value);
    assert.strictEqual(value, "command fight")
  })
});