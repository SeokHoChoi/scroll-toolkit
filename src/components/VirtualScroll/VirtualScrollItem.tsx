import React, { useEffect, useRef } from 'react';
import { useGetVirtualScroller } from '../../context/virtualScrollContext';

/** 가상 스크롤러에 사용되며, 자식 요소를 감싸는 역할 입니다. */
export default function VirtualScrollItem({
  children,
  item,
}: {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
}) {
  /** useRef를 사용하여 DOM 요소에 대한 참조를 생성 */
  const itemRef = useRef<HTMLLIElement>(null);

  /** useGetVirtualScroller 훅을 사용하여 가상 스크롤러 객체를 가져옵니다. */
  const virtualScroller = useGetVirtualScroller();

  /**
   * 컴포넌트가 렌더링될 때와 item prop이 변경될 때마다 실행할 코드를 정의
   * item이 변경될 때마다 이펙트가 다시 실행되어, 각 아이템의 실제 높이를 측정하고 가상 스크롤러에 등록!
   * 즉, 가상 스크롤링 기능을 위한 각 아이템의 높이 측정과 등록을 담당!
   */
  useEffect(() => {
    const element = itemRef.current;

    if (!element) {
      return;
    }

    /**
     * setTimeout을 사용하여 비동기적으로 element의 크기를 측정합니다.
     * 이는 렌더링 이후에 DOM 요소의 크기가 업데이트되기를 기다리기 위함 입니다.
     */
    const timerId = setTimeout(() => {
      /**
       * element의 현재 크기를 가져와서 height 변수에 할당
       * getBoundingClientRect는 요소의 크기와 위치 정보를 알려주는 메서드 입니다!
       */
      const { height } = element.getBoundingClientRect();

      /** element에 자식 요소가 있는지 확인 */
      const hasChildElement = element.childElementCount;

      // 만약 자식 요소가 있고 height가 0인 경우 경고 메시지를 출력하고 함수를 종료
      if (hasChildElement && height === 0) {
        console.error(`<VirtualScrollItem> 의 높이가 0 입니다. ${item.id}`);
        return;
      }

      virtualScroller.register(item.id, height);
    });

    return () => clearTimeout(timerId);
  }, [item, virtualScroller]);

  return <li ref={itemRef}>{children}</li>;
}
