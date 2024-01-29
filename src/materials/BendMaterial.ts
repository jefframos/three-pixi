import { Program } from "pixi.js";
import { Camera, Material, MeshShader } from "pixi3d/pixi7";
import customMat1 from "./CustomMaterial";
import { IMaterial } from "./IMaterial";


export default class BendMaterial implements IMaterial {
    public elapsedMS: number = 0;
    public vertexShader = `
    attribute vec3 a_Normal;
    attribute vec3 a_Position;
    attribute vec2 a_UV1;
    
    varying vec3 v_Position;
    varying vec3 v_Normal;
    varying vec2 v_UVCoord1;
    uniform vec3 vColor;
    uniform float v_Time;
    uniform float v_Time2;
    uniform float v_Time3;
    uniform float v_zed;
    
    uniform mat4 u_ViewProjection;
    uniform mat4 u_Model;
    
    varying float vDepth;
    varying float vScale;
    vec3 extractScale(mat4 mat) {
        vec3 scale;
        scale.x = length(mat[0].xyz);
        scale.y = length(mat[1].xyz);
        scale.z = length(mat[2].xyz);
        return scale;
    }
    void main() {
      v_Position = a_Position;
      vec4 worldPosition = u_Model * vec4(v_Position, 1.0);
      vec3 translation = u_Model[3].xyz;
      vec4 projectionPosition = u_ViewProjection * vec4(v_Position, 1.0);
      //vDepth = pow(1.-a_UV1.g, 1.5);//-v_Position.z;
      vDepth =  worldPosition.z * -0.05;//v_zed * worldPosition.z;
      vDepth = pow(vDepth, 1.25);
      vec3 scale = extractScale(u_Model);

      vScale = 6. / worldPosition.z;

       float normalizedDistance = 5.;      
      float time2 = sin(v_Time2 ) + cos(v_Time3);
      float time3 = cos(v_Time3) * time2;
      float wightX = 10.25 / scale.x;
      float wightY = 8.65 / scale.y;        

        float displacementY = time2 * (sin(v_Time2 + vDepth) * wightY) * vScale;
        float displacementY0 = time2 * (sin(v_Time2 + 0.) * wightY) * vScale;

        float displacementX = time3 * (cos(v_Time + vDepth) * wightX ) * vScale;
        float displacementX0 = time3 * (cos(v_Time + 0.) * wightX ) * vScale;

        vec3 displacedPosition = v_Position + vec3(displacementX - displacementX0, displacementY - displacementY0, 0.0);

      v_UVCoord1 = a_UV1;
      gl_Position = u_ViewProjection * u_Model * vec4(displacedPosition, 1.0);
    }
    `;

    public fragmentShader = `
    uniform vec3 vColor;
    varying vec2 v_UVCoord1;
    uniform float fogFactor; // Fog factor (0.0 to 1.0)
    uniform vec3 fogColor; // Fog color

    void main(void) {
        //getBaseColorUV()
        //finalColor = mix(vColor, fogColor, fogFactor);
        gl_FragColor = vec4(v_UVCoord1.xy, 0., 1.0);
        //gl_FragColor = vec4(mix(vColor, fogColor, fogFactor), 1.0);
        
    }
    `;
    private _uniforms: any = undefined;
    getFragmentShader(): string {
        return this.fragmentShader;
    }
    getVertexShader(): string {
        return this.vertexShader;
    }

    getUpdateCallback() {
        return this.update.bind(this)
    }
    refreshUniforms(uniforms: any) {
        this._uniforms = uniforms;

        //if(this._uniforms)
        //console.log(this._uniforms['v_zed'])
    }
    update(mesh, shader) {

        for (const key in this._uniforms) {
            if (Object.prototype.hasOwnProperty.call(this._uniforms, key)) {
                shader.uniforms[key] = this._uniforms[key];

            }
        }
        if (shader.uniforms.u_Time === undefined) {
            shader.uniforms.u_Time = 0;
        }
        if (shader.uniforms.v_zed === undefined) {
            shader.uniforms.v_zed = 0;
        }
        if (shader.uniforms.v_Time === undefined) {
            shader.uniforms.v_Time = 0;
        }
        if (shader.uniforms.v_Time2 === undefined) {
            shader.uniforms.v_Time2 = 0;
        }
        if (shader.uniforms.v_Time3 === undefined) {
            shader.uniforms.v_Time3 = 0;
        }
        shader.uniforms.u_ViewProjection = Camera.main.viewProjection.array;
        shader.uniforms.u_Model = mesh.worldTransform.array;
        shader.uniforms.vColor = [0.2,0.4,0.1];
        shader.uniforms.fogColor = [1,1,1];
        shader.uniforms.fogFactor = 0.5;
    }
    updateUniforms(data: any): void {

    }
}
