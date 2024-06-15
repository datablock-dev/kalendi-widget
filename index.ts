#!/usr/bin/env node
import * as fs from "fs"
import * as path from 'path'
import chalk from "chalk"
import { Command } from "commander"
import { execa } from "execa"
import ora from "ora"
import { z } from "zod"
import prompts from "prompts"

process.on("SIGINT", () => process.exit(0))
process.on("SIGTERM", () => process.exit(0))


async function main() {
    //const packageInfo = await getPackageInfo()
    const program = new Command()

    program.name("Blueprint @ DataBlock")
    program.description("add components and dependencies to your project")
    program.version("1.0.0")

    program.addCommand(add)
    program.option('-t, --test', 'test')

    program.parse()
}

main();

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

    let choices = ['Template', 'Component']
    const { type } = await prompts.prompt([
        {
            type: 'select',
            name: 'type',
            message: 'What do you want to add?',
            choices: ['Template', 'Component'],
        },
    ]);

    if (choices[type] === 'Template') {
        let choices = ['Backend', 'Frontend', 'Server']
        const { templateType } = await prompts.prompt([
            {
                type: 'select',
                name: 'templateType',
                message: 'Select template type:',
                choices: ['Backend', 'Frontend', 'Server'],
            },
        ]);

        const choice = choices[templateType]

        const { outputPath } = await prompts.prompt([
            {
                type: 'text',
                name: 'outputPath',
                message: message,
                //validate: (input: string) => {
                //    if (fs.existsSync(path.resolve(input))) {
                //        return true;
                //    }
                //    return 'Path does not exist. Please enter a valid path.';
                //},
            },
        ]);

        console.log(outputPath)

        // Logic to generate the template
        generateTemplate(choice, outputPath);

    } else if (type === 'Component') {
        const { outputPath } = await prompts.prompt([
            {
                type: 'text',
                name: 'outputPath',
                message: `Where do you want to generate this component? Your current location is: ${process.cwd()}`,
                validate: (input: string) => {
                    if (fs.existsSync(path.resolve(input))) {
                        return true;
                    }
                    return 'Path does not exist. Please enter a valid path.';
                },
            },
        ]);

        // Logic to generate the component
        generateComponent(outputPath);
    }
});

function generateTemplate(templateType: string, outputPath: string) {
    const pwd = process.cwd()
    const templatePath = path.resolve(pwd, outputPath)
    console.log(`Generating ${templateType} template at ${templatePath}`);
    // Add logic to generate the specified template at the given path
    // Example: create files and directories based on the template type
}

function generateComponent(outputPath: string) {
    const pwd = process.cwd()
    console.log(`Generating component at ${outputPath}`);
    // Add logic to generate the component at the given path
    // Example: create component files and directories
}

export default add