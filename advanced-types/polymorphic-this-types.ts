class BasicCalculator {
    constructor(protected value: number) {
    }

    public add(operand: number): this {
        this.value += operand;
        return this;
    }
}

class ScientificCalculator extends BasicCalculator {
    constructor(value = 0) {
        super(value);
    }

    public sin() {
        this.value = Math.sin(this.value);
        return this.value;
    }
}

let v = new ScientificCalculator(2)
    .add(2)
    .sin();
console.log(v);