#!/bin/bash
echo "=== DAB CONFIG DUMP ==="
cat dab-config.json
chmod +x ./Microsoft.DataApiBuilder
./Microsoft.DataApiBuilder start --config dab-config.json --LogLevel Information
