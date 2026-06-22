# Meal Planner — API Design

> v1 draft. All endpoints, request bodies, response shapes, and error codes defined.

---

## Base URL

```
/api/v1
```

All endpoints except `GET /recipes` and `GET /ingredients` require:
```
Authorization: Bearer <token>
```

---

## Error Handling

Every request to the API can result in an error. Errors are **never** returned on HTTP status codes between 200 and 299.

Every error response contains at minimum:

```ts
type APIErrorCommon = {
  code: ErrorCode;
};
```

Some errors also contain additional data in an `extra` field:

```ts
type APIError =
  | APIErrorCommon
  | (APIErrorCommon & { extra: ZodIssue[] }); // validation errors
```

Validation errors (triggered by `INVALID_DATA`) include a `ZodIssue[]` array in `extra` — one entry per failed field. This allows the frontend to map errors directly to form fields.

### Error Codes

| Code | HTTP Status | Meaning |
|------|-------------|---------|
| `INVALID_DATA` | 400 | Request body failed validation — `extra` contains `ZodIssue[]` |
| `NOT_AUTHENTICATED` | 401 | Missing or invalid JWT |
| `NOT_YOURS` | 403 | Resource belongs to another user |
| `NO_SUCH_ENTITY` | 404 | Resource not found |
| `INCORRECT_CREDENTIALS` | 401 | Wrong username or password |
| `DUPLICATE_USERNAME` | 409 | Username already taken |
| `DUPLICATE_EMAIL` | 409 | Email already registered |
| `INTERNAL_ERROR` | 500 | Server error |

---

## Types

```ts
type BaseIngredientDto = { name: string }
type IngredientDto = BaseIngredientDto & { ingredient_id: string }

type RecipeIngredient = {
  ingredient: { ingredient_id: string, name: string }
  quantity: number
  unit: enum
  note?: string
}
type RecipeIngredientDto = RecipeIngredient & { recipe_ingredient_id: string }

type Step = { step_num: number, step_text: string }
type StepDto = Step & { step_id: string, recipe_id: string }

type BaseRecipeDto = {
  name: string
  isPublic: boolean
  ingredients: RecipeIngredient[]
  steps: Step[]
}
type RecipeDto = BaseRecipeDto & {
  recipe_id: string
  creator: { user_id: string, username: string }
  createdAt: Date | string
}

type BaseMealPlanEntryDto = {
  recipe: { recipe_id: string, name: string }
  day: enum
  type: enum
}
type MealPlanEntryDto = BaseMealPlanEntryDto & { meal_plan_entry_id: string }

type BaseShoppingListItemDto = {
  ingredient: { ingredient_id: string, name: string }
  quantity: number
  unit: enum
  bought: boolean
}
type ShoppingListItemDto = BaseShoppingListItemDto & { shopping_list_item_id: string }
```

---

## Auth

### `POST /auth/register`
```
body:     { username: string, email: string, password: string }
response: { token: string }
errors:   INVALID_DATA, DUPLICATE_USERNAME, DUPLICATE_EMAIL
```

### `POST /auth/login`
```
body:     { username: string, password: string }
response: { token: string }
errors:   INVALID_DATA, INCORRECT_CREDENTIALS
```

---

## Recipes

Public read. Write requires auth.

### `GET /recipes`
```
response: { recipes: RecipeDto[], total: number }
```

### `GET /recipes/:id`
```
response: { recipe: RecipeDto }
errors:   NO_SUCH_ENTITY
```

### `POST /recipes`
```
body:     BaseRecipeDto
response: { recipe_id: string }
errors:   INVALID_DATA, NOT_AUTHENTICATED
```

### `PATCH /recipes/:id`
```
body:     Partial<BaseRecipeDto>
response: { recipe_id: string }
errors:   INVALID_DATA, NOT_AUTHENTICATED, NOT_YOURS, NO_SUCH_ENTITY
```

### `DELETE /recipes/:id`
```
errors:   NOT_AUTHENTICATED, NOT_YOURS, NO_SUCH_ENTITY
```

---

## Ingredients

Any authenticated user can manage ingredients. Admin scope planned for v2.

### `GET /ingredients`
```
response: { ingredients: IngredientDto[], total: number }
```

### `GET /ingredients/:id`
```
response: { ingredient: IngredientDto }
errors:   NO_SUCH_ENTITY
```

### `POST /ingredients`
```
body:     BaseIngredientDto
response: { ingredient_id: string }
errors:   INVALID_DATA, NOT_AUTHENTICATED
```

### `PATCH /ingredients/:id`
```
body:     Partial<BaseIngredientDto>
response: { ingredient_id: string }
errors:   INVALID_DATA, NOT_AUTHENTICATED, NO_SUCH_ENTITY
```

### `DELETE /ingredients/:id`
```
errors:   NOT_AUTHENTICATED, NO_SUCH_ENTITY
```

---

## Meal Plan

One meal plan per user, created automatically on registration.

### `GET /meal-plans/me`
```
response: { entries: MealPlanEntryDto[] }
```

### `GET /meal-plans/me/meal-plan-entries/:id`
```
response: { entry: MealPlanEntryDto }
errors:   NOT_AUTHENTICATED, NOT_YOURS, NO_SUCH_ENTITY
```

### `POST /meal-plans/me/meal-plan-entries`
```
body:     BaseMealPlanEntryDto
response: { meal_plan_entry_id: string }
errors:   INVALID_DATA, NOT_AUTHENTICATED
```

### `PATCH /meal-plans/me/meal-plan-entries/:id`
```
body:     Partial<BaseMealPlanEntryDto>
response: { meal_plan_entry_id: string }
errors:   INVALID_DATA, NOT_AUTHENTICATED, NOT_YOURS, NO_SUCH_ENTITY
```

### `DELETE /meal-plans/me/meal-plan-entries/:id`
```
errors:   NOT_AUTHENTICATED, NOT_YOURS, NO_SUCH_ENTITY
```

---

## Shopping List

One shopping list per user, created automatically on registration.

### `GET /shopping-lists/me`
```
response: { items: ShoppingListItemDto[] }
```

### `GET /shopping-lists/me/shopping-list-items/:id`
```
response: { item: ShoppingListItemDto }
errors:   NOT_AUTHENTICATED, NOT_YOURS, NO_SUCH_ENTITY
```

### `POST /shopping-lists/me/shopping-list-items`
```
body:     BaseShoppingListItemDto
response: { shopping_list_item_id: string }
errors:   INVALID_DATA, NOT_AUTHENTICATED
```

### `PATCH /shopping-lists/me/shopping-list-items/:id`
```
body:     Partial<BaseShoppingListItemDto>
response: { shopping_list_item_id: string }
errors:   INVALID_DATA, NOT_AUTHENTICATED, NOT_YOURS, NO_SUCH_ENTITY
```

### `POST /shopping-lists/me/shopping-list-items/:id/buy`
```
response: { shopping_list_item_id: string }
errors:   NOT_AUTHENTICATED, NOT_YOURS, NO_SUCH_ENTITY
```

### `DELETE /shopping-lists/me/shopping-list-items/:id`
```
errors:   NOT_AUTHENTICATED, NOT_YOURS, NO_SUCH_ENTITY
```

---

## Design Decisions

- `/me` pattern eliminates `:userId` from URLs — identity resolved from JWT. Eliminates IDOR risk by design.
- `Step` and `Recipe_Ingredient` have no standalone endpoints in v1 — managed through recipe body on create/update.
- `MealPlan` and `ShoppingList` created automatically on registration — no POST endpoint needed.
- `POST /shopping-list-items/:id/buy` is an explicit state transition endpoint rather than a generic PATCH — clearer intent, easier to extend (e.g. logging, notifications) in v2.
- Ingredient management open to all authenticated users in v1. Admin-scoped in v2.
- User management endpoints out of scope for v1 (no admin role).

---

## To Do (v2 / future)

- [ ] Admin role + ingredient ownership
- [ ] `GET /recipes?search=` query param for filtering
- [ ] Pagination params (`limit`, `offset`) on list endpoints
- [ ] `meal_plan_id` in meal plan response if metadata needed
- [ ] Refresh token endpoint
