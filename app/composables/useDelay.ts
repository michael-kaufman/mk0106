export const useDelay = () => {
  // For demo purposes - remove this delay in production
  const simulateDelay = () => new Promise(resolve => setTimeout(resolve, 1000))
  return { simulateDelay }
} 