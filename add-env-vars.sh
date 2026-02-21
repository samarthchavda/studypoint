#!/bin/bash

# Read environment variables from server/.env and add them to Vercel
while IFS='=' read -r key value; do
  # Skip comments and empty lines
  if [[ $key =~ ^#.*$ ]] || [[ -z $key ]]; then
    continue
  fi
  
  # Remove any quotes from the value
  value=$(echo "$value" | sed 's/^["'\'']//' | sed 's/["'\'']$//')
  
  echo "Adding $key to Vercel..."
  echo "$value" | vercel env add "$key" production --yes 2>&1 | grep -v "WARN"
  echo "$value" | vercel env add "$key" preview --yes 2>&1 | grep -v "WARN"
done < server/.env

echo "✅ All environment variables added to Vercel!"
