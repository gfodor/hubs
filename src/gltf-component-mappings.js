import "./components/gltf-model-plus";
import { resolveGLTFComponentUrl } from "./utils/resolveURL";

const registerComponent = AFRAME.GLTFModelPlus.registerComponent;

function srcInflator(srcProperty = "src") {
  return (el, componentName, componentData, gltfPath) => {
    if (componentData[srcProperty]) {
      componentData[srcProperty] = resolveGLTFComponentUrl(componentData[srcProperty], gltfPath);
    }

    el.setAttribute(componentName, componentData);
  };
}

registerComponent("animation-mixer");
registerComponent("billboard");
registerComponent("body");
registerComponent("collision-filter");
registerComponent("css-class");
registerComponent("gltf-model-plus", "gltf-model-plus", srcInflator());
registerComponent("hide-when-quality");
registerComponent("hoverable");
registerComponent("layers");
registerComponent("light");
registerComponent("line");
registerComponent("link");
registerComponent("loop-animation");
registerComponent("material", "material", srcInflator());
registerComponent("nav-mesh", "nav-mesh", srcInflator());
registerComponent("quack");
registerComponent("raycaster");
registerComponent("scale-audio-feedback");
registerComponent("scene-shadow");
registerComponent("shadow");
registerComponent("shape");
registerComponent("skybox");
registerComponent("sound", "sound", srcInflator());
registerComponent("spawn-point");
registerComponent("sticky-zone");
registerComponent("super-spawner");
registerComponent("text");
registerComponent("visible");
registerComponent("water");
registerComponent("xr");
