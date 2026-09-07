# 袁靓（Janine Yuan）· AI 产品经理（Agent / 数据智能）主页

静态个人主页，展示 5 个可核验的技术项目 + 真实实习/校园经历。托管于 GitHub Pages：**https://olivia-happy.github.io/janine-portfolio/**

## 本地查看

```powershell
npm start      # http://localhost:4173/
```

无需第三方依赖，纯静态 HTML/CSS/JS。

## 改完怎么发布（三步）

所有修改都在本地做，再推送到 GitHub（上传 = push；pull 是下载，方向别反）：

1. **改**：用记事本 / VS Code 打开本文件夹里的文件改，保存。文案在 `src/data.js`，页面标题在 `index.html`。
2. **看**：本文件夹打开终端跑 `npm start`，浏览器开 http://localhost:4173/ 确认效果（Ctrl+F5 强刷）。
3. **发**：双击 `deploy.bat`，看到「✔ 发布成功」即可，约 1 分钟后线上自动更新。

也可以手动执行同样三步：

```powershell
git add -A
git commit -m "update: 说明这次改了什么"
git push origin master
```

## 修改内容

- 个人信息与案例内容：`src/data.js`
- 页面结构：`src/templates.js`
- 交互：`src/app.js`
- 视觉样式：`src/styles.css`

## 案例直达

- EmbodiedOps 具身诊断：`#case=embodiedops`
- MOBA Build Agent 出装助手：`#case=moba-build-agent`
- FlashSight DRAM 情报：`#case=flashsight`
- AtlasIQ 新能源准入：`#case=atlasiq`
- Visitors 城市旅行规划：`#case=visitors`

## 测试

```powershell
npm test        # node --test，覆盖数据完整性/渲染/路由
```

## 说明

- 案例内容取自对应 GitHub 仓库的真实 README/PRD/案例页，指标不虚构。
- 联系邮箱仅展示本人求职邮箱 mgalforever@163.com，不展示手机号。
- 视觉层借鉴 [Innei/Shiro](https://github.com/Innei/Shiro) 的设计语言（双主题、玻璃拟态、胶囊按钮），未使用其代码；本站样式为原创。Shiro 源码克隆在本地 `Shiro/` 目录（已 gitignore，不随本仓库发布）。
