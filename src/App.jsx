import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Backdrop, Box, Center, ContactShadows, Environment, Instance, Instances, OrbitControls, Plane, useGLTF } from "@react-three/drei";
import { Arm } from "./arm";
import { Vector3, Euler } from "three";

const Scene = () => {
  // const screenWidth = window.innerWidth;
  // const screenHeight = window.innerHeight;

  // // Calculate x and y ranges dynamically based on screen size
  // const aspectRatio = screenWidth / screenHeight;
  // const xRange = 1 * aspectRatio; // Adjust x range based on aspect ratio
  // const yRange = 2; // Adjust y range for screen height

  // // Data generation function
  // const data = Array.from({ length: 100 }, (_, i) => {
  //   const angle = (i / 99) * Math.PI; // distribute along an arc from 0 to π
  //   const x = Math.cos(angle) * xRange; // dynamic x based on screen width
  //   const y = Math.sin(angle) * yRange; // dynamic y based on screen height
  //   const z = Math.random() * -1; // random depth

  //   const scale = 1 / (Math.abs(z) + 1); // calculate scale based on distance
  //   const position = new Vector3(x, y, z);

  //   // Calculate rotation to face the center
  //   const lookAtVector = new Vector3(0, 0, 0);
  //   const direction = new Vector3().subVectors(lookAtVector, position).normalize();
  //   const rotation = new Euler().setFromVector3(direction);

  //   return { random: Math.random(), position: position.toArray(), rotation: rotation.toArray(), scale: [scale, scale, scale] };
  // });
  const { width, height } = useThree((state) => state.viewport);
  const margin = 2; // Adjust margin as needed

  // Generate positions dynamically
  const data = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => {
      const angle = (i / 99) * Math.PI; // distribute along an arc from 0 to π
      const x = Math.cos(angle) * width / 2; // dynamic x based on screen width
      const y = Math.sin(angle) * height / 2; // dynamic y based on screen height
      const z = Math.random() * -2 ; // random depth

      const scale = 1 / (Math.abs(z) + 1); // calculate scale based on distance
      const position = new Vector3(x, y, z);

      return { position: position.toArray(), scale: [scale, scale, scale] };
    });
  }, [width, height]);

  return (
    <>
      <Box args={[1, 1, 1]} position={[0, 0, 0]}>
        <meshNormalMaterial />
      </Box>
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
    <Canvas camera={{ fov: 70, position: [0, 0, 3], near: 0.01 }}>
      <ambientLight />
      <ContactShadows position={[0, -0.485, 0]} scale={5} blur={1.5} far={1} />
      <Environment preset='city' />
      <OrbitControls />
      <Scene />
    </Canvas>
  );
};

export default App;
