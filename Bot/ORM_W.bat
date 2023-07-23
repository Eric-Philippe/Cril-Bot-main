@echo off

REM Chargez les variables d'environnement à partir du fichier .env en utilisant dotenv-cli pour Windows
dotenv.cmd -e .env -- typeorm-model-generator -h %DB_HOST% -d %DB_NAME% -p %DB_PORT% -u %DB_USER% -x %DB_PASS% -e postgres -o src/
