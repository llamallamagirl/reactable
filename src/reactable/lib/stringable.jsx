export default function stringable(thing) {
    return thing !== null &&
        typeof(thing) !== 'undefined' &&
        typeof(thing.toString === 'function');
}
