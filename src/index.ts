/// <reference path='../global.d.ts' />

import { Application, Assets, Program, Renderer, Shader, Ticker, PlaneGeometry } from "pixi.js"
import { CameraOrbitControl, LightingEnvironment, ImageBasedLighting, Model, Mesh3D, Light, LightType, ShadowCastingLight, ShadowQuality, Container3D, Material, MeshShader, Camera, MeshGeometry3D, Fog, Color, StandardMaterial, Quaternion } from "pixi3d/pixi7"
import Base3D from "./Base3D"
import CustomMaterial from "./materials/CustomMaterial"
import BendMaterial from "./materials/BendMaterial"


let app = new Application({
  backgroundColor: 0xdddddd, resizeTo: window, antialias: true
})
document.body.appendChild(app.view as HTMLCanvasElement)

const manifest = {
  bundles: [{
    name: "assets",
    assets: [
      // {
      //   name: "diffuse",
      //   srcs: "assets/chromatic/diffuse.cubemap",
      // },
      // {
      //   name: "specular",
      //   srcs: "assets/chromatic/specular.cubemap",
      // },
      // {
      //   name: "boat",
      //   srcs: "models/boat_large.gltf",
      // },
      {
        name: "donkey",
        srcs: "models/donkey.glb",
      },
      {
        name: "ground1",
        srcs: "models/ground1.glb",
      }, {
        name: "cube1",
        srcs: "models/cube1.glb",
      },
      // {
      //   name: "teapot",
      //   srcs: "https://raw.githubusercontent.com/jnsmalm/pixi3d-examples/master/assets/teapot/teapot.gltf",
      // },
    ],
  }]
}



await Assets.init({ manifest })
let assets = await Assets.loadBundle("assets")
const bendMaterial = new CustomMaterial(new BendMaterial())

const lenght = 120
const road = new Base3D(Model.from(assets.ground1), bendMaterial)
app.stage.addChild(road);
road.model.z = -35
road.model.y = -3
road.model.scale.set(10, 1, lenght)






const car = new Base3D(Model.from(assets.donkey), bendMaterial)
app.stage.addChild(car);
car.model.z = 0
car.model.y = -3
//car.model.scale.set(2)
//car.model.rotationQuaternion = Quaternion.fromEuler(0, 180, 0)
console.log(car)

// for (let anim of car.model.animations) {
//   // Start to play all animations in the model.
//   console.log(anim)
//   anim.play();
//   anim.loop = false;
//   anim.speed = 1.2;
// }



LightingEnvironment.main.imageBasedLighting = new ImageBasedLighting(
  assets.diffuse,
  assets.specular
)
LightingEnvironment.main.fog = new Fog(5, 8, Color.fromHex(0xFF0000))
let directionalLight = new Light()
directionalLight.intensity = 3
//directionalLight.color = Color.fromHex(0xFF0000)
directionalLight.type = LightType.directional
directionalLight.rotationQuaternion.setEulerAngles(25, 120, 0)
LightingEnvironment.main.lights.push(directionalLight)

let shadowCastingLight = new ShadowCastingLight(
  app.renderer as Renderer, directionalLight, { shadowTextureSize: 1024, quality: ShadowQuality.medium })
shadowCastingLight.softness = 1
shadowCastingLight.shadowArea = 15

let pipeline = app.renderer.plugins.pipeline
//pipeline.enableShadows(ground, shadowCastingLight)
// pipeline.enableShadows(model, shadowCastingLight)

//let control = new CameraOrbitControl(app.view as HTMLCanvasElement);

const mainCamera = Camera.main;
mainCamera.fieldOfView = 120
mainCamera.z = 5
mainCamera.y = 8
mainCamera.x = 0

mainCamera.rotationQuaternion.setEulerAngles(20, 180, 0)


const ticker = Ticker.shared;
ticker.add(update);

const cars = [];
const buildings = [];



for (let index = 0; index < 8; index++) {
  const cube = new Base3D(Model.from(assets.cube1), bendMaterial)
  app.stage.addChild(cube);
  cube.model.z = index * lenght*2 / 8
  cube.model.x = -15
  cube.model.scale.set(5, Math.random() * 7 + 2, lenght / 8)
  cube.model.y = -cube.model.scale.y / 2
  buildings.push(cube)

  const cube2 = new Base3D(Model.from(assets.cube1), bendMaterial)
  app.stage.addChild(cube2);
  cube2.model.z = index * lenght*2 / 8
  cube2.model.x = 15
  cube2.model.scale.set(5, Math.random() * 7 + 2, lenght / 8)
  cube2.model.y = -cube2.model.scale.y / 2
  buildings.push(cube2)
}



for (let index = 0; index < 8; index++) {
  const cube = new Base3D(Model.from(assets.cube1), bendMaterial)
  app.stage.addChild(cube);
  cube.model.z = -80 * Math.random() - lenght*2 / 8
  cube.model.y = -3
  cube.model.x = 8 * Math.sin(Math.random() * Math.PI * 2)
  cars.push(cube)
}

let angSin = 0
let time = 0
const timScale = 1

const speed = 50
function update(delta: number) {

  delta = delta / 100
  if (bendMaterial.hasUniformData('v_Time')) {
    bendMaterial.uniforms['v_Time'] += speed * delta * timScale / 100
  }

  // if (bendMaterial.hasUniformData('v_zed')) {
  //   bendMaterial.uniforms['v_zed'] += delta / 100 * timScale
  // }

  // if (bendMaterial.hasUniformData('v_Time2')) {
  //   bendMaterial.uniforms['v_Time2'] += delta / 100  * timScale
  // }
  // if (bendMaterial.hasUniformData('v_Time3')) {
  //   bendMaterial.uniforms['v_Time3'] += delta / 100  * timScale
  // }
  bendMaterial.refreshUniforms(bendMaterial.uniforms)

  time += delta
  road.update(delta);

  car.update(delta)
  car.model.z = 0
  //car.model.y = -3 - Math.sin(time * 0.2) * 0.2


  //car.model.rotationQuaternion = Quaternion.fromEuler(0, 180, 0)

  buildings.forEach(element => {

    element.update(delta)
    element.model.z += speed * delta;

    if (element.model.z > 20) {
      element.model.z -= lenght*2
    }
  });

  cars.forEach(element => {

    element.update(delta)
    element.model.z += speed * delta;

    if (element.model.z > 5) {
      element.model.z -= lenght*2
    }
  });
}

// Start the application loop
ticker.start();
