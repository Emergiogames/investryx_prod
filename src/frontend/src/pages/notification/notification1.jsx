
// import React from 'react'

// function Notification() {
//   return (
//     <div>Notification</div>
//   )
// }

// export default Notification





// src/ScrollAnimation.jsx



// import React, { useEffect } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// const ScrollAnimation = () => {
//   gsap.registerPlugin(ScrollTrigger);

//   useEffect(() => {
//     // Create a timeline for the animations
//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: ".scroll-section", // The trigger element
//         start: "top top", // Start when the top of the trigger hits the top of the viewport
//         end: "bottom top", // End when the bottom of the trigger hits the top of the viewport
//         scrub: true, // Smooth scrubbing, takes 1 second to catch up to the scrollbar
//       },
//     });

//     // Animation for the first section
//     tl.to(".first-image", { scale: 1.2, opacity: 1, duration: 1 })
//       .to(".first-section", { backgroundColor: "#FFCCCB", duration: 1 }, "<")
//       .to(".second-image", { scale: 1, opacity: 1, duration: 1 })
//       .to(".second-section", { backgroundColor: "#ADD8E6", duration: 1 }, "<")
//       .to(".third-image", { scale: 1.2, opacity: 1, duration: 1 })
//       .to(".third-section", { backgroundColor: "#90EE90", duration: 1 }, "<");
//   }, []);

//   return (
//     <div>
//       <section className="scroll-section first-section h-screen flex items-center justify-center relative">
//         <img
//           src="https://source.unsplash.com/random/800x600?1"
//           alt="First"
//           className="first-image opacity-0 scale-0 transition-transform duration-1000"
//         />
//         <h1 className="text-4xl text-center">Scroll Down</h1>
//       </section>

//       <section className="scroll-section second-section h-screen flex items-center justify-center relative">
//         <img
//           src="https://source.unsplash.com/random/800x600?2"
//           alt="Second"
//           className="second-image opacity-0 scale-0 transition-transform duration-1000"
//         />
//         <h1 className="text-4xl text-center">Keep Going!</h1>
//       </section>

//       <section className="scroll-section third-section h-screen flex items-center justify-center relative">
//         <img
//           src="https://source.unsplash.com/random/800x600?3"
//           alt="Third"
//           className="third-image opacity-0 scale-0 transition-transform duration-1000"
//         />
//         <h1 className="text-4xl text-center">Almost There!</h1>
//       </section>
//     </div>
//   );
// };

// export default ScrollAnimation;

// // src/Gallery.jsx
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const images = [
  'https://source.unsplash.com/random/300x300?1',
  'https://source.unsplash.com/random/300x300?2',
  'https://source.unsplash.com/random/300x300?3',
  'https://source.unsplash.com/random/300x300?4',
  'https://source.unsplash.com/random/300x300?5',
  'https://source.unsplash.com/random/300x300?6',
  'https://source.unsplash.com/random/300x300?7',
  'https://source.unsplash.com/random/300x300?8',
  'https://source.unsplash.com/random/300x300?9',
];

const Gallery = () => {
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const images = gsap.utils.toArray('.image');

    gsap.from(images, {
      opacity: 0,
      scale: 0.5,
      stagger: 0.2,
      duration: 0.5,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: '.gallery-container',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  }, []);

  return (
    <div>
      <header className="bg-indigo-600 text-white p-4 text-center">
        <h1 className="text-3xl font-bold">Animated Image Gallery</h1>
      </header>

      <div className="gallery-container container mx-auto py-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((src, index) => (
          <div className="image bg-white shadow-lg rounded-lg overflow-hidden" key={index}>
            <img src={src} alt={`Gallery ${index + 1}`} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">Image {index + 1}</h3>
              <p className="text-sm text-gray-600">This is a description for image {index + 1}.</p>
            </div>
          </div>
        ))}
      </div>

      {/* Additional scrolling sections for better experience */}
      <div className="h-screen bg-gray-200 flex items-center justify-center">
        <h2 className="text-2xl">Keep scrolling for more!</h2>
      </div>
      <div className="h-screen bg-gray-300 flex items-center justify-center">
        <h2 className="text-2xl">Amazing content awaits!</h2>
      </div>
      <div className="h-screen bg-gray-400 flex items-center justify-center">
        <h2 className="text-2xl">Almost there!</h2>
      </div>
    </div>
  );
};

export default Gallery;

// // src/Notification.jsx
// import React, { useEffect } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// const Notification = () => {
//   // Register the ScrollTrigger plugin
//   gsap.registerPlugin(ScrollTrigger);

//   useEffect(() => {
//     const cards = gsap.utils.toArray('.card');

//     gsap.from(cards, {
//       opacity: 0,
//       y: 50,
//       stagger: 0.2,
//       duration: 0.5,
//       ease: 'power1.out',
//       scrollTrigger: {
//         trigger: '.container',
//         start: 'top 80%',
//         toggleActions: 'play play play none',
//       },
//     });
//   }, []);

//   return (
//     <div className='mt-28'>

//       <header className="bg-blue-600 text-white p-4 text-center">
//         <h1 className="text-3xl font-bold">GSAP with Tailwind Example</h1>
//       </header>

//       <div className="container mx-auto py-20">
//         <h2 className="text-2xl text-center mb-10">Notifications</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           <div className="card bg-white shadow-lg rounded-lg p-4">
//             <h3 className="text-xl font-bold">Notification 1</h3>
//             <p className="mt-2">This is the first notification content.</p>
//           </div>
//           <div className="card bg-white shadow-lg rounded-lg p-4">
//             <h3 className="text-xl font-bold">Notification 2</h3>
//             <p className="mt-2">This is the second notification content.</p>
//           </div>
//           <div className="card bg-white shadow-lg rounded-lg p-4">
//             <h3 className="text-xl font-bold">Notification 3</h3>
//             <p className="mt-2">This is the third notification content.</p>
//           </div>
//           <div className="card bg-white shadow-lg rounded-lg p-4">
//             <h3 className="text-xl font-bold">Notification 4</h3>
//             <p className="mt-2">This is the fourth notification content.</p>
//           </div>
//           <div className="card bg-white shadow-lg rounded-lg p-4">
//             <h3 className="text-xl font-bold">Notification 5</h3>
//             <p className="mt-2">This is the fifth notification content.</p>
//           </div>
//           <div className="card bg-white shadow-lg rounded-lg p-4">
//             <h3 className="text-xl font-bold">Notification 6</h3>
//             <p className="mt-2">This is the sixth notification content.</p>
//           </div>
//         </div>
//       </div>

//       {/* Additional content for scrolling */}
//       <div className="h-screen bg-gray-200 flex items-center justify-center">
//         <h2 className="text-2xl">Scroll down for more!</h2>
//       </div>
//       <div className="h-screen bg-gray-300 flex items-center justify-center">
//         <h2 className="text-2xl">Keep scrolling!</h2>
//       </div>
//       <div className="h-screen bg-gray-400 flex items-center justify-center">
//         <h2 className="text-2xl">Almost there!</h2>
//       </div>
//     </div>
//   );
// };

// export default Notification;
