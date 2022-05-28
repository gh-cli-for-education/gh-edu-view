//@ts-check
import shell from "shelljs";

/** @param query {string}*/
export const executeQuery = (query, ...options) => {
  let command = `gh api graphql --paginate ${options} -f query='${query}'`;
  let queryResult = shell.exec(command, { silent: true });
  if (queryResult.code !== 0) {
    console.error("Internal error: executeQuery.");
    console.error("command: ", command);
    process.stderr.write(queryResult.stderr);
    process.exit(1);
  }
  return queryResult.stdout;
};
