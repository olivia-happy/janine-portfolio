@echo off
chcp 65001 >nul
title 发布个人主页
cd /d %~dp0

echo ============================================
echo   第 1 步 / 检查改动并提交
echo ============================================
git add -A
git commit -m "update: 手动更新内容 %date% %time:~0,5%"
if %errorlevel%==0 (
  echo 已提交。
) else (
  echo 没有新改动可提交，直接尝试推送。
)

echo.
echo ============================================
echo   第 2 步 / 推送到 GitHub（约 1 分钟后线上生效）
echo ============================================
git push origin master
if %errorlevel%==0 (
  echo.
  echo   ✔ 发布成功！稍等 1 分钟后访问：
  echo   https://olivia-happy.github.io/janine-portfolio/
) else (
  echo.
  echo   ✘ 推送失败：检查网络（可能需要代理），或 GitHub 登录是否过期。
)

echo.
pause
