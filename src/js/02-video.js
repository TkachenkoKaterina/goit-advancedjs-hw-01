import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const LSKey = 'videoplayer-current-time';

let currentSeconds = 0;

const storedTime = localStorage.getItem(LSKey);
if (storedTime) {
  const parsedData = JSON.parse(storedTime);
  currentSeconds = parsedData.seconds;
  onSetCurrentTime();
}

player.on('timeupdate', throttle(onTimeUpdate, 1000));

function onTimeUpdate(data) {
  localStorage.setItem(LSKey, JSON.stringify(data));
  currentSeconds = data.seconds;
}

// Функція для встановлення часу відтворення
function onSetCurrentTime() {
  player
    .setCurrentTime(currentSeconds)
    .then(sec => console.log(sec))
    .catch(error => console.error('Error setting current time:', error));
}
