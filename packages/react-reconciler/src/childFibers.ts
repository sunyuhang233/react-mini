import { ReactElementType } from "@/shared/ReactTypes";
import { createFiberFromElement, FiberNode } from "./fiber";
import { REACT_ELEMENT_TYPE } from "@/shared/ReactSymbols";
import { HostText } from "./workTags";
import { Placement } from "./fiberFlags";

function ChildReconciler(shouldTrackSideEffects: boolean) {
  const reconcileSingleElement = (returnFiber: FiberNode, currentFiber: FiberNode | null, element: ReactElementType) => {
    const fiber = createFiberFromElement(element)
    fiber.return = returnFiber
    return fiber
  };
  const reconcileSingleTextNode = (returnFiber: FiberNode, currentFiber: FiberNode | null, content: string | number) => {
    const fiber = new FiberNode(HostText, { content }, null)
    fiber.return = returnFiber
    return fiber
  };

  const placeSingleChild = (fiber: FiberNode) => {
    if (shouldTrackSideEffects && fiber.alternate === null) {
      fiber.flags |= Placement
    }
    return fiber
  }

  return function reconcileChildFibers(
    returnFiber: FiberNode,
    currentFiber: FiberNode | null,
    newChild?: ReactElementType
  ) {
    if (typeof newChild === 'object' && newChild !== null) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return placeSingleChild(reconcileSingleElement(returnFiber, currentFiber, newChild))
        default:
          if (__DEV__) {
            console.warn('未处理的newChild类型', newChild)
          }
          return
      }
    }
    if (typeof newChild === 'string' || typeof newChild === 'number') {
      return placeSingleChild(reconcileSingleTextNode(returnFiber, currentFiber, newChild))
    }
    if (__DEV__) {
      console.warn('未处理的newChild类型', newChild)
    }
    return null
  }

}

export const reconcileChildFibers = ChildReconciler(true)
export const mountChildFibers = ChildReconciler(false)
