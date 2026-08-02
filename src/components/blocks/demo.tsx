'use client';

import React from 'react';
import { InteractiveRobotSpline } from '@/components/blocks/interactive-3d-robot'

export function Section() { 
  
  const ROBOT_SCENE_URL = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

  return (
   
    <div className="relative w-screen h-screen overflow-hidden">

      <InteractiveRobotSpline
        scene={ROBOT_SCENE_URL}
        className="absolute inset-0 z-0" 
      />

    
      <div className="
        absolute inset-0 z-10
        pt-20 md:pt-32 lg:pt-40
        px-4 md:px-8            
        pointer-events-none     
      ">
       
        <div className="
          text-center             // Center the text within this block
          text-white              // Text color
          drop-shadow-lg          // Text shadow for readability
          w-full max-w-2xl        // Max width for readability on large screens
          mx-auto                 // Center the block horizontally
        ">
         
          <h1 className="
            text-2xl md:text-3xl lg:text-4xl xl:text-5xl 
            font-bold 
           
          ">
            This is interactive 3d robot Whobee
          </h1>
        </div>
      </div>

    </div> 
  );
}
