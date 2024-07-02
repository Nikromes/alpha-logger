import fs from 'fs';
import winston from 'winston';

const logsPath = './logs';

if (!fs.existsSync(logsPath)) {
    fs.mkdirSync(logsPath);
}

// Получение имени скрипта из аргументов командной строки
const scriptName = process.argv[2] || 'Unknown Script';

// Создание логгера с помощью winston
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new winston.transports.File({ filename: `${logsPath}/${scriptName}.txt`, options: { flags: 'a' } })
    ]
});

// Записываем разделитель и дату/время в начало лог-файла
const logHeader = `--------------------------------\n▶️${scriptName}\n🕗${new Date().toLocaleString()}\n`;

fs.appendFileSync(`${logsPath}/${scriptName}.txt`, logHeader, 'utf8');

// Переопределение методов console
const originalLog = console.log;
const originalError = console.error;
const originalWarn = console.warn;
const originalInfo = console.info;

function formatArgs(args) {
    return args.map(arg => {
        if (typeof arg === 'object') {
            try {
                return JSON.stringify(arg, null, 2);
            } catch (e) {
                return '[Circular]';
            }
        }
        return arg;
    }).join(' ');
}

console.log = (...args) => {
    logger.info(formatArgs(args));
    originalLog(...args);
};

console.error = (...args) => {
    logger.error(formatArgs(args));
    originalError(...args);
};

console.warn = (...args) => {
    logger.warn(formatArgs(args));
    originalWarn(...args);
};

console.info = (...args) => {
    logger.info(formatArgs(args));
    originalInfo(...args);
};

// Экспортировать логгер как глобальный объект
global.logger = logger;