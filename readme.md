# Cornhacks 2025

A 3d, fully navigable map of the solar system, hosted [here](https://cscheet2.github.io/cornhacks).

## Members

- Carston Wiebe: cwiebe3@huskers.unl.edu
- Cale Sigerson: csigerson2@huskers.unl.edu
- Raegan Scheet: cscheet2@huskers.unl.edu

## Dependencies

- [p5.js](https://p5js.org)

## Resources

- [p5.js Documentation](https://p5js.org/reference/)
- [Bisection Method Wikipedia Page](https://en.wikipedia.org/wiki/Bisection_method)
- [Desmos (our own sketch)](https://www.desmos.com/calculator/iisttukdgu)

### Fonts

- [moonet](https://www.fontspace.com/moonet-font-f119921)
  - License: Freeware, Non-Commercial
- [Sarala](https://fonts.google.com/specimen/Sarala)
  - License: SIL OPEN FONT LICENSE Version 1.1

### Icons

  - [Info and settings icons](https://www.freepik.com/)

## Data

### Planet Photos

- The webpage icon came from [Free Icons Png](https://www.freeiconspng.com/img/44668)
- Most of the planet photos used in this project's graph came from the
  [Solar System Scope](https://www.solarsystemscope.com/textures/) website
- The Pluto texture came from [NASA's Archives](https://nasa3d.arc.nasa.gov/detail/plu0rss1)

### Celestial Bodies JSON

Planet and moon data is stored inside of  `/data/celestial-bodies.json`. Inside
of the file, each entry is represented by the following...

| JSON Entry  | Meaning                          | Units      |
|-------------|----------------------------------|------------|
| mass        | body's mass                      | kilograms  |
| radius      | body's radius                    | kilometers |
| distance    | distance from what it's orbiting | kilometers |
| orbit       | time body takes to orbit         | seconds    |
| color       | common body colors               | hex codes  |
| description | body overview                    | N/A        |
| moons       | bodies orbiting                  | N/A        |

Most of this data was filled in by the DeepSeek AI, which referenced the
following sources...

- [NASA Planetary Fact Sheets](https://nssdc.gsfc.nasa.gov/planetary/factsheet/)
- [JPL HORIZONS System](https://ssd.jpl.nasa.gov/horizons/)
- [NASA Solar System Exploration](https://solarsystem.nasa.gov/)
- [International Astronomical Union (IAU)](https://www.iau.org/)
- [Lunar and Planetary Institute (LPI)](https://www.lpi.usra.edu/)
