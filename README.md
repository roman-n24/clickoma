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
