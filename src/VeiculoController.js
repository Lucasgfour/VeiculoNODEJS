async function connect() {
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection(
        {host:'localhost', user:'root', password:'lucasg4', database:'libertas2021'}
    );
    console.log("Conectou no MySQL !");
    global.connection = connection;
    return connection;
}

exports.post = async (req, res, next) => {
    const conn = await connect();
    const sql = "INSERT INTO veiculo (ano, marca, modelo, placa, valor) VALUES (?, ?, ?, ?, ?)";
    const values = [req.body.ano, req.body.marca, req.body.modelo, req.body.placa, req.body.valor];
    await conn.query(sql, values);
    res.status(201).send('OK !');
};

exports.put = async (req, res, next) => {
    const conn = await connect();
    const sql = "UPDATE veiculo SET ano = ?, marca = ?, modelo = ?, placa = ?, valor = ? WHERE codigo = ?";
    const values = [req.body.ano, req.body.marca, req.body.modelo, req.body.placa, req.body.valor, req.body.codigo];
    await conn.query(sql, values);
    res.status(201).send('OK !');
}

exports.delete = async (req, res, next) => {
    const conn = await connect();
    const sql = "DELETE FROM veiculo WHERE codigo = ?";
    const values = [req.params.id];
    await conn.query(sql, values);
    res.status(201).send('OK !');
}


exports.get = async (req, res, next) => {
    const conn = await connect();
   const [rows] = await conn.query("SELECT * FROM veiculo");
   if(rows.length > 0) {
       res.status(200).send(rows);
   } else {
       res.status(404).send("Nada encontrado");
   }
}

exports.getById = async (req, res, next) => {
   const conn = await connect();
   const [rows] = await conn.query("SELECT * FROM veiculo WHERE codigo = " + req.params.id);
   if(rows.length > 0) {
       res.status(200).send(rows[0]);
   } else {
       res.status(404).send("ID não existe");
   }
}