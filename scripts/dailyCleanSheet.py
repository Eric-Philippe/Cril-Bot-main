import psycopg2
from dotenv import load_dotenv
import os

load_dotenv()

if not os.getenv("ENV") or os.getenv("ENV") == "dev":
    raise Exception("Environment variable is not set.")    


# Remplacez ces informations par les vôtres
parametres_connexion = {
    "host": os.getenv("DB_HOST"),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASS"),
    "database": os.getenv("DB_NAME"),
}

# Établir la connexion
connexion = psycopg2.connect(**parametres_connexion)

# Créer un objet curseur pour exécuter des requêtes SQL
with connexion.cursor() as curseur:
    # Exécuter une requête pour supprimer tout le contenu de la table inscriptions_atelier
    curseur.execute("DELETE FROM inscriptions_atelier;")

    # Exécuter une requête pour supprimer tout le contenu de la table inscriptions_coaching
    curseur.execute("DELETE FROM inscriptions_coaching;")

    # Exécuter une requête pour supprimer tout le contenu de la table current_spreadsheets
    curseur.execute("DELETE FROM current_spreadsheets;")

# Valider la transaction
connexion.commit()

# Fermer la connexion
connexion.close()

print("Daily clean sheet done.")
