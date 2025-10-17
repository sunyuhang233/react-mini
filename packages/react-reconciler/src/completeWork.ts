import { FiberNode } from "./fiber";
import { appendInitialChild, Container, createInstance, createTextInstance } from "hostConfig";
import { HostComponent, HostRoot, HostText } from "./workTags";
import { NoFlags } from "./fiberFlags";

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
        const instance = createInstance(wip.type, newProps)
        appendAllChildren(instance, wip)
        wip.stateNode = instance
      }
      bubbleProperties(wip)
      return null;
    case HostText:
      if (current && wip.stateNode) {

      } else {
        const instance = createTextInstance(newProps.content)
        wip.stateNode = instance
      }
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
      appendInitialChild(parent, node.stateNode);
    } else if (node.child !== null) {
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
