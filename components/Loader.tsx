import { motion } from "motion/react";

const Loader = ({ text }: { text: string }) => {
  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <>
      <motion.div
        className="flex gap-2 items-center "
        initial="hidden"
        animate="visible"
        transition={{
          staggerChildren: 0.6,
          delay: 0.4,
        }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.span
            key={i}
            variants={staggerVariants}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="h-6 w-1 bg-cyan-500 rounded-full inline-block"
          />
        ))}
        <span className="text-cyan-500">{text}</span>
      </motion.div>
    </>
  );
};

export default Loader;
