#!/bin/bash

# SETUP SCRIPT
# run this script to install all the required tools and packages.

red=`tput setaf 1`
green=`tput setaf 2`
reset=`tput sgr0`

echo
echo "============= CHANGING DIRECTORY TO ${green}FILES${reset} =============="
echo
if [[ -f "./files" ]]
then
    cd files
fi
chmod +x .githooks/*
echo
echo "============= INSTALLING ${green}DEBIAN${reset} TOOLS =============="
echo
sudo apt update -y
sudo apt upgrade -y
sudo apt install -y psmisc lsof tree sqlite3 sqlite3-doc build-essential
echo
echo "========== INSTALLING NODE USING ${green}NODESOURCE${reset} =========="
echo
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
echo
echo "===== INSTALLING THE LATEST VERSION OF ${green}NODEJS${reset} ======"
echo
nvm install node
nvm use node
nvm alias default node
nvm use default
echo
echo "=========== INSTALLING THE ${green}NODE PACKAGES${reset} ==========="
echo
npm install
npm audit fix
npm test
npm run linter
node -v
echo "================= ${green}SETUP COMPLETED ${reset} ================="
