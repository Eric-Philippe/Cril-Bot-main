#!/bin/bash

# PostgreSQL 13 to 16 Upgrade Script
# This script safely upgrades PostgreSQL while preserving data

set -e  # Exit on any error

echo "=== PostgreSQL 13 to 16 Upgrade Script ==="
echo "This script will safely upgrade your PostgreSQL database"
echo ""

# Load environment variables
if [ ! -f .env ]; then
    echo "❌ .env file not found! Please create it from .env.example"
    exit 1
fi

source .env

# Validate required environment variables
if [ -z "$POSTGRES_USER" ] || [ -z "$POSTGRES_PASSWORD" ] || [ -z "$POSTGRES_DB" ]; then
    echo "❌ Missing required environment variables in .env file"
    echo "Required: POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB"
    exit 1
fi

BACKUP_DIR="./backup-$(date +%Y%m%d-%H%M%S)"
BACKUP_FILE="$BACKUP_DIR/database-backup.sql"

echo "📦 Step 1: Creating backup directory..."
mkdir -p "$BACKUP_DIR"

echo "📋 Step 2: Creating database backup..."
echo "This may take a few minutes depending on your database size..."

# Create backup using pg_dump from the running container
docker exec bot-db-cril pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" > "$BACKUP_FILE"

if [ $? -eq 0 ]; then
    echo "✅ Database backup created successfully: $BACKUP_FILE"
    echo "📊 Backup size: $(du -h "$BACKUP_FILE" | cut -f1)"
else
    echo "❌ Backup failed! Stopping upgrade process."
    exit 1
fi

echo ""
echo "🛑 Step 3: Stopping services..."
docker-compose down

echo ""
echo "🗑️  Step 4: Removing old PostgreSQL volume (data will be restored from backup)..."
docker volume rm cril-bot-main_postgres_data_discord 2>/dev/null || true

echo ""
echo "🔄 Step 5: Starting services with PostgreSQL 16..."
docker-compose up -d

echo ""
echo "⏳ Step 6: Waiting for PostgreSQL 16 to be ready..."
sleep 15

# Wait for PostgreSQL to be ready
max_attempts=30
attempt=1
while [ $attempt -le $max_attempts ]; do
    if docker exec bot-db-cril pg_isready -U "$POSTGRES_USER" > /dev/null 2>&1; then
        echo "✅ PostgreSQL 16 is ready!"
        break
    fi
    echo "   Waiting for PostgreSQL... (attempt $attempt/$max_attempts)"
    sleep 5
    attempt=$((attempt + 1))
done

if [ $attempt -gt $max_attempts ]; then
    echo "❌ PostgreSQL failed to start after $max_attempts attempts"
    exit 1
fi

echo ""
echo "📥 Step 7: Restoring database from backup..."
docker exec -i bot-db-cril psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" < "$BACKUP_FILE"

if [ $? -eq 0 ]; then
    echo "✅ Database restored successfully!"
else
    echo "❌ Database restoration failed!"
    echo "💡 You can manually restore using: docker exec -i bot-db-cril psql -U $POSTGRES_USER -d $POSTGRES_DB < $BACKUP_FILE"
    exit 1
fi

echo ""
echo "🔍 Step 8: Verifying database integrity..."
# Test database connection and check some tables
docker exec bot-db-cril psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "SELECT COUNT(*) as table_count FROM information_schema.tables WHERE table_schema = 'public';"

echo ""
echo "🎉 PostgreSQL upgrade completed successfully!"
echo "📁 Backup saved in: $BACKUP_DIR"
echo "💡 Keep this backup until you're sure everything works correctly"
echo ""
echo "🚀 You can now start your bot application!"
