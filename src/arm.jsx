import React, { useEffect, useMemo, useRef } from "react";
import { Instance, Instances, useGLTF } from "@react-three/drei";
import { useFrame, useGraph } from "@react-three/fiber";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils";

import { CCDIKSolver } from 'three/addons/animation/CCDIKSolver.js';


function ArmInstance({ position, initialScale, model }) {
  const ref = useRef();
  const clonedModel = useRef(SkeletonUtils.clone(model));
  const armRotation = [Math.PI / 4, Math.PI / 2, 0]; // Rotating on the Y-axis
  const solver = useRef();

  useEffect(() => {
    if (clonedModel.current) {
      clonedModel.current.lookAt(0, 0, 0); // Make the arm look at the center (0, 0, 0)
      // console.log('rotation:', clonedModel.current.rotation);

      // Setup CCDIKSolver
      const bones = [];
      clonedModel.current.traverse((object) => {
        if (object.isBone) bones.push(object);
      });
      const skinnedMesh = clonedModel.current.children[0].children[0];
      const iks = [
        {
          target: 3,
          effector: 2,
          links: [ { index: 1 } ] ,
        },
      ];
      solver.current = new CCDIKSolver(skinnedMesh, iks);
      // console.log(bones);
    }
  }, []);

    useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();
    const stretchFactor = elapsedTime * 0.1; // Adjust the stretch factor as needed

    if (clonedModel.current) {
      const skinnedMesh = clonedModel.current.children[0].children[0];
      const boneToScale =clonedModel.current.children[0].children[1]; // Example: Scaling the second bone in the skeleton
      // boneToScale.scale.y = stretchFactor;

      // // Check position to stop animation
      // const position = new THREE.Vector3();
      // skinnedMesh.getWorldPosition(position);
      // if (position.distanceTo(new THREE.Vector3(0, 0, 0)) < 0.1) {
      //   boneToScale.scale.y = 1; // Reset scale when near center
      // }

      // console.log(boneToScale);
      // Update IK solver
      if (solver.current) {
        solver.current.update();
      }
    }
  });

  return (
    <group rotation={armRotation} position={position} scale={initialScale}>
      <primitive object={clonedModel.current} />
    </group>
  );
}

export function Arm({ datas }) {
  const { scene } = useGLTF('/armB.glb');
  const model = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  return (
    <group>
      {datas.map((props, i) => (
        <ArmInstance key={i} {...props} model={model} />
      ))}
    </group>
  );
}


useGLTF.preload("/armB.glb");
