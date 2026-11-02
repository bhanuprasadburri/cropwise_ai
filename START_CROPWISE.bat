@echo off
title Starting CropWise AI Web Application...
echo ===================================================
echo   CropWise AI - Starting Servers & Database...
echo ===================================================

echo [1/4] Starting XAMPP MySQL Database...
start /min "XAMPP MySQL" "C:\xampp\mysql\bin\mysqld.exe" --defaults-file="C:\xampp\mysql\bin\my.ini" --standalone

echo [2/4] Starting XAMPP Apache (for phpMyAdmin)...
start /min "XAMPP Apache" "C:\xampp\apache\bin\httpd.exe"

echo [3/4] Starting Django REST Backend Server...
cd /d "C:\Users\shaik\.gemini\antigravity\scratch\cropwise-ai\backend"
start /min "CropWise Backend" cmd /k "python manage.py runserver 0.0.0.0:8000"

echo [4/4] Starting Vite Frontend Server...
cd /d "C:\Users\shaik\.gemini\antigravity\scratch\cropwise-ai"
start /min "CropWise Frontend" cmd /k "npm run dev"

timeout /t 3 /nobreak >nul

echo Opening CropWise AI in Web Browser...
start http://localhost:5173

echo ===================================================
echo   CropWise AI is NOW LIVE at http://localhost:5173
echo   phpMyAdmin is at http://localhost/phpmyadmin
echo ===================================================
