---
description: >-
  Retrouvez la documentation de toutes les commandes de messages préfabriqués du
  Bot !
---

# 📬 Messages

{% hint style="info" %}
Description : On retrouve ici les commandes envoyant des messages pré-formatés
{% endhint %}

## Commandes

{% tabs %}
{% tab title="Coaching" %}
### Envoie des messages pour les étudiants inscrits en coaching !

{% hint style="info" %}
La commande se décline en plusieurs sous commandes
{% endhint %}

```
/coaching deb-pas-faite [@Utilisateur à notifier et retirer du salon]
/coaching deb-comm <@Utilisateur à notifier>
/coaching fiche-comm <@Utilisateur à notifier>
```

[permissions.md](../fundamentals/fondamentaux/permissions.md "mention"): 📙 Tuteurs

**Deb-Pas-Faite:** Envoie un message prévenant l'étudiant qu'il ne peut pas faire son coaching car sa fiche début de parcours n'a pas été déposée et le retire du salon.

**Deb-Comm:** Envoie un message à l'étudiant indiquant que sa fiche début de parcours a été commentée et expliquant comment effectuer son travail

**Fiche-Comm:** Envoie un message à l'étudiant indiquant que sa fiche coaching a été commentée et expliquant comment effectuer son travail

{% hint style="success" %}
:cherries: Testez les commandes pour voir le contenu des messages !
{% endhint %}
{% endtab %}

{% tab title="Info" %}
### Envoie des messages d'informations auprès des étudiants !

{% hint style="info" %}
La commande se décline en plusieurs sous commandes
{% endhint %}

```
/info validation <@Utilisateur à notifier>
/info check-activity <@Utilisateur à notifier>
/info support <@Utilisateur à notifier>
```

[permissions.md](../fundamentals/fondamentaux/permissions.md "mention"): 📙 Tuteurs

**Validation:** Envoie un message précisant les délais de validation dans RésaCril

**Check-Activity:** Envoie un message à l'étudiant lui demendant de vérifier sa réservation pour se présenter au bon endroit

**Support:** Envoie un message à l'étudiant le dirigeant vers le support

{% hint style="success" %}
:cherries: Testez les commandes pour voir le contenu des messages !
{% endhint %}
{% endtab %}

{% tab title="Link" %}
### Envoie des liens vers des ressources auprès des étudiants !

{% hint style="info" %}
La commande se décline en plusieurs sous commandes
{% endhint %}

```
/link moodle <@Utilisateur à notifier>
/link resacril <@Utilisateur à notifier>
/link ressources <@Utilisateur à notifier>
```

[permissions.md](../fundamentals/fondamentaux/permissions.md "mention"): 📙 Tuteurs

**Moodle:** Envoie un message contenant un lien vers la page Moodle du Cril.

**Resacril:** Envoie un message contenant un lien vers la page Resacril.

**Ressources:** Envoie un message contenant un lien vers les ressources coaching.

{% hint style="success" %}
:cherries: Testez les commandes pour voir le contenu des messages !
{% endhint %}
{% endtab %}
{% endtabs %}

