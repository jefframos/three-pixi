import { Program } from "pixi.js";
import { Material, MeshShader } from "pixi3d/pixi7";
import mat1 from "./BendMaterial";
import { IMaterial } from './IMaterial';
import Signals from 'signals';

export default class CustomMaterial extends Material {
    public updateCallback: (mesh: any, shader: any) => void;
    public IMaterial: IMaterial;
    private _uniforms: any | undefined = undefined;
    public materialReady: boolean = false;
    public onMaterialReady: Signals = new Signals();

    constructor(customMat: IMaterial) {
        super();
        this.IMaterial = customMat;
        this.updateCallback = this.IMaterial.getUpdateCallback();      
    }

    public get uniforms() {
        return this._uniforms;
    }

    updateUniforms(mesh, shader) {
        if (!this.materialReady && this?._shader?.uniformGroup?.uniforms?.globals) {
            this._uniforms = { ...this._shader.uniformGroup.uniforms };
            this.materialReady = true;
            this.onMaterialReady.dispatch();
        }
        this.updateCallback(mesh, shader)
    }

    refreshUniforms(uniforms:any){
        this.IMaterial.refreshUniforms(uniforms);
    }
    createShader() {
        return new MeshShader(Program.from(this.IMaterial.getVertexShader(), this.IMaterial.getFragmentShader()));
    }
}
