#!/bin/bash

curl -L https://github.com/Azure/data-api-builder/releases/latest/download/Microsoft.DataApiBuilder.1.4.35.nupkg -o dab.nupkg

dotnet tool install --add-source ./ --tool-path ./tools Microsoft.DataApiBuilder --version 1.4.35

./tools/dab start
