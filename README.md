# AI-architect

<img src="src/assets/images/ai-architect.svg" alt="AI-architect" width="200">

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Rust](https://img.shields.io/badge/Rust-1.82.0-orange)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue)
![Tauri](https://img.shields.io/badge/Tauri-2.1.0-yellow)

AI-architect is a modern desktop application that revolutionizes the way you design and implement AI model architectures. Through an intuitive graphical interface, you can create complex deep learning model flows using nodes and edges, which automatically generate corresponding PyTorch code. Built with a powerful stack of modern technologies, it combines the performance of Rust with the flexibility of React to provide a seamless user experience.

<details><summary><h2>Technology Stack</h2></summary>
AI-architect is built using a modern, robust technology stack that ensures high performance, type safety, and an excellent developer experience:

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
  - [Contributing](#contributing)
  - [License](#license)
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
   │  ├── main.rs
   ├── build.rs
   ├── Cargo.lock
   ├── Cargo.toml
   └── tauri.conf.json
```

## Usage

[Previous usage section content remains the same...]

## Contributing

[Previous contributing section content remains the same...]

## License

AI-architect is released under the MIT License. See the [LICENSE.md](LICENSE.md) file for full details.

## Contact

We're here to help! Reach out to us through these channels:

- GitHub Issues: Submit bug reports and feature requests
- Email: support@ai-architect.com
- Discord: Join our [AI-architect Community](https://discord.gg/ai-architect)
- Documentation: Visit our [Official Documentation](https://docs.ai-architect.com)

---

Start building powerful AI models visually with AI-architect today! 🚀

Your feedback and contributions help make AI-architect better for everyone in the community.
