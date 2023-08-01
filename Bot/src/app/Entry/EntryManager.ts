import { GuildMember } from "discord.js";
import Entry from "./Entry";
import EntryThread from "./EntryThread";

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
}
