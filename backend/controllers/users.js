const db = require('../db/connection');

const get = async (req,res) => {

    const header = req.header('token');

    res.status(200).json({
        msg: 'everything okay!',
        header,
    });
}

module.exports = {
    get
}