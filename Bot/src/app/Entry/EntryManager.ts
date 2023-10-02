import { GuildMember } from "discord.js";
import Entry from "./Entry";
import EntryThread from "./EntryThread";
import CoolDownManager from "../../utils/CoolDown";

export default class EntryManager {
  private static entryMap: Map<string, Entry> = new Map();

  public static createEntry(member: GuildMember) {
    const entry = new Entry(member);
    this.entryMap.set(member.id, entry);
  }

  public static getEntry(id: string) {
    return this.entryMap.get(id);
  }

  public static attachThread(id: string, thread: EntryThread) {
    const entry = this.getEntry(id);

    if (!entry) return;
    entry.threadManager = thread;
  }

  public static finishEntry(id: string) {
    const entry = EntryManager.getEntry(id);
    if (entry) {
      const cooldown = CoolDownManager.cooldowns.get(entry.coolDownId);
      CoolDownManager.eagerStop(cooldown.id, cooldown.category);

      setTimeout(async () => {
        if (entry.threadManager) {
          try {
            await entry.threadManager.safeClean();
          } catch (e) {}
        }
      }, 1000 * 60 * 2);
    }
  }
}
