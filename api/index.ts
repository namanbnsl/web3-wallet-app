import express, { Express, Request, Response } from "express";
import { ethers } from "ethers";

const app: Express = express();
const port = 8000;

app.use(express.json());

app.post("/create_wallet", (req: Request, res: Response) => {
  const wallet = ethers.Wallet.createRandom();
  res.json({
    wallet: {
      mnemonic: wallet.mnemonic.phrase,
      address: wallet.address,
      privateKey: wallet.privateKey,
    },
  });
});

app.post("/recover_wallet", (req: Request, res: Response) => {
  const { mnemonic } = req.body;

  try {
    const wallet = ethers.Wallet.fromMnemonic(mnemonic);

    res.json({
      mnemonic: wallet.mnemonic.phrase,
      address: wallet.address,
      privateKey: wallet.privateKey,
    });

    return;
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Invalid mnemonic" });

    return;
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
