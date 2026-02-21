# Argo GitOps NestJS

![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?logo=kubernetes&logoColor=white)
![Argo CD](https://img.shields.io/badge/Argo_CD-EF7B4D?logo=argo&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?logo=githubactions&logoColor=white)

> End-to-end GitOps pipeline using Argo CD to deploy a containerized NestJS application on Kubernetes with automated CI/CD, self-healing, and version tracking.

---

## 🏗️ Architecture

```
Developer
   │
   ▼
GitHub Repository
   │
   ▼
GitHub Actions (CI)
- Build Docker image
- Push to Docker Hub
- Update k8s/base deployment
   │
   ▼
Argo CD (GitOps)
- Watches Git repository
- Applies Kustomize overlay
- Self-healing & pruning enabled
   │
   ▼
Kubernetes (Minikube)
- Deployment
- Service
- Ingress
- HPA
- ConfigMap / SealedSecret
```

---

## 📖 Overview

This project demonstrates a complete GitOps workflow:

1. Code pushed to GitHub
2. GitHub Actions builds Docker image
3. Image pushed to Docker Hub
4. Kubernetes manifests updated automatically (`k8s/base`)
5. Argo CD detects changes and syncs the cluster
6. Application updates automatically

The running application displays the **deployed commit version**.

---

## 🛠️ Tech Stack

| Layer                    | Technology                      |
| ------------------------ | ------------------------------- |
| Application              | NestJS                          |
| Containerization         | Docker                          |
| Cluster                  | Kubernetes (Minikube)           |
| GitOps                   | Argo CD                         |
| CI/CD                    | GitHub Actions                  |
| Configuration            | ConfigMap & SealedSecret        |
| Scaling                  | Horizontal Pod Autoscaler (HPA) |
| Configuration Management | Kustomize                       |

---

## 📁 Project Structure

```
argo-gitops-nestjs/
│
├── app/                 # NestJS application + Dockerfile
├── k8s/
│   ├── base/            # Base Kubernetes resources
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   ├── configmap.yaml
│   │   ├── ingress.yaml
│   │   ├── hpa.yaml
│   │   ├── sealedsecret.yaml
│   │   └── kustomization.yaml
│   │
│   └── overlays/
│       └── dev/         # Environment-specific configuration
│           └── kustomization.yaml
│
├── argocd/              # Argo CD Application definition
├── .github/             # GitHub Actions workflow
└── README.md
```

---

## 🔄 GitOps Workflow

```
Developer Push → GitHub Actions → Docker Hub
                      ↓
          Update k8s/base deployment
                      ↓
                 Argo CD
            (Kustomize overlay)
                      ↓
                  Kubernetes
```

---

## ✨ Features

- ✅ Automated Docker image build and push
- ✅ Automatic manifest update (GitOps)
- ✅ Argo CD auto-sync with self-healing & pruning
- ✅ Kustomize base + overlay structure
- ✅ Runtime version visibility
- ✅ Sealed Secrets for secure configuration
- ✅ Horizontal Pod Autoscaler (HPA)
- ✅ Ingress support

---

## 🚀 Running Locally (Minikube)

### 1. Start Minikube

```bash
minikube start
```

### 2. Install Argo CD

```bash
kubectl create namespace argocd

kubectl apply -n argocd \
  -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

Wait until all pods are running:

```bash
kubectl get pods -n argocd
```

### 3. Access Argo CD UI

```bash
kubectl port-forward svc/argocd-server -n argocd 8080:443
```

Open **https://localhost:8080**

| Field    | Value                 |
| -------- | --------------------- |
| Username | `admin`               |
| Password | Run the command below |

```bash
kubectl -n argocd get secret argocd-initial-admin-secret \
  -o jsonpath="{.data.password}" | base64 -d
```

### 4. Deploy Application

```bash
kubectl apply -n argocd -f argocd/application.yaml
```

### 5. Access the App

```bash
minikube service nest-gitops-svc
```

**Example response:**

```
NestJS GitOps deployment successful! Version: <commit>
```

---

## ⚙️ CI/CD Pipeline

On every push to `main`, the pipeline automatically:

1. Builds a Docker image
2. Tags it with the commit SHA
3. Pushes it to Docker Hub
4. Updates `k8s/base/deployment.yaml`
5. Commits the manifest changes back to the repository
6. Argo CD detects the change and syncs the cluster

---

## ☸️ Kubernetes Features

- **Deployment** with resource limits
- **ConfigMap** configuration
- **SealedSecret** for encrypted secrets
- **NodePort** Service
- **Ingress** for external access
- **Horizontal Pod Autoscaler (HPA)**
- **Kustomize** environment overlays
- **Environment-based** version injection

---

## 💡 Why This Project?

This project demonstrates real-world DevOps practices:

- GitOps workflow with Argo CD
- CI/CD automation
- Kubernetes production patterns
- Environment management with Kustomize
- Secure secret management
- Deployment traceability
- Infrastructure as Code

---

## 📈 Future Improvements

- [ ] Production environment overlay
- [ ] Helm chart packaging
- [ ] Monitoring with Prometheus + Grafana
- [ ] Argo CD Image Updater (true GitOps image automation)
- [ ] Observability (logs & metrics)

---

## 👤 Author

**GitHub:** [@hannu1992](https://github.com/hannu1992)
