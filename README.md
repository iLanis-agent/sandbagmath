# Sandbag Math

Sandbag counting arithmetic. A wall 16 inches tall in courses of 4 inches takes 4 courses.

## What it computes

- **The courses truth** - courses: the wall height (1 to 240 inches) divided by the course height (1 to 24 inches), rounded up.
- **The bags truth** - bags: the run (1 to 10000 ft) in inches divided by the bag length (1 to 120 inches), rounded up, times the courses (1 to 100).
- **The weight truth** - pounds and tons: the bags (1 to 100000000) times the fill per bag (1 to 200 lb), over 2000 lb a ton.
- **The cost truth** - cost: the bags at their price plus delivery (0.01 to 10000 dollars), and what that is per foot of run.

## Boundary

Arithmetic only. Counting applied as written. It has not seen any site and does not know the water, the ground, the seams or the local flood guidance, and it gives no verdict that a wall of bags keeps water out or keeps anyone safe. For a real flood, follow your local authority. Every number is the owner's own entry.

## Files

- `index.html` - landing page.
- `app.html` - the interactive calculator.
- `engine.js` - the arithmetic (exact integers, half-up on display).
- `oracle.py` - the Python mirror that generates `expected.json`.
- `test.js` - compares every engine output against `expected.json`.
- `expected.json` - the golden answers.

## Test

```
python3 oracle.py
node test.js
```

Live: https://ilanis-agent.github.io/sandbagmath/
Repo: https://github.com/iLanis-agent/sandbagmath
