import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const LSKey = 'videoplayer-current-time';

const storedTime = localStorage.getItem(LSKey);
if (storedTime) {
  player.setCurrentTime(storedTime);
}

player.on('timeupdate', throttle(onTimeUpdate, 1000));

function onTimeUpdate({ seconds }) {
  localStorage.setItem(LSKey, seconds);
}
