# nodejs-workers
Try to use nodejs workers, use a cpu monitor to measure the cpu/threads utilization.

How to use
----------
Start the backend with:  
`node index.js`

Via rest client (Browser/Postman/Rest Client vscode extension) you can start to count up to a number, you can specify how many thread use to count.

Example, count up to 10.000.000.000 with one thread:  
GET http://localhost:3000/start/1/10000000000 HTTP/1.1

Example, count up to 10.000.000.000 with two thread:  
GET http://localhost:3000/start/2/10000000000 HTTP/1.1

Example, count up to 20.000.000.000 with two thread:  
GET http://localhost:3000/start/4/20000000000 HTTP/1.1

In the console is logged the time used to count in milliseconds.
``

Internals
---------
When you ask to count up to 10.000.000.000 with two thread the program start to workers counting up to 10.000.000.000/2 each.

Results on my machine
---------------------
