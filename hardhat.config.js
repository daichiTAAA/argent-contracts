/* global task */

require("dotenv").config();
require("@nomiclabs/hardhat-truffle5");
const BN = require("bn.js");
const ganacheAccounts = require("./ganache-accounts.json");

const hardhatAccounts = Object.values(ganacheAccounts.addresses).map(({ address, account }) => ({
  privateKey: ganacheAccounts.private_keys[address],
  balance: new BN(account.balance.slice(2), "hex").toString()
}));

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.web3.eth.getAccounts();

  for (const account of accounts) {
    console.log(account);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.3",
  networks: {
    hardhat: {
      chainId: 1,
      gasPrice: 0,
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`,
        enabled: true,
      },
      accounts: hardhatAccounts,
    }
  },
};
