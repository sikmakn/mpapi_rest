const { Router } = require('express');
const handleAsyncError = require('./middleware/handleAsyncError');
const { mpapi } = require('./js-rpcapi');

const router = Router();

router.post('/generate-mnemonic', handleAsyncError(async (req, res) => {
  res.json({ mnemonic: mpapi.crypto.generateMnemonic() });
}));

router.post('/generate-keys', handleAsyncError(async (req, res) => {
  const { mnemonic } = req.body;
  res.json({ keys: mpapi.crypto.generateKeys(mnemonic) });
}));

router.post('/existing-account', handleAsyncError(async (req, res) => {
  const { privateKey } = req.body;
  res.json({ extractedKeys: mpapi.crypto.extractKeys(privateKey) });
}));

router.post('/balance-plex', handleAsyncError(async (req, res) => {
  const { pkh } = req.body;
  res.json({ balance: mpapi.utility.totez(await mpapi.rpc.getPlexBalance(pkh)) });
}));

router.post('/mine-balance', handleAsyncError(async (req, res) => {
  const { pkh } = req.body;
  res.json({ balance: mpapi.utility.totez(await mpapi.rpc.getMineBalance(pkh)) });
}));

router.post('/send-mine', handleAsyncError(async (req, res) => {
  const { extractedKeys, receiver, amount, defaultFee } = req.body;
  const operations = await mpapi.rpc.mine_transfer(
    extractedKeys.pkh,
    extractedKeys,
    receiver,
    amount,
    defaultFee,
  );
  res.json(operations);
}));

router.post('/send-plex', handleAsyncError(async (req, res) => {
  const { extractedKeys, receiver, amount, defaultFee } = req.body;
  const operations = await mpapi.rpc.plex_transfer(
    extractedKeys.pkh,
    extractedKeys,
    receiver,
    amount,
    defaultFee,
  );
  res.json(operations);
}));

router.post('/set-delegate', handleAsyncError(async (req, res) => {
  const { extractedKeys, delegateAddress, defaultFee } = req.body;
  const operations = await mpapi.rpc.setDelegate(
    extractedKeys.pkh,
    extractedKeys,
    delegateAddress,
    defaultFee,
  );
  res.json(operations);
}));

router.post('/undelegate', handleAsyncError(async (req, res) => {
  const { extractedKeys, defaultFee } = req.body;
  const operations = await mpapi.rpc.setDelegate(
    extractedKeys.pkh,
    extractedKeys,
    undefined,
    defaultFee,
  );
  res.json(operations);
}));

router.post('/find-operation', handleAsyncError(async (req, res) => {
  const { hash, countFoundBlocks } = req.body;
  res.json({ blockHash: await mpapi.rpc.findOperation(hash, countFoundBlocks) });
}));

router.post('/await-operation', handleAsyncError(async (req, res) => {
  const { hash, interval, timeout } = req.body;
  res.json({ blockHash: await mpapi.rpc.awaitOperation(hash, interval, timeout) });
}));

module.exports = router;
