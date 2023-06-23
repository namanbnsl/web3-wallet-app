import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { ethers } from "ethers";

dotenv.config();

const app: Express = express();
const port = 8000;

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

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
