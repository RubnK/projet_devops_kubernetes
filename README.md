# HelloMicroservices – Simple Microservice App (Spring Boot + Node.js)

**Author :** [@Ruben](https://github.com/RubnK)

**HelloMicroservices** est un projet pédagogique de microservices conteneurisés.  
Il démontre comment déployer une application distribuée simple avec **Java (Spring Boot)**, **Node.js**, **Docker**, **Kubernetes** et **GitHub Actions CI**.

L’objectif : créer une architecture minimale mais fonctionnelle de type cloud-native.

## Microservices inclus

| Service         | Techno           | Port | Rôle                                           |
|------------------|------------------|------|------------------------------------------------|
| `hello-service`  | Java (Spring Boot)| 8080 | Renvoie `"Hello from Java"`                   |
| `time-service`   | Node.js          | 3001 | Renvoie l'heure actuelle                      |
| `api-gateway`    | Node.js          | 3000 | Fait appel aux deux autres services et expose `/api/hello` |

## Technologies Utilisées

- **Java 17 (Spring Boot 3)**
- **Node.js 18**
- **Docker & Docker Hub**
- **Kubernetes (via Minikube)**
- **GitHub Actions (CI/CD)**
- **YAML-free `kubectl` deployment**

## Structure du projet

```
hello_microservices/
├── hello-service/        # Microservice Spring Boot
├── time-service/         # Microservice Node.js (date/heure)
├── api-gateway/          # Microservice Node.js (agrégation)
└── .github/
    └── workflows/
        └── ci.yml        # Pipeline CI GitHub Actions
```

## Fonctionnement global

```http
GET /api/hello → api-gateway
     ↳ appelle hello-service → "Hello from Java"
     ↳ appelle time-service  → Date/heure actuelle
```

Réponse :
```json
{
  "message": "Hello from Java",
  "time": "4/20/2025, 10:12:32 AM"
}
```

---

## Déploiement Kubernetes (via Docker Hub)

### 1. Build & push des images

```bash
docker build -t rubnk/hello-service:latest ./hello-service
docker build -t rubnk/time-service:latest ./time-service
docker build -t rubnk/api-gateway:latest ./api-gateway

docker push rubnk/hello-service:latest
docker push rubnk/time-service:latest
docker push rubnk/api-gateway:latest
```

### 2. Déploiement avec `kubectl` (aucun YAML requis)

```bash
kubectl create deployment hello-service --image=rubnk/hello-service:latest
kubectl expose deployment hello-service --port=8080 --target-port=8080

kubectl create deployment time-service --image=rubnk/time-service:latest
kubectl expose deployment time-service --port=3001 --target-port=3001

kubectl create deployment api-gateway --image=rubnk/api-gateway:latest
kubectl expose deployment api-gateway --port=3000 --target-port=3000 --type=NodePort
```

### 3. Accès via Minikube

```bash
minikube service api-gateway
```

➡️ Accède à `/api/hello` dans ton navigateur.

## Intégration Continue (CI)

GitHub Actions build automatiquement :

- `hello-service` via Gradle
- `time-service` & `api-gateway` via Node.js
- Validation syntaxique (lint)
- Compilation sans erreur

Fichier : `.github/workflows/ci.yml`

## Screenshots

![image](https://github.com/user-attachments/assets/71b92b6a-c66f-479f-b37c-9bc98ec74665)

## License

This project is licensed under the [MIT License](LICENSE)
