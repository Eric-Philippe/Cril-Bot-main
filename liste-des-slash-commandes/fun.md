---
description: Retrouvez la documentation de toutes les commandes fun du Bot !
---

# 🎉 Fun

{% hint style="info" %}
Description : On retrouve ici les commandes à but de divertissement&#x20;
{% endhint %}

## Commandes

{% tabs %}
{% tab title="Dice" %}
### Lance un dé !

```
/dice <Nombre de faces>
```

[permissions.md](../fundamentals/fondamentaux/permissions.md "mention"): :student: @everyone

Lance un dé et retourne une valeur aléatoire. Le dé a par défaut 6 faces. Vous pouvez rentrer le nombre de face que vous souhaitez !\
\
**Exemple:** /dice\
:information\_source: - Retourne un chiffre entre 1 et 6 (Inclusif)\
\
**Exemple:** /dice 12\
:information\_source: - Retourne un chiffre entre 1 et 12 (Inclusif)
{% endtab %}

{% tab title="Louise" %}
### Effectue des actions superflues et amusantes !

{% hint style="info" %}
Cette commande se compose en fait des sous commandes "echo" et "calculator" !
{% endhint %}

```
/louise echo [Texte a répéter] <Language>
/louise calculator [Nombre 1] [!Opérateur] [Nombre 2]
```

[permissions.md](../fundamentals/fondamentaux/permissions.md "mention"): :student: @everyone

**Echo**_:_ Répète le texte donné en entré ~~_(Blaaaa blaaa bla_~~_),_ vous pouvez lui spécifier faculativement le language dans lequel vous voulez votre réponse !

**Calculator:** Faites des calculs à la façon Louise. ~~_(Gosh.)_~~

\
**Exemple:** /louise echo |Salut| |morse|\
:information\_source: - Renvoie "Salut" dans le channel en morse

**Exemple:** /louise calculator |42| \[Addition| |69 |\
:information\_source: - Retourne ce que Louise pense de l'addition de 42 et 69 ...

{% hint style="warning" %}
**Attention !** Je ne suis pas garant des résultats&#x20;
{% endhint %}
{% endtab %}

{% tab title="Ping" %}
### :ping\_pong: Pong !

```
/ping
```

[permissions.md](../fundamentals/fondamentaux/permissions.md "mention"): :student: @everyone\
\
Cette commande ne fait rien de particulier, hormis simuler un match de Ping-Pong.\
Je vous mets au défi de battre le Bot.

~~_En vrai la commande est surtout utile pour moi, développeur, pour tester des trucs ..._~~
{% endtab %}

{% tab title="Pixel" %}
### Dépose un pixel sur le Canva CrilPlace !

> "Mais ? C'est quoi CrilPlace !!"

{% hint style="info" %}
CrilPlace est un canva permettant de dessiner ou écrire à l'aide de pixel de couleur dans un grille de 20x20 pixels !
{% endhint %}

```
/pixel [Coordonnée X] [Coordonnée Y] [!Couleur du Pixel à poser]
```

[permissions.md](../fundamentals/fondamentaux/permissions.md "mention"): :student: @everyone

\
Dépose un pixel sur le canva, à l'endroit et la couleur de votre choix

**Exemple:** /pixel |18| ||14| |Violet|\
:information\_source: - Dépose un pixel Violet aux coordonnées \[18, 14] sur le Canva

{% hint style="warning" %}
La commande n'est faisable uniquement que dans le channel dédié ! \
[(#🟥🟩🟦⊢cril-place)](https://discord.com/channels/688866481689329773/1040996536588456027)
{% endhint %}

![](<../.gitbook/assets/image (5).png>)\

{% endtab %}
{% endtabs %}

