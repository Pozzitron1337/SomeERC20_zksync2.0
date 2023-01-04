import { utils, Wallet, Provider } from 'zksync-web3';
import * as ethers from 'ethers';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { Deployer } from '@matterlabs/hardhat-zksync-deploy';

export default async function (hre: HardhatRuntimeEnvironment) {

  const adminPrivateKey = ethers.Wallet.fromMnemonic(hre.config.env.MNEMONIC, `m/44'/60'/0'/0/0`).privateKey; // first account
  const provider = new Provider(hre.config.networks.zkSyncTestnet);
  const adminWallet = new Wallet(adminPrivateKey).connect(provider);
  const adminAddress = adminWallet.address;
  console.log("Admin address: " + adminAddress)

  let deployer = new Deployer(hre, adminWallet);
  const SomeERC20Artifact = await deployer.loadArtifact('SomeERC20');

  const someERC20 = await deployer.deploy(
    SomeERC20Artifact,
    [],
    undefined,
    []
  );

  console.log(`SomeERC20 address: ${someERC20.address}`);
}