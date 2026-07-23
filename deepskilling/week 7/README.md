# Week 7 – Deep Skilling (Additional & Advanced Hands-On)

**CTS Program Date:** 22-Jul-2026  
**Topics:** Advanced Spring Data JPA & ORM, Advanced React HOLs (Context Theme, Form Validation, REST Fetch), Git Workflows (HOL 1-5), Angular Component Hands-on

---

## Folder Structure

```
week-07/
├── README.md
├── spring-data-jpa-advanced/   → Query Methods, HQL, Native Query, ORM Relationships (@ManyToOne, @OneToMany, @ManyToMany)
├── react-advanced-hol/
│   ├── hol-14-context-theme    → Employee Management Theme Switcher (Context API)
│   ├── hol-15-16-form-validation → Controlled Employee Registration Form with validation
│   └── hol-17-fetch-user       → Async Getuser Component fetching random user details
├── git-hands-on/               → Git HOL 1-5 (Setup, .gitignore, Branching/Merging, Conflict Resolution, Remote Push)
└── angular-hands-on/           → Angular Component Hands-on (Data binding, Directives *ngFor, Directives styling)
```

---

## Summary of Hands-On Completed

| Module | Skill / Topic | Details & Exercises Completed | Status |
|--------|---------------|-------------------------------|--------|
| **Spring Data JPA** | Advanced JPA & ORM | Query Methods (Containing, StartingWith, Top queries), HQL `@Query`, Native Queries, ORM Entities (`Employee`, `Department`, `Skill`) | Complete |
| **React HOL 14** | Context API | Theme Provider and Consumer for nested EmployeeCard components | Complete |
| **React HOL 15 & 16** | Controlled Forms | Form input state management and real-time field validation | Complete |
| **React HOL 17** | API Integration | `Getuser` class component calling REST API in `componentDidMount` | Complete |
| **Git HOL 1 – 5** | Version Control | Config, `.gitignore`, Branch creation/merge, Conflict resolution, Remote push | Complete |
| **Angular** | Angular Components | Data binding, directives (`*ngFor`, property binding), filtering logic | Complete |

---

## How to Run

### 1. Advanced Spring Data JPA Project
```bash
cd spring-data-jpa-advanced
mvn spring-boot:run
```

### 2. React Advanced HOL Projects
```bash
cd react-advanced-hol/hol-14-context-theme && npm start
cd react-advanced-hol/hol-15-16-form-validation && npm start
cd react-advanced-hol/hol-17-fetch-user && npm start
```

### 3. Angular Hands-on Project
```bash
cd angular-hands-on
npm install && npm start
```
