import EventEmitter from './EventEmitter.js';
import StatsMonitor from '../Utils/StatsMonitor.js';

export default class Time extends EventEmitter {
  constructor() {
    super();

    // Options
    this.statsMonitor = new StatsMonitor();

    // Setup
    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16;

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }

  tick() {
    this.statsMonitor.stats.begin();

    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;

    this.trigger('tick');

    window.requestAnimationFrame(() => {
      this.tick();
    });

    this.statsMonitor.stats.end();
  }
}
