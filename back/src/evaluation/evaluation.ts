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

    return true;
}


export function evaluateSolution(
    instance: Instance,
    solution: Solution
): number {

    return 0;
}

