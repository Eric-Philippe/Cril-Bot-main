---
description: >-
  Retrouvez la documentation de toutes les commandes orientées vers les systèmes
  semi-autonomes de contrôle d'inscription
---

# 🎓 Présence

{% hint style="info" %}
Description : On retrouve ici les commandes pour le système de coaching
{% endhint %}

## Commandes

{% tabs %}
{% tab title="Enter List" %}
### Charge le système autonome avec la liste RésaCril du jour !

```
/enterlist <texte court> <Fichier>
```

[permissions.md](../fundamentals/fondamentaux/permissions.md "mention"): 📙 Tuteurs

Charge le système autonome avec la liste RésaCril du jour. Les deux options apparaissent facultatives mais il faut choisir l'une des deux :&#x20;

En fonction de la taille de la liste, on risque de dépasser la limite textuel d'un message Discord (2000 caractères).

{% hint style="info" %}
**Tips:** Si on rentre un contenu trop grand dans le case texte court rien ne se passe, on peut alors en déduire que l'on doit utiliser le second paramètre nommé "File"
{% endhint %}

{% hint style="info" %}
**Tips:** Coller un texte imposant dans le second paramètre le convertira automatiquement en fichier !
{% endhint %}

{% hint style="info" %}
**Tips:** Consultez la commande Status dans [miscellaneous.md](miscellaneous.md "mention") si vous voulez controler que tout est fonctionnel, ou bien si le bot à du redémarrer récemment !\
~~_J'espère que non..._~~
{% endhint %}

{% hint style="success" %}
:cherries: "_No Panic' !_" Il n'y a rien à casser ! Alors, essayez ! ~~_Normalement_~~.&#x20;
{% endhint %}
{% endtab %}

{% tab title="Refresh List" %}
### Actualise le système autonome après saisies / modifications d'informations dans le Google Sheets intérmédiaire !

```
/refreshlist
```

[permissions.md](../fundamentals/fondamentaux/permissions.md "mention"): 📙 Tuteurs

\- Tout est dans le header. Littéralement.

{% hint style="warning" %}
Pensez à avoir au moins configuré la sauvegarde du jour avant de vouloir le rafraichir !
{% endhint %}

{% hint style="info" %}
**Tips:** Consultez la commande Status dans [miscellaneous.md](miscellaneous.md "mention") si vous voulez controler que tout est fonctionnel, ou bien si le bot à du redémarrer récemment !\
~~_J'espère que non..._~~
{% endhint %}
{% endtab %}
{% endtabs %}

