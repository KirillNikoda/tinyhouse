import express from 'express';

const app = express();
const port = 8081;

app.get('/', (req, res) => {
	res.send('hello worl323d');
});

app.listen(port, () => {
	console.log(123);
});
