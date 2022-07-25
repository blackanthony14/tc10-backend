const express = require('express');
const morgan = require('morgan');
const { PrismaClient } = require('@prisma/client')
const cors = require('cors')

const prisma = new PrismaClient()

const app = express();
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.listen(5000)
console.log("Server on port 5000")

app.get('/',(req,res)=>{
    res.send('Hola world!');
})

app.get('/citas', async(req, res) =>{
    const estu = await prisma.citas.findMany();
    res.json(estu)
})
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With,Content-Type, Accept");
    next();
});

app.get('/cita/:id', async(req, res) =>{
    const id = Number(req.params.id);
    const libro = await prisma.citas.findUnique({
        where:{
            id:id
        },
    });
    res.json(libro)
});

app.post('/citas/post', async(req, res) => {
    const{nombre,metodoContacto,telefono,correo,fecha,horas} = req.body;
    const libro = await prisma.citas.create({
        data:{
            nombre: nombre,
            metodoContacto: metodoContacto,
            telefono: telefono,
            correo: correo,
            fecha: fecha,
            horas: horas,
        },
    });
    res.json(libro);
});

app.put("/cita/:id", async(req, res) =>{
    const{nombre,metodoContacto,telefono,correo,fecha,horas} = req.body;
    const id = Number(req.params.id);

    const updateLibro = await prisma.citas.update({
        where:{
            id: id,
        },
        data:{
            nombre: nombre,
            metodoContacto: metodoContacto,
            telefono: telefono,
            correo: correo,
            fecha: fecha,
            horas: horas
        },
    });
    res.json(updateLibro)
});