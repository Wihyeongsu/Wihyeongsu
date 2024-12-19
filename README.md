# AI-architect

<img src="src/assets/images/ai-architect.svg" alt="AI-architect" width="300">

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-0.1.1-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue)
![Rust](https://img.shields.io/badge/Rust-1.82.0-orange)
![Tauri](https://img.shields.io/badge/Tauri-2.1.0-yellow)

AI-architect is a modern desktop application that revolutionizes the way you design and implement AI model architectures. Through an intuitive graphical interface, you can create complex deep learning model flows using nodes and edges, which automatically generate corresponding PyTorch code. Built with a powerful stack of modern technologies, it combines the performance of Rust with the flexibility of React to provide a seamless user experience.

## Demo

https://github.com/user-attachments/assets/e59f1850-4179-47dd-8baa-6ce2a5a03f99

<details><summary><h2>Technology Stack</h2></summary>

## Architecture

<img src="Demo/Ai-architect.drawio.svg" alt="Architecture" width="1000">

AI-architect is built using a modern, robust technology stack that ensures high performance, type safety, and an excellent developer experience:

---

### Frontend

- **React**: Powers our responsive and interactive user interface
- **TypeScript**: Ensures type safety and improves code maintainability
- **Tailwind CSS**: Provides utility-first styling for consistent and maintainable design
- **Zustand**: Manages application state with a simple yet powerful approach
- **Vite**: Offers lightning-fast development server and optimized builds
- **ReactFlow**: Enables interactive node-based diagrams and workflows
- **Prism**: Provides elegant syntax highlighting for code blocks

### Backend

- **Rust**: Delivers high-performance, memory-safe backend operations
- **Tauri**: Creates efficient, secure native applications with web technologies

This combination of technologies allows us to create a desktop application that is both powerful and user-friendly, with near-native performance and cross-platform compatibility.

</details>

## Table of Contents

- [AI-architect](#ai-architect)
  - [Demo](#demo)
  - [Architecture](#architecture)
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
    - [5. Enter anthropic apikey \& Generate code](#5-enter-anthropic-apikey--generate-code)
    - [6. Copy \& paste](#6-copy--paste)
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

(Unsupported)~~For Linux users:~~

~~- Download the `.deb` file~~

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

https://github.com/user-attachments/assets/89de0915-b4a8-4e61-9cd1-f10dbb42a644

### 2. Connect

https://github.com/user-attachments/assets/c6f11410-901e-479e-a25f-edc8d8e6f495

### 3. Set value

https://github.com/user-attachments/assets/f522642e-65fb-41dc-9579-3298d9097ef2

### 4. Check flow image

https://github.com/user-attachments/assets/4a3698dd-5a88-47c4-bf9b-f4867363d913

### 5. Enter anthropic apikey & Generate code

https://github.com/user-attachments/assets/3b17d701-33c2-476a-8aef-e08ebfbd3a5b

### 6. Copy & paste

https://github.com/user-attachments/assets/7ddd7298-d6ae-42bd-9aa5-6a4420e13971

## License

AI-architect is released under the MIT License, which means you can freely use, modify, distribute, and even use the code commercially. The only requirement is to include the original copyright notice and license text.

```
MIT License
Copyright (c) 2024 Wihyeongsu
```

See the [LICENSE](LICENSE) file for the full license text.

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
- [CSS Animation](https://blog.hubspot.com/website/css-animation-examples)
- [Anthroppic API](https://docs.anthropic.com/en/api/getting-started)

## Contact

<a href="https://github.com/Wihyeongsu/Wihyeongsu" target="_blank">
    <img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgNTAgNTAiIHdpZHRoPSI1MDBweCIgaGVpZ2h0PSI1MDBweCI+PHBhdGggZD0iTSAyNSAyIEMgMTIuMzExMzM1IDIgMiAxMi4zMTEzMzUgMiAyNSBDIDIgMzcuNjg4NjY1IDEyLjMxMTMzNSA0OCAyNSA0OCBDIDM3LjY4ODY2NSA0OCA0OCAzNy42ODg2NjUgNDggMjUgQyA0OCAxMi4zMTEzMzUgMzcuNjg4NjY1IDIgMjUgMiB6IE0gMjUgNCBDIDM2LjYwNzMzNSA0IDQ2IDEzLjM5MjY2NSA0NiAyNSBDIDQ2IDI1LjA3MTM3MSA0NS45OTQ4NDkgMjUuMTQxNjg4IDQ1Ljk5NDE0MSAyNS4yMTI4OTEgQyA0NS4zNTQ1MjcgMjUuMTUzODUzIDQ0LjYxNTUwOCAyNS4wOTc3NzYgNDMuNjc1NzgxIDI1LjA2NDQ1MyBDIDQyLjM0NzA2MyAyNS4wMTczMzYgNDAuNjcyMjU5IDI1LjAzMDk4NyAzOC43NzM0MzggMjUuMTI1IEMgMzguODQzODUyIDI0LjYzNDY1MSAzOC44OTMyMDUgMjQuMTM3Mzc3IDM4Ljg5NDUzMSAyMy42MjY5NTMgQyAzOC45OTEzNjEgMjEuNzU0MzMyIDM4LjM2MjUyMSAyMC4wMDI0NjQgMzcuMzM5ODQ0IDE4LjQ1NTA3OCBDIDM3LjU4NjkxMyAxNy42MDEzNTIgMzcuODc2NzQ3IDE2LjUxNTIxOCAzNy45NDkyMTkgMTUuMjgzMjAzIEMgMzguMDMxODE5IDEzLjg3ODkyNSAzNy45MTA1OTkgMTIuMzIxNzY1IDM2Ljc4MzIwMyAxMS4yNjk1MzEgTCAzNi40OTQxNDEgMTEgTCAzNi4wOTk2MDkgMTEgQyAzMy40MTY1MzkgMTEgMzEuNTgwMDIzIDEyLjEyMzIxIDMwLjQ1NzAzMSAxMy4wMTM2NzIgQyAyOC44MzU1MjkgMTIuMzg2MDIyIDI3LjAxMjIyIDEyIDI1IDEyIEMgMjIuOTc2MzY3IDEyIDIxLjEzNTUyNSAxMi4zOTE0MTYgMTkuNDQ3MjY2IDEzLjAxNzU3OCBDIDE4LjMyNDkxMSAxMi4xMjY2OTEgMTYuNDg2Nzg1IDExIDEzLjgwMDc4MSAxMSBMIDEzLjQwODIwMyAxMSBMIDEzLjExOTE0MSAxMS4yNjc1NzggQyAxMi4wMjA5NTYgMTIuMjg3MzIxIDExLjkxOTc3OCAxMy44MDE3NTkgMTEuOTg4MjgxIDE1LjE5OTIxOSBDIDEyLjA0ODY5MSAxNi40MzE1MDYgMTIuMzIxNzMyIDE3LjU1MjE0MiAxMi41NjQ0NTMgMTguNDQ3MjY2IEMgMTEuNTI0NDg5IDIwLjAyNDg2IDEwLjkwMDM5MSAyMS44MjIwMTggMTAuOTAwMzkxIDIzLjU5OTYwOSBDIDEwLjkwMDM5MSAyNC4xMTEyMzcgMTAuOTQ3OTY5IDI0LjYxMDA3MSAxMS4wMTc1NzggMjUuMTAxNTYyIEMgOS4yMTE4MTczIDI1LjAxNzgwOCA3LjYwMjA5OTYgMjUuMDAxNjY4IDYuMzI0MjE4OCAyNS4wNDY4NzUgQyA1LjM4NDUxNDMgMjUuMDgwMTE4IDQuNjQ1NDQyMiAyNS4xMzU3MTMgNC4wMDU4NTk0IDI1LjE5NTMxMiBDIDQuMDA1MjYyOCAyNS4xMjk5NzIgNCAyNS4wNjU0ODIgNCAyNSBDIDQgMTMuMzkyNjY1IDEzLjM5MjY2NSA0IDI1IDQgeiBNIDE0LjM5NjQ4NCAxMy4xMzA4NTkgQyAxNi40MTQwNjcgMTMuMzIyMDQzIDE3LjkzMTk5NSAxNC4yMjI5NzIgMTguNjM0NzY2IDE0Ljg0NzY1NiBMIDE5LjEwMzUxNiAxNS4yNjE3MTkgTCAxOS42ODE2NDEgMTUuMDI1MzkxIEMgMjEuMjYzMDkyIDE0LjM3NDIwNSAyMy4wMjY5ODQgMTQgMjUgMTQgQyAyNi45NzMwMTYgMTQgMjguNzM3MzkzIDE0LjM3NjA3NiAzMC4xOTkyMTkgMTUuMDE1NjI1IEwgMzAuNzg1MTU2IDE1LjI3MzQzOCBMIDMxLjI2MzY3MiAxNC44NDc2NTYgQyAzMS45NjY2ODMgMTQuMjIyNzU4IDMzLjQ4NzE4NCAxMy4zMjE1NTQgMzUuNTA1ODU5IDEzLjEzMDg1OSBDIDM1Ljc3NDI1NiAxMy41NzU4NDEgMzYuMDA3NDg2IDE0LjIwODY2OCAzNS45NTExNzIgMTUuMTY2MDE2IEMgMzUuODgzNzcyIDE2LjMxMTczNyAzNS41NzczMDQgMTcuNTU5NjU4IDM1LjM0NTcwMyAxOC4zMDA3ODEgTCAzNS4xOTUzMTIgMTguNzgzMjAzIEwgMzUuNDk0MTQxIDE5LjE5MTQwNiBDIDM2LjQ4MzYxNiAyMC41NDA2OTEgMzYuOTg4MTIxIDIyLjAwMDkzNyAzNi45MDIzNDQgMjMuNTQ0OTIyIEwgMzYuOTAwMzkxIDIzLjU3MjI2NiBMIDM2LjkwMDM5MSAyMy41OTk2MDkgQyAzNi45MDAzOTEgMjYuMDk1MDY0IDM2LjAwMTc4IDI4LjA5MjMzOSAzNC4wODc4OTEgMjkuNTcyMjY2IEMgMzIuMTc0MDQ4IDMxLjA1MjE5OSAyOS4xNTI2NjMgMzIgMjQuOTAwMzkxIDMyIEMgMjAuNjQ4MTE4IDMyIDE3LjYyNDgyNyAzMS4wNTIxOTIgMTUuNzEwOTM4IDI5LjU3MjI2NiBDIDEzLjc5NzA0NyAyOC4wOTIzMzkgMTIuOTAwMzkxIDI2LjA5NTA2NCAxMi45MDAzOTEgMjMuNTk5NjA5IEMgMTIuOTAwMzkxIDIyLjEzNDkwMyAxMy40MjkzMDggMjAuNTIzNTk5IDE0LjQwNjI1IDE5LjE5MTQwNiBMIDE0LjY5OTIxOSAxOC43OTI5NjkgTCAxNC41NTg1OTQgMTguMzE4MzU5IEMgMTQuMzI2ODY2IDE3LjUzMDQ4NCAxNC4wNDI4MjUgMTYuMjU0MTAzIDEzLjk4NjMyOCAxNS4xMDE1NjIgQyAxMy45MzkzMzggMTQuMTQyOTQgMTQuMTY2MjIxIDEzLjUzNzAyNyAxNC4zOTY0ODQgMTMuMTMwODU5IHogTSA4Ljg4NDc2NTYgMjYuMDIxNDg0IEMgOS41OTE0NTc1IDI2LjAzMDUxIDEwLjQwMTQ2IDI2LjA2ODY1NiAxMS4yMTI4OTEgMjYuMTA5Mzc1IEMgMTEuMjkwNDE5IDI2LjQyMTE3MiAxMS4zNzg4MjIgMjYuNzI3ODk4IDExLjQ4NjMyOCAyNy4wMjczNDQgQyA4LjE3ODk3MiAyNy4wOTcwOTIgNS43MDQ3MzA5IDI3LjQyOTY3NCA0LjE3OTY4NzUgMjcuNzE0ODQ0IEMgNC4xMTUyMDY4IDI3LjIxNDQ5NCA0LjA2Mzg0ODMgMjYuNzEwMDIxIDQuMDM1MTU2MiAyNi4xOTkyMTkgQyA1LjE2MjIwNTggMjYuMDkyMjYyIDYuNzUwOTk3MiAyNS45OTQyMzMgOC44ODQ3NjU2IDI2LjAyMTQ4NCB6IE0gNDEuMTE1MjM0IDI2LjAzNzEwOSBDIDQzLjI0NzUyNyAyNi4wMTAwMzMgNDQuODM1NzI4IDI2LjEwODE1NiA0NS45NjI4OTEgMjYuMjE0ODQ0IEMgNDUuOTM0MjM0IDI2LjcxODMyOCA0NS44ODM3NDkgMjcuMjE1NjY0IDQ1LjgyMDMxMiAyNy43MDg5ODQgQyA0NC4yNDA3NyAyNy40MTkyMSA0MS42OTk2NzQgMjcuMDg2Njg4IDM4LjMwNjY0MSAyNy4wMzMyMDMgQyAzOC40MTE5NDUgMjYuNzM5Njc3IDM4LjQ5OTYyNyAyNi40MzgyMTkgMzguNTc2MTcyIDI2LjEzMjgxMiBDIDM5LjQ3MTI5MSAyNi4wODQ4MzMgNDAuMzQ0NTY0IDI2LjA0Njg5NiA0MS4xMTUyMzQgMjYuMDM3MTA5IHogTSAxMS45MTIxMDkgMjguMDE5NTMxIEMgMTIuNTA4ODQ5IDI5LjIxNTMyNyAxMy4zNjE1MTYgMzAuMjgzMDE5IDE0LjQ4ODI4MSAzMS4xNTQyOTcgQyAxNi4wMjg4MjUgMzIuMzQ1NTMxIDE4LjAzMTYyMyAzMy4xNzc4MzggMjAuNDc2NTYyIDMzLjYyMzA0NyBDIDIwLjE1NjY5OSAzMy45NTE2OTggMTkuODY1NzggMzQuMzEyNTk1IDE5LjYwNzQyMiAzNC42OTMzNTkgTCAxOS41NDY4NzUgMzQuNjQwNjI1IEMgMTkuNTUyMzc1IDM0LjYzNDMyNSAxOS4wNDk3NSAzNC44ODU4NzggMTguMjk4ODI4IDM0Ljk1MzEyNSBDIDE3LjU0NzkwNiAzNS4wMjAzNzQgMTYuNjIxNjE1IDM1IDE1LjgwMDc4MSAzNSBDIDE0LjU3NTc4MSAzNSAxNC4wMzYyMSAzNC40MjEyMSAxMy4xNzM4MjggMzMuMzY3MTg4IEMgMTIuNjk2MjgzIDMyLjcyMzU2IDEyLjExNDEwMSAzMi4yMDIzMzEgMTEuNTQ4ODI4IDMxLjgwNjY0MSBDIDEwLjk3MDAyMSAzMS40MDE0NzUgMTAuNDc2MjU5IDMxLjExNTUwOSA5Ljg2NTIzNDQgMzEuMDEzNjcyIEwgOS43ODMyMDMxIDMxIEwgOS42OTkyMTg4IDMxIEMgOS4yMzI1NTIxIDMxIDguNzgwOTgzNSAzMS4wMzM3OSA4LjM1OTM3NSAzMS41MTU2MjUgQyA4LjE0ODU3MDcgMzEuNzU2NTQ0IDguMDAzMjc3IDMyLjIwMjU2MSA4LjA5NzY1NjIgMzIuNTgwMDc4IEMgOC4xOTIwMzUyIDMyLjk1NzU5NSA4LjQzMDg1NjMgMzMuMTg5NTgxIDguNjQ0NTMxMiAzMy4zMzIwMzEgQyAxMC4wMTEyNTQgMzQuMjQzMTggMTAuMjUyNzk1IDM2LjA0NjUxMSAxMS4xMDkzNzUgMzcuNjUwMzkxIEMgMTEuOTA5Mjk4IDM5LjI0NDMxNSAxMy42MzU2NjIgNDAgMTUuNDAwMzkxIDQwIEwgMTggNDAgTCAxOCA0NC44MDI3MzQgQyAxMC45Njc4MTEgNDIuMzIwNTM1IDUuNjY0Njc5NSAzNi4yMDQ2MTMgNC4zMzIwMzEyIDI4LjcwMzEyNSBDIDUuODYyOTMzOCAyOC40MTQ3NzYgOC40MjY1Mzg3IDI4LjA2ODEwOCAxMS45MTIxMDkgMjguMDE5NTMxIHogTSAzNy44ODI4MTIgMjguMDI3MzQ0IEMgNDEuNDQ1NTM4IDI4LjA1Nzg0IDQ0LjA4MTA1IDI4LjQwNDA2MSA0NS42Njk5MjIgMjguNjk3MjY2IEMgNDQuMzM5MDQ3IDM2LjIwMTUwNCAzOS4wMzQwNzIgNDIuMzE5ODcgMzIgNDQuODAyNzM0IEwgMzIgMzkuNTk5NjA5IEMgMzIgMzguMDE1MDQxIDMxLjQ3OTY0MiAzNi4yNjc3MTIgMzAuNTc0MjE5IDM0LjgxMDU0NyBDIDMwLjI5OTMyMiAzNC4zNjgxMzUgMjkuOTc1OTQ1IDMzLjk0OTczNiAyOS42MTUyMzQgMzMuNTc0MjE5IEMgMzEuOTMwNDUzIDMzLjExNjg0IDMzLjgzMjM2NCAzMi4yOTg4MjEgMzUuMzEyNSAzMS4xNTQyOTcgQyAzNi40MzY4MjQgMzAuMjg0OTA3IDM3LjI4NzU4OCAyOS4yMjA0MjQgMzcuODgyODEyIDI4LjAyNzM0NCB6IE0gMjMuNjk5MjE5IDM0LjA5OTYwOSBMIDI2LjUgMzQuMDk5NjA5IEMgMjcuMzEyODIxIDM0LjA5OTYwOSAyOC4xODA0MjMgMzQuNzQ3NCAyOC44NzUgMzUuODY1MjM0IEMgMjkuNTY5NTc3IDM2Ljk4MzA2OSAzMCAzOC40ODQxNzcgMzAgMzkuNTk5NjA5IEwgMzAgNDUuMzk4NDM4IEMgMjguMzk3NDA4IDQ1Ljc4OTIzNCAyNi43MjM3OSA0NiAyNSA0NiBDIDIzLjI3NjIxIDQ2IDIxLjYwMjU5MiA0NS43ODkyMzQgMjAgNDUuMzk4NDM4IEwgMjAgMzkuNTk5NjA5IEMgMjAgMzguNTA4ODY5IDIwLjQ2NzgyOCAzNy4wMTEzMDcgMjEuMjA4OTg0IDM1Ljg4ODY3MiBDIDIxLjk1MDE0MSAzNC43NjYwMzcgMjIuODg2Mzk4IDM0LjA5OTYwOSAyMy42OTkyMTkgMzQuMDk5NjA5IHogTSAxMi4zMDg1OTQgMzUuMjgxMjUgQyAxMy4xNzQzNjggMzYuMTc5MjU4IDE0LjIyMjUyNSAzNyAxNS44MDA3ODEgMzcgQyAxNi41Nzk5NDggMzcgMTcuNTUyNDg0IDM3LjAyODA3MyAxOC40NzY1NjIgMzYuOTQ1MzEyIEMgMTguNDc5ODQ4IDM2Ljk0NTAxOCAxOC40ODMwNDIgMzYuOTQzNjU0IDE4LjQ4NjMyOCAzNi45NDMzNTkgQyAxOC4zNjQ1OCAzNy4yOTMzNjEgMTguMjczNzQ0IDM3LjY0NTUyOSAxOC4xOTcyNjYgMzggTCAxNS40MDAzOTEgMzggQyAxNC4xNjcwNTcgMzggMTMuMjk1NzcgMzcuNTU0NDMgMTIuODk0NTMxIDM2Ljc1MTk1MyBMIDEyLjg4NjcxOSAzNi43MzgyODEgTCAxMi44ODA4NTkgMzYuNzI2NTYyIEMgMTIuNzE2NDU3IDM2LjQyMTE5MSAxMi41MDA2NDUgMzUuODEwNTkgMTIuMzA4NTk0IDM1LjI4MTI1IHoiLz48L3N2Zz4=" width=30/>
</a>
<a href="https://www.instagram.com/we_shape_us/" target="_blank">
  <img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgNTAgNTAiIHdpZHRoPSI1MDBweCIgaGVpZ2h0PSI1MDBweCI+PHBhdGggZD0iTSAxNiAzIEMgOC44MzI0ODM5IDMgMyA4LjgzMjQ4MzkgMyAxNiBMIDMgMzQgQyAzIDQxLjE2NzUxNiA4LjgzMjQ4MzkgNDcgMTYgNDcgTCAzNCA0NyBDIDQxLjE2NzUxNiA0NyA0NyA0MS4xNjc1MTYgNDcgMzQgTCA0NyAxNiBDIDQ3IDguODMyNDgzOSA0MS4xNjc1MTYgMyAzNCAzIEwgMTYgMyB6IE0gMTYgNSBMIDM0IDUgQyA0MC4wODY0ODQgNSA0NSA5LjkxMzUxNjEgNDUgMTYgTCA0NSAzNCBDIDQ1IDQwLjA4NjQ4NCA0MC4wODY0ODQgNDUgMzQgNDUgTCAxNiA0NSBDIDkuOTEzNTE2MSA0NSA1IDQwLjA4NjQ4NCA1IDM0IEwgNSAxNiBDIDUgOS45MTM1MTYxIDkuOTEzNTE2MSA1IDE2IDUgeiBNIDM3IDExIEEgMiAyIDAgMCAwIDM1IDEzIEEgMiAyIDAgMCAwIDM3IDE1IEEgMiAyIDAgMCAwIDM5IDEzIEEgMiAyIDAgMCAwIDM3IDExIHogTSAyNSAxNCBDIDE4LjkzNjcxMiAxNCAxNCAxOC45MzY3MTIgMTQgMjUgQyAxNCAzMS4wNjMyODggMTguOTM2NzEyIDM2IDI1IDM2IEMgMzEuMDYzMjg4IDM2IDM2IDMxLjA2MzI4OCAzNiAyNSBDIDM2IDE4LjkzNjcxMiAzMS4wNjMyODggMTQgMjUgMTQgeiBNIDI1IDE2IEMgMjkuOTgyNDA3IDE2IDM0IDIwLjAxNzU5MyAzNCAyNSBDIDM0IDI5Ljk4MjQwNyAyOS45ODI0MDcgMzQgMjUgMzQgQyAyMC4wMTc1OTMgMzQgMTYgMjkuOTgyNDA3IDE2IDI1IEMgMTYgMjAuMDE3NTkzIDIwLjAxNzU5MyAxNiAyNSAxNiB6Ii8+PC9zdmc+" width=30/>
</a>

---

Start building powerful AI models visually with AI-architect today! 🚀

Your feedback and contributions help make AI-architect better for everyone in the community.
