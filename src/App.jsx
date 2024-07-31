import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Backdrop, Box, Center, ContactShadows, Environment, Instance, Instances, OrbitControls, Plane, useGLTF } from "@react-three/drei";
import { Arm } from "./arm";
import { Vector3, Euler } from "three";

const Scene = () => {
  
  const { width, height } = useThree((state) => state.viewport);
  const margin = 2; // Adjust margin as needed
  const degreesToRadians = (degrees) => (degrees * Math.PI) / 180;

  // Generate positions dynamically
  const data = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => {
      const angle = (i / 49) * Math.PI; // distribute along an arc from 0 to π
      const x = Math.cos(angle) * width / 2; // dynamic x based on screen width
      const y = Math.sin(angle) * height / 2; // dynamic y based on screen height
      const z = Math.random() * -1 ; // random depth

      // const scale = 1 / (Math.abs(z) + 1); // calculate scale based on distance
      const position = new Vector3(x, y, z);
      // const rotation = new Vector3(0, 0, 0);
      
      return {  position: position.toArray(), initialScale: [1, 1, 1] };
    });
  }, [width, height]);


  return (
    <>
      <Center top left position={[width / 2 , -height / 2 + margin, 0]}>
        <Arm datas={data} />
      </Center>
      <Backdrop castShadow floor={2} position={[0, -0.5, 0]} scale={[15, 10, 5]}>
        <meshStandardMaterial color='#353540' envMapIntensity={0.25} />
      </Backdrop>
    </>
  );
};

const App = () => {
  return (
    <Canvas camera={{ fov: 70, position: [0, 0, 3], near: 0.0001 }}>
      <ambientLight />
      {/* <ContactShadows position={[0, -0.485, 0]} scale={5} blur={1.5} far={1} /> */}
      <Environment files={"./city.hdr"} background={null} />
      <OrbitControls />
      <Scene />
    </Canvas>
  );
};

export default App;
