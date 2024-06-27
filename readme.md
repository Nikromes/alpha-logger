**Супер удобный альфа логер**
Ничего не нужно логировать самому, всё будет само логироваться в файл `log.txt` в корневую папку
Всё что нужно для использования, это установить его в новый проект
`npm i alpha-logger`
И в `package.json` проекта импортировать логер для нужных скриптов
Пример:
<code>
  "scripts": {
    "scriptToRun": "node --import ./node_modules/alpha-logger/logger.js scriptToRun.js scriptName",
  },
</code>