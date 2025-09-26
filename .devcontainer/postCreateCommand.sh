#!/usr/bin/env bash

set -euxo pipefail
sudo mise trust -- --non-interactive && sudo mise install --yes
