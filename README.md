# Clickoma
Интернет-магазин с авторизацией, заказами и отправкой писем.

Веб-приложение интернет-магазина с возможностью просмотра товаров, регистрации, авторизации и оформления заказов. Товары загружаются с внешнего API, заказы сохраняются в Firestore, а подтверждение отправляется по электронной почте.

![Снимок экрана 2025-06-30 004829](https://github.com/user-attachments/assets/b9c26612-1303-41f9-ac09-4bc85c9af5f5)

## Стек:
### Frontend:
- HTML5
- CSS3
- JavaScript

### Backend:
- Firebase Authentication
- Firestore (Cloud Firestore)

## Технологии и библиотеки:
- On-change (реактивность состояния)
- EmailJS (отправка писем)
- Rollup (сборка)
- ESLint (анализ кода)

## Установка и запуск проекта
### Клонировать репозиторий
git clone https://github.com/roman-n24/clickoma.git

### Firebase
- Зарегистрироватся в [firebase](https://firebase.google.com/)
- Перейти в "Go to console"
- Создать проект
- Добавить авторизацию и выбрать способ входа при помощи почты и пароля
- Создать Firestore Database
- В Firestore Database создать две коллекции: orders, users

### EmailJS
- Зарегистрироваться в [EmailJS](https://www.emailjs.com/)
- В разделе Email Services создать новый сервис (Add New Service)
- Перейти в раздел Email Templates и создать новый шаблон
- Выбрать готовый шаблон _Order Confirmation_
- Перейдите в данный шаблон и нажмите Edit Content (Code Editor)
- Вставьте данный данный шаблон:
```html
<div style="font-family: system-ui, sans-serif, Arial; font-size: 14px; color: #333; padding: 14px 8px; background-color: #f5f5f5;">
<div style="max-width: 600px; margin: auto; background-color: #fff;">
<div style="border-top: 6px solid #458500; padding: 16px;"><strong>Thank You for Your Order</strong> </span></div>
<div style="padding: 0 16px;">
<p>We'll send you tracking information when the order ships.</p>
<div style="text-align: left; font-size: 14px; padding-bottom: 4px; border-bottom: 2px solid #333;"><strong>Order # {{order_id}}</strong></div>
{{#orders}}
{{{orders_table}}}
{{/orders}}
<div style="padding: 24px 0;">
<div style="border-top: 2px solid #333;">&nbsp;</div>
</div>
<table style="border-collapse: collapse; width: 100%; text-align: right;">
<tbody>
<tr>
<td style="width: 60%;">&nbsp;</td>
<td>Shipping</td>
<td style="padding: 8px; white-space: nowrap;">${{cost.shipping}}</td>
</tr>
<tr>
<td style="width: 60%;">&nbsp;</td>
<td>Taxes</td>
<td style="padding: 8px; white-space: nowrap;">${{cost.tax}}</td>
</tr>
<tr>
<td style="width: 60%;">&nbsp;</td>
<td style="border-top: 2px solid #333;"><strong style="white-space: nowrap;">Order Total</strong></td>
<td style="padding: 16px 8px; border-top: 2px solid #333; white-space: nowrap;"><strong>${{cost.total}}</strong></td>
</tr>
</tbody>
</table>
</div>
</div>
<div style="max-width: 600px; margin: auto;">
<p style="color: #999;">The email was sent to {{email}}<br>You received this email because you placed the order</p>
</div>
</div>
```
- В поле Subject: Order Confirmed #{{order_id}}!
- В поле To Email: {{email}}
- В поле From Email: ставим галочку _Use Default Email Address_

### Data
- Создайте новый файл в корне проекта: data.json
- В данном файле создать два свойства: firebase, emailjs
Пример:
```json
{
    "firebase": {
        "apiKey": "",
        "authDomain": "",
        "projectId": "",
        "storageBucket": "",
        "messagingSenderId": "",
        "appId": "",
        "measurementId": ""
    },
    "emailjs": {
        "publicKey": "",
        "serviceKey": "service_",
        "templateKey": "template_"
    }
}
```

### Установить зависимости
npm install

### Запустить сборку
npm run build

### Запустить локальный сервер
npm start

---
Автор: Late Q  
Контакты: https://t.me/roman_n24
---

