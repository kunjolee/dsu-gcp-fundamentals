const express =  require('express');

const app = express();
// gcloud functions deploy my-cloud-function --entry-point jaimeInitialFunction --runtime nodejs16 --trigger-http --project gcp-fundamentals-372116

app.get('/', (req,res) =>{
    res.status(200).json({
        msg: 'Initial'
    });

});

app.get('/test-jaime', (req,res) =>{
    res.status(200).json({
        msg: 'Everything working jaime!!'
    });

});

module.exports.jaimeInitialFunction = app
