import { program } from 'commander'
import members from './members/members.js'

/** _dirname doesnt work with modules */
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/***/
const configPath = path.join(__dirname, "..", "gh-edu", "data", "data.json");
/** Load configuration */
import fs from 'fs'
const stringConfig = fs.readFileSync(configPath, { encoding: "utf8" })
const config = JSON.parse(stringConfig);
/** END loadConfig */

program
  .command("members")
  .description("Show information about members in the organization")
  .option("-q --quiet", "Don't show any log or warning information. The result will be printed anyway")
  .option("-i, --id <id>", "Regex to find posible member identifier. Use quotes. For example: \"alu[0-9]{10}\"")
  .action((options) => {
    members(config, options);
  })
program.parse();
