const GENERAL_COOLDOWN = "GENERAL_COOLDOWN";

/**
 * CoolDownManager
 * @class
 * @classdesc Manage cooldowns
 * @example CoolDownManager.startCooldDown("id", 1000, () => console.log("Hello World"));
 */
export default class CoolDownManager {
  static cooldowns: Map<string, CoolDown> = new Map();

  /**
   * Create a new cooldown
   * @param id
   * @param time
   * @param callback
   * @param category
   * @returns
   */
  public static startCooldDown(
    id: string,
    time: number,
    callback: Function,
    category?: string
  ): string {
    const cooldown = new CoolDown(id, time, callback, category);
    const cooldownId = CoolDownManager.toId(id, category);

    if (CoolDownManager.cooldowns.has(cooldownId)) return cooldownId;

    const timeoutId = setTimeout(() => {
      if (cooldown.callback) cooldown.callback();
      CoolDownManager.cooldowns.delete(cooldownId);
    }, cooldown.time);

    cooldown.setTimeoutId(timeoutId);
    CoolDownManager.cooldowns.set(cooldownId, cooldown);

    return cooldownId;
  }

  /**
   * Get a cooldown
   * @param id id of the cooldown
   * @param category category of the cooldown
   * @returns {CoolDown} the cooldown or undefined
   */
  public static get(id: string, category: string = GENERAL_COOLDOWN): CoolDown {
    return this.cooldowns.get(CoolDownManager.toId(id, category));
  }

  public static getRemainingTime(
    id: string,
    category: string = GENERAL_COOLDOWN
  ) {
    const cooldown = this.get(id, category);
    if (!cooldown) return 0;

    return cooldown.getRemainingTime();
  }

  /**
   * Check if a cooldown exists
   * @param id id of the cooldown
   * @param category category of the cooldown
   * @returns {boolean} true if the cooldown exists
   */
  public static has(id: string, category: string = GENERAL_COOLDOWN): boolean {
    return this.cooldowns.has(CoolDownManager.toId(id, category));
  }

  /**
   * Stop the cooldown at all costs without calling the callback
   * @param id id of the cooldown
   * @param category category of the cooldown
   */
  public static eagerStop(id: string, category?: string) {
    const cooldown = this.get(id, category);
    if (!cooldown) return;

    clearTimeout(cooldown.timeoutId);
    this.cooldowns.delete(CoolDownManager.toId(id, category));
  }

  /**
   * Stop the cooldown and call the callback
   * @param id id of the cooldown
   * @param category category of the cooldown
   */
  public static softStop(id: string, category: string = GENERAL_COOLDOWN) {
    const cooldown = this.get(id, category);
    if (!cooldown) return;

    clearTimeout(cooldown.timeoutId);
    try {
      cooldown.callback();
    } catch (e) {}
    this.cooldowns.delete(CoolDownManager.toId(id, category));
  }

  /**
   * Utility : transform ids into a single id
   * @param ids ids to transform
   * @returns {string} the new id joined with #
   * @example CoolDownManager.toId("id1", "id2", "id3") => "id1#id2#id3"
   */
  public static toId(...ids: string[]) {
    return ids.join("#");
  }
}

/**
 * CoolDown
 * @class
 * @classdesc Represent a cooldown
 * @example new CoolDown("id", 1000, () => console.log("Hello World"));
 */
class CoolDown {
  public id: string;
  public timeoutId: NodeJS.Timeout;
  public time: number;
  public startDate: number;
  public callback: Function;
  public category: string;

  public constructor(
    id: string,
    time: number,
    callback: Function,
    category: string = GENERAL_COOLDOWN
  ) {
    this.id = id;
    this.time = time;
    this.callback = callback;
    this.category = category || GENERAL_COOLDOWN;
  }

  public setTimeoutId(timeoutId: NodeJS.Timeout) {
    this.timeoutId = timeoutId;
    this.startDate = Date.now();
  }

  public getRemainingTime() {
    return this.time - (Date.now() - this.startDate);
  }
}
