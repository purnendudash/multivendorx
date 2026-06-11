name: REST Documentation

on:
  workflow_dispatch:
    inputs:
      plugin:
        description: Plugin
        required: true
        default: multivendorx
        type: choice
        options:
          - multivendorx
          - moowoodle
          - catalogx
          - notifima

permissions:
  contents: write

jobs:
  docs:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 24

      - run: corepack enable

      - run: pnpm install --no-frozen-lockfile

      - run: |
          pnpm add -Dw \
            ts-node \
            typescript \
            redoc-cli

      - name: Generate OpenAPI
        run: |
          pnpm exec ts-node \
          tools/rest-docs/generate-openapi.ts \
          "${{ github.event.inputs.plugin }}"

      - name: Build Redoc
        run: |
          cp tools/rest-docs/templates/redoc.html index.html

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: .
