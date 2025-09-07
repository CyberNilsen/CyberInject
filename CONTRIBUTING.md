# Contributing to CyberInject

Thank you for your interest in contributing to CyberInject! This document provides guidelines for contributing to the project.

## Code of Conduct

This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates.

**How to Submit a Bug Report:**
1. Use a clear and descriptive title
2. Describe the steps to reproduce the issue
3. Provide your system information (OS, .NET version, etc.)
4. Include error messages and log output
5. Add screenshots if helpful

### Suggesting Features

Feature suggestions are welcome! Please:
1. Check if the feature already exists or is planned
2. Explain why this feature would be useful
3. Provide detailed specifications if possible
4. Consider implementation complexity

### Code Contributions

#### Getting Started
1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/CyberInject.git`
3. Create a feature branch: `git checkout -b feature/amazing-feature`
4. Set up the development environment (see below)

#### Development Environment
```bash
# Prerequisites
# - .NET 8.0 SDK
# - Git
# - IDE (Visual Studio, VS Code, or JetBrains Rider)

# Clone and setup
git clone https://github.com/CyberNilsen/CyberInject.git
cd CyberInject
dotnet restore
dotnet build
dotnet run
