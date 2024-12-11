# AI-architect

<img src="src/assets/images/ai-architect.svg" alt="AI-architect" width="300">

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue)
![Rust](https://img.shields.io/badge/Rust-1.82.0-orange)
![Tauri](https://img.shields.io/badge/Tauri-2.1.0-yellow)

AI-architect is a modern desktop application that revolutionizes the way you design and implement AI model architectures. Through an intuitive graphical interface, you can create complex deep learning model flows using nodes and edges, which automatically generate corresponding PyTorch code. Built with a powerful stack of modern technologies, it combines the performance of Rust with the flexibility of React to provide a seamless user experience.

<details><summary><h2>Technology Stack</h2></summary>
AI-architect is built using a modern, robust technology stack that ensures high performance, type safety, and an excellent developer experience:

---

### Frontend

- **React 18**: Powers our responsive and interactive user interface
- **TypeScript**: Ensures type safety and improves code maintainability
- **Tailwind CSS**: Provides utility-first styling for consistent and maintainable design
- **Zustand**: Manages application state with a simple yet powerful approach
- **Vite**: Offers lightning-fast development server and optimized builds

### Backend

- **Rust**: Delivers high-performance, memory-safe backend operations
- **Tauri**: Creates efficient, secure native applications with web technologies

This combination of technologies allows us to create a desktop application that is both powerful and user-friendly, with near-native performance and cross-platform compatibility.

</details>

## Table of Contents

- [AI-architect](#ai-architect)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [System Requirements](#system-requirements)
    - [Installation](#installation)
  - [Development](#development)
    - [Project Structure](#project-structure)
  - [Usage](#usage)
    - [0. Get Anthropic apikey](#0-get-anthropic-apikey)
    - [1. Set nodes](#1-set-nodes)
    - [2. Connect](#2-connect)
    - [3. Set value](#3-set-value)
    - [4. Check flow image](#4-check-flow-image)
    - [5. Enter anthropic apikey](#5-enter-anthropic-apikey)
    - [6. Generate code](#6-generate-code)
    - [7. Copy \& paste](#7-copy--paste)
    - [Features](#features)
      - [Sidebar](#sidebar)
      - [ContextMenu](#contextmenu)
      - [Connection validation](#connection-validation)
      - [](#)
  - [License](#license)
  - [References](#references)
  - [Contact](#contact)

## Getting Started

### System Requirements

Your system should meet the following requirements to run AI-architect:

- Operating System:
  - Windows
  - Linux (Ubuntu recommended)

### Installation

To install AI-architect, please visit [Release](https://github.com/Wihyeongsu/Wihyeongsu/releases) and download the appropriate installer for your operating system:

For Windows users:

- Download the `.exe` installer file

(Unsupported)~~For macOS users~~:

- ~~Download the `.dmg` file~~

For Linux users:

- Download the `.deb` file

After installation, you can launch AI-architect from your system's application menu.

## Development

### Project Structure

```
ai-architect/
├── public/
├── src/
│  ├── assets/
│  ├── components/
│  │  ├── Handles/
│  │  ├── Nodes/
│  │  ├── icons/
│  │  ├── ui/
│  │  ├── Flow.tsx
│  │  └── ...
│  ├── hooks/
│  ├── lib/
│  ├── store/
│  │  └── anthropicResponseStore.ts
│  ├── types/
│  │  ├── Nodes/
│  │  ├── Actication.types.ts
│  │  ├── DataFormat.types.ts
│  │  └── Sidebar.types.ts
│  ├── utils/
│  ├── App.css
│  ├── App.tsx
│  └── main.tsx
└── src-tauri/
   ├── src/
   │  ├── Anthropic_api/
   │  │  ├── Prompt/
   │  │  │  └── system_prompt.txt
   │  │  ├── mod.rs
   │  │  ├── types.rs
   │  │  ├── error.rs
   │  │  ├── headers.rs
   │  │  ├── message_request.rs
   │  │  └── anthropic.rs
   │  ├── lib.rs
   │  └── main.rs
   ├── build.rs
   ├── Cargo.lock
   ├── Cargo.toml
   └── tauri.conf.json
```

## Usage

### 0. Get Anthropic apikey

[Get apikey](https://console.anthropic.com/settings/keys)

### 1. Set nodes

### 2. Connect

### 3. Set value

### 4. Check flow image

<img src="Demo/Demo_flow.png" width="100" alt="이미지 설명">

### 5. Enter anthropic apikey

### 6. Generate code

### 7. Copy & paste

### Features

#### Sidebar

#### ContextMenu

#### Connection validation

####

## License

AI-architect is released under the MIT License, which means you can freely use, modify, distribute, and even use the code commercially. The only requirement is to include the original copyright notice and license text.

```
MIT License
Copyright (c) 2024 Wihyeongsu
```

See the [LICENSE.md](LICENSE.md) file for the full license text.

This license was chosen to:

- Allow maximum freedom for developers and users
- Enable commercial use of the software
- Maintain simplicity in licensing terms
- Promote widespread adoption of the project

## References

- [Typescript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [ReactFlow](https://reactflow.dev/)
- [Prism](https://prismjs.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Tailwind css](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Rust](https://www.rust-lang.org/)
- [reqwest](https://docs.rs/reqwest/0.12.9/reqwest/)
- [Tauri](https://v2.tauri.app/)
- [Pytorch](https://pytorch.org/docs/stable/nn.html)
- [Css Animation](https://blog.hubspot.com/website/css-animation-examples)
- [Anthroppic API](https://docs.anthropic.com/en/api/getting-started)

## Contact

<a href="https://github.com/Wihyeongsu/Wihyeongsu" target="_blank">
    <img src="src/assets/images/github.svg" alt="GitHub" width="20">
</a>

---

Start building powerful AI models visually with AI-architect today! 🚀

Your feedback and contributions help make AI-architect better for everyone in the community.
