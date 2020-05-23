# nodejs-workers
Example of how to use nodejs worker threads.

How to use this example
-----------------------
Start the backend with:  
`node index.js`

Via a REST client (Browser/Curl/Postman/Rest Client vscode extension) you can start to count up to a number, you can specify how many threads to use to count.

Examples with browser:

Count up to 10.000.000.000 with one thread:  
`http://localhost:3000/start/1/20000000000`

Count up to 10.000.000.000 with two thread:  
`http://localhost:3000/start/2/20000000000`

Count up to 20.000.000.000 with four thread:  
`http://localhost:3000/start/4/20000000000`

Count up to 20.000.000.000 with eight thread:  
`http://localhost:3000/start/8/20000000000`

In the console a progress bars is shown and a log is printed with the time in milliseconds spent to count and the percentage of used cpu:
```
Arrived request to count up to 20,000,000,000 with 4 threads
##################### - 5,262 milliseconds - CPU 51%
```

Internals
---------
When you ask to count up to 20.000.000.000 with two threads the program starts two workers counting up to 10.000.000.000 each.

Results on my machine
---------------------
```
Number of logical CPUs: 8
CPU Speed: 1992MHz

Try to open page http://localhost:3000/start/2/20000000000
Read README.md for more info

Arrived request to count up to 20,000,000,000 with 1 thread
########################################################################## - 18,779 milliseconds - CPU 16%

Arrived request to count up to 20,000,000,000 with 2 threads
#################################### - 9,022 milliseconds - CPU 27.25%

Arrived request to count up to 20,000,000,000 with 4 threads
##################### - 5,262 milliseconds - CPU 51%

Arrived request to count up to 20,000,000,000 with 8 threads
############## - 4,039 milliseconds - CPU 93.25%

Arrived request to count up to 20,000,000,000 with 16 threads
############# - 4,899 milliseconds - CPU 95.375%

Arrived request to count up to 20,000,000,000 with 32 threads
############## - 5,244 milliseconds - CPU 91%

Arrived request to count up to 20,000,000,000 with 32 threads
############# - 5,130 milliseconds - CPU 92.75%

Arrived request to count up to 20,000,000,000 with 8 threads
############# - 3,891 milliseconds - CPU 95.5%

Arrived request to count up to 20,000,000,000 with 8 threads
############# - 3,886 milliseconds - CPU 95.5%
```

When the number of workers is greater the number of logical CPUs there is a drop of the performance