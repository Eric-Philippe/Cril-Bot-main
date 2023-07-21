import requests

# Remplacez 'YOUR_BOT_TOKEN' par le token de votre bot Discord
bot_token = 'OTEwMzE1Mjk5NDY5OTM4NzE5.YZRDMA.w1yQHMota2_baQ2IuJ-ljM1Vuco'
headers = {
    'Authorization': f'Bearer {bot_token}'
}

# Récupérer la liste de toutes les commandes enregistrées sur votre bot
url = f'https://discord.com/api/v9/applications/910315299469938719/commands'
response = requests.get(url, headers=headers)

if response.status_code == 200:
    commands = response.json()
    for command in commands:
        command_id = command['id']
        delete_url = f'https://discord.com/api/v9/applications/910315299469938719/commands/{command_id}'
        delete_response = requests.delete(delete_url, headers=headers)
        if delete_response.status_code == 204:
            print(f"La commande avec l'ID {command_id} a été supprimée avec succès.")
        else:
            print(f"Une erreur s'est produite lors de la suppression de la commande avec l'ID {command_id}. Code d'erreur : {delete_response.status_code}")
else:
    print(f"Une erreur s'est produite lors de la récupération de la liste des commandes. Code d'erreur : {response.status_code}")
