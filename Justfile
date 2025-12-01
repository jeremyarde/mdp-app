dev:
    pnpm run dev

build:
    pnpm run build

deploy:
    pnpm run build
    gh-pages -d dist