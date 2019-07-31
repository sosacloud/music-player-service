const db = require('./index');
const faker = require('faker');

const songs = [
  'https://music-player-service.s3-us-west-1.amazonaws.com/ill+come+too.mp3',
  'https://music-player-service.s3-us-west-1.amazonaws.com/imagine.mp3'
];

const randomNum = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

// generates one hundred rows of dummy song data
for (let i = 0; i <= 99; i++) {
  db.Songs.create({
    song_artist: faker.random.word(),
    song_title: `${faker.random.word()} ${faker.random.word()}`,
    song_album: `${faker.random.word()} ${faker.random.word()}`,
    song_url: songs[randomNum(0, 1)],
    user: faker.internet.userName(),
    user_comment: faker.lorem.sentence(),
    song_release: faker.date.past(),
    song_tags: `${faker.random.word()}`,
    song_length: faker.random.number({ min: 60, max: 360 }),
    song_thumbnail: faker.image.abstract()
  });
}
