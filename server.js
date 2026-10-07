//import Express
const express = require('express');

//Membuat instance application Express
const app = express();

//Menggunakan middleware untuk parsing JSON
app.use(express.json());

//Dummy data untuk contoh
let users = [
    { id: 1, name: 'Rama', email: 'rama@example.com' },
    { id: 2, name: 'Reyhan', email: 'reyhan@example.com' },
    { id: 3, name: 'Baim', email: 'baim@example.com' },
];

//Endpoint GET untuk mengambil semua pengguna
app.get("/api/users", (req, res) => {
    res.json(users);
});

//Endpoint GET untuk mengambil satu pengguna berdasarkan ID
app.get("/api/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
});

//Endpoint POST untuk menambahkan pengguna baru
app.post("/api/users", (req, res) => {
    const { name, email } = req.body;
    const newUser = {
        id: users.length + 1,
        name,
        email,
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

// Endpoint PUT untuk memperbarui pengguna berdasarkan ID
app.put("/api/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;

    let user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    user.name = name;
    user.email = email;

    res.json(user);
});

// Endpoint DELETE untuk menghapus pengguna berdasarkan ID
app.delete("/api/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    users = users.filter(u => u.id !== userId);

    res.status(204).send(); // No Content
});

// Menjalankan server pada port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});