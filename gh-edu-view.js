import { program } from 'commander'
import members from './commands/members.js'

/** Load configuration */
import fs from 'fs'
const stringConfig = fs.readFileSync(process.cwd() + "/../gh-edu/config.json", { encoding: "utf8", flag: "r" })
const config = JSON.parse(stringConfig);
/** END loadConfig */
program
    .command("members")
    .option("-q --quit", "Don't show any log or warning information. The result will be printed anyway")
    .option("-r, --id", "Regex to find posible member identifier. For example alu0101204512")
    .action((options) => {
      members(config, options);
    })
program.parse();
