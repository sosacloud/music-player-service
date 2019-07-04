const db = require('./index');
const faker = require('faker');

const songs = [
  'https://music-player-service.s3-us-west-1.amazonaws.com/7+rings.mp3',
  'https://music-player-service.s3-us-west-1.amazonaws.com/bloodline.mp3',
  'https://music-player-service.s3-us-west-1.amazonaws.com/cant+believe+the+way+we+flow.mp3',
  'https://music-player-service.s3-us-west-1.amazonaws.com/ill+come+too.mp3',
  'https://music-player-service.s3-us-west-1.amazonaws.com/imagine.mp3',
  'https://music-player-service.s3-us-west-1.amazonaws.com/mile+high.mp3',
  'https://music-player-service.s3-us-west-1.amazonaws.com/nasa.mp3',
  'https://music-player-service.s3-us-west-1.amazonaws.com/needy.mp3',
  'https://music-player-service.s3-us-west-1.amazonaws.com/power+on.mp3',
  'https://music-player-service.s3-us-west-1.amazonaws.com/tell+them.mp3'
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
    song_url: songs[randomNum(0, 10)],
    user: faker.internet.userName(), // use comments-service
    user_comment: faker.lorem.sentence(), // use comments-service
    song_release: faker.date.past(), // should render 'X days ago'
    song_tags: `${faker.random.word()}`,
    song_length: faker.random.number({ min: 60, max: 360 }),
    song_thumbnail: faker.image.abstract()
  });
}
