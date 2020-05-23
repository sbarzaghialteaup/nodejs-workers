# nodejs-workers
Try to use nodejs workers, use a cpu monitor to measure the cpu/threads utilization.

How to use
----------
Start the backend with:  
`node index.js`

Via rest client (Browser/Curl/Postman/Rest Client vscode extension) you can start to count up to a number, you can specify how many thread use to count.

Examples with browser:

Count up to 10.000.000.000 with one thread:  
`http://localhost:3000/start/1/10000000000`

Count up to 10.000.000.000 with two thread:  
`http://localhost:3000/start/2/10000000000`

Count up to 20.000.000.000 with four thread:  
`http://localhost:3000/start/4/20000000000`

In the console a progress bars is shown and log is printed with the time in milliseconds used to count.
```
################
Counted up to 10,000,000,000 with 2 threads in 4,035 milliseconds
########
Counted up to 10,000,000,000 with 4 threads in 2,214 milliseconds
```

Internals
---------
When you ask to count up to 10.000.000.000 with two thread the program start to workers counting up to 10.000.000.000/2 each.

Results on my machine
---------------------
