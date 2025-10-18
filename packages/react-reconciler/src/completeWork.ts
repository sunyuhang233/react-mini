import { FiberNode } from "./fiber";
import { appendInitialChild, Container, createInstance, createTextInstance } from "hostConfig";
import { HostComponent, HostRoot, HostText } from "./workTags";
import { NoFlags } from "./fiberFlags";
// 生成更新计划，计算和收集更新 flags
export const completeWork = (wip: FiberNode) => {
  const newProps = wip.pendingProps
  const current = wip.alternate
  switch (wip.tag) {
    case HostRoot:
      bubbleProperties(wip)
      return null;
    case HostComponent:
      if (current && wip.stateNode) {

      } else {
        // 首屏渲染阶段
        // 构建 DOM
        const instance = createInstance(wip.type, newProps)
        appendAllChildren(instance, wip)
        // 将 DOM 插入到 DOM 树中
        wip.stateNode = instance
      }
      // 收集更新 flags
      bubbleProperties(wip)
      return null;
    case HostText:
      if (current && wip.stateNode) {

      } else {
        // 首屏渲染阶段
        // 构建 DOM
        const instance = createTextInstance(newProps.content)
        wip.stateNode = instance
      }
      // 收集更新 flags
      bubbleProperties(wip)
      return null;
    default:
      if (__DEV__) {
        console.warn('completeWork未实现的类型')
      }
      return null;
  }

}


function appendAllChildren(
  parent: any,
  workInProgress: FiberNode
) {
  let node = workInProgress.child;
  while (node !== null) {
    if (node.tag == HostComponent || node.tag == HostText) {
      // 处理原生 DOM 元素节点或文本节点
      appendInitialChild(parent, node.stateNode);
    } else if (node.child !== null) {
      // 递归处理其他类型的组件节点的子节点
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node == workInProgress) {
      return;
    }

    while (node.sibling === null) {
      if (node.return === null || node.return === workInProgress) {
        return;
      }
      node = node.return;
    }
    // 处理下一个兄弟节点
    node.sibling.return = node.return;
    node = node.sibling;
  }
}


function bubbleProperties(workInProgress: FiberNode) {
  let subtreeFlags = NoFlags;
  let child = workInProgress.child;
  while (child !== null) {
    subtreeFlags |= child.subtreeFlags;
    subtreeFlags |= child.flags;

    child.return = workInProgress;
    child = child.sibling;
  }

  workInProgress.subtreeFlags |= subtreeFlags;
}
