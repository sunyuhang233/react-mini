import { ReactElementType } from "@/shared/ReactTypes";
import { FiberNode } from "./fiber";
import { processUpdateQueue, UpdateQueue } from "./updateQueue";
import { HostComponent, HostRoot, HostText } from "./workTags";
import { mountChildFibers, reconcileChildFibers } from "./childFibers";
/**
 * 递归中的递
 * @param wip 当前正在处理的fiber
 * @returns 
 */
export const beginWork = (wip: FiberNode) => {
  switch (wip.tag) {
    case HostRoot:
      return updateHostRoot(wip)
    case HostComponent:
      return updateHostComponent(wip)
    case HostText:
      return null
    default:
      if (__DEV__) {
        console.warn('beginWork未实现的类型')
      }
      break;
  }
}

const updateHostRoot = (wip: FiberNode) => {
  // 根据当前节点和工作中节点的状态进行比较，处理属性等更新逻辑
  const baseState = wip.memoizedState
  const updateQueue = wip.updateQueue as UpdateQueue<Element>
  const pending = updateQueue.shared.pending
  updateQueue.shared.pending = null
  // 计算待更新状态的最新值
  const { memoizedState } = processUpdateQueue(baseState, pending)
  wip.memoizedState = memoizedState
  // 处理子节点的更新逻辑
  const nextChildren = wip.memoizedState
  reconcileChildren(wip, nextChildren)
  // 返回新的子节点
  return wip.child
}

const updateHostComponent = (wip: FiberNode) => {
  const nextProps = wip.pendingProps
  const nextChildren = nextProps.children
  reconcileChildren(wip, nextChildren)
  return wip.child
}

/**
 * 对比子节点的 current FiberNode 与 子节点的 ReactElement
 * 生成子节点对应的 workInProgress FiberNode
 * @param wip fiber 节点
 * @param children  子节点
 */
const reconcileChildren = (wip: FiberNode, children?: ReactElementType) => {
  // alternate 指向节点的备份节点，即 current
  const current = wip.alternate
  if (current) {
    // 组件的更新阶段
    wip.child = reconcileChildFibers(wip, current?.child, children)
  } else {
    // 首屏渲染阶段
    wip.child = mountChildFibers(wip, null, children)
  }
}

