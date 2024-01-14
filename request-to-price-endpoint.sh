#!bin/bash
if [ ! $1 ]; then
  echo 'To run the script, you must specify the customer hostname, like: `sh request-to-price-endpoint.sh <CUSTOMER_HOSTNAME>`'
  echo 'Available hostnames: skynet, umbrellacorp';
  exit 1
fi

curl -H "hostname: $1" http://localhost:3000/price