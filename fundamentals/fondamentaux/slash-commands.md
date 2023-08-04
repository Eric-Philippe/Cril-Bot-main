---
description: Une vision plus approfondie des Slash Commandes de Discord
---

# 📝 Slash Commands

{% hint style="info" %}
:book: **Documentation Officielle :** [Lien vers la documentation officielle de Discord ](https://support.discord.com/hc/en-us/articles/1500000368501-Slash-Commands-FAQ)
{% endhint %}

Une Slash Command vous permet d'intéragir avec le Bot de manière textuelle. L'entrée de ces commandes se fait dynamiquement en proposant des garde-fou empêchant / limitant les entrées possible utilisateurs. Cela concerne le type d'entrée, l'autocompletion, la taille ..



{% hint style="success" %}
:cherries: N'ayez pas peur de vous tromper, essayez !
{% endhint %}

Vous retrouverez tout ce dont vous avez besoin lors de l'entrée d'une commande, sa description, son intitulé, et les différentes limites apparaitrons lorsque vous les rencontrerez !

<figure><img src="../../.gitbook/assets/image (13).png" alt="" width="248"><figcaption><p>Commande pixel, illustrant l'entrée du paramètre<br>color avec l'autocomplétion</p></figcaption></figure>



### Comprendre les annotations des Slash Commandes dans la documentation

| Notation     | Exemple                  |                                                  |
| ------------ | ------------------------ | ------------------------------------------------ |
| /commandName | /ping                    | Nom de la Commande                               |
| \[]          | \[Option1]               | Option obligatoire                               |
| <>           | \<Option2>               | Option facultative                               |
| !            | \[!Option 1] \<!Option2> | Option munie de réponses prédéfinies             |
| @            | \[@User]                 | Option consisitant à cibler un utilisateur       |
| #            | \[#Channel]              | Option consistant à cibler un channel            |
| ()           | (echo)                   | Nom de la sous commande à la commande principale |

### Retrouvez la liste des Slash Commandes ici :

{% content-ref url="broken-reference" %}
[Broken link](broken-reference)
{% endcontent-ref %}
