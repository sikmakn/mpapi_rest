// Connect
<pre><code>//in .env file before start
PORT=3002
PROVIDER=http://127.0.0.1:8732
DEBUG=true
// in terminal 
npm install //for install dependencies
npm start // for start local service
</code></pre>


1 - Create new account
<pre><code>// Generate seed phrase
POST 'mpapi/generate-mnemonic'
// Generate new keys of account
POST 'mpapi/generate-keys' body: { mnemonic }
</code></pre>

2 - Get existing account by private key
<pre><code>POST 'mpapi/existing-account' body { privateKey }</code></pre>

3 - Get plex_balance
<pre><code>POST 'mpapi/balance-plex' body: { pkh }</code></pre>

4 - Get mine_balance
<pre><code>POST 'mpapi/mine-balance' body: { pkh }</code></pre>

5 - Send mine to another account
<pre><code>POST 'mpapi/send-mine' body: { extractedKeys, receiver, amount, defaultFee }</code></pre>

6 - Send plex to another account
<pre><code>POST 'mpapi/send-plex' body: { extractedKeys, receiver, amount, defaultFee }</code></pre>

7 - Set delegate
<pre><code>POST 'mpapi/set-delegate' body: { extractedKeys, delegateAddress, defaultFee } </code></pre>

8 - Undelegate
<pre><code>POST 'mpapi/undelegate' body: { extractedKeys, defaultFee }</code></pre>

9 - Looging for operation in blocks
<pre><code>POST 'mpapi/find-operation' body: { hash, countFoundBlocks }</code></pre>

10 - Looging for operation in blocks
<pre><code>POST 'mpapi/await-operation' body: { hash, interval, timeout }</code></pre>
