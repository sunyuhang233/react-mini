import { ReactElementType } from "@/shared/ReactTypes";
import { FiberNode } from "./fiber";
import { processUpdateQueue, UpdateQueue } from "./updateQueue";
import { HostComponent, HostRoot, HostText } from "./workTags";
import { mountChildFibers, reconcileChildFibers } from "./childFibers";

export const beginWork=(wip:FiberNode)=>{
  switch(wip.tag){
    case HostRoot:
      return updateHostRoot(wip)
    case HostComponent:
      return updateHostComponent(wip)
    case HostText:
      return null
      default:
        if(__DEV__){
          console.warn('beginWork未实现的类型')
        } 
        break;
  }
}

const updateHostRoot=(wip:FiberNode)=>{
  const baseState = wip.memoizedState
  const updateQueue = wip.updateQueue as UpdateQueue<Element>
  const pending = updateQueue.shared.pending
  updateQueue.shared.pending=null
  const {memoizedState}=processUpdateQueue(baseState,pending)
  wip.memoizedState =memoizedState
  const nextChildren = wip.memoizedState
  reconcileChildren(wip,nextChildren)
  return wip.child
}

const updateHostComponent=(wip:FiberNode)=>{ 
  const nextProps = wip.pendingProps
  const nextChildren = nextProps.children
  reconcileChildren(wip,nextChildren)
  return wip.child
}


const reconcileChildren=(wip:FiberNode,children?:ReactElementType)=>{ 
  const current = wip.alternate
  if(current){
    wip.child=reconcileChildFibers(wip,current?.child,children)
  }else{
    wip.child=mountChildFibers(wip,null,children)
  }
}

