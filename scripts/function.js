const fs = require("fs");
const io = require('console-read-write');
const path = require('path');
const exampleCode = require("./example");

console.log('--- Запуск скрипта для создания компонент ---')

async function main() {
    console.log('Введите название компоненты:')

    let title = await io.read()
    title.toLowerCase()

    let component = title[0].toUpperCase() + title.slice(1);

    // - title      :   название для навигатора
    // - component  :   название компоненты

    console.log('\x1b[36m%s\x1b[0m', 'Название:', component)
    let result = exampleCode(component)

    let pathRes = path.join(__dirname, `../src/components/${title}/${component}.js`)

    fs.mkdir(path.join(__dirname, `../src/components/${title}`), (err) => {
        if (err) {
            return console.log("\x1b[31m", err);
        }
        console.log("\x1b[32m%s\x1b[0m", ' - Директория для компоненты создана!');
    });

    fs.open(pathRes, 'w', function (err, file) {
        if (err) throw console.log("\x1b[31m", err);
        console.log("\x1b[32m%s\x1b[0m", ' - Файл создан и сохранён!');
    });
    fs.writeFile(pathRes, result, function (err) {
        if (err) throw console.log("\x1b[31m", err);
        console.log("\x1b[32m%s\x1b[0m", ' - Создание компоненты прошла успешно')
        console.log("\x1b[37m%s\x1b[0m", '---- Отключение скрипта для создания компоненты ----')
    })
}

main()