import { useEffect } from "react";

import "./App.css";
import {
  GalachainConnectClient,
  PublicKeyClient,
  TokenClient,
  WalletUtils,
} from "@gala-chain/connect";

function App() {
  // const [client, setClient] = useState();
  useEffect(() => {
    (async () => {
      const client = new GalachainConnectClient();
      const data = await client.connectToMetaMask();

      console.log(data);
    })();
  }, []);

  const CreateTokenClass = async () => {
    const client = new GalachainConnectClient(
      "https://galachain-gateway-chain-platform-stage-chain-platform-eks.stage.galachain.com/api/asset/token-contract"
    );
    const data = await client.connectToMetaMask();
    const tokenClient = new TokenClient(client);

    const response = await tokenClient.CreateTokenClass({
      tokenClass: {
        collection: "Membership",
        category: "Employer",
        type: "Standard",
        additionalKey: "Epic",
      },
      isNonFungible: true,
      decimals: 0,
      name: "Standard Membership",
      symbol: "MBRE",
      description: "A detailed description of the token.",
      rarity: "Epic",
      image: "https://example.com/image.png",
      metadataAddress: "https://example.com/metadata.json",
      contractAddress: "none",
      maxSupply: "100",
      maxCapacity: "100",
      totalMintAllowance: "5000000",
      totalSupply: "0",
      totalBurned: "0",
    });
    console.log(response.Data);
  };

  async function generateWallet() {
    const wallet = await WalletUtils.createAndRegisterRandomWallet(
      "https://dex-api-platform-dex-stage-gala.gala.com/v1/CreateHeadlessWallet"
    );
    console.log(
      `Wallet Generated and registered. Address: ${wallet.ethAddress}.\n Private key in console (this is not super secure, please only use this for testing)`
    );
    console.log("Public Key", wallet.publicKey);

    console.log(wallet.privateKey);
  }

  const RegisterUser = async () => {
    const client = new GalachainConnectClient(
      "https://galachain-gateway-chain-platform-stage-chain-platform-eks.stage.galachain.com/api/asset/public-key-contract"
    );
    const data = await client.connectToMetaMask();
    const publicKeyClient = new PublicKeyClient(client);

    const response = await publicKeyClient.RegisterUser({
      user: "client|66b1db4cc1ea89ff4402ab48",
      publicKey: client.galachainAddress,
    });
    console.log(response.Data);
  };

  return (
    <div>
      <button onClick={CreateTokenClass}>CreateTokenClass</button>

      <button onClick={RegisterUser}>RegisterUser</button>
      <button onClick={generateWallet}>generateWallet</button>
    </div>
  );
}

export default App;
