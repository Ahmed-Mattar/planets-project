const { parse } = require('csv-parse')
const fs = require('fs')


const HabitablePlanets = []

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED' &&
        planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

fs.createReadStream('Kepler_data.csv')
    .pipe(parse({
        comment: '#',
        columns: true,
    }))
    .on('data', (data) => {
        if (isHabitablePlanet(data)) {
            HabitablePlanets.push(data)
        }

    })
    .on('error', (error) => {
        console.log(error)
    })
    .on('end', () => {
        console.log(HabitablePlanets.map((planet) => {
            return planet['kepler_name']
        }))
        console.log(`${HabitablePlanets.length} habitable planets found.`);
    });