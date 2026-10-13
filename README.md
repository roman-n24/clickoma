# 🛒 Clickoma

> **Clickoma** — это веб-приложение интернет-магазина (Single Page Application) с возможностью просмотра товаров, регистрации, авторизации и оформления заказов.

Товары загружаются с внешнего API, заказы сохраняются в облачной базе данных Firestore, а подтверждение о покупке автоматически отправляется пользователю на электронную почту.

<details>
<summary>📸 <b>Скриншоты проекта</b> (нажми, чтобы развернуть)</summary>

| Главная страница | Авторизация |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/b9c26612-1303-41f9-ac09-4bc85c9af5f5" width="400" /> | <img src="https://github.com/user-attachments/assets/090f1c5d-dd00-408e-89c4-ad204754fecf" width="400" /> |

| Каталог | Оформление заказа |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/6b0abf27-1815-40e3-bf1f-ace0fa7a6f71" width="400" /> | <img src="https://github.com/user-attachments/assets/21ad69ce-5189-4495-861e-baf239a6ff7b" width="400" /> |

**Уведомление на почте:**
<br>
<img src="https://github.com/user-attachments/assets/13d0ac77-0a46-4bc2-8268-7be7fca0df96" width="600" />

</details>

## 🛠 Стек технологий

**Frontend:**
* HTML5 / CSS3
* JavaScript (Vanilla JS)
* **On-change** — реактивность состояния

**Backend & Services:**
* **Firebase Authentication** — регистрация и авторизация пользователей
* **Cloud Firestore** — хранение базы данных заказов и пользователей
* **EmailJS** — автоматическая отправка транзакционных писем

**Инструменты:**
* **Rollup** — сборщик модулей
* **ESLint** — линтер и анализ кода

## 🚀 Установка и запуск проекта

### 1. Клонирование репозитория и установка зависимостей
```bash
git clone [https://github.com/roman-n24/clickoma.git](https://github.com/roman-n24/clickoma.git)
cd clickoma
npm install

2. Настройка FirebaseЗарегистрируйтесь в Firebase и перейдите в консоль (Go to console).Создайте новый проект.В разделе Authentication включите способ входа по электронной почте и паролю.Создайте базу данных Firestore Database.В Firestore Database создайте две пустые коллекции: orders и users.3. Настройка EmailJSЗарегистрируйтесь в EmailJS.В разделе Email Services создайте новый сервис (Add New Service).Перейдите в раздел Email Templates и создайте новый шаблон.Выберите готовый шаблон Order Confirmation.Перейдите в данный шаблон и нажмите Edit Content (Code Editor).Вставьте следующий HTML-код:HTML<div style="font-family: system-ui, sans-serif, Arial; font-size: 14px; color: #333; padding: 14px 8px; background-color: #f5f5f5;">
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
Настройте поля шаблона:   Subject: Order Confirmed #{{order_id}}!To Email: {{email}}From Email: поставьте галочку Use Default Email Address   4. Конфигурация данных (API ключи)   Создайте файл data.json в корне проекта и добавьте в него конфигурацию для Firebase и EmailJS:   JSON{
    "firebase": {
        "apiKey": "ВАШ_API_KEY",
        "authDomain": "ВАШ_AUTH_DOMAIN",
        "projectId": "ВАШ_PROJECT_ID",
        "storageBucket": "ВАШ_STORAGE_BUCKET",
        "messagingSenderId": "ВАШ_MESSAGING_SENDER_ID",
        "appId": "ВАШ_APP_ID",
        "measurementId": "ВАШ_MEASUREMENT_ID"
    },
    "emailjs": {
        "publicKey": "ВАШ_PUBLIC_KEY",
        "serviceKey": "service_...",
        "templateKey": "template_..."
    }
}
5. ЗапускЗапустите сборку проекта:Bashnpm run build
Запустите локальный сервер:Bashnpm start
Автор: Late Q (Роман)Контакты: Telegram
