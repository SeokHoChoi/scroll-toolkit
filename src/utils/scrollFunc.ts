interface Offset {
  id: string;
  height: number;
}

/** offsets 배열에서 스크롤 위치에 해당하는 인덱스를 찾는 함수 */
export const searchScrollIndex = (offsets: Offset[], scrollTop: number) => {
  let totalHeight = 0;

  for (let i = 0; i < offsets.length; i += 1) {
    totalHeight += offsets[i].height;

    // 스크롤 위치에 도달하면 해당 인덱스 반환
    if (totalHeight >= scrollTop) {
      return i;
    }
  }

  // 스크롤 위치에 맞는 인덱스를 못 찾으면 0 반환
  return 0;
};

/** 배열에서 특정 인덱스 범위의 합을 구하는 함수 */
export const sliceSumOffsetHeights = (
  arr: Offset[],
  startIndex: number,
  endIndex: number
) => {
  return arr
    .slice(startIndex, endIndex)
    .reduce((acc, cur) => acc + cur.height, 0);
};

/** 가상 스크롤러 클래스 정의 */
export class VirtualScroller {
  /** 가상 아이템을 관리하는 맵 */
  virtualItemMap: Map<string, Offset> = new Map();

  /** 아이템 등록 메서드 */
  public register = (id: string, height: number) => {
    this.virtualItemMap.set(id, { id, height });
  };

  /** 아이템 오프셋 반환 메서드 */
  public getOffsets = (ids: string[]) => {
    return ids.map((id) => this.virtualItemMap.get(id)!).filter(Boolean);
  };
}
