#!/bin/bash

# PostgreSQL 16 to 13 Rollback Script
# Use this script if you need to rollback to PostgreSQL 13

set -e

echo "=== PostgreSQL 16 to 13 Rollback Script ==="
echo "⚠️  WARNING: This will rollback to PostgreSQL 13"
echo ""

# Find the most recent backup
LATEST_BACKUP=$(find . -name "backup-*" -type d | sort | tail -1)

if [ -z "$LATEST_BACKUP" ]; then
    echo "❌ No backup directory found! Cannot rollback."
    echo "💡 Backup directories should be named 'backup-YYYYMMDD-HHMMSS'"
    exit 1
fi

BACKUP_FILE="$LATEST_BACKUP/database-backup.sql"

if [ ! -f "$BACKUP_FILE" ]; then
    echo "❌ Backup file not found: $BACKUP_FILE"
    exit 1
fi

echo "📁 Found backup: $LATEST_BACKUP"
echo "📊 Backup size: $(du -h "$BACKUP_FILE" | cut -f1)"
echo ""

read -p "🤔 Are you sure you want to rollback to PostgreSQL 13? (y/N): " confirm
if [[ $confirm != [yY] ]]; then
    echo "❌ Rollback cancelled"
    exit 0
fi

# Load environment variables
source .env

echo ""
echo "🛑 Stopping services..."
docker-compose down

echo ""
echo "🔄 Updating docker-compose.yml to use PostgreSQL 13..."
sed -i.bak 's/postgres:16/postgres:13/g' docker-compose.yml

echo ""
echo "🗑️  Removing PostgreSQL 16 volume..."
docker volume rm cril-bot-main_postgres_data_discord 2>/dev/null || true

echo ""
echo "🔄 Starting services with PostgreSQL 13..."
docker-compose up -d

echo ""
echo "⏳ Waiting for PostgreSQL 13 to be ready..."
sleep 15

# Wait for PostgreSQL to be ready
max_attempts=30
attempt=1
while [ $attempt -le $max_attempts ]; do
    if docker exec bot-db-cril pg_isready -U "$POSTGRES_USER" > /dev/null 2>&1; then
        echo "✅ PostgreSQL 13 is ready!"
        break
    fi
    echo "   Waiting for PostgreSQL... (attempt $attempt/$max_attempts)"
    sleep 5
    attempt=$((attempt + 1))
done

echo ""
echo "📥 Restoring database from backup..."
docker exec -i bot-db-cril psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" < "$BACKUP_FILE"

echo ""
echo "✅ Rollback to PostgreSQL 13 completed successfully!"
