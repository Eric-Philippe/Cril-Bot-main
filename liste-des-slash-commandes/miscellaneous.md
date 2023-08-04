---
description: Retrouvez la documentation de toutes les commandes dites "Misc' "
---

# 🖱 Miscellaneous

{% hint style="info" %}
Description : On retrouve ici les commandes en quelque sorte sans catégorie du bot
{% endhint %}

## Commandes

{% tabs %}
{% tab title="Poll" %}
### Créé un sondage interactif !

```
/poll [Question][Answer 1] [Answer 2] <Answer 3> <Answer 4> <Answer 5>
```

[permissions.md](../fundamentals/fondamentaux/permissions.md "mention"): 📘 Tuteurs Assistants

Envoi un sondage anonyme, dynamique affichant les pourcentages en direct au court de l'évolution de ce dernier. Le Sondage a une ancienneté maximum de 1 mois avant de devenir inactif.\
\
**Exemple:** /poll |Quelle est votre préférence ?| |Steack à la Plancha| |Tacos| |Frites|\
:information\_source: - Créé un sondage avec l'énoncé "Quelle est votre préférence ?" et les trois réponses possibles (Frites, Tacos, Steack à la Plancha)\
\
**Illustration:** \
![](<../.gitbook/assets/image (19).png>)
{% endtab %}

{% tab title="Toss" %}
### Créé un Tirage au sort !

```
/toss [Titre] [Description] [Footer]
```

[permissions.md](../fundamentals/fondamentaux/permissions.md "mention"): 📘 Tuteurs Assistants

Créé un tirage au sort accessible à tout ceux ayant accès au channel dans lequel le tirage a été créé. Le tirage au sort se cloture en cliquant sur le bouton "Terminer" afin de déterminer au hasard le gagnant parmi les participants.

\
**Exemple:** /toss |Gagnez une carte Netflix| |Participez afin d'obtenir une Carte Netflix d'une valeur de 25€ !| |Tirage quand j'en aurai envie|\
:information\_source: - Créé un tirage au sort avec les informations ci-dessus\
\
**Illustration:** \
![](<../.gitbook/assets/image (20).png>)Création du Tirage au Sort

![](<../.gitbook/assets/image (21).png>)Résultat en ayant cliqué sur "Terminer"
{% endtab %}

{% tab title="Status" %}
### Informe sur l'état actuel du bot ainsi que de ses services

```
/status
```

[permissions.md](../fundamentals/fondamentaux/permissions.md "mention"): 📘 Tuteurs Assistants\
\
Renvoi les valeurs pour chacun des services avec un indicateur coloré parmi :red\_circle::yellow\_circle::green\_circle: pour désigner l'état de ces derniers.\
\
**Illustration :** \
![](<../.gitbook/assets/image (18).png>)


{% endtab %}

{% tab title="Help" %}
### Vous ramène ici pour avoir de l'aide

```
/help
```

[permissions.md](../fundamentals/fondamentaux/permissions.md "mention"): :student: @everyone\
\
Renvoie le même lien qui vous a permis de parvenir jusqu'ici. \
&#x20;~~_"Est-ce vraiment utile de le préciser ?"_~~
{% endtab %}
{% endtabs %}
