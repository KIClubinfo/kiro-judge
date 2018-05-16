import * as fs from 'fs';


export class Solution {
    planes: Array<number>;
    rotations: Array<Array<number>>;
    
    constructor(solutionString: string) {
        // NOTE : change for file or keep string ?
        const content = solutionString;
        const lines = content.split('\n');
        const splitLines = lines.filter(line => line.length > 0).map(line => line.split(' '));
        
        // planes rotations
        this.planes = splitLines.map(splitLine => Number(splitLine[1]));
        this.rotations = splitLines.map(splitLine => splitLine.slice(3).map(Number));
    }
}
