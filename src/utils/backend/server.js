const jsonServer = require("json-server");
const server = jsonServer.create();
const path = require('path')
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);

// Middleware para validar que no se guarde un número de placa duplicado en la ruta /vehicles
server.use("/vehicles", (req, res, next) => {
    if (req.method === "POST" && req.body.plate) {
        const existingUser = router.db
            .get("vehicles")
            .find({ plate: req.body.plate })
            .value();

        if (existingUser) {
            return res.status(400).json({ message: "El número de placa ya existe en la base de datos" });
        }
    }

    next();
});

server.use(router);
server.listen(8000, () => {
    console.log("JSON Server is running");
});
