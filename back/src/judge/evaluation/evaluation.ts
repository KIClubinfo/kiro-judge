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
    if (rotations.some((rotation) => rotation.length != 0 && rotation.some((leg) => leg <= 0 || leg > V))) {
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
    const K = instance.K;
    const G = instance.G;
    const legsPlanesCosts = instance.legs;
    const planes = solution.planes;
    const rotations = solution.rotations;

    // per leg cost with planned plane
    let legsCost = 0;
    let unmaintainedCost = 0;
    for (const i in planes) {
        const p = Number(i);
        const plane = planes[p];
        const planeArrayId = plane - 1;
        const rotation = rotations[p];
        let state = 0;
        for (const j in rotation) {
            const l = Number(j);
            const leg = rotation[l];
            const legArrayId = leg - 1;
            
            const legCost = legsPlanesCosts[legArrayId][planeArrayId];
            legsCost += legCost;

            // if not the first leg
            if (l > 0) {
                const previousLeg = rotation[l-1];
                const correspondence = instance.correspondences.find(x => x[0] == previousLeg && x[1] == leg);
                const night = correspondence[2];
                const time = correspondence[3];
                if (night == 1) {
                    state = 0;
                } else {
                    state += time;
                    if (state >= K) {
                        unmaintainedCost += G;
                    }
                }
            }
        }
    }

    // not done legs
    const doneLegs = rotations.reduce((acc, val) => acc.concat(val));
    const singleDoneLegs = new Set(doneLegs);
    const notDoneLegsCost = Math.abs(singleDoneLegs.size - V) * B;
    let repeatedLegsCost = 0; 
    if (doneLegs.length > 0) {
        repeatedLegsCost = [...singleDoneLegs].map(leg => doneLegs.filter(x => x == leg).length - 1).reduce((acc, val) => acc + val) * B;
    }

    // total cost
    const cost = legsCost + unmaintainedCost + notDoneLegsCost + repeatedLegsCost;

    return cost;
}
