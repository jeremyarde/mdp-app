dev:
    pnpm run dev

build:
    cp -r ~/Documents/code/markdownparser/backend/pkg ./backend
    rm -rf ./backend/pkg/.gitignore
    pnpm run build