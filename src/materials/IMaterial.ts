import { Material } from "pixi3d/*";

/**
 *  interface
 */
export interface IMaterial {
    getFragmentShader(): string
    getVertexShader(): string
    getUpdateCallback(): (mesh: any, shader: any) => void
    updateUniforms(data:any):void
    refreshUniforms(uniforms:any):void
    setUniformData(field:string, value:any):void
}