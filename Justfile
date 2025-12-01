dev:
    pnpm run dev

build:
    pnpm run build

deploy:
    pnpm run build
    # rename dist to docs
    mv dist docs