#!/bin/bash
set -e


if [ $1 = "build" ]; then
    # Build the app
    pnpm run build
fi

# Run migrations
npx prisma generate

# npx prisma migrate deploy

# Start the app
node dist/main 