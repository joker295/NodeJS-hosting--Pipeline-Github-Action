# 🚀 Node.js Application Deployment on Kubernetes via GitHub Actions

This project demonstrates a complete **CI/CD pipeline** for a Node.js application using:

* **Docker** for containerization
* **Kubernetes (Minikube)** for deployment
* **GitHub Actions** for automation
* **GitHub Container Registry (GHCR)** for image hosting

---

## 🧰 Tech Stack

| Tool           | Purpose                  |
| -------------- | ------------------------ |
| Node.js        | Application runtime      |
| Docker         | Containerization         |
| GitHub Actions | CI/CD Automation         |
| Minikube       | Local Kubernetes Cluster |
| GHCR           | Container Image Registry |
| kubectl        | Cluster management       |

---

## ⚙️ 1. Setup Instructions

### 🔑 Prerequisites

Ensure you have the following installed locally:

* [Node.js](https://nodejs.org/)
* [Docker](https://www.docker.com/)
* [Minikube](https://minikube.sigs.k8s.io/docs/start/)
* [kubectl](https://kubernetes.io/docs/tasks/tools/)
* Your GitHub personal access token (with write:packages scope)

### 🔧 Clone the Repository

```bash
git clone https://github.com/joker295/NodeJS-hosting--Pipeline-Github-Action.git
cd NodeJS-hosting--Pipeline-Github-Action
```

### 🔑 GitHub Secrets

In your repository → Settings → **Secrets and Variables → Actions**, add:

| Secret Name   | Description                                              |
| ------------- | -------------------------------------------------------- |
| GHCR_USERNAME | Your GitHub username                                     |
| GHCR_PASSWORD | Your GitHub personal access token (write:packages scope) |

---

## 🐳 2. Running Locally (without Kubernetes)

To test the app directly on your system:

### 🔹 Build Docker Image

```bash
cd Docker
docker build -t node-app:latest .
```

### 🔹 Run Container

```bash
docker run -d -p 3000:3000 node-app:latest
```

### 🔹 Test the Application

Open your browser or run:

```bash
curl http://localhost:3000
```
### 🔹 GHRC Image 


```bash
docker pull ghcr.io/joker295/node-app:latest
```



---

## ☸️ 3. Deploying on Minikube

### 🔹 Apply Kubernetes Manifests

```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

### 🔹 Verify Deployment

```bash
kubectl get pods
kubectl get svc
```

### 🔹 Access Application

Get the service URL:

```bash
minikube service node-svc --url
```

Example output:

```bash
http://192.168.49.2:32000
```

Then open the URL in your browser or test via curl:

```bash
curl http://192.168.49.2:32000
```

---

## 🤖 4. Automated Deployment with GitHub Actions

### 📂 CI/CD Pipeline Overview

The workflow file: `.github/workflows/deploy.yml`

Pipeline Stages:

1. Checkout repository
2. Build and push Docker image to GHCR
3. Setup Minikube cluster
4. Deploy Kubernetes manifests
5. Wait for pods to be ready
6. Test app accessibility

---

## 🌍 Accessing the Deployed App

Since the workflow runs inside **GitHub Actions runners**:

* You cannot access the Minikube app externally from your local machine.
* The pipeline ensures app availability using:

```bash
kubectl port-forward svc/node-svc 9090:3000 &
curl http://localhost:9090
```

* For local testing, use:

```bash
minikube service node-svc --url
```

---

## 🧾 Folder Structure

```bash
.
├── Docker/
│   ├── Dockerfile
│   └── app.js
├── k8s/
│   ├── deployment.yaml
│   └── service.yaml
├── .github/
│   └── workflows/
│       └── main.yml
└── README.md
```

---

## 💡 5. Common Issues

| Issue                               | Cause                                | Solution                                       |
| ----------------------------------- | ------------------------------------ | ---------------------------------------------- |
| ❌ ImagePullBackOff                  | GHCR image is private or auth failed | Ensure GHCR PAT and login are correct          |
| ⚠️ port-forward failed              | Wrong port mapping                   | Match container port with service `targetPort` |
| ⏳ Pods stuck in `ContainerCreating` | Slow image pull                      | Wait or increase workflow timeout              |

---

## 👨‍💻 Author

**Abhishek Lalotra**

---

If you want, I can also **update your GitHub Actions workflow** to be fully **optimistic and robust**, automatically handling pod labels and ensuring port-forward works without failures in GitHub runners.

