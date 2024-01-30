import { Container, settings } from 'pixi.js';
import { Material, Mesh3D, Model } from 'pixi3d/pixi7';
import CustomMaterial from './materials/CustomMaterial';
import Signals from 'signals';

export default class Base3D extends Container {
    public model: Model;
    private material: CustomMaterial;
    private timescale: number;
    constructor(model: Model, material: CustomMaterial) {
        super();

        this.addChild(model);
        this.model = model;
        this.model.meshes.forEach(element => {
            element.material = material;
        });

        this.material = material;
        this.material.onMaterialReady.add(() => {
           
        })

        this.timescale = 1

    }
    build(...data: any[]): void {

    }
    update(delta: number) {
       
    }
    
}