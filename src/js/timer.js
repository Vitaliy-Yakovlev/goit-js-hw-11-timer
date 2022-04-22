class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = document.querySelector(selector);
    this.targetDate = targetDate;
    this.spanDays = this.selector.querySelector('span[data-value="days"]');
    this.spahnHours = this.selector.querySelector('span[data-value="hours"]');
    this.spanMins = this.selector.querySelector('span[data-value="mins"]');
    this.spanSecs = this.selector.querySelector('span[data-value="secs"]');

    this.timer();
  }

  timer() {
    const intervalId = setInterval(() => {
      const deltaTime = this.targetDate - Date.now();
      const currentTime = this.getTimeComponents(deltaTime);

      if (deltaTime < 0) {
        clearInterval(intervalId);
        this.selector.innerHTML = 'Время вышло!';
      }

      this.updateClockface(currentTime);
    }, 1000);
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

  updateClockface({ days, hours, mins, secs }) {
    this.spanDays.textContent = `${days}`;
    this.spahnHours.textContent = `${hours}`;
    this.spanMins.textContent = `${mins}`;
    this.spanSecs.textContent = `${secs}`;
  }
}

const Timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('5 18, 2022'),
});
