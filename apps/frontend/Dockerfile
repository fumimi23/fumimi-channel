# Multi-stage build for React + Vite application

# Build stage
FROM node:22-alpine AS builder

# Enable pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Copy workspace configuration
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY tsconfig.base.json ./

# Copy all package.json files
COPY apps/frontend/package.json ./apps/frontend/
COPY apps/backend/package.json ./apps/backend/
COPY packages/ui/package.json ./packages/ui/
COPY packages/shared/package.json ./packages/shared/
COPY packages/database/package.json ./packages/database/

# Install dependencies
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Copy source files before building
COPY apps/frontend ./apps/frontend
COPY apps/backend ./apps/backend
COPY packages/ui ./packages/ui
COPY packages/shared ./packages/shared
COPY packages/database ./packages/database

# Build shared packages first
WORKDIR /app/packages/database
RUN pnpm run db:generate
RUN pnpm run build

WORKDIR /app/packages/shared
RUN pnpm run build

# Build the application
WORKDIR /app/apps/frontend
RUN pnpm run build

# Production stage
FROM nginx:1.27-alpine

# Copy built files from builder
COPY --from=builder /app/apps/frontend/dist /usr/share/nginx/html

# Copy nginx configuration
COPY apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
