# Git Hands-On Lab Exercises (Git HOL 1 - 5)

**CTS Digital Nurture 5.0 – Deep Skilling**  
**Author:** Rajakumaran P

---

## Overview of Exercises

| Exercise ID | Topic / Objective |
|-------------|-------------------|
| **Git-HOL 1** | Git Initialization, configuration (`user.name`, `user.email`), `git status`, `git add`, `git commit`, `git push` |
| **Git-HOL 2** | Git Ignore configuration (`.gitignore`), excluding temporary files & `node_modules` |
| **Git-HOL 3** | Branching & Merging (`git branch`, `git checkout -b`, merging feature branches into `main`) |
| **Git-HOL 4** | Conflict Resolution during merge (`git merge`, resolving merge markers `<<<<<<<`, `=======`, `>>>>>>>`) |
| **Git-HOL 5** | Clean up & Remote Sync (`git fetch`, `git pull --rebase`, pushing clean history to GitHub/GitLab) |

---

## Detailed Step-by-Step Workflow

### 1. Git-HOL 1: Setup & Configuration
```bash
# Set global/local configuration
git config user.name "Rajakumaran P"
git config user.email "raja.kumaran@cts.com"

# Initialize repository
git init

# Track and commit files
git add .
git commit -m "feat: initial commit for project"
```

### 2. Git-HOL 2: Git Ignore Setup
Create a `.gitignore` file to ignore build artifacts and environment files:
```text
node_modules/
target/
*.log
.DS_Store
.env
```

### 3. Git-HOL 3: Branching & Merging
```bash
# Create and switch to feature branch
git checkout -b feature/user-auth

# Make changes and commit
git add .
git commit -m "feat: implement login authentication"

# Switch back to main and merge
git checkout main
git merge feature/user-auth
```

### 4. Git-HOL 4: Conflict Resolution
When changes conflict between `main` and a feature branch:
```bash
# Attempt merge
git merge feature/payment-gateway

# Git reports conflict in file.txt
# Manually edit file.txt to resolve conflicts between HEAD and branch
git add file.txt
git commit -m "fix: resolve merge conflict between main and payment-gateway"
```

### 5. Git-HOL 5: Remote Push & Cleanup
```bash
# Fetch and rebase latest remote changes
git fetch origin
git rebase origin/main

# Delete merged local feature branch
git branch -d feature/user-auth

# Push updated main branch to remote
git push origin main
```
