const db = require('./index');
const faker = require('faker');

// generates one hundred rows of dummy song data
for (let i = 0; i <= 99; i++) {
  db.Songs.create({
    song_artist: faker.internet.userName(),
    song_title: faker.lorem.words(),
    song_url: faker.lorem.words(), // AWS S3 url
    user: faker.internet.userName(), // use Juan service
    user_comment: faker.lorem.sentence(), // use Juan service
    song_release: faker.date.past(), // X days ago
    song_tags: `${faker.random.word()} & ${faker.random.word()}`,
    song_length: faker.random.number({ min: 60, max: 360 }), // render nice date format on client
    song_thumbnail: faker.image.abstract()
  });
}
