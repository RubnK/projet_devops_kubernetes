# HelloMicroservices – Minimal Cloud-Native Microservice App

**Author :** [@Ruben](https://github.com/RubnK), [@Harold](https://github.com/Lajous-Harold)

**HelloMicroservices** est un projet pédagogique de microservices conteneurisés.  
Il démontre comment déployer une application distribuée simple avec **Java (Spring Boot)**, **Node.js**, **Docker**, **Kubernetes** et **GitHub Actions CI**.

L’objectif : créer une architecture minimale mais fonctionnelle de type cloud-native.

## Aperçu

![image](https://github.com/user-attachments/assets/71b92b6a-c66f-479f-b37c-9bc98ec74665)

## Microservices

| Service         | Tech              | Port | Description                                       |
|------------------|-------------------|------|---------------------------------------------------|
| `hello-service`  | Spring Boot (Java) | 8080 | Retourne `"Hello from Java"`                     |
| `time-service`   | Node.js            | 3001 | Retourne l’heure actuelle                        |
| `api-gateway`    | Node.js            | 3000 | Agrège les deux services et expose `/api/hello`  |

## Déploiement en local (via Docker Compose)

Pour un lancement rapide et local, le projet fournit un fichier `docker-compose.yml` qui build et exécute automatiquement les trois services.

1. Cloner le dépot :
```
git clone https://github.com/RubnK/projet_devops_kubernetes.git
cd projet_devops_kubernetes
```

2. Lancer tous les services :
```
docker-compose up --build
```

Les services suivants seront accessibles :

`http://localhost:8080/hello` → Hello Java

`http://localhost:3001/time` → Heure actuelle

`http://localhost:3000/api/hello` → Gateway qui agrège les deux



## Déploiement Kubernetes (via Docker Hub)

Les images sont **déjà disponibles sur Docker Hub**, prêtes à l’emploi :  
`rubnk/hello-service`, `rubnk/time-service`, `rubnk/api-gateway`.

### 1. Démarrer Minikube

```bash
minikube start
```

### 2. Créer les déploiements depuis Docker Hub

```bash
kubectl create deployment hello-service --image=rubnk/hello-service:latest
kubectl expose deployment hello-service --port=8080 --target-port=8080

kubectl create deployment time-service --image=rubnk/time-service:latest
kubectl expose deployment time-service --port=3001 --target-port=3001

kubectl create deployment api-gateway --image=rubnk/api-gateway:latest
kubectl expose deployment api-gateway --port=3000 --target-port=3000 --type=NodePort
```

### 3. Accéder à l’API

```bash
minikube service api-gateway
```

➡️ Puis ouvrir dans un navigateur : `http://<IP>:<PORT>/api/hello`  
Résultat attendu :

```json
{
  "message": "Hello from Java",
  "time": "2025-04-20T..."
}
```

## Intégration Continue (CI)

Le pipeline GitHub Actions :
- Compile `hello-service` avec Gradle
- Lint et build `time-service` et `api-gateway` avec Node.js
- Permet de détecter toute erreur de compilation ou de syntaxe

Fichier : `.github/workflows/ci.yml`

## License

This project is licensed under the [MIT License](LICENSE)
