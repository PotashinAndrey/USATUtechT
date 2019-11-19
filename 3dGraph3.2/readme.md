## анализ и проверка сообщения на соответствие эталону

```shell
# pg_dump -U postgres --clean --if-exists entities > data/initdb/db.sql
psql -U postgres -d entities -f data/initdb/db.sql

cd ./source
npm install
npm start
```

# TL;DR
> `POST /api/etalon.yandex` - отправить файл от яндекса;\
запрос:
```jsonc
{
  "data": {..."результат анализа от яндекса"},
  "target": "uuid" ,
  "task": "string?"
}
```

> в ответе смотреть на раздел `summary`:
 ```jsonc
 {
   "summary": [
     {
       "rating": "number", // оценка [0, 1]
       "name":   "string"  // название раздела/скрипта в эталоне
     },
     ...
   ]
 }
 ```

> элементы в `summary` **отсортированы по убыванию** значения `rating`, наиболее вероятный ответ с наибольшим `rating`. Если массив пуст / не существует - совпадений не нашлось

---

## config
`./source/config.json`

## API
> все запросы имеют вид `/api/class.method` (например, `/api/etalon.add`);\
> запросы только `POST`, контент `application/json`

### Работа с эталонами
метод (POST)    | параметры (JSON)               | описание
:--             | :--                            | :--
`etalon.list`   | `null`                         | список эталонов
`etalon.add`    | `{name: string}`               | добавление эталона с названием `name`
`etalon.remove` | `{etalon: uuid}`               | удаление эталона
`etalon.get`    | `{etalon: uuid}`               | список секций (разделов) и инфа об эталоне
`etalon.edit`   | `{etalon: uuid, name: string}` | переименование эталона на новый `name`
`etalon.manual` | `{target, task, string}`       | анализ текста (см. ниже)
`etalon.yandex` | `{target, task, data}`         | анализ из файла от яндекса (см ниже)

### Работа с разделами (секциями) в эталоне
метод (POST)      | параметры (JSON)                | описание
:--               | :--                             | :--
`sections.list`   | `{etalon: uuid}`                | список секций (разделов) эталона
`sections.add`    | `{etalon: uuid, name: string}`  | добавление раздела
`sections.get`    | `{section: uuid}`               | список скриптов и инфа о секции
`sections.detail` | `{section: uuid}`               | дополнительная информация о секции (приоритетные правила и др.)
`sections.remove` | `{section: uuid}`               | удаление раздела
`sections.edit`   | `{section: uuid, name: string}` | переименование раздела

### Работа со скриптами в секции (разделе)
метод (POST)     | параметры (JSON)  | описание
:--              | :--               | :--
`scripts.list`   | `{section: uuid}` | список скриптов раздела
`scripts.add`    | `{section: uuid, origin: string}` | добавление нового скрипта с текстом `origin`
`scripts.get`    | `{script: uuid}` | список правил в скрипте
`scripts.remove` | `{script: uuid}` | удаление скрипта
`scripts.rules`  | `{script: uuid}` | список "включенных" правил в скрипте
`scripts.edit`   | `{script: uuid, intent: uuid, checked: boolean}` | включение или выключение правила в скрипте

### Работа с историей запросов
метод (POST)     | параметры (JSON) | описание
:--              | :--              | :--
`history.add`    | `{origin: string, target: uuid, task: string?, etalon:[...string]?, score:number?0}` | добавление элемента в историю
`history.list`   | `null`           | `1000` последних записей в истории
`history.remove` | `{id: uuid}`     | удалить запись с номером `id`

---
## API | Основные запросы для анализа
> `POST /api/etalon.manual` - запроc просто с текстом
```jsonc
{
  "origin": "string", // текст для анализа
  "target": "uuid",   // целевой эталон
  "task": "string?"   // задача продажника (пр. "сделай вбитие крюка")
}
```

> `POST /api/etalon.yandex` - принимает JSON файл yandex.speech.kit
```jsonc
{
  "data": {..."результат анализа от яндекса"}, // текст для анализа
  "target": "uuid" , // целевой эталон
  "task": "string?"  // задача продажника (пр. "сделай вбитие крюка")
}
```

### ответ
```jsonc
{
  "input": {
    "origin": "string", // исходная строка для разбора
    "string": "string"  // очищенная строка для разбора
  },
  "content": {
    "intents":  [], // найденые правила
    "entities": [], // найденые сущности
    "sequence": []  // последовательность токенов в сообщении
  },
  "output": {
    ...
  },

  "summary": [ // array of rating information
    {"name": "string", "rate": "number"},
    ...
  ]
}
```

## Roadmap
- [ ] фильтры в истории
  - [ ] по `traget`
  - [ ] по `task`
  - [ ] по дате и времени
- [x] анализ по приоритетным правилам в секции
- [ ] анализ по частым правилам в секции
  - [ ] unprocessed
  - [ ] processed / entities
  - [ ] all-text
- [ ] вероятность секции
- [ ] алогритм на коррекции ошибки в секции (демрау?)

---
## web version (админка)
> `http://localhost:3000` (при стандартном конфиге)

### Разное
```sql
CREATE DATABASE entities
WITH OWNER "postgres"
ENCODING 'UTF8'
  LC_COLLATE = 'ru_RU.UTF-8'
  LC_CTYPE = 'ru_RU.UTF-8'
TEMPLATE = template0;
```
