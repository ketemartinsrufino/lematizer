docker run -it -p 80:80 -p 50005:50005 davidfeitosa/freeling /bin/bash

#start the web server
/etc/init.d/fcgiwrap start
/etc/init.d/nginx start
#Start Freeling as a server configured for portuguese language
#and response in JSON format

analyze --server -p 50005 -f pt.cfg --output json &