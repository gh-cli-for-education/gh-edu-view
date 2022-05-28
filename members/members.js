//@ts-check
import * as utils from '../utils/utils.js';

/** Load configuration */
import fs from 'fs'
const stringConfig = fs.readFileSync(process.cwd() + "/../gh-edu/config.json", { encoding: "utf8", flag: "r" })
const config = JSON.parse(stringConfig);
/** END loadConfig */

const query = (org) => `
  query ($endCursor: String) {
  organization(login: "${org}") {
    membersWithRole(first: 100, after: $endCursor) {
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        login,
        name,
        bio,
        email,
        url,
        avatarUrl
      }
    }
  }
}
`

// const regexString = "alu[0-9]{10,10}";
function getPosibleID(data, identifierR) {
  let regex = new RegExp(identifierR);
  if (!regex.global)
    regex = new RegExp(regex.source, regex.flags + "g");
  let posiblesID = []; // [[]]
  for (const { login, name, bio, email, url } of data) {
    let memberPosibleID = [];
    let match;
    if (match = login.match(regex))
      memberPosibleID = memberPosibleID.concat(match);
    if (match = name?.match(regex))
      memberPosibleID = memberPosibleID.concat(match);
    if (match = bio?.match(regex))
      memberPosibleID = memberPosibleID.concat(match);
    if (match = email?.match(regex))
      memberPosibleID = memberPosibleID.concat(match);
    if (match = url.match(regex))
      memberPosibleID = memberPosibleID.concat(match);
    posiblesID.push(memberPosibleID);
  }
  return posiblesID;
}

// Foo comments
export default async function members({ identifierR }, options) {
  if (!config.defaultOrg) {
    console.error("Please set a org as default to work with");
    return;
  }
  let { data: { organization: { membersWithRole: { nodes: result } } } } = JSON.parse(utils.executeQuery(query(config.defaultOrg)));
  let posibleID;
  if (identifierR) {
    posibleID = getPosibleID(result, identifierR);
    for (const [index, member] of result.entries()) {
      console.log({ ...member, posibleID: posibleID[index] });
    }
  } else {
    if (!options.quiet) console.log("No identifierR set")
    for (const member of result) {
      console.log(member);
    }
  }
}
