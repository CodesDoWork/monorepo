#!/bin/sh

awk -F'"' '/os\.getenv/ {print "env " $2 ";"}' ./lua/* > /usr/local/openresty/nginx/conf/envs.conf

./"$CONFIG_APP_NAME" &
PID_GO=$!

/usr/local/openresty/bin/openresty -g 'daemon off;' &
PID_OR=$!

cleanup() {
    echo "Stopping processes..."
    kill -TERM "$PID_GO" "$PID_OR"
}

trap cleanup SIGTERM SIGINT SIGQUIT
wait "$PID_GO" "$PID_OR"
