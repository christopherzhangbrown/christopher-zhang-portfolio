import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface TiltedCardProps {
  children: React.ReactNode;
  containerHeight?: string;
  containerWidth?: string;
  rotateAmplitude?: number;
  scaleOnHover?: number;
  showMobileWarning?: boolean;
}

const springValues = {
  damping: 60, // much higher for slower stop
  stiffness: 30, // much lower for gentler motion
  mass: 2
};

export default function TiltedCard({
  children,
  containerHeight = 'auto',
  containerWidth = '100%',
  rotateAmplitude = 14,
  scaleOnHover = 1.12,
  showMobileWarning = false
}: TiltedCardProps) {
  const ref = useRef<HTMLElement>(null);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);

  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;
    rotateX.set(rotationX);
    rotateY.set(rotationY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
  }

  function handleMouseLeave() {
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.section
      ref={ref}
      className="relative w-full h-full [perspective:800px] flex flex-col items-center justify-center rounded-2xl transition-shadow duration-1000" // even smoother shadow transition
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{}}
      transition={{ type: 'spring', stiffness: 30, damping: 60 }} // match new spring values
      style={{
        height: containerHeight,
        width: containerWidth,
        boxShadow: '0 12px 40px 0 rgba(59,130,246,0.45)',
        transform: `scale(${scale.get()}) rotateX(${rotateX.get()}deg) rotateY(${rotateY.get()}deg)`
      }}
    >
      {showMobileWarning && (
        <div className="absolute top-4 text-center text-sm block sm:hidden">
          This effect is not optimized for mobile. Check on desktop.
        </div>
      )}
      {children}
    </motion.section>
  );
}
