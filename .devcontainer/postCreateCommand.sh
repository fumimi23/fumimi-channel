#!/usr/bin/env bash

set -euxo pipefail

sudo mise trust -- --non-interactive && sudo mise install --yes

# なぜかpnpmコマンドを実行するとpermission deniedになるため、権限を変更する。
sudo chmod 775 /mise/installs/pnpm/10.17.1/pnpm

pnpm install
