import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import { Product, MockData, Meta } from './types/mock';
import ScreenMessage from './components/ScreenMessage';
import { VirtualScroll, VirtualScrollItem } from './components/VirtualScroll';

const META: Meta = {
  totalItems: 118,
  totalPages: 12,
  itemsPerPage: 10,
};

const options = {
  root: null,
  rootMargin: '100px 0px 0px 0px',
  threshold: 0.5,
};

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const scrollElementRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchProducts = useCallback(
    async (page: number) => {
      if (!hasMore) return; // 더 이상 가져올 데이터가 없으면 함수 종료

      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `http://localhost:8888/products?_page=${page}&_per_page=${META.itemsPerPage}`
        );
        const productsInfo = await res.json();
        const data: MockData = {
          meta: META,
          products: productsInfo.data,
        };

        // 기존 제품과 새로운 제품을 비교하여 중복되지 않는 제품만 추가
        setProducts((prev) => {
          const existingIds = new Set(prev.map((product) => product.id));
          const newProducts = data.products.filter(
            (product) => !existingIds.has(product.id)
          );
          return [...prev, ...newProducts];
        });

        // 데이터가 존재하고, 페이지 수가 더 존재하면 hasMore를 true로 설정
        setHasMore(data.products.length > 0 && page < data.meta.totalPages);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    },
    [hasMore]
  );

  useEffect(() => {
    fetchProducts(page);
  }, [page, fetchProducts]);

  const lastProductRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (loading || !hasMore) return;

    if (observer.current) observer.current.disconnect();

    const callback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        setPage((prev) => prev + 1);
      }
    };

    observer.current = new IntersectionObserver(callback, options);
    if (lastProductRef.current) {
      observer.current.observe(lastProductRef.current);
    }
  }, [loading, hasMore]);

  const totalAmount = products.reduce((acc, product) => acc + product.price, 0);

  /**
   * fetchProducts가 호출되는 횟수와 어떤 페이지를 가져오는지 확인
   * 또한 제품 배열을 로깅하여 현재 로드된 항목 수를 확인
   */
  useEffect(() => {
    console.log('Current page:', page);
    console.log('Loaded products:', products.length);
    console.log(products);
  }, [page, products]);

  return (
    <div className='container'>
      <h1 className='header'>Product List</h1>
      <div>
        <h2>Total Amount: ${totalAmount.toFixed(2)}</h2>
      </div>
      <div className='scroll-container' ref={scrollElementRef}>
        {error && <ScreenMessage type='error' errorMessage={error} />}
        <VirtualScroll
          scrollElement={scrollElementRef.current}
          virtualItemCount={20}
          itemList={products}
          render={(itemList) => (
            <ul>
              {itemList.map((product, index) => (
                <VirtualScrollItem key={product.id} item={product}>
                  <div
                    className='product-item'
                    ref={index === itemList.length - 1 ? lastProductRef : null}
                  >
                    {product.productName} - ${product.price}
                  </div>
                </VirtualScrollItem>
              ))}
            </ul>
          )}
        />
        {loading && <ScreenMessage type='loading' />}
      </div>
    </div>
  );
}

export default App;
