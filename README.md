# Argo GitOps NestJS

![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white) ![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?logo=kubernetes&logoColor=white) ![Argo CD](https://img.shields.io/badge/Argo_CD-EF7B4D?logo=argo&logoColor=white) ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?logo=githubactions&logoColor=white)

> End-to-end GitOps pipeline using Argo CD to deploy a containerized NestJS application on Kubernetes with automated CI/CD, self-healing, and version tracking.

---

## 📖 Overview

This project demonstrates a complete GitOps workflow:

1. Code pushed to GitHub
2. GitHub Actions builds Docker image
3. Image pushed to Docker Hub
4. Kubernetes manifests updated automatically
5. Argo CD detects changes and syncs the cluster
6. Application updates automatically

The running application displays the **deployed commit version**.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Application | NestJS |
| Containerization | Docker |
| Cluster | Kubernetes (Minikube) |
| GitOps | Argo CD |
| CI/CD | GitHub Actions |
| Config | ConfigMap & Secret |
| Scaling | Horizontal Pod Autoscaler (HPA) |

---

## 📁 Project Structure

```
argo-gitops-nestjs/
│
├── app/            # NestJS application + Dockerfile
├── k8s/            # Kubernetes manifests
├── argocd/         # Argo CD Application definition
├── .github/        # GitHub Actions workflow
└── README.md
```

---

## 🔄 GitOps Workflow

```
Developer Push → GitHub Actions → Docker Hub
                      ↓
                Update k8s manifests
                      ↓
                   Argo CD
                      ↓
                  Kubernetes
```

---

## ✨ Features

- ✅ Automated image build and push
- ✅ Automatic manifest update
- ✅ Argo CD auto-sync
- ✅ Self-healing & pruning enabled
- ✅ Runtime version visibility

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

Open **https://localhost:8080** in your browser.

| Field | Value |
|---|---|
| Username | `admin` |
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
4. Updates `k8s/deployment.yaml` with the new image tag
5. Commits the manifest changes back to the repo
6. Argo CD detects the diff and syncs the cluster

---

## ☸️ Kubernetes Features

- **Deployment** with resource limits
- **ConfigMap** and **Secret** integration
- **NodePort** Service
- **Horizontal Pod Autoscaler (HPA)**
- **Environment-based** version injection

---

## 💡 Why This Project?

This project demonstrates real-world DevOps practices including:

- Real GitOps workflow
- CI/CD automation
- Kubernetes production patterns
- Deployment traceability
- Infrastructure as Code
- DevOps best practices

---

## 📈 Future Improvements

- [ ] Kustomize overlays (dev / staging / prod)
- [ ] Ingress with custom domain
- [ ] Helm chart packaging
- [ ] Monitoring with Prometheus + Grafana
- [ ] Image automation without manual manifest edits

---

## 👤 Author

**GitHub:** [@hannu1992](https://github.com/hannu1992)
