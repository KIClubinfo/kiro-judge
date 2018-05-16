import { Instance } from './instance';
import { Solution } from './solution';


export function checkSolution(
    instance: Instance,
    solution: Solution
): boolean {
    const V = instance.V;
    const P = instance.P;
    const planes = solution.planes;
    const rotations = solution.rotations;
    const correspondences = instance.correspondences;

    // 1. check declared planes
    //   a. integer
    if(planes.some(plane => !Number.isInteger(plane))) {
        console.log(planes);
        throw "A plane has a index that is not an integer !";
    }
    //   b. no duplicates
    if((new Set(planes)).size !== planes.length) {
        throw "A plane has more than one rotation defined !";
    }
    //   c. bounds
    if(planes.some(x => x <= 0 || x > P)) {
        throw "A plane has an index out of bounds ! (0 < p <= P)";
    }

    // 2. check declared legs
    //   a. integer
    if(rotations.some(rotation => rotation.some(leg => !Number.isInteger(leg)))) {
        throw "A leg has a index that is not an integer !";
    }
    //   b. bounds
    if(rotations.some(rotation => rotation.some(leg => leg <= 0 || leg > V))) {
        throw "A leg has an index out of bounds ! (0 < v <= V)";
    }
    //   c. legs in a rotation must follow in the graph
    for(let rotation of rotations) {
        for(let k in rotation) {
            let i = Number(k);
            if(i+1 == rotation.length) {
                break;
            }
            const leg = rotation[i];
            const legNext = rotation[i+1];
            // console.log(leg, legNext);
            const correspondenceExists = correspondences.some(a => a[0] == leg && a[1] == legNext);
            if(!correspondenceExists) {
                throw "A rotation has two legs following one each other that are not supposed to !";
            }
        }
    }

    // planes and rotations must have same length
    // normally always ok, but just in case
    if(planes.length != rotations.length) {
        throw "Weird error : planes and rotations must have same length, please contact an admin.";
    }

    return true;
}


export function evaluateSolution(
    instance: Instance,
    solution: Solution
): number {
    const V = instance.V;
    const B = instance.B;
    const legsPlanesCosts = instance.legs;
    const planes = solution.planes;
    const rotations = solution.rotations;

    // per leg cost with planned plane
    let legsCost = 0;
    for(let k in planes) {
        let i = Number(k);
        let plane = planes[i];
        let planeArrayId = plane-1;
        let rotation = rotations[i];
        for(let leg of rotation) {
            let legArrayId = leg-1;
            legsCost += legsPlanesCosts[legArrayId][planeArrayId];
        }
    }
    // TODO check for unmaintened planes
    
    // not done legs
    const doneLegs = rotations.reduce((acc, val) => acc.concat(val));
    const doneLegsCost = Math.abs(doneLegs.length - V) * B

    // total cost
    let cost = legsCost + doneLegsCost;

    return cost;
}

