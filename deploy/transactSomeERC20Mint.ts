import { utils, Wallet, Provider } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

let SomeERC20_ADDRESS = "0xFC174650BDEbE4D94736442307D4D7fdBe799EeC"
let to = '0xC04d245263fF5459CeA78C1800fdc69BD11B4b59'
let amount = "10000000000000000000" // 10 * 10**18

export default async function (hre: HardhatRuntimeEnvironment) {
    
    const adminPrivateKey = ethers.Wallet.fromMnemonic(hre.config.env.MNEMONIC, `m/44'/60'/0'/0/0`).privateKey;
    const provider = new Provider(hre.config.networks.zkSyncTestnet);
    const adminWallet = new Wallet(adminPrivateKey).connect(provider);
    let deployer = new Deployer(hre, adminWallet);
    const SomeERC20Artifact = await deployer.loadArtifact("SomeERC20");

    const adminAddress = adminWallet.address;
    console.log("Admin address: ", adminAddress);

    const someERC20 = new ethers.Contract(
        SomeERC20_ADDRESS, 
        SomeERC20Artifact.abi, 
        adminWallet
    );

    let totalSupplyBefore = await someERC20.totalSupply();
    console.log(totalSupplyBefore);
    
   
    let tx = await someERC20.mint(to, amount);
    console.log(tx);

    let totalSupplyAfter = await someERC20.totalSupply();
    console.log(totalSupplyAfter);

    
}