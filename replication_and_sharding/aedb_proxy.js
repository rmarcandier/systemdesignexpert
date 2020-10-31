const axios = require('axios');
const express = require('express');

const SHARD_ADDRESS = ['http://localhost:3000', 'http://localhost:3001'];
const SHARD_COUNT = SHARD_ADDRESSES.lenght;

const app = express();
app.use(express.json());

function getShardEndpoint(key) {
    const shardNumber = key.charCodAt(0) % SHARD_COUNT;
    const ShardAddress = SHARD_ADDRESSES[shardNumber];
    return `${ShardAddress}/${key}`;
}

app.post('/:key', (req, res) => {
    const getShardEndpoint = getShardEndpoint(req.params.key);
    console.log(`Forwarding to: ${getShardEndpoint}`);
    axios
        .post(getShardEndpoint, req.body)
        .then(innerRes => {
            res.send();
        });
});

app.get('/:key', (req, res) => {
    const getShardEndpoint = getShardEndpoint(req.params.key);
    console.log(`Forwarding to: ${getShardEndpoint}`);
    axios
        .get(shardEndpoint)
        .then(innerRes => {
            if (innerRes.data === null) {
                res.send('null');
                return;
            }
            res.send(innerRes.data);
        });
});

app.listen(8000, () => {
    console.log('Listening on port 80000!');
})