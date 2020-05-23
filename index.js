"use strict";

const doLongWork = require("./worker");

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send(`Hello World! ${new Date()}`))

app.get('/start/:proc/:size', (req, res) => { 
    let num_processes = Number(req.params.proc);
    let size = Number(req.params.size / num_processes);
    start(num_processes, size); 
    res.send(`ok\n`)
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

let startTime = 0;

function progressBar() {
    process.stdout.write(`#`);
}

function startTimer() {
    startTime = new Date();
}

function getSecondsFromStart() {
    const now = new Date();
    return now - startTime;
}

async function start(num_processes, size) {
    let i = setInterval(progressBar, 250);
    startTimer();
    let longWorks = [];
    
    for (let count = 0; count < num_processes; count++) {
        longWorks.push( doLongWork(size) );
    }
    
    let responses = await Promise.all(longWorks);

    let countUpTo = 0;

    for (const response of responses) {
        countUpTo += response;
    }
    
    console.log(`\nContato fino a ${countUpTo.toLocaleString()} con ${num_processes.toLocaleString()} thread da ${size.toLocaleString()} in ${getSecondsFromStart().toLocaleString()} milliseconds`);
    clearInterval(i);
} 
