#!/usr/bin/env node

const { execSync } = require('child_process');
const runCommand = (cmd) => {
      try {
            execSync(cmd, { stdio: 'inherit' });
      } catch (error) {
            console.log(`Failed to execute ${error}`);
            return false;
      }

      return true;
};

console.log('Cloning the repository');
const repoName = process.argv[2];

const gitCheckoutCommand = `git clone --depth 1 https://github.com/MonoInfinity/mono-node-kit-ts.git ${repoName}`;
const installDepsCommand = `cd ${repoName} && npm install win-node-env -g && npm install yarn -g && yarn install`;

const checkoutCmd = runCommand(gitCheckoutCommand);
if (!checkoutCmd) process.exit(-1);

console.log('Install all dependencies');
const installCmd = runCommand(installDepsCommand);
if (!installCmd) process.exit(-1);
console.log('----------------------------------------------');
console.log(`%c Let's create your awesome server 🍀🍀🍀 `, 'color: #047867');
