import React, { useEffect, useRef } from "react";
import { Instance, Instances, useGLTF } from "@react-three/drei";
import { Euler, Vector3 } from "three";


function ArmInstance({ random, position, scale }) {
    const ref = useRef();
  
    useEffect(() => {
      if (ref.current) {
        ref.current.lookAt(0, 0, 0); // Make the arm look at the center (0, 0, 0)
      }
    }, []);
  
    return (
      <group position={position} scale={scale}>
        <Instance ref={ref} />
      </group>
    );
  }

  
export function Arm({ datas, position, rotation, scale }) {
  const { nodes } = useGLTF("/arms.glb");

return (
    <Instances range={100} material={nodes.LArm.material} geometry={nodes.LArm.geometry} >
      {datas.map((props, i) => (
        <ArmInstance key={i} {...props} />
      ))}
    </Instances>
  );
}

useGLTF.preload("/arms.glb");
