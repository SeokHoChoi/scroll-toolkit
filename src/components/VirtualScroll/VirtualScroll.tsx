import {
  ReactElement,
  UIEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  VirtualScroller,
  searchScrollIndex,
  sliceSumOffsetHeights,
} from '../../utils/scrollFunc';
import { VirtualScrollContext } from '../../context/virtualScrollContext';

interface Props<T> {
  itemList: T[];
  scrollElement: HTMLElement | null;
  virtualItemCount?: number;
  render: (virtualItemList: T[]) => ReactElement;
}

export default function VirtualScroll<T extends { id: string }>({
  scrollElement,
  itemList,
  virtualItemCount = 10,
  render,
}: Props<T>) {
  /** 현재 스크롤 위치를 관리하는 상태 */
  const [index, setIndex] = useState(0);

  /** VirtualScroller 인스턴스를 캐시하여 재사용 */
  const virtualScroller = useMemo(() => new VirtualScroller(), []);

  /** itemList의 id 배열을 캐시 */
  const itemListIds = useMemo(
    () => itemList.map((item) => item.id),
    [itemList]
  );

  /** 이전 인덱스를 useRef를 통해 기억 */
  const prevIndexRef = useRef(0);

  // 스크롤 이벤트 처리
  useEffect(() => {
    if (!scrollElement) {
      return;
    }

    const handleScroll = (e: UIEvent) => {
      const scrollTop = e.currentTarget.scrollTop;

      /** 각 아이템의 오프셋을 가져옴 */
      const offsets = virtualScroller.getOffsets(itemListIds);

      /** 현재 스크롤 위치에 따라 적절한 인덱스를  찾음 */
      const index = searchScrollIndex(offsets, scrollTop);

      // 인덱스가 변경되면 상태 업데이트
      if (prevIndexRef.current !== index) {
        setIndex(index);
        prevIndexRef.current = index;
      }
    };

    // 스크롤 이벤트 리스너 등록
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    scrollElement.addEventListener('scroll', handleScroll as any);

    return () =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      scrollElement.removeEventListener('scroll', handleScroll as any);
  }, [itemListIds, scrollElement, virtualScroller]);

  const virtualScrollRef = useRef<HTMLDivElement>(null);

  // VirtualScrol의 높이 검사
  useEffect(() => {
    /** window.requestAnimationFrame을 사용하여 DOM이 완전히 렌더링된 후 높이 측정 */
    const measureHeight = () => {
      const offsets = virtualScroller.getOffsets(itemListIds);
      const virtualItemTotalHeight = offsets.reduce(
        (acc, cur) => acc + cur.height,
        0
      );
      const virtualScrollHeight =
        virtualScrollRef.current?.getBoundingClientRect().height;

      // 높이가 일치하지 않으면 경고 메시지 출력
      if (virtualScrollHeight !== virtualItemTotalHeight) {
        console.error(`<VirtualScroll> 안의 모든 요소는 <VirtualScrollItem>으로 감싸져야 합니다. 
          만약 잘 감싸져 있다면, "margin" 요소를 확인해보세요(여기서 margin은 높이에 의해 계산되지 않을 수 있습니다).
          VirtualScroll 높이: ${virtualScrollHeight}, VirtualScrollItems 총 높이: ${virtualItemTotalHeight}
          `);
      }
    };

    /** requestAnimationFrame을 사용하여 measureHeight 함수를 실행 */
    const animationFrameId = window.requestAnimationFrame(measureHeight);

    /** cleanup 함수에서 requestAnimationFrame을 취소 */
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [itemListIds, virtualScroller]);

  /** 시작 인덱스 계산 */
  const startIndex = useMemo(() => {
    return Math.max(index - Math.ceil(virtualItemCount / 2), 0);
  }, [index, virtualItemCount]);

  /** 종료 인덱스 계산 */
  const endIndex = useMemo(() => {
    return Math.min(index + Math.ceil(virtualItemCount / 2), itemList.length);
  }, [index, itemList.length, virtualItemCount]);

  /** 시작부분 높이 계산 */
  const prependHeight = useMemo(() => {
    const offsets = virtualScroller.getOffsets(itemListIds);
    return sliceSumOffsetHeights(offsets, 0, startIndex);
  }, [itemListIds, startIndex, virtualScroller]);

  /** 끝부분 높이 계산 */
  const appendHeight = useMemo(() => {
    const offsets = virtualScroller.getOffsets(itemListIds);
    return sliceSumOffsetHeights(offsets, endIndex, itemListIds.length);
  }, [itemListIds, endIndex, virtualScroller]);

  /** 가상 아이템 리스트 생성 */
  const virtualItemList = useMemo(
    () => itemList.slice(startIndex, endIndex),
    [startIndex, endIndex, itemList]
  );

  /** Context 값 생성 */
  const value = useMemo(() => ({ virtualScroller }), [virtualScroller]);

  return (
    <div
      ref={virtualScrollRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <VirtualScrollContext.Provider value={value}>
        <div style={{ height: prependHeight }} />
        {render(virtualItemList)}
        <div style={{ height: appendHeight }} />
      </VirtualScrollContext.Provider>
    </div>
  );
}
