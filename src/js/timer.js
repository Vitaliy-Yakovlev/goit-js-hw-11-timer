const refs = {
  divTimer: document.querySelector('#timer-1'),
  spanDays: document.querySelector('[data-value="days"]'),
  spanhHours: document.querySelector('[data-value="hours"]'),
  spanMins: document.querySelector('[data-value="mins"]'),
  spanSecs: document.querySelector('[data-value="secs"]'),
};

class CountdownTimer {
  constructor({ selector, targetDate }) {
    const startTime = new Date(targetDate);

    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const time = getTimeComponents(deltaTime);

      updateClockface(time);

      if (deltaTime < 0) {
        clearInterval(intervalId);
        refs.divTimer.innerHTML = 'Все время вышло';
      }
    }, 1000);
  }
}

const Timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('May 19, 2021'),
});

function updateClockface({ days, hours, mins, secs }) {
  refs.spanDays.textContent = `${days}`;
  refs.spanhHours.textContent = `${hours}`;
  refs.spanMins.textContent = `${mins}`;
  refs.spanSecs.textContent = `${secs}`;
}

function getTimeComponents(time) {
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = pad(
    Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  );
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

  return { days, hours, mins, secs };
}

function pad(value) {
  return String(value).padStart(2, '0');
}
