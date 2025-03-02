# Cornhacks 2025

## Members

- Carston Wiebe: cwiebe3@huskers.unl.edu
- Cale Sigerson: csigerson2@huskers.unl.edu
- Raegan Scheet: cscheet2@huskers.unl.edu

## Dependencies

### Libraries

- [p5.js](https://p5js.org)

### Fonts

- [moonet](https://www.fontspace.com/moonet-font-f119921)
  - License: Freeware, Non-Commercial
- [Sarala](https://fonts.google.com/specimen/Sarala)
  - License: SIL OPEN FONT LICENSE Version 1.1

## Resources

- [p5.js documentation](https://p5js.org/reference/)

## Data

### Planet Photos

- The webpage icon came from [Free Icons Png](https://www.freeiconspng.com/img/44668)
- The planet photos used in this project's graph came from the [Solar System Scope](https://www.solarsystemscope.com/textures/) website

### Celestial Bodies JSON

Planet and moon data is stored inside of  `/data/celestial-bodies.json`. Inside of the file, each entry is represented by the following...

| JSON Entry  | Meaning                          | Units      |
|-------------|----------------------------------|------------|
| mass        | body's mass                      | kilograms  |
| radius      | body's radius                    | kilometers |
| distance    | distance from what it's orbiting | kilometers |
| orbit       | time body takes to orbit         | seconds    |
| color       | common body colors               | hex codes  |
| description | body overview                    | N/A        |
| moons       | bodies orbiting                  | N/A        |

Most of this data was filled in by the DeepSeek AI, which referenced the following sources...

- [NASA Planetary Fact Sheets](https://nssdc.gsfc.nasa.gov/planetary/factsheet/)
- [JPL HORIZONS System](https://ssd.jpl.nasa.gov/horizons/)
- [NASA Solar System Exploration](https://solarsystem.nasa.gov/)
- [International Astronomical Union (IAU)](https://www.iau.org/)
- [Lunar and Planetary Institute (LPI)](https://www.lpi.usra.edu/)
