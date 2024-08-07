#!/usr/bin/env node
import * as fs from "fs"
import * as path from 'path'
import { Command } from "commander"
import prompts from "prompts"

process.on("SIGINT", () => process.exit(0))
process.on("SIGTERM", () => process.exit(0))

const pathArray: string[] = []
const add = new Command()

add.name("add")
add.description('Generate a new template or component')

add.command('add')
add.action(async () => {
    const message = `Where do you want to generate this component? 
        Your current location is: ${process.cwd()}`;


    getDirChoices()
});

async function getDirChoices() {
    const choices = fs.readdirSync(path.resolve(process.cwd(), ...pathArray)).map((item) => {
        const currPath = path.resolve(path.resolve(process.cwd(), ...pathArray), item)
        const fileStats = fs.lstatSync(currPath)

        if (fileStats.isDirectory() && item.substring(0, 1) !== '.' && item !== 'node_modules'){
            return {
                title: item,
                value: item
            }
        }
    }).filter((item) => item !== undefined)

    choices.unshift({
        title: 'Current Path',
        value: 'Current Path'
    })

    if(pathArray.length > 0){
        choices.push({
            value: '..',
            title: '..'
        })
    }

    const { choice } = await prompts.prompt([
        {
            type: 'select',
            name: 'choice',
            message: 'Please select a directory or path to add the Kalendi Widget',
            choices: choices,
        },
    ]);


    if (choice === "Current Path"){
        const pwd = process.cwd()
        const templatePath = path.resolve(pwd, ...pathArray) // The base path (i.e. where the directory will be created)

        // If the Kalendi-Widget already exists in current path
        const pathIfDirectoryExists = path.join(templatePath, 'Kalendi-Widget')
        if(fs.existsSync(pathIfDirectoryExists)){
            const { value } = await prompts.prompt({
                type: 'toggle',
                name: 'value',
                message: 'Kalendi-Widget seems to already exist in the path. You are about to overwrite the existing component, are you sure about this choice?',
                initial: true,
                active: 'yes',
                inactive: 'no'
            })

            if(value){ // User clicked on yes
                fs.rmSync(pathIfDirectoryExists, { recursive: true, force: true })
                console.log(`Generating Kalendi Widget at ${templatePath}`);
    
                const srcPath = path.resolve(__dirname, 'src') // Get the path to the src directory with all the files
                fs.mkdirSync(path.resolve(templatePath, 'Kalendi-Widget'), { recursive: true }) // Create the directory
        
                copyDirectory(path.join(templatePath, 'Kalendi-Widget'), srcPath)
            } else {
                getDirChoices()
            }
        } else {
            console.log(`Generating Kalendi Widget at ${templatePath}`);
    
            const srcPath = path.resolve(__dirname, 'src') // Get the path to the src directory with all the files
            fs.mkdirSync(path.resolve(templatePath, 'Kalendi-Widget'), { recursive: true }) // Create the directory
    
            copyDirectory(path.join(templatePath, 'Kalendi-Widget'), srcPath)
        }

    } else if(choice === ".."){
        pathArray.pop()
        getDirChoices()
    } else {
        pathArray.push(choice)
        getDirChoices()
    }
}

function copyDirectory(templatePath: string, sourcePath: string) {
    const entries = fs.readdirSync(sourcePath, { withFileTypes: true })

    // Loop through all files in the directory
    for (const entry of entries) {
        const itemPath = path.join(sourcePath, entry.name) // The path of the current Item (a File or a Directory)
        const destPath = path.join(templatePath, entry.name); // Where it will go

        //console.log(itemPath, destPath)

        if (entry.isDirectory()) {
            //console.log(itemPath, destPath)
            fs.mkdirSync(path.resolve(templatePath, entry.name), { recursive: true }) // Create the directory
            copyDirectory(destPath, itemPath);
        } else {
            fs.copyFileSync(itemPath, destPath);
        }
    }
}

async function main() {
    //const packageInfo = await getPackageInfo()
    const program = new Command()

    program.name("Kalendi-Widget @ DataBlock")
    program.description("Add Kalendi Widget to your frontend")
    program.version("1.0.0")

    program.addCommand(add)

    program.parse()
}

main();