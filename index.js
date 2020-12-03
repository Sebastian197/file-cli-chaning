#!/usr/bin/env node
const shelljs = require('shelljs');
const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');

/**
 * Muestra un mensaje por consola personalizado usando la librería chalk
 * @param {string} filepath Ruta del fichero
 */
const fileOk = (filepath) => {
    console.log(
        chalk.white.bgGreen.bold(
            '¡Muy bien! Fichero creado correctamente en el directorio '
            + chalk.gray.italic(
                `${filepath}`
            )
        )
    );
};

/**
 * Crea el fichero y retorna la ruta donde fue creado
 * @example
 * (/Volumes/file-cli-chaning/index.js:68:22)
 * @param {string} nameFile Nombre del fichero
 * @param {string} extension Tipo de extensión
 * @returns {string} Nombre de la ruta
 */
const createFile = (nameFile, extension) => {
    const pathFile = `${process.cwd()}/${nameFile}.${extension}`;
    shelljs.touch(pathFile);
    return pathFile;
};

/**
 * Función que hace las preguntas para crear el ficheo
 */
const askQuestions = () => {
    const asks = [
        {
            name: 'FILE',
            type: 'input',
            message: '¿Como se va a llamar tu fichero? (sin la extensión)'
        },
        {
            name: 'EXTENSION',
            type: 'list',
            message: '¿Que extensión tiene tu fichero?',
            choices: ['.js', '.ts', '.rb', '.php', '.css', '.scss', '.json', '.html', '.java', '.kt', '.gitignore', '.npmignore', '.md'],
            filter: function (val) {
                return val.split('.')[1];
            }
        },
    ];
    return inquirer.prompt(asks);
};

/**
 * Muestra la  información de la librería en la cabecera
 */
const init = () => {
    console.log(
        chalk.green(
            figlet.textSync('Crear ficheros', {
                font: 'Big',
                horizontalLayout: 'default',
                verticalLayout: 'default'
            })
        )
    )
};

/**
 * Inicializador del programa
 */
const run = async () => {
    // Mostrar la información de la librería en la cabecera, el título con figlet
    init();
    // Preguntas necesarias para crear el fichero, el nombre y la extención
    const asks = await askQuestions();
    const { FILE, EXTENSION } = asks;
    // Crear el fichero
    const pathFile = createFile(FILE, EXTENSION);
    // Añadir mensaje que el fichero se ha creado correctamente
    fileOk(pathFile);
};

run();