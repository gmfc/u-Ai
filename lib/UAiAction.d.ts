declare type NodeAct<state> = {
    actions: UAiAction<state>[];
    description: string;
    scores: ((state: state) => number)[];
};
declare type Act<state> = {
    command: string;
    description: string;
    scores: ((state: state) => number)[];
};
declare class UAiAction<state> {
    private _command?;
    private _description;
    private _actions?;
    private _scores;
    constructor(action: NodeAct<state> | Act<state>);
    private _score;
    evaluate(state: state, debug?: boolean): string;
}
export = UAiAction;
//# sourceMappingURL=UAiAction.d.ts.map