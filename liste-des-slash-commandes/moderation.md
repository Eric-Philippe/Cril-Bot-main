---
description: Retrouvez la documentation de toutes les commandes de modération
---

# ⚒ Modération

{% hint style="info" %}
Description : On retrouve ici les commandes permettant la modération sur le serveur
{% endhint %}

## Commandes

{% tabs %}
{% tab title="Ban" %}
### Ban un utilisateur de manière définitive !

```
/ban [@Utilisateur Cible]
```

[permissions.md](../fundamentals/fondamentaux/permissions.md "mention"): 👑 Responsables

Bannie l'utilisateur ciblé du serveur de sorte à ce qu'il ne puisse plus revenir\
\
**Exemple:** /ban |@GensConDeGMP|\
:information\_source: - Bannie l'utilisateur GensConDeGMP du server
{% endtab %}

{% tab title="Kick" %}
### Kick un utilisateur !

```
/kick [@Utilisateur Cible]
```

[permissions.md](../fundamentals/fondamentaux/permissions.md "mention"): 📙 Tuteurs

_Boute, Exclut_ l'utilisateur ciblé du serveur

\
**Exemple:** /kick @DebileDInfo\
:information\_source: - Exclut l'utilisateur DebileDInfo du serveur

{% hint style="danger" %}
**Attention !** Kick un utilisateur ne l'empêche pas de revenir sur le serveur !!

~~_En tout cas ... S'il sait comment faire._~~
{% endhint %}
{% endtab %}

{% tab title="Removeperm" %}
### Retire les permissions de parler et voir un channel à un utilisateur !

```
/removeperm [@Utilisateur]
```

[permissions.md](../fundamentals/fondamentaux/permissions.md "mention"): 📙 Tuteurs\
\
Empêche un utilisateur de voir / accéder au channel courant.

**Exemple:** /removeperm @NulDeTC\
:information\_source: - Retire la permission de voir le channel dans lequel la commande a été lancée de l'utilisateur NulDeTC

{% hint style="info" %}
Cette commande est prévue pour être utilisée dans les channels de Coachings
{% endhint %}

{% hint style="danger" %}
Attention : Un utilisateur auquel on a enlevé la permission de voir un channl ne se voit pas réattribuer les permissions automatiquement !
{% endhint %}
{% endtab %}

{% tab title="Yeet" %}
### YEET (Jette) l'utilisateur de là où il se trouve !

```
/yeet [@Utilisateur Cible]
```

[permissions.md](../fundamentals/fondamentaux/permissions.md "mention"): 📙 Tuteurs\
\
Déconnecte du vocal dans lequel se trouve l'utilisateur, et le timeout pendant 20 minutes lui retirant tous moyens de communiquer sur le serveur

**Exemple:** /yeet @PenibleDeGE2I\
:information\_source: - Déconnecte l'utilisateur PenibleDeGE2I de son vocal actuelle et le timeout pendant les 20 prochaines minutes. \
_Aaaaah. La paix._

{% hint style="info" %}
Un timeout peut être révoqué en faisant "Clique Droit" sur l'utilisateur puis dans le sous-menu "Révoquer Timeout"
{% endhint %}
{% endtab %}
{% endtabs %}

