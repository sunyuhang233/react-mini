import { REACT_ELEMENT_TYPE } from "@/shared/ReactSymbols";
import { ElementType, Key, Props, ReactElementType, Ref, Type } from "@/shared/ReactTypes";


export const ReactElement = (type: Type, key: Key, ref: Ref, props: Props): ReactElementType => {
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    ref,
    props,
    __mark: 'react-element',
  };
};


export const jsx = (type: ElementType, config: any, ...maybeChildren: any[]) => {
  let key: Key = null;
  let ref: Ref = null;
  let props: Props = {};
  for (const prop in config) {
    const value = config[prop];
    if (prop === 'key' && value !== undefined) {
      key = '' + value;
    }
    if (prop === 'ref' && value !== undefined) {
      ref = value;
    }
    if ({}.hasOwnProperty.call(config, prop)) {
      props[prop] = value;
    }
  }
  const childrenLength = maybeChildren.length;
  if(childrenLength){
    if(childrenLength===1){
      props.children = maybeChildren[0];
    }else{
      props.children = maybeChildren;
    }
  }
  return ReactElement(type,key,ref,props)
}


export const jsxDEV = (type: ElementType, config: any) => {
  let key: Key = null;
  let ref: Ref = null;
  let props: Props = {};
  for (const prop in config) {
    const value = config[prop];
    if (prop === 'key' && value !== undefined) {
      key = '' + value;
    }
    if (prop === 'ref' && value !== undefined) {
      ref = value;
    }
    if ({}.hasOwnProperty.call(config, prop)) {
      props[prop] = value;
    }
  }
  return ReactElement(type,key,ref,props)
}
