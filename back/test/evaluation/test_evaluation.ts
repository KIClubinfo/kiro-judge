import { checkSolution, evaluateSolution} from '../../src/judge/evaluation/evaluation';
import { KiroInstance } from '../../src/judge/evaluation/kiro-instance';
import { KiroSolution } from '../../src/judge/evaluation/kiro-solution';

const instance0 = new KiroInstance('instance_1.in');
const solution0 = new KiroSolution('p 1 v 1 3\np 2 v 2 4 7\np 3 v 5 6\n');

const checked = checkSolution(instance0, solution0);
const score = evaluateSolution(instance0, solution0);

console.log(`Score: ${score}`);
