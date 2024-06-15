#!/usr/bin/env node
import * as fs from "fs"
import * as path from 'path'
import { Command } from "commander"
import { z } from "zod"
import prompts from "prompts"

process.on("SIGINT", () => process.exit(0))
process.on("SIGTERM", () => process.exit(0))

const pathArray: string[] = new Array()

const addOptionsSchema = z.object({
    components: z.array(z.string()).optional(),
    yes: z.boolean(),
    overwrite: z.boolean(),
    cwd: z.string(),
    all: z.boolean(),
    path: z.string().optional(),
})

const add = new Command()

add.name("add")
add.description('Generate a new template or component')

add.command('add')
add.action(async () => {
    const message = `Where do you want to generate this component? 
        Your current location is: ${process.cwd()}`;


    getDirChoices()
});

function generateTemplate(outputPath: string) {
    const pwd = process.cwd()
    const templatePath = path.resolve(pwd, outputPath)
    console.log(`Generating Kalendi Widget at ${templatePath}`);
    // Add logic to generate the specified template at the given path
    // Example: create files and directories based on the template type
}

async function getDirChoices() {
    console.log(pathArray)

    const choices = fs.readdirSync(path.resolve(process.cwd(), ...pathArray)).map((item) => {
        const currPath = path.resolve(path.resolve(process.cwd(), ...pathArray), item)
        const fileStats = fs.lstatSync(currPath)

        if (fileStats.isDirectory() && item.substring(0, 1) !== '.' && item !== 'node_modules') return item
    }).filter((item) => item !== undefined)

    choices.unshift('Current Path')
    console.log(choices)

    const { choice } = await prompts.prompt([
        {
            type: 'select',
            name: 'choice',
            message: 'What do you want to add?',
            choices: choices,
        },
    ]);

    if (choice === 0) {
        const pwd = process.cwd()
        const templatePath = path.resolve(pwd, ...pathArray)
        console.log(`Generating Kalendi Widget at ${templatePath}`);

        copyDirectory(templatePath)

    } else {
        if (choices[choice]) {
            pathArray.push(choices[choice] as string)
            getDirChoices()
        }
    }
}

function copyDirectory(templatePath: string) {
    const srcPath = path.resolve(__dirname, 'src') // Get the path to the src directory with all the files
    fs.mkdirSync(path.resolve(templatePath, 'Kalendi-Widget'), { recursive: true })
    const entries = fs.readdirSync(srcPath, { withFileTypes: true })

    for (const entry of entries) {
        const srcPath = path.join(source, entry.name);
        const destPath = path.join(destination, entry.name);

        if (entry.isDirectory()) {
            copyDirectory(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
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