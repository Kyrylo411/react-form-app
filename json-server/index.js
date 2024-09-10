const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

server.post('/register', (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ message: 'Email and password are required' });
		}

		const db = router.db;
		const existingUser = db.get('profiles').find({ email }).value();

		if (existingUser) {
			return res.status(403).json({ message: 'Email is already in use' });
		}

		const newUser = {
			id: `${Date.now()}`,
			email,
			password, 
 		};

		db.get('profiles').push(newUser).write();
		return res.status(201).json({ message: 'User registered successfully', user: newUser });
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: e.message });
	}
})

server.post('/login', (req, res) => {
	try {
		const { email, password } = req.body;
		
		const db = router.db;
		const profile = db.get('profiles').find({ email }).value();

		if (!profile) {
			return res.status(403).json({ message: 'Profile not found' });
		}

		if (profile.password !== password) {
			return res.status(401).json({ message: 'Invalid  password' });
		}

		return res.status(200).json({ message: 'Login successful', profile });
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: e.message });
	}
});

server.use(router);

server.listen(8000, () => {
	console.log('server is running on 8000 port');
});
