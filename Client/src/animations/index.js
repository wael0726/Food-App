export const buttonclick = {
    whileTap: { scale: 0.95 },
};

export const fadeInOut = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};

export const slideTop = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30 },
};

export const zoomAnimation = {
    initial: { scale: 1 }, 
    animate: { scale: 1.15 }, 
    transition: { duration: 0.5, ease: 'easeInOut' },
};

export const floatAnimation = {
    initial: { y: 0 },
    animate: {
        y: [0, -30, 0], 
        transition: {
            duration: 1.5, 
            ease: 'easeInOut', 
            repeat: Infinity, 
        },
    },
};

export const slideIn = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 30 },
  };


export const staggerFadeInOut = (i) => {
    return {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 50 },
      transition: { duration: 0.3, delay: i * 0.15 },
      key: { i },
    };
};
