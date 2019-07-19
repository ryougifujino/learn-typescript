function identity<T>(arg: T): T {
    return arg;
}

// 1
let output = identity<string>("myString");
// 2
let output2 = identity("myString");     // type argument inference

function loggingIdentity<T>(args: T[]): T[] {
    console.log(args.length);
    return args;
}

function loggingIdentity2<T>(args: Array<T>): Array<T> {
    console.log(args.length);
    return args;
}