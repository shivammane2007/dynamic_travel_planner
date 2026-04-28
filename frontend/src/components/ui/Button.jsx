import { motion } from "framer-motion";

export default function Button({ children, className = "", ...props }) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`rounded-full px-5 py-3 text-sm font-medium transition ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
