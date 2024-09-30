import { createContext, useContext } from 'react';
import { VirtualScroller } from './../utils/scrollFunc';

interface VirtualScrollContextProps {
  virtualScroller: VirtualScroller;
}

/**
 * 초기값으로 빈 객체({} as any)를 전달했지만, 실제로는 VirtualScrollContextProps 타입의 객체가 Context의 값으로 사용됩니다.
 */
export const VirtualScrollContext = createContext<VirtualScrollContextProps>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  {} as any
);

/** 해당 Context의 virtualScroller 속성에 접근할 수 있게 해줍니다. */
export const useGetVirtualScroller = () =>
  useContext(VirtualScrollContext).virtualScroller;
