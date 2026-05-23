set shell := ["bash", "-cu"]

# 預設顯示可用指令
default:
    @just --list

# 安裝 mise 管理的工具 (just 等)
install:
    mise install

# 本機預覽網站 (http://localhost:8080)
dev:
    python3 -m http.server 8080

# 提交並推送變更 (用法: just deploy "更新文案")
deploy message="chore: update site":
    git add -A
    git commit -m "{{message}}" || echo "沒有需要提交的變更"
    git push origin main

# 拉取最新版本
update:
    git pull --rebase origin main

# 啟用 GitHub Pages (首次部署用)
pages-enable:
    gh api -X POST repos/{{`gh repo view --json nameWithOwner -q .nameWithOwner`}}/pages \
        -f "source[branch]=main" -f "source[path]=/" || \
    gh api -X PUT repos/{{`gh repo view --json nameWithOwner -q .nameWithOwner`}}/pages \
        -f "source[branch]=main" -f "source[path]=/"

# 顯示已部署網址
url:
    @gh api repos/{{`gh repo view --json nameWithOwner -q .nameWithOwner`}}/pages -q .html_url
