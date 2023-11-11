#!/bin/bash

# Check rsnapshot configtest
configtest_output=$(rsnapshot configtest 2>&1)
if [[ "$configtest_output" == *"Syntax OK"* ]]; then
    echo "rsnapshot configuration test passed"
else
    echo "rsnapshot configuration test failed: $configtest_output"
    exit 1
fi

# Check if crond process is running
if ps aux | grep "crond"; then
    echo "crond is running"
else
    echo "crond is not running"
    exit 1
fi

# If all checks pass, exit with success
exit 0
