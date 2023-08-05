export class Timer {
  private startTime: number | null = null;
  private stopTime: number | null = null;
  private isRunning: boolean = false;

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.startTime = Date.now();
    }
  }

  stop() {
    if (this.isRunning) {
      this.isRunning = false;
      this.stopTime = Date.now();
    }
  }

  getTimeSpent(): number | null {
    if (this.startTime && this.stopTime) {
      return this.stopTime - this.startTime;
    }
    return null;
  }

  toString(): string {
    const timeSpent = this.getTimeSpent();
    if (timeSpent !== null) {
      const seconds = Math.floor(timeSpent / 1000);
      const milliseconds = timeSpent % 1000;
      return `${seconds} seconds and ${milliseconds} milliseconds`;
    }
    return "Timer hasn't been started or stopped.";
  }

  toMsInt(): number {
    const timeSpent = this.getTimeSpent();
    if (timeSpent !== null) {
      return timeSpent;
    }
    return -1;
  }
}
