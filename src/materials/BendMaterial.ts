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
    float cubicInterpolation(float p0, float p1, float p2, float p3, float t) {
        float t2 = t * t;
        float t3 = t2 * t;
        float a0 = p3 - p2 - p0 + p1;
        float a1 = p0 - p1 - a0;
        float a2 = p2 - p0;
        float a3 = p1;
        
        // Apply ease-in-out effect
        return a0 * t3 * 2. + a1 * t2 * 3. + a2 * t * 3. + a3;
    }
    float lerp(float a, float b, float t) {
        return a * (1.0 - t) + b * t;
    }
    void main() {
      v_Position = a_Position;
      vec4 worldPosition = u_Model * vec4(v_Position, 1.0);
      vec3 translation = u_Model[3].xyz;
      vec4 projectionPosition = u_ViewProjection * vec4(v_Position, 1.0);
      //vDepth = pow(1.-a_UV1.g, 1.5);//-v_Position.z;
      vDepth =  worldPosition.z * -0.05;//v_zed * worldPosition.z;
      //vDepth = pow(vDepth, 1.25);
      vec3 scale = extractScale(u_Model);

      
      float startValue = -30.; // Start value of the curve
      float endValue = -350.; // End value of the curve
      float position = worldPosition.z; // Your input position value
  
      // Cubic interpolation between start and end values
      float interpolatedValue = cubicInterpolation(startValue, startValue, endValue, endValue,  position / (endValue - startValue));
      //float interpolatedValue = lerp(startValue, endValue, position / (endValue - startValue));
  
      // Calculate the normalized value
      
      float vScale = clamp((interpolatedValue) / (endValue - startValue), 0.0, 1.0);

      vScale = pow(vScale, 3.);
         
      float time2 = sin(v_Time + 0.5 ) + cos(v_Time + 0.1);
      float time3 = cos(v_Time + 0.5) * time2;
      float wightX = 80.25 / scale.x;
      float wightY = 25.65 / scale.y;        

    //  float displacementY = (time2 * (sin(v_Time2 + vDepth) * wightY)) * -vScale;
      float displacementY = -vScale * vDepth  / scale.y * (5. + (sin(v_Time) * 4.));

    float displacementX =cos(v_Time + time2+time3+  vDepth) * wightX  * vScale;

    vec3 displacedPosition = v_Position + vec3(displacementX, displacementY, 0.0);

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
        gl_FragColor = vec4(v_UVCoord1.xy, 1., 1.0);
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
        shader.uniforms.vColor = [0.2, 0.4, 0.1];
        shader.uniforms.fogColor = [1, 1, 1];
        shader.uniforms.fogFactor = 0.5;
    }
    updateUniforms(data: any): void {

    }
}
