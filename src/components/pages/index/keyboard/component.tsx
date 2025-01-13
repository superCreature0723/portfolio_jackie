import { OrbitControls, useGLTF } from '@react-three/drei';
import { FunctionComponent, ReactElement, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

/**
 * A blank keyboard model without any positioning or rotation that is generated by gltfjsx
 * @author Joshua Sleepy
 * @see {@link https://sketchfab.com/3d-models/lowpoly-65-mechanical-keyboard-0cdd429eb08549ac954352169de5c8f8 Sketchfab original}
 * @license CC-BY-4.0
 * @param props Element props provided straight to the group
 * @returns {ReactElement} Group of meshes
 */
export const Model: FunctionComponent<JSX.IntrinsicElements['group']> = (
  props: JSX.IntrinsicElements['group']
): ReactElement => {
  const { nodes, materials } = useGLTF('/landing/keyboard.glb') as unknown as GLTFResult;

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Object_4.geometry} material={materials.NovelKeys} />
      <mesh geometry={nodes.Object_5.geometry} material={materials.Lime} />
      <mesh geometry={nodes.Object_6.geometry} material={materials.Grape} />
      <mesh geometry={nodes.Object_7.geometry} material={materials.Blueberry} />
      <mesh geometry={nodes.Object_8.geometry} material={materials.Lemon} />
      <mesh geometry={nodes.Object_9.geometry} material={materials.Strawberry} />
      <mesh geometry={nodes.Object_10.geometry} material={materials.Material} />
    </group>
  );
};

/**
 * A keyboard model with orbit controls and auto rotation
 * @see {@link https://docs.pmnd.rs/react-three-fiber/api/canvas Canvas API}
 * @returns {ReactElement} Orbit controls and keyboard model that have to be wrapped in canvas
 */
export const Keyboard: FunctionComponent = (): ReactElement => {
  // Model mesh ref
  const meshRef: any = useRef();

  // Orbit controls ref
  const orbitRef: any = useRef();

  // Make a keyboard rotate left & right depending on the angle of the camera
  useFrame(() => {
    const azimuthalAngle = orbitRef.current.getAzimuthalAngle();
    if (azimuthalAngle > 0.5) {
      orbitRef.current.autoRotateSpeed = 1;
    } else if (azimuthalAngle < -0.5) {
      orbitRef.current.autoRotateSpeed = -1;
    }
  });

  return (
    <>
      <ambientLight
        intensity={0.5} // Light from all directions
      />
      <directionalLight
        position={[0, 5, 0]} // Light from the above
      />
      <mesh ref={meshRef} scale={15} rotation={[Math.PI / 4, Math.PI / 12, 0]}>
        <Model />
      </mesh>
      <OrbitControls
        ref={orbitRef}
        minPolarAngle={Math.PI / 2} // Don't allow the camera to look down
        maxPolarAngle={0} // Don't allow the camera to look up
        enableZoom={false} // Don't allow the camera to zoom
        enablePan={false} // Don't allow the camera to pan
        autoRotate
        autoRotateSpeed={1}
      />
    </>
  );
};

// Preload the model
useGLTF.preload('/landing/keyboard.glb');
