import * as Presenter from "./graphPresenter"


export class Step {

    public descr: string;
    public action: Function;
}


export class Vuzualizer {
    public steps: Step[];
    public presenter: Presenter.GraphPresenter;

    constructor() {
        this.steps = [];
    }

    public addStep(descr: string, action: Function) {
        this.steps.push({
            descr: descr,
            action: action
        });
    }

    public getStep(idx: number) {
        this.steps[idx].action.call(this);
    }
}

