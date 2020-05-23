"use strict";

const os = require("os");
const doLongWork = require("./worker");

const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send(`Hello World! ${new Date()}`));

app.get("/start/:proc/:size", (req, res) => {
    let num_processes = Number(req.params.proc);
    start(num_processes, req.params.size);
    res.send(`ok\n`);
});

app.listen(port, () => {
    console.log(`Try to open page http://localhost:${port}/start/2/10000000000`);
    console.log(`Read README.md for more info`);
    console.log();
});

console.log(`Number of logical CPUs: ${os.cpus().length}`);
console.log(`CPU Speed: ${os.cpus()[0].speed}MHz`);
console.log();

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

async function start(num_processes, totalSize) {
    console.log(
        `Arrived request to count up to ${Number(totalSize).toLocaleString()} with ${num_processes} ${
            num_processes === 1 ? "thread" : "threads"
        }`,
    );

    let size = Number(totalSize / num_processes);
    let intervalProgressBar = setInterval(progressBar, 250);
    let startCpuUsage = os.cpus();

    let longWorks = [];

    startTimer();

    for (let count = 0; count < num_processes; count++) {
        longWorks.push(doLongWork(size));
    }

    let responses = await Promise.all(longWorks);

    const usedTime = getSecondsFromStart();

    let endCpuUsage = os.cpus();

    clearInterval(intervalProgressBar);

    let countUpTo = 0;

    for (const response of responses) {
        countUpTo += response;
    }

    let CPUsUsage = [];

    for (let cpu = 0; cpu < os.cpus().length; cpu++) {
        const cpuUsage = {
            index: cpu,
            user: (endCpuUsage[cpu].times.user - startCpuUsage[cpu].times.user) / 10,
        };

        cpuUsage.userPerc = Math.trunc((100 * cpuUsage.user) / usedTime);

        CPUsUsage.push(cpuUsage);
    }

    let totalCpu = CPUsUsage.reduce(
        (accumulator, currentValue) => accumulator + currentValue.userPerc,
        0,
    );

    let avgCpu = totalCpu / CPUsUsage.length;

    process.stdout.write(` - ${usedTime.toLocaleString()} milliseconds - CPU ${avgCpu}%\n\n`);

    // for (const cpuUsage of CPUsUsage) {
    //     // console.log(`${usedTime} + ${cpuUsage.user} ${endCpuUsage[cpuUsage.index].times.user} - ${startCpuUsage[cpuUsage.index].times.user}`);
    //     console.log(`CPU ${cpuUsage.index} usage ${Math.trunc(cpuUsage.userPerc)}%`);
    // }
}
