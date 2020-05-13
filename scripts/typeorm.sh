#!/bin/bash
echo "command : $1"
echo "service : $2"

if [ $1 == "generate" ] || [ $1 == "create" ]; then
npx ts-node -r tsconfig-paths/register apps/$2/src/scripts/generateOrmConfig.ts
echo "tag : $3"
npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:$1 -f apps/$2/src/ormconfig.json -n $3
elif [ $1 == "run" ]; then
npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -f apps/$2/src/ormconfig.json
fi