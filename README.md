# 🚀 Yumu-Core

Yumu-Core is a **modern, clean and extensible boilerplate** for building Discord bots using
**Discord.js v14** and **TypeScript**.

The project uses **Bun as its default runtime** for development and builds, focusing on speed and
great developer experience — while still keeping **full compatibility with Node.js** for anyone who
prefers it.

> ⚡ Bun is the default. Node.js is optional. No lock-in.

---

## ✨ Features

-   🤖 Discord.js v14
-   🧠 TypeScript with strict configuration
-   ⚡ Bun-first workflow (fast install, fast dev)
-   🔁 Optional Node.js support
-   🎨 Colorized logs with `picocolors`
-   🔐 Environment configuration with `dotenv`
-   🐳 Docker support (Bun & Node images)
-   🧩 Clean and scalable project structure

---

## 🧠 Why Bun?

Bun is used as the default runtime mainly because it offers:

-   🚀 Much faster dependency installation
-   ⚡ Faster startup and execution for dev scripts
-   🛠 Built-in TypeScript support (less tooling)
-   📦 Unified toolchain (`bun install`, `bun run`, `bun build`)

Despite that, **no Bun-specific APIs are required**.

If you prefer Node.js, you can switch runtimes easily using alternative scripts or Docker images.

---

## 📋 Prerequisites

Before starting, you need a Discord bot token.

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Create an application and a bot
3. Copy the bot token

Create a `.env` file in the project root (or rename `.env.example`):

```env
DISCORD_TOKEN=your_token_here
```

---

## 📦 Installation

### Using Bun (default)

```bash
bun install
```

### Using Node.js (optional)

```bash
npm install
# or
yarn install
# or
pnpm install
```

---

## 🛠 Development Mode

Starts the bot in watch mode and reloads automatically on changes.

### Bun (default)

```bash
bun run dev
```

### Node.js (optional)

```bash
npm run dev:node
```

---

## 📦 Build

Compiles the project into the `dist` directory.

### Bun (default)

```bash
bun run build
```

### Node.js (optional)

```bash
npm run build:node
```

---

## ▶️ Start (Production)

Runs the compiled bot.

### Bun (default)

```bash
bun run start
```

### Node.js (optional)

```bash
npm run start:node
```

---

## 🐳 Docker

This project includes **two Docker setups**:

-   **Bun-based image** (default)
-   **Node.js-based image** (optional)

### Bun Docker image

```bash
docker build -t yumu-core:bund -f Dockerfile .
```

```bash
docker run --env-file .env yumu-core:bund
```

### Node.js Docker image

```bash
docker build -t yumu-core:node -f node.Dockerfile .
```

```bash
docker run --env-file .env yumu-core:node
```

---

## 🔄 Runtime choice summary

-   **Bun** → default, recommended
-   **Node.js** → fully supported, optional
-   No runtime-specific code
-   Switching runtimes requires **no code changes**

---

## 📄 License

This project is licensed under the **MIT License**.

You are free to use, modify and distribute this project.

---

> ✨ Maintained with care by **Vitu2002**
