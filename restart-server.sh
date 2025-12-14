#!/bin/bash

echo "🔄 Перезапуск production сервера..."

# Kill existing Next.js processes
pkill -f "next start" 2>/dev/null
pkill -f "node.*next" 2>/dev/null

sleep 2

cd /Users/stefani/Desktop/12Stuliev100letV7

echo "🚀 Запуск нового сервера..."
npm run start

