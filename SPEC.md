# Meal Planner — Project Specification

**Version:** 1.0  
**Status:** Draft  
**Last updated:** 2026-06-15

---

## 1. Project Overview

Meal Planner je web aplikacija koja korisnicima omogućava lako planiranje obroka tokom nedelje, sa ciljem bolje organizacije ishrane i smanjenja troškova kupovine. Korisnik sastavlja nedeljni jelovnik od javnih i privatnih recepata, a aplikacija automatski generiše listu namirnica potrebnih za kupovinu.

---

## 2. User Roles

### v1 — Jedna rola

| Rola      | Opis                                                                 |
|-----------|----------------------------------------------------------------------|
| **Gost**  | Neautentifikovani korisnik. Može da pregleda i pretražuje javne recepte. Nema pristup MealPlanu, ShoppingListi ni privatnim receptima. |
| **Korisnik** | Autentifikovani korisnik. Ima pristup svim funkcionalnostima platforme. |

> **Napomena:** Sve stranice osim landing page-a, registracije, login-a i javnih recepata zahtevaju autentifikaciju.

### Out of Scope (v2)
- Premium i free tier korisnici sa različitim funkcionalnostima

---

## 3. User Stories

### Autentifikacija

| ID   | User Story |
|------|------------|
| A-01 | Kao **gost**, hoću da imam opciju da napravim nalog na platformi, da bih mogao da koristim platformu. |
| A-02 | Kao **gost**, hoću da imam opciju da se ulogujem na platformu, da bih mogao da koristim funkcionalnosti platforme. |
| A-03 | Kao **korisnik**, hoću da imam opciju da se izlogujem sa platforme, kako ne bih ostavljao svoj nalog drugima na korišćenje. |

### Recepti

| ID   | User Story |
|------|------------|
| R-01 | Kao **gost ili korisnik**, hoću da imam opciju prikaza svih javno dostupnih recepata, kako bih mogao da izaberem i pogledam recept. |
| R-02 | Kao **gost ili korisnik**, hoću da imam opciju pretrage po javnim receptima, kako bih mogao da pronađem recept koji želim da pravim. |
| R-03 | Kao **gost ili korisnik**, hoću da imam opciju pregleda pojedinačnog recepta, kako bih mogao da vidim kako da ga napravim i šta ide u njega. |
| R-04 | Kao **korisnik**, hoću da imam opciju prikaza samo mojih recepata kao i njihovu pretragu, kako bih mogao da biram između svojih recepata. |
| R-05 | Kao **korisnik**, hoću da imam opciju kreiranja recepta, kako bih posle taj recept mogao da dodajem u jelovnik i da ga ostavim drugim ljudima na korišćenje. |
| R-06 | Kao **korisnik**, hoću da imam opciju ažuriranja svojih recepata, kako bih mogao da ispravim neku grešku ukoliko sam je napravio. |
| R-07 | Kao **korisnik**, hoću da imam opciju brisanja svog recepta, kako bih mogao da sklonim recept koji više ne želim. |

### MealPlan

| ID   | User Story |
|------|------------|
| M-01 | Kao **korisnik**, hoću da imam opciju pregleda mog nedeljnog plana, kako bih znao šta sam sve izabrao i za kad. |
| M-02 | Kao **korisnik**, hoću da imam opciju dodavanja recepta u MealPlan za određeni dan i određeni obrok, da bih imao organizovanu ishranu te nedelje. |
| M-03 | Kao **korisnik**, hoću da imam opciju brisanja recepta iz MealPlana, kako bih mogao da prilagodim nedeljni plan sebi. |

### Shopping Lista

| ID   | User Story |
|------|------------|
| S-01 | Kao **korisnik**, hoću da imam opciju pregleda shopping liste koja se generiše na osnovu nedeljnog jelovnika, kako bih mogao da vidim koje namirnice treba da kupim. |
| S-02 | Kao **korisnik**, hoću da imam opciju označavanja namirnice kao kupljene, kako bih mogao da pratim šta mi je ostalo za kupovinu. |

---

## 4. Entities & Relationships

### Dijagram relacija (tekstualni)

```
User ──< Recipe
User ──  MealPlan
         MealPlan ──< MealPlanEntry >── Recipe
         MealPlan ──  ShoppingList ──< ShoppingListItem >── Ingredient
Recipe ──< Recipe_Ingredient >── Ingredient
Recipe ──< Step
```

### Entiteti

#### User
| Atribut     | Tip       | Obavezno | Napomena              |
|-------------|-----------|----------|-----------------------|
| id          | UUID      | ✓        | Primary key           |
| email       | string    | ✓        | Unique                |
| username    | string    | ✓        | Unique                |
| password    | string    | ✓        | bcrypt hash           |
| createdAt   | timestamp | ✓        | Auto-generated        |

#### Recipe
| Atribut     | Tip       | Obavezno | Napomena                        |
|-------------|-----------|----------|---------------------------------|
| id          | UUID      | ✓        | Primary key                     |
| naziv       | string    | ✓        |                                 |
| autor       | UUID      | ✓        | FK → User                       |
| isPublic    | boolean   | ✓        | true = vidljiv svima            |
| createdAt   | timestamp | ✓        | Auto-generated                  |

#### Ingredient
| Atribut | Tip    | Obavezno | Napomena    |
|---------|--------|----------|-------------|
| id      | UUID   | ✓        | Primary key |
| naziv   | string | ✓        | Unique      |

#### Recipe_Ingredient *(junction tabela)*
| Atribut      | Tip    | Obavezno | Napomena                                    |
|--------------|--------|----------|---------------------------------------------|
| id           | UUID   | ✓        | Primary key                                 |
| recipe_id    | UUID   | ✓        | FK → Recipe                                 |
| ingredient_id| UUID   | ✓        | FK → Ingredient                             |
| kolicina     | number | ✓        |                                             |
| jedinica     | enum   | ✓        | ml, l, gr, kg, komad, ...                   |
| napomena     | string | ✗        | Opciono (npr. "sitno iseckano")             |

#### Step
| Atribut   | Tip    | Obavezno | Napomena          |
|-----------|--------|----------|-------------------|
| id        | UUID   | ✓        | Primary key       |
| recipe_id | UUID   | ✓        | FK → Recipe       |
| step_num  | number | ✓        | Redosled koraka   |
| step_text | string | ✓        |                   |

#### MealPlan
| Atribut  | Tip  | Obavezno | Napomena                  |
|----------|------|----------|---------------------------|
| id       | UUID | ✓        | Primary key               |
| user_id  | UUID | ✓        | FK → User (unique, 1-to-1)|

#### MealPlanEntry
| Atribut      | Tip    | Obavezno | Napomena                                         |
|--------------|--------|----------|--------------------------------------------------|
| id           | UUID   | ✓        | Primary key                                      |
| meal_plan_id | UUID   | ✓        | FK → MealPlan                                    |
| recipe_id    | UUID   | ✓        | FK → Recipe                                      |
| dan          | enum   | ✓        | ponedeljak, utorak, sreda, četvrtak, petak, subota, nedelja |
| tip          | enum   | ✓        | doručak, ručak, večera, užina                    |

#### ShoppingList
| Atribut      | Tip  | Obavezno | Napomena                       |
|--------------|------|----------|--------------------------------|
| id           | UUID | ✓        | Primary key                    |
| meal_plan_id | UUID | ✓        | FK → MealPlan (unique, 1-to-1) |

#### ShoppingListItem
| Atribut         | Tip     | Obavezno | Napomena                                      |
|-----------------|---------|----------|-----------------------------------------------|
| id              | UUID    | ✓        | Primary key                                   |
| shopping_list_id| UUID    | ✓        | FK → ShoppingList                             |
| ingredient_id   | UUID    | ✓        | FK → Ingredient                               |
| kolicina        | number  | ✓        | Sumirano kroz sve recepte u MealPlanu         |
| jedinica        | enum    | ✓        | ml, l, gr, kg, komad, ...                     |
| kupljen         | boolean | ✓        | Default: false                                |

---

## 5. Business Rules

- Korisnik može imati samo jedan MealPlan (v1)
- MealPlan može imati samo jednu ShoppingList
- Kada se MealPlan promeni (dodavanje/brisanje entry-ja), ShoppingList se regeneriše — svi postojeći ShoppingListItem rekordovi se brišu i kreiraju novi
- Brisanje ShoppingList-a resetuje `kupljen` status za sve stavke
- Kada se recept obriše (hard delete), svi MealPlanEntry koji ga referenciraju se takođe brišu (cascade delete)
- Isti sastojak koji se pojavljuje u više recepata u MealPlanu se sumira u jedan ShoppingListItem
- Sastojci različitih mernih jedinica (npr. gr i kg) se **ne sumiraju** automatski u v1

---

## 6. Out of Scope (v1)

| Funkcionalnost | Napomena |
|----------------|----------|
| Premium / free tier | Planiran za v2 |
| MealPlan po nedeljama (istorija) | Planiran za v2 — korisnik se može vratiti na prethodne nedelje |
| Enum za merne jedinice sa konverzijom (gr → kg) | v1 koristi iste jedinice bez konverzije |
| Soft delete recepata | v1 koristi hard delete sa cascade |
| Plaćanje / payment integracija | Van scope-a |
| Mobilna aplikacija | Van scope-a |
| Socijalne funkcionalnosti (lajkovi, komentari) | Van scope-a |

---

## 7. Tech Stack

| Layer      | Tehnologija                  |
|------------|------------------------------|
| Backend    | Node.js, Express, TypeScript |
| Frontend   | React, TypeScript            |
| Database   | PostgreSQL                   |
| ORM        | TypeORM                      |
| Auth       | JWT                          |
| Deployment | Docker, VPS                  |

---

## 8. Build Order

```
1. Architecture & TypeScript setup
2. Backend (API + database)
3. Frontend
4. Testing
5. Docker
6. Deployment
```

> Docker pakuje gotovu aplikaciju — ne uči se paralelno sa izgradnjom.
