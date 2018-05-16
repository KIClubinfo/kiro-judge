import { KiroInstance } from './kiro-instance';
import { KiroSolution } from './kiro-solution';

export function checkSolution(
    instance: KiroInstance,
    solution: KiroSolution,
): boolean {
    const V = instance.V;
    const P = instance.P;
    const planes = solution.planes;
    const rotations = solution.rotations;
    const correspondences = instance.correspondences;

    // 1. check declared planes
    //   a. integer
    if (planes.some((plane) => !Number.isInteger(plane))) {
        console.log(planes);
        throw new Error('A plane has a index that is not an integer !');
    }
    //   b. no duplicates
    if ((new Set(planes)).size !== planes.length) {
        throw new Error('A plane has more than one rotation defined !');
    }
    //   c. bounds
    if (planes.some((x) => x <= 0 || x > P)) {
        throw new Error('A plane has an index out of bounds ! (0 < p <= P)');
    }

    // 2. check declared legs
    //   a. integer
    if (rotations.some((rotation) => rotation.some((leg) => !Number.isInteger(leg)))) {
        throw new Error('A leg has a index that is not an integer !');
    }
    //   b. bounds
    if (rotations.some((rotation) => rotation.some((leg) => leg <= 0 || leg > V))) {
        throw new Error('A leg has an index out of bounds ! (0 < v <= V)');
    }
    //   c. legs in a rotation must follow in the graph
    for (const rotation of rotations) {
        for (const k in rotation) {
            const i = Number(k);
            if (i + 1 === rotation.length) {
                break;
            }
            const leg = rotation[i];
            const legNext = rotation[i + 1];
            // console.log(leg, legNext);
            const correspondenceExists = correspondences.some((a) => a[0] === leg && a[1] === legNext);
            if (!correspondenceExists) {
                throw new Error('A rotation has two legs following one each other that are not supposed to !');
            }
        }
    }

    // planes and rotations must have same length
    // normally always ok, but just in case
    if (planes.length !== rotations.length) {
        throw new Error('Weird error : planes and rotations must have same length, please contact an admin.');
    }

    return true;
}

export function evaluateSolution(
    instance: KiroInstance,
    solution: KiroSolution,
): number {
    const V = instance.V;
    const B = instance.B;
    const legsPlanesCosts = instance.legs;
    const planes = solution.planes;
    const rotations = solution.rotations;

    // per leg cost with planned plane
    let legsCost = 0;
    for (const k in planes) {
        const i = Number(k);
        const plane = planes[i];
        const planeArrayId = plane - 1;
        const rotation = rotations[i];
        for (const leg of rotation) {
            const legArrayId = leg - 1;
            legsCost += legsPlanesCosts[legArrayId][planeArrayId];
        }
    }
    // TODO check for unmaintened planes

    // not done legs
    const doneLegs = rotations.reduce((acc, val) => acc.concat(val));
    const doneLegsCost = Math.abs(doneLegs.length - V) * B;

    // total cost
    const cost = legsCost + doneLegsCost;

    return cost;
}
