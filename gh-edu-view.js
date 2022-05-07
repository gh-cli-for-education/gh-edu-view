import { program } from 'commander'
/** _dirname doesnt work with modules */
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
/***/
// import { config } from __dirname + '/../'

console.log(__dirname);
program
    .command("users")
    .action(() => {
      console.log("Hola");
    })
program.parse();
