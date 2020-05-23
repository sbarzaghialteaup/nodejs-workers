"use strict";

const { Worker, isMainThread, parentPort, workerData } = require("worker_threads");

if (isMainThread) {
    module.exports = function doLongWork(number) {
        return new Promise((resolve, reject) => {
            const worker = new Worker(__filename, {
                workerData: number,
            });
            worker.on("message", resolve);
            worker.on("error", reject);
            worker.on("exit", (code) => {
                if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
            });
        });
    };
} else {
    const number = workerData;
    let index;
    for (index = 0; index < number; index++) {}
    parentPort.postMessage(index);
}
