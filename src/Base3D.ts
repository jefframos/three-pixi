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
        if(this.hasUniformData('v_Time')){
            this.material.uniforms['v_Time'] += delta / 100 * 1.2 * this.timescale 
        }

        if(this.hasUniformData('v_zed')){
            this.material.uniforms['v_zed'] += delta / 100 * 1.2 * this.timescale 
        }

        if(this.hasUniformData('v_Time2')){
            this.material.uniforms['v_Time2'] += delta / 100 * 1.5 * this.timescale 
        }
        if(this.hasUniformData('v_Time3')){
            this.material.uniforms['v_Time3'] += delta / 100 * 0.8 * this.timescale 
        }
        this.material.refreshUniforms(this.material.uniforms)
    }
    setUniformData(field: string, value: any) {

    }

    getUniformData(field: string, value: any) {

    }

    hasUniformData(field: string): boolean {
        return this.material.uniforms && this.material.uniforms.hasOwnProperty(field)
    }
}