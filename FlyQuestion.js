function minPlanesRequired(fuel) {
  let n = fuel.length;
  if (n === 1) return 0; // Already at the last airport

  let jumps = 0;
  let maxReach = 0;
  let currentEnd = 0;

  for (let i = 0; i < n - 1; i++) { // No need to check the last airport
      maxReach = Math.max(maxReach, i + fuel[i]);

      if (i === currentEnd) { 
          jumps++;
          currentEnd = maxReach;

          if (currentEnd >= n - 1) {
            return jumps
          }; // Can reach last airport
      }

      if (i >= maxReach) {
        return -1;
       } 
  }

  return -1; // If loop completes without reaching the last airport
}

console.log((minPlanesRequired([2,1,2,3,1]))) 
console.log((minPlanesRequired([1,6,3,4,5,0,0,0,6])))