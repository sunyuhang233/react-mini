import { Props, Key, Ref, ReactElementType } from 'shared/ReactTypes';
import { FunctionComponent, HostComponent, WorkTag } from './workTags';
import { NoFlags, Flags } from './fiberFlags';
import { Container } from 'hostConfig';
export class FiberNode {
  tag: WorkTag; // fiber的类型
  key: Key; // fiber的key
  stateNode: any; // 节点对应的实际dom节点或者组件实例
  type: any; // 节点的类型 比如div span 或者函数组件类组件
  return: FiberNode | null; // 指向父fiber
  sibling: FiberNode | null; // 指向兄弟fiber
  child: FiberNode | null; // 指向子fiber
  index: number; // 子节点的索引
  ref: Ref; // fiber的ref属性
  pendingProps: Props; // fiber的新属性
  memoizedProps: Props | null; // fiber的已更新属性
  memoizedState: any; // fiber的state
  alternate: FiberNode | null; // 当前节点对应的另一个fiber节点 用于双缓冲 协调过程中比较
  flags: Flags; // 标记 用于标识节点需要执行的操作
  subtreeFlags: Flags; // 子树标记
  updateQueue: unknown; // fiber的更新队列
  constructor(tag: WorkTag, pendingProps: Props, key: Key) {
    // 类型
    this.tag = tag;
    // key值
    this.key = key;
    // ref实例
    this.ref = null
    // 节点对应的实际dom节点或者组件实例
    this.stateNode = null;
    // 节点的类型 比如div span 或者函数组件类组件
    this.type = null;
    // 父节点
    this.return = null;
    // 兄弟节点
    this.sibling = null;
    // 子节点
    this.child = null;
    // 索引
    this.index = 0
    // 节点的新属性 用于在协调过程中进行更新
    this.pendingProps = pendingProps;
    // 已经更新完的属性
    this.memoizedProps = null
    // 已经更新完的state
    this.memoizedState = null
    // 当前节点对应的另一个fiber节点 用于双缓冲 协调过程中比较
    this.alternate = null;
    // 标记 用于标识节点需要执行的操作
    this.flags = NoFlags
    // 子节点标记
    this.subtreeFlags = NoFlags
    // 更新队列 用于存储需要对节点执行的更新操作
    this.updateQueue = null
  }
}



export class FiberRootNode {
  container: Container
  current: FiberNode
  finishedWork: FiberNode | null
  constructor(container: Container, hostRootFiber: FiberNode) {
    this.container = container
    this.current = hostRootFiber
    // 指向根节点
    hostRootFiber.stateNode = this
    // 指向更新完成之后的hostFiber
    this.finishedWork = null
  }
}


export const createWorkInProgress = (current: FiberNode, pendingProps: Props) => {
  let wip = current.alternate
  if (wip) {
    wip = new FiberNode(current.tag, pendingProps, current.key)
    wip.stateNode = current.stateNode
    wip.alternate = current
    current.alternate = wip
  } else {
    wip.pendingProps = pendingProps
    wip.flags = NoFlags
    wip.subtreeFlags = NoFlags
  }
  wip.type = current.type
  wip.updateQueue = current.updateQueue
  wip.child = current.child
  wip.memoizedProps = current.memoizedProps
  wip.memoizedState = current.memoizedState
  return wip
}


export const createFiberFromElement = (element: ReactElementType): FiberNode => {
  const { type, key, props } = element
  let fiberTag: WorkTag = FunctionComponent
  if (typeof type === 'string') {
    fiberTag = HostComponent
  } else if (typeof type !== 'function' && __DEV__) {
    console.warn('未定义的type', type)
  }
  const fiber = new FiberNode(fiberTag, props, key)
  fiber.type = type
  return fiber
} 
