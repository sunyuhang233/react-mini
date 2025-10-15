import { beginWork } from "./beginWork";
import { completeWork } from "./completeWork";
import { FiberNode } from "./fiber";

let workInProgress: FiberNode | null = null;

const renderRoot = (root:FiberNode)=>{
  prepareFreshStack(root);
  do{
    try {
      workLoop()
    } catch (error) {
      console.error(error,'renderRoot error');
      workInProgress = null;
    }
  } while(true) 
}

const prepareFreshStack = (root:FiberNode)=>{
  workInProgress = root
}

const workLoop = ()=>{
  while(workInProgress){
    performUnitOfWork(workInProgress)
  }
}

const performUnitOfWork = (fiber: FiberNode)=>{
  const next = beginWork(fiber)
  fiber.memoizedProps = fiber.pendingProps
  if(next===null){
    completeUnitOfWork(fiber)
  }else{
    workInProgress = next
  }
}

const completeUnitOfWork = (fiber: FiberNode)=>{
  let node : FiberNode | null = fiber;
  do { 
    completeWork(node)
    const sibing = node.sibling
    if(sibing != null){
      workInProgress =sibing
      return
    }
    node  = node.return
    workInProgress = node
  } while (node != null)
}
