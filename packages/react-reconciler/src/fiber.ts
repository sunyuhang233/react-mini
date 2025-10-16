import { Props, Key, Ref } from 'shared/ReactTypes';
import { WorkTag } from './workTags';
import { NoFlags, Flags } from './fiberFlags';
import { Container } from 'hostConfig';
export class FiberNode {
  tag: WorkTag
  key: Key
  stateNode: any
  type: any
  return: FiberNode | null
  sibling: FiberNode | null
  child: FiberNode | null
  index: number
  ref: Ref
  pendingProps: Props
  memoizedProps: Props | null
  memoizedState: any
  alternate: FiberNode | null
  flags: Flags
  subtreeFlags: Flags
  updateQueue: unknown
  constructor(tag: WorkTag, pendingProps: Props, key: Key) {
    this.tag = tag;
    this.key = key;
    this.ref = null;
    this.stateNode = null;
    this.type = null;
    this.return = null;
    this.sibling = null;
    this.child = null;
    this.index = 0;
    this.pendingProps = pendingProps;
    this.memoizedProps = null;
    this.memoizedState = null;
    this.alternate = null;
    this.flags = NoFlags;
    this.subtreeFlags = NoFlags;
    this.updateQueue = null;
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
