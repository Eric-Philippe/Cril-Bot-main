export default class Stopwatch {
  private startTime: number = 0;
  private elapsedTime: number = 0;

  start() {
    this.startTime = Date.now();
  }

  stop(reset: boolean = false) {
    if (this.startTime === 0) return console.error("Stopwatch is not running");

    const endTime = Date.now();
    const elapsedTime = endTime - this.startTime;

    if (reset) this.startTime = 0;
    this.elapsedTime += elapsedTime;
  }

  get elapsedTimeMs(): number {
    return this.elapsedTime;
  }

  get elapsedTimeMin(): number {
    return this.elapsedTime / 60000;
  }

  toString(): string {
    const ms = this.elapsedTime;
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + " minutes " + seconds + " secondes";
  }
}
