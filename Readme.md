APPROACH

1)Start from the first airport.
2)At each airport, check how far the available fuel allows you to travel.
3)Keep updating maxReach to extend the furthest airport reachable.
4)When reaching currentEnd, hire a new plane and update currentEnd to maxReach.
5)If at any point maxReach reaches the last airport, return the number of hires.
5)If maxReach does not extend beyond the current airport, return -1 (not possible).