import { Command } from "commander";
import { exit } from "process";

import { newUser } from "./new";
import { readMessages } from "./read";
import { sendMessage } from "./send";

const program = new Command();

program
    .version("1.0.0")
    .description("a deaddrop tool for storing data and retrieving it later with authentication")
    .option("--new", "use the utility in new user mode")
    .option("--send", "use the utility in send mode")
    .option("--read", "use the utility in read mode")
    .option("--user <name>", "specify a user for verbs requiring a user target")
    .option("--to <name>", "specify the user to send a message to")
    .parse(process.argv);

const options = program.opts();

const validateInputString = (target: string): string => {
    return typeof target === "string" ? target : "";
}

if (options.new && options.read || options.new && options.send || options.read && options.send) {
    console.log("Please only specify one verb");
    exit();
}

if (options.new) {
    let user = validateInputString(options.user);
    if (user === "") {
        console.error("Please specify a user when running in new mode");
    } else {
        newUser(user);
    }

} else if (options.send) {
    let user = validateInputString(options.to);
    if (user === "") {
        console.error("Please specify a to target when running in send mode");
    } else {
        readMessages(user);
    }

} else if (options.read) {
    let user = validateInputString(options.user);
    if (user === "") {
        console.error("Please specify a user when running in read mode");
    } else {
        sendMessage(user);
    }

} else {
    console.log("Please specify a verb for the utility. Valid verbs are: read, send, new");
}
