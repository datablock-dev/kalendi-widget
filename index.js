#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const commander_1 = require("commander");
const zod_1 = require("zod");
const prompts_1 = __importDefault(require("prompts"));
process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));
const addOptionsSchema = zod_1.z.object({
    components: zod_1.z.array(zod_1.z.string()).optional(),
    yes: zod_1.z.boolean(),
    overwrite: zod_1.z.boolean(),
    cwd: zod_1.z.string(),
    all: zod_1.z.boolean(),
    path: zod_1.z.string().optional(),
});
const add = new commander_1.Command();
add.name("add");
add.description('Generate a new template or component');
add.command('add');
add.action(async () => {
    const message = `Where do you want to generate this component? 
        Your current location is: ${process.cwd()}`;
    let choices = ['Template', 'Component'];
    const { type } = await prompts_1.default.prompt([
        {
            type: 'select',
            name: 'type',
            message: 'What do you want to add?',
            choices: ['Template', 'Component'],
        },
    ]);
    if (choices[type] === 'Template') {
        let choices = ['Backend', 'Frontend', 'Server'];
        const { templateType } = await prompts_1.default.prompt([
            {
                type: 'select',
                name: 'templateType',
                message: 'Select template type:',
                choices: ['Backend', 'Frontend', 'Server'],
            },
        ]);
        const choice = choices[templateType];
        const { outputPath } = await prompts_1.default.prompt([
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
        console.log(outputPath);
        // Logic to generate the template
        generateTemplate(choice, outputPath);
    }
    else if (type === 'Component') {
        const { outputPath } = await prompts_1.default.prompt([
            {
                type: 'text',
                name: 'outputPath',
                message: `Where do you want to generate this component? Your current location is: ${process.cwd()}`,
                validate: (input) => {
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
function generateTemplate(templateType, outputPath) {
    const pwd = process.cwd();
    const templatePath = path.resolve(pwd, outputPath);
    console.log(`Generating ${templateType} template at ${templatePath}`);
    // Add logic to generate the specified template at the given path
    // Example: create files and directories based on the template type
}
function generateComponent(outputPath) {
    const pwd = process.cwd();
    console.log(`Generating component at ${outputPath}`);
    // Add logic to generate the component at the given path
    // Example: create component files and directories
}
async function main() {
    //const packageInfo = await getPackageInfo()
    const program = new commander_1.Command();
    program.name("Kalendi-Widget @ DataBlock");
    program.description("Add Kalendi Widget to your frontend");
    program.version("1.0.0");
    program.addCommand(add);
    program.parse();
}
main();
//# sourceMappingURL=index.js.map