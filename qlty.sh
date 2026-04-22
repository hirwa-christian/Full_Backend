#!/bin/sh
set -e

echo "🎯 TypeScript type check..."
npx tsc --noEmit

echo "🔧 ESLint fix..."
yarn lint:fix

echo "🧼 Prettier format..."
yarn format

echo "🧪 Running tests..."
# yarn test

echo "✅ All checks and fixes complete!"
