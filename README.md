## Qu'est-ce que c'est ?
Ceci est une application web MERN que vous pouvez ajouter à votre portfolio et expérimenter.

<img src='https://github.com/issaniang5/Application-meteo-MERN/blob/main/Images/Readme.png' height=600px width=800px></img>

**Weather App** est une application météo qui permet d'obtenir les données météo actuelles en fonction du code postal que vous soumettez via le formulaire.

 Elle se compose de 4 principaux composants
- l'en-tête en haut
- le formulaire pour saisir votre code postal, choisir l'unité de température et enregistrer
- [panneau de gauche] Affiche les données météo
- [panneau de droite] Les 10 dernières requêtes de données météo

## Configuration
Applications prérequis à télécharger :
- [Node](https://nodejs.org/en/) 
- [git](https://git-scm.com/downloads)

Clonez le dépôt :
```
git clone https://github.com/JinKim7/mern-weather-app.git
```

Téléchargez tous les paquets npm pour le client et le serveur :
```javascript
npm run setup
```

### .env Fichier
Deux informations sont nécessaires : l'API météo et la chaîne de connexion MongoDB.

#### Mongo
Connectez-vous à [mongo](https://account.mongodb.com/account/login)

Dans la barre latérale gauche, vous devriez voir Database Access. Cliquez dessus et créez un nouvel utilisateur pour vous-même.
1. Cliquez sur `Add New Database User`
2. Créez un nouvel utilisateur en remplissant les champs `username` et `password`  
(Ces informations d'identification seront différentes de celles de votre compte Mongo. Elles donnent à cet utilisateur l'accès à cette base de données spécifique.)

Dans la barre latérale gauche, vous devriez voir **Network Access**.
Créez un nouveau point d'accès pour votre adresse IP afin d'autoriser l'utilisation de votre MongoDB.

Créez maintenant un fichier **.env** dans le répertoire racine de **mern-weather-app** et ajoutez-y dynamiquement ceci :
```javascript
DB=mongodb+srv://<username>:<password>@<cluster-id>.mongodb.net/test?retryWrites=true&w=majority
```


Pour obtenir l'ID du **cluster**, allez dans **Clusters** et cliquez sur **Connect > Connect your application** pour voir un aperçu détaillé de la chaîne de connexion.

#### API météo
Créez un compte sur OpenWeatherMap et allez à la section [api keys](https://home.openweathermap.org/api_keys) section.
Copiez-collez cette clé dans le fichier `.env` avec  `WEATHER_KEY` comme clé :

```
WEATHER_KEY=1234567890asdfjkl
```

## Exécution locale
**Note:** Remarque : La connexion Mongo est commentée dans `server.js.` Décommentez simplement le bloc de code pour connecter Mongo :
```javascript
// mongoose.connect(process.env.DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => console.log('MongoDB Connected...')).catch(err => console.log(err));
```

Vous pouvez maintenant exécuter votre application en local.
Allez dans le répertoire racine et démarrez votre application web :
```javascript
npm run dev
```

Cette commande lancera le client et le serveur simultanément.

- client : localhost:3000
- serveur : localhost:5000

Le service surveillera automatiquement les changements sur le frontend et le backend, donc il n'est pas nécessaire de redémarrer pour voir vos modifications. Une fois que vous enregistrez vos changements, la page se mettra automatiquement à jour pour les afficher.

### Déploiement
Connectez ce dépôt à Heroku, et il se déploiera automatiquement à chaque mise à jour de la branche **master**, si Heroku surveille cette branche pour le déploiement automatique.