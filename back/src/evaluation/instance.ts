import * as fs from 'fs';


export class Instance {
    V: number;
    A: number;
    P: number;
    B: number;
    K: number;
    G: number;
    legs: Array<Array<number>>;
    correspondences: Array<Array<number>>;

    constructor(instanceName: string) {
        // Read data
        const content = fs.readFileSync(`./instances/${instanceName}.in`, 'utf8').toString();
        const lines = content.split('\n');
        
        // First line is metadata
        let line = lines[0];
        let metadatas = line.split(' ');
        if(metadatas.length != 12) {
            throw "Wrong metadata length in instance, must be 12.";
        }
        this.V = Number(metadatas[1]); // V legs
        this.A = Number(metadatas[3]); // A correspondencies
        this.P = Number(metadatas[5]); // P planes
        this.B = Number(metadatas[7]); // B cost for not doing a leg
        this.K = Number(metadatas[9]); // K frequency to base
        this.G = Number(metadatas[11]); // G cost for flying without maintenance
        
        // [1, 1+V[ lines are legs
        this.legs = lines.slice(1, 1+this.V).map(function (line) {
            let datas = line.split(' ');
            // leg id
            // let v = datas[1];
            // leg cost for each plane
            let c = datas.slice(3).map(Number);
            if(c.length != this.P) {
                throw "Leg needs to have exactly one cost per plane.";
            }
            return c;
        }, this);

        // [1+V, 1+V+A[ are correspondences (=arcs)
        this.correspondences = lines.slice(1+this.V).map(function(line) {
            let datas = line.split(' ');
            if(datas.length < 4) {
                return [];
            }

            // arc id
            // let a = Number(datas[1]);
            // origin leg
            let o = Number(datas[3]);
            // destination leg
            let d = Number(datas[5]);
            // is arc a night
            let t = Number(datas[7]);
            // time 
            let n = Number(datas[9]);
            
            return [o, d, t, n];
        }, this).filter(c => c.length == 4);
        // NOTE : j'avoue qu'on pourrait faire mieux et plus de checks, mais on
        // va supposer que les instances ont été générées correctement
        // et ont quand même été un peu vérifiées avant par Axel
    }
}
