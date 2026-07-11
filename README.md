# DeskLife

DeskLife is a calm health and wellbeing app designed around the reality of the working day. It helps office workers, freelancers, and other desk-based professionals build healthier routines through small, manageable actions focused on food, movement, and daily habits.

[View the live project](https://desklife.vercel.app)

## Как е изграден проектът

```text
Потребителят отваря сайта
          ↓
       Next.js
  зарежда правилната страница
          ↓
       React
  изгражда интерфейса от компоненти
          ↓
 ┌────────┼─────────┐
 ↓        ↓         ↓
HTML     CSS    JavaScript
структура стилове  поведение
          ↓
      Браузърът
показва и управлява сайта
```

## HTML, CSS и JavaScript

### HTML — структурата

HTML определя какви елементи съществуват на страницата: header, навигация, заглавия, текстове, бутони, изображения, карти, секции и footer.

В DeskLife HTML рядко се пише като отделен `.html` файл. React компонентите използват JSX, който прилича на HTML:

```tsx
export function SiteHeader() {
  return (
    <header>
      <h1>DeskLife</h1>
    </header>
  );
}
```

Може да се мисли за HTML като за скелета на сайта.

### CSS — визуалният вид

CSS определя как изглеждат елементите:

```css
button {
  padding: 12px 20px;
  border-radius: 999px;
  background: blue;
  color: white;
}
```

CSS управлява цветовете, шрифтовете, размерите, разстоянията, подредбата, responsive поведението, hover състоянията, анимациите и преходите.

Може да се мисли за CSS като за дизайна и облеклото на сайта.

### JavaScript — логиката и поведението

JavaScript определя какво се случва, когато потребителят взаимодейства със сайта.

В DeskLife JavaScript управлява например:

- избиране на ден от седмичната статистика;
- промяна на показаните данни;
- отбелязване на дневните задачи;
- записване и зареждане на информация от local storage;
- бутона за връщане в началото;
- интерактивните състояния на интерфейса.

Може да се мисли за JavaScript като за нервната система и поведението на сайта.

```text
HTML       Какво има на страницата?
CSS        Как изглежда?
JavaScript Как работи и реагира?
```

## Как работи local storage

`localStorage` е малко пространство за съхранение на данни в браузъра на потребителя.

```text
DeskLife записва информация
          ↓
Браузърът я пази локално
          ↓
Страницата се презарежда
          ↓
DeskLife прочита информацията отново
```

Пример:

```js
localStorage.setItem("selected-day", "Сряда");
const savedDay = localStorage.getItem("selected-day");
localStorage.removeItem("selected-day");
```

Данните в `localStorage`:

- остават след refresh и след затваряне на браузъра;
- са свързани с конкретния сайт и браузър;
- не се синхронизират автоматично между устройства или браузъри;
- не се изпращат автоматично към сървър;
- се пазят като текст;
- не трябва да съдържат пароли или чувствителна информация.

DeskLife използва local storage за завършените дневни задачи, избрания ден в седмичната статистика и създадения личен план.

## React.js

React е библиотеката, чрез която интерфейсът се изгражда от компоненти.

```text
Страница
 ├── SiteHeader
 ├── Hero
 ├── DailyPlan
 ├── WeeklyStats
 └── SiteFooter
```

Всеки компонент има собствена отговорност и може да бъде използван повторно.

```tsx
function Footer() {
  return <footer>©2026 DeskLife</footer>;
}
```

React помага за:

- разделяне на интерфейса на малки части;
- повторно използване на елементи;
- управление на интерактивни стойности;
- автоматично обновяване на интерфейса;
- организиране на JavaScript логиката.

### React state

`state` е информация, която може да се промени, докато потребителят използва страницата.

```tsx
const [activeDay, setActiveDay] = useState("Петък");
setActiveDay("Събота");
```

Когато състоянието се промени, React обновява необходимата част от интерфейса.

## Next.js

Next.js е framework, изграден върху React.

```text
React   изгражда компонентите и интеракциите
Next.js организира целия уебсайт около тях
```

Next.js добавя:

- страници и маршрути;
- общ layout;
- оптимизация на изображения;
- metadata;
- server-side rendering;
- production build;
- оптимизации за публикуване;
- добра интеграция с Vercel.

Примерна структура:

```text
app/
├── layout.tsx
├── page.tsx
├── habits/
│   └── page.tsx
├── login/
│   └── page.tsx
└── components/
    ├── SiteHeader.tsx
    ├── WeeklyStats.tsx
    └── SiteFooter.tsx
```

### `page.tsx`

Всеки `page.tsx` представлява конкретна страница:

```text
app/page.tsx         → /
app/login/page.tsx   → /login
app/habits/page.tsx  → /habits
```

### `layout.tsx`

`layout.tsx` съдържа елементи, които трябва да присъстват на всички страници. В DeskLife общите header и footer са в основния layout:

```tsx
<body>
  <SiteHeader />
  {children}
  <SiteFooter />
</body>
```

`children` представлява текущата страница.

## React и Next.js заедно

```text
Next.js
управлява сайта, страниците и build процеса
        ↓
React
управлява компонентите и интерактивния интерфейс
        ↓
JSX
описва структурата на компонентите
        ↓
HTML + CSS + JavaScript
се изпълняват в браузъра
```

## GitHub

GitHub съхранява кода на проекта в онлайн repository и пази историята на промените чрез Git.

```text
Промяна в проекта
       ↓
Git commit
       ↓
Git push
       ↓
GitHub repository
```

GitHub пази:

- файловете на проекта;
- историята на промените;
- commit-ите;
- различните версии на кода;
- информация кой и кога е направил промяна.

GitHub не е самият публичен сайт. Той е мястото, където живее кодът.

## Vercel

Vercel взима кода от GitHub, изгражда Next.js проекта и го публикува онлайн.

```text
Промяна в проекта
       ↓
Commit и push към GitHub
       ↓
Vercel открива промяната
       ↓
Изгражда Next.js проекта
       ↓
Публикува новата версия
       ↓
Обновеният сайт е онлайн
```

Vercel:

1. изтегля кода от GitHub;
2. инсталира необходимите packages;
3. проверява проекта;
4. изпълнява production build;
5. публикува файловете;
6. свързва ги с URL адреса.

## Пълна схема на DeskLife

```text
Дизайн и съдържание
        ↓
React компоненти
        ↓
HTML / JSX структура
CSS визуални стилове
JavaScript интеракции
        ↓
Next.js организира страниците,
layout-а и production build-а
        ↓
Git записва историята на промените
        ↓
GitHub пази проекта онлайн
        ↓
Vercel изгражда и публикува сайта
        ↓
Потребителят отваря DeskLife
        ↓
Браузърът показва страницата
и използва localStorage за
локално запазени данни
```

## Роля на всяка технология

| Технология | Роля |
|---|---|
| HTML / JSX | Създава структурата на интерфейса |
| CSS | Определя как изглежда интерфейсът |
| JavaScript | Добавя логика и интерактивност |
| localStorage | Пази малки количества информация в браузъра |
| React | Изгражда интерфейса от компоненти и управлява състоянието |
| Next.js | Организира страниците, layout-а, build-а и приложението |
| Git | Записва историята на промените |
| GitHub | Съхранява кода и Git историята онлайн |
| Vercel | Изгражда и публикува проекта в интернет |
