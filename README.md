# React Mini

一个简化的React实现，用于学习和理解React的核心概念。

## 项目简介

React Mini是一个轻量级的React实现，旨在帮助开发者理解React的核心工作原理。该项目使用TypeScript编写，采用Monorepo架构，包含React核心功能和共享类型定义。

## 项目结构

```
react-mini/
├── packages/
│   ├── react/          # React核心包
│   │   ├── index.ts    # 主入口文件
│   │   └── src/
│   │       └── jsx.ts  # JSX处理逻辑
│   └── shared/         # 共享包
│       ├── ReactSymbols.ts  # React符号定义
│       └── ReactTypes.ts    # React类型定义
├── scripts/
│   └── rollup/         # 构建脚本
│       ├── react.config.js  # React包构建配置
│       └── utils.js    # 工具函数
├── package.json        # 项目配置
├── pnpm-workspace.yaml # pnpm工作区配置
└── tsconfig.json       # TypeScript配置
```

## 功能特性

- JSX转换和元素创建
- React元素类型定义
- 开发环境下的JSX处理
- 模块化设计，便于学习和扩展

## 安装与使用

### 安装依赖

```bash
pnpm install
```

### 构建

```bash
pnpm run build-dev
```

### 使用示例

```javascript
import React from './packages/react';

const element = React.createElement('div', { className: 'container' }, 'Hello, React Mini!');
```

## 技术栈

- TypeScript
- Rollup (打包工具)
- pnpm (包管理器)

## 开发指南

### 项目架构

本项目采用Monorepo架构，使用pnpm工作区管理多个包：

1. **react包**: 包含React的核心实现，目前主要实现了JSX转换功能
2. **shared包**: 包含类型定义和共享符号

### 核心概念

- **ReactElement**: React元素的基本结构，包含类型、属性、键和引用等信息
- **JSX转换**: 将JSX语法转换为React元素的过程
- **符号系统**: 使用Symbol或特定数字标识React元素类型

### 构建流程

1. 使用Rollup打包各个包
2. 生成UMD格式的输出文件
3. 自动生成package.json文件

## 贡献指南

欢迎提交Issue和Pull Request来改进这个项目。

## 许可证

ISC