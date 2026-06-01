# E2E Test Selectors

Атрибути `data-testid` та `data-id` проставлені для трьох основних E2E-сценаріїв.
Використовуй `page.getByTestId('...')` або `page.locator('[data-testid="..."]')` в Playwright.

---

## Кошик

### Відкриття та вміст

| Елемент | `data-testid` |
|---|---|
| Кнопка відкрити кошик (хедер) | `cart-open-btn` |
| Бейдж з кількістю товарів | `cart-count-badge` |
| Drawer контейнер | `cart-drawer` |
| Список товарів у drawer | `cart-item-list` |
| Загальна сума у drawer | `cart-total` |
| Кнопка "Оформити замовлення" | `cart-checkout-btn` |

### Окремий товар у кошику (`cart-item`)

| Елемент | `data-testid` |
|---|---|
| Контейнер товару | `cart-item` |
| Назва товару | `cart-item-title` |
| Ціна товару | `cart-item-price` |
| Зменшити кількість | `cart-item-decrease` |
| Поточна кількість | `cart-item-quantity` |
| Збільшити кількість | `cart-item-increase` |
| Видалити товар | `cart-item-remove` |

---

## Картка продукту

| Елемент | `data-testid` |
|---|---|
| Картка продукту | `product-card` |
| Кнопка "В кошик" | `product-add-to-cart` |

### Модалка опцій продукту

| Елемент | `data-testid` |
|---|---|
| Контейнер модалки | `product-options-modal` |
| Загальна ціна з опціями | `product-options-total` |
| Кнопка "В кошик" в модалці | `product-options-add-to-cart` |

---

## Форма оформлення замовлення

### Поля введення

| Елемент | `data-testid` |
|---|---|
| Форма (root) | `checkout-form` |
| Поле "Ім'я" | `checkout-name-input` |
| Поле "Телефон" | `checkout-phone-input` |
| Час доставки (input) | `checkout-time-input` |
| Коментар | `checkout-comment` |

### Доставка

| Елемент | `data-testid` |
|---|---|
| Група вибору типу доставки | `checkout-delivery-type` |
| Поле "Місто" | `checkout-city-input` |
| Поле "Вулиця" | `checkout-street-input` |
| Поле "Будинок" | `checkout-house-input` |
| Група вибору часу доставки | `checkout-delivery-time` |

> Для вибору конкретного radio-варіанту в групі:
> ```ts
> await page.getByTestId('checkout-delivery-type').getByRole('radio', { name: 'Доставка' }).click()
> ```

### Кількість персон

| Елемент | `data-testid` |
|---|---|
| Зменшити кількість | `checkout-persons-decrease` |
| Поточна кількість | `checkout-persons-count` |
| Збільшити кількість | `checkout-persons-increase` |

### Підсумок та відправка

| Елемент | `data-testid` |
|---|---|
| Загальна сума (з доставкою) | `checkout-total` |
| Чекбокс згоди з політикою | `checkout-agree-policy` |
| Кнопка "Оформити" | `checkout-submit` |

### Повідомлення про помилки валідації

| Елемент | `data-testid` |
|---|---|
| Помилка поля "Ім'я" | `checkout-error-name` |
| Помилка поля "Телефон" | `checkout-error-phone` |
| Помилка поля "Місто" | `checkout-error-city` |
| Помилка поля "Вулиця" | `checkout-error-street` |
| Помилка поля "Будинок" | `checkout-error-house` |
| Помилка згоди з політикою | `checkout-error-policy` |

> Елементи помилок рендеряться лише після спроби відправки форми або blur поля.

---

## Toast-нотифікації (Sonner)

Sonner рендерить кожен toast з атрибутами `data-id` та `data-type` на DOM-елементі.

### Локатори за `data-id`

| Подія | `data-id` |
|---|---|
| Товар успішно додано в кошик | `toast-add-to-cart-success` |
| Помилка додавання товару | `toast-add-to-cart-error` |
| Помилка оновлення кількості | `toast-cart-update-error` |
| Помилка видалення товару | `toast-cart-delete-error` |
| Замовлення успішно створено | `toast-order-success` |
| Помилка створення замовлення | `toast-order-error` |

### Локатори за `data-type` (для загальних перевірок)

```ts
page.locator('[data-type="success"]') // будь-який success-toast
page.locator('[data-type="error"]')   // будь-який error-toast
```

### Приклади Playwright

```ts
// конкретний toast
await expect(page.locator('[data-id="toast-order-success"]')).toBeVisible()
await expect(page.locator('[data-id="toast-add-to-cart-error"]')).toBeVisible()

// будь-який error
await expect(page.locator('[data-type="error"]')).toBeVisible()
```

---

## Приклади сценаріїв

### Додати товар в кошик і перевірити

```ts
await page.getByTestId('product-add-to-cart').first().click()
await expect(page.locator('[data-id="toast-add-to-cart-success"]')).toBeVisible()
await page.getByTestId('cart-open-btn').click()
await expect(page.getByTestId('cart-drawer')).toBeVisible()
await expect(page.getByTestId('cart-item')).toHaveCount(1)
```

### Checkout — delivery без адреси → валідаційні помилки

```ts
await page.getByTestId('checkout-delivery-type')
  .getByRole('radio', { name: 'Доставка' }).click()
await page.getByTestId('checkout-submit').click()
await expect(page.getByTestId('checkout-error-city')).toBeVisible()
await expect(page.getByTestId('checkout-error-street')).toBeVisible()
```

### Checkout — успішне замовлення (pickup)

```ts
await page.getByTestId('checkout-delivery-type')
  .getByRole('radio', { name: 'Самовивіз' }).click()
await page.getByTestId('checkout-name-input').fill('Іван')
await page.getByTestId('checkout-phone-input').fill('+38 099 123 4567')
await page.getByTestId('checkout-agree-policy').click()
await page.getByTestId('checkout-submit').click()
await expect(page.locator('[data-id="toast-order-success"]')).toBeVisible()
```
