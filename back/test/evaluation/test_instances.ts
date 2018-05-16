import { KiroInstance } from '../../src/judge/evaluation/kiro-instance';

const instancePaths = [1, 2, 3, 4].map((name) => `instance_${name}.in`);

let fails = 0;
for (const instancePath of instancePaths) {
  try {
    console.log(`Loading ${instancePath}`);
    const instance = new KiroInstance(instancePath);
    console.log(`Loaded ${instancePath}`);
  } catch (e) {
    console.log(e);
    console.log(`Could not load ${instancePath}`);
    fails += 1;
  }
}

console.log('Done');
console.log(`${fails} fails out of ${instancePaths.length} tests caught.`);
