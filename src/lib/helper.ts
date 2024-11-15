/** Removes the specified value from the given array, and returns the modified array */
export function deleteFromArray<T>(array: T[], value: T): T[] {
    const index = array.indexOf(value);
    if(index != -1) array.splice(index, 1);
    return array;
}

/** Maps an object to another object */
export function objectMap<T, U>(
    obj: T, 
    fn: (key: keyof T, value: T[keyof T]) => [key: keyof U, value: U[keyof U]]
): U {
    const newObj: U = {} as U;
    for(const key in obj) {
        const [newKey, newValue] = fn(key, obj[key]);
        newObj[newKey] = newValue;
    }
    return newObj;
}

export async function asyncObjectMap<T, U>(
    obj: T, 
    fn: (key: keyof T, value: T[keyof T]) => Promise<[key: keyof U, value: U[keyof U]]>
): Promise<U> {
    const newObj: U = {} as U;
    const ops = [];
    for(const key in obj) {
        ops.push(
            fn(key, obj[key]).then(res => {
                const [newKey, newValue] = res;
                newObj[newKey] = newValue;
            })
        );
    }
    await Promise.all(ops);
    return newObj;
}

/** Converts an object to an array */
export function objectToArray<T, U>(
    obj: T, 
    fn: (key: keyof T, value: T[keyof T]) => U
): U[] {
    const arr: U[] = [];
    for(const key in obj) {
        arr.push(fn(key, obj[key]));
    }
    return arr;
}

/** Converts an array to an object */
export function arrayToObject<T, U>(
    arr: T[], 
    fn: (value: T, index: number) => [key: keyof U, value: U[keyof U]]
): U {
    const obj: U = {} as U;
    for(let i = 0; i < arr.length; i++) {
        const [key, value] = fn(arr[i], i);
        obj[key] = value;
    }
    return obj;
}

/** 
 * Returns a pseudo version of MongoDB's ObjectID. 
 * Useful for decoupling from MongoDB dependencies. 
 */
export function generatePseudoObjectId(): string {
    return Math.floor(Date.now() / 1000).toString(16);
}

/** Assertion function defined outside of Node.js */
export function assert(value: unknown, message?: string | Error): asserts value {
    if(!value) {
        if(message instanceof Error) throw message;
        if(typeof message == 'string') throw new Error(message);
        throw new Error('Assertion failed.');
    }
};

export function removeId<T>(obj: T & { _id?: any }): T {
    delete obj._id;
    return obj;
}