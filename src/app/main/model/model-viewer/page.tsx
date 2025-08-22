'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Stage } from '@react-three/drei';

interface ModelProps {
  path: string;
}

const Model = ({ path }: ModelProps) => {
  const { scene } = useGLTF(path);
  return <primitive object={scene} scale={1} />;
};

export default function ModelViewer() {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Canvas>
        <Stage adjustCamera intensity={1}>
          <Suspense fallback={null}>
            <Model path="/models/3dmetro/metro.glb" />
          </Suspense>
        </Stage>
        <OrbitControls />
      </Canvas>
    </div>
  );
}