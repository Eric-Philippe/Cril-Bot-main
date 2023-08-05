import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export default class Controllers {
  public static LINK_BUTTON = (
    label: string,
    url: string,
    emote?: string,
    disabled?: boolean
  ) => {
    const button = new ButtonBuilder()
      .setLabel(label)
      .setURL(url)
      .setStyle(ButtonStyle.Link);
    if (emote) button.setEmoji(emote);
    if (disabled) button.setDisabled(disabled);

    return button;
  };

  public static buildRows = (
    ...buttons: ButtonBuilder[]
  ): ActionRowBuilder[] => {
    let rows: ActionRowBuilder[] = [];
    let currentRow = new ActionRowBuilder();
    for (let i = 0; i < buttons.length; i++) {
      if (currentRow.components.length == 5) {
        rows.push(currentRow);
        currentRow = new ActionRowBuilder();
      }
      currentRow.addComponents(buttons[i]);
    }
    if (currentRow.components.length > 0) rows.push(currentRow);

    return rows;
  };

  public static createButton = (
    label: string,
    customId: string,
    style: ButtonStyle,
    emote?: string,
    disabled?: boolean
  ) => {
    const button = new ButtonBuilder()
      .setLabel(label)
      .setCustomId(customId)
      .setStyle(style);
    if (emote) button.setEmoji(emote);
    if (disabled) button.setDisabled(disabled);

    return button;
  };
}
