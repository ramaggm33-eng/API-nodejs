const express = require('express');
const app = express();
app.use(express.json());
let users = [
    { id: 1, name: 'Rama', email: 'ramaady@gmail.com'},
    { id: 2, name: 'Alvaro', email: 'varo@gmail.com'},
    { id: 3, name: 'Niko', email: 'niko@gmail.com'},
];
//Endpoint get mengambil data
app.get("/api/users/",(req, res) => {
    res.json(users);
});
//Endpoint mengambil user berdasarkan id
app.get("/api/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find((u) => u.id === userId);
    if(!user){
        return res.status(404).send("User tidak ada");
    }
    res.json(user);
});
//Endpoint post menambahkan data
app.post("/api/users", (req, res) => {
    const {name, email} = req.body;
    const newUser = {
        id: users.length + 1,
        name,
        email
    };
    users.push(newUser);
    res.status(201).json(newUser);
});
//Endpoint Delete
app.delete("/api/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    users = users.filter((u) => u.id !== userId);

    res.sendStatus(204).send("User Berhasil dihapus");
});
//Endpoint Update
app.put("/api/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const {name, email} = req.body;
    const user = users.find((u) => u.id === userId);
    if(!user){
        return res.status(404).send("User tidak ada");
    }
    user.name = name;
    user.email = email;
    res.json(user);
});
//jalankan  server di port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});