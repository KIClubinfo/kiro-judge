import * as fs from 'fs';
import { Loader } from './loader';

export class KiroInstance {
    V: number;
    A: number;
    P: number;
    B: number;
    K: number;
    G: number;
    legs: number[][];
    correspondences: number[][];

    constructor(instancePath: string) {
        // Read data
        const content = fs.readFileSync(Loader.getInstancePath(instancePath), 'utf8').toString();
        const lines = content.split('\n');

        // First line is metadata
        const metadata = lines[0].split(' ');
        if (metadata.length !== 12) {
            throw new Error('Wrong metadata length in instance, must be 12.');
        }
        this.V = Number(metadata[1]); // V legs
        this.A = Number(metadata[3]); // A correspondencies
        this.P = Number(metadata[5]); // P planes
        this.B = Number(metadata[7]); // B cost for not doing a leg
        this.K = Number(metadata[9]); // K frequency to base
        this.G = Number(metadata[11]); // G cost for flying without maintenance

        // [1, 1+V[ lines are legs
        this.legs = lines.slice(1, 1 + this.V).map((line) => {
            const datas = line.split(' ');
            // leg id
            // let v = datas[1];
            // leg cost for each plane
            const costs = datas.slice(3).map(Number);
            if (costs.length !== this.P) {
                console.debug(`Instance ${instancePath} with line ${line} : costs per leg len != P`);
                throw new Error('Leg needs to have exactly one cost per plane.');
            }
            if (costs.some(isNaN)) {
                console.debug(`Instance ${instancePath} with line ${line} : NaN value caught`);
                throw new Error('NaN value caught.');
            }
            return costs;
        });

        // [1+V, 1+V+A[ are correspondences (=arcs)
        this.correspondences = lines.slice(1 + this.V).map((line) => {
            const datas = line.split(' ');
            if (datas.length < 4) {
                return [];
            }

            // arc id
            // let a = Number(datas[1]);
            // origin leg
            const o = Number(datas[3]);
            // destination leg
            const d = Number(datas[5]);
            // is arc a night
            const t = Number(datas[7]);
            // time
            const n = Number(datas[9]);

            const correspondence = [o, d, t, n];
            if (correspondence.some(isNaN)) {
                console.debug(`Instance ${instancePath} with line ${line} : NaN value caught`);
                throw new Error('NaN value caught.');
            }

            return correspondence;
        }).filter((c) => c.length === 4);
        // NOTE : j'avoue qu'on pourrait faire mieux et plus de checks, mais on
        // va supposer que les instances ont été générées correctement
        // et ont quand même été un peu vérifiées avant par Axel
    }
}
