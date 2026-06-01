# data-testid Reference

## Cart Button (header)

| testid | Element | Description |
|--------|---------|-------------|
| `cart-open-btn` | `<button>` | Opens the cart drawer |
| `cart-count-badge` | `<span>` | Shows item count (displays "99+" if over 99) |

## Cart Drawer

| testid | Element | Description |
|--------|---------|-------------|
| `cart-drawer` | `<div>` | Drawer container (visible when open) |
| `cart-item-list` | `<div>` | Wraps all cart items |
| `cart-total` | `<div>` | Total price including delivery |
| `cart-checkout-btn` | `<button>` | Navigates to /checkout |

## Cart Item

| testid | Element | Description |
|--------|---------|-------------|
| `cart-item` | `<div>` | Single item row |
| `cart-item-title` | `<p>` | Product name |
| `cart-item-price` | `<div>` | Price display |
| `cart-item-quantity` | `<input readonly>` | Current quantity — use `toHaveValue()` not `toHaveText()` |
| `cart-item-increase` | `<button>` | Increment quantity |
| `cart-item-decrease` | `<button>` | Decrement quantity |
| `cart-item-remove` | `<button>` | Remove item from cart |

## Product Card

| testid | Element | Description |
|--------|---------|-------------|
| `product-card` | `<div>` | Card container |
| `product-add-to-cart` | `<button>` | Add to cart (simple products) |

## Product Options Modal

| testid | Element | Description |
|--------|---------|-------------|
| `product-options-modal` | `<div>` | Modal container |
| `product-options-total` | `<div>` | Total price in modal |
| `product-options-add-to-cart` | `<button>` | Confirm add to cart |

## Success Page

| testid | Element | Description |
|--------|---------|-------------|
| `success-page` | `<div>` | Page container |
| `success-heading` | `<h2>` | Success message heading |
| `success-order-id` | `<span>` | Order ID from the URL param |

## Checkout Form

| testid | Element | Description |
|--------|---------|-------------|
| `checkout-form` | `<form>` | Form container |
| `checkout-name-input` | `<input>` | Name field |
| `checkout-phone-input` | `<input>` | Phone field (masked) |
| `checkout-delivery-type` | `<div>` | Delivery type selector |
| `checkout-city-input` | `<input>` | City field |
| `checkout-street-input` | `<input>` | Street field |
| `checkout-house-input` | `<input>` | House field |
| `checkout-delivery-time` | `<div>` | Delivery time selector |
| `checkout-time-input` | `<input>` | Specific time picker |
| `checkout-comment` | `<textarea>` | Order comment |
| `checkout-persons-count` | `<span>` | Number of persons |
| `checkout-persons-increase` | `<button>` | Increase persons |
| `checkout-persons-decrease` | `<button>` | Decrease persons |
| `checkout-agree-policy` | `<input>` | Policy checkbox |
| `checkout-total` | `<div>` | Total price display |
| `checkout-submit` | `<button>` | Submit order |
| `checkout-error-name` | `<p>` | Validation error for name |
| `checkout-error-phone` | `<p>` | Validation error for phone |
| `checkout-error-city` | `<p>` | Validation error for city |
| `checkout-error-street` | `<p>` | Validation error for street |
| `checkout-error-house` | `<p>` | Validation error for house |
| `checkout-error-policy` | `<p>` | Validation error for policy |
