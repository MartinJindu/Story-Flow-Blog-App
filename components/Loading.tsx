"use client";

import Image from "next/image";
import logo from "../public/blog.webp";
import { motion } from "framer-motion";

// export default function Loading() {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-md ">
//       <motion.div
//         animate={{ y: [0, -20, 0] }} // Bouncing effect
//         transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
//       >
//         <Image
//           src={logo}
//           alt="Loading"
//           width={80}
//           height={80}
//           className="animate-pulse"
//         />
//       </motion.div>
//     </div>
//   );
// }
export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-md ">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
      >
        <Image
          src={logo}
          alt="Loading"
          width={80}
          height={80}
          className="animate-pulse rounded-2xl"
        />
      </motion.div>
    </div>
  );
}
