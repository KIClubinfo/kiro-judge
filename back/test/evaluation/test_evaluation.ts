import { Instance } from '../../src/evaluation/instance';
import { Solution } from '../../src/evaluation/solution';
import { checkSolution, evaluateSolution} from '../../src/evaluation/evaluation';

let instance0 = new Instance('instance_example');
let solution0 = new Solution('p 1 v 1 3\np 2 v 2 4 7\np 3 v 5 6\n');

let checked = checkSolution(instance0, solution0);
let score = evaluateSolution(instance0, solution0);

console.log('Score=', score);
