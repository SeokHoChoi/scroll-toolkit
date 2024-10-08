import './ScreenMessage.css';

interface FullScreenMessageProps {
  type: 'loading' | 'error';
  errorMessage?: string;
}

export default function ScreenMessage({
  type,
  errorMessage,
}: FullScreenMessageProps) {
  return (
    <div className='container'>
      {type === 'loading' ? (
        <Loading />
      ) : (
        <div className='error-wrapper'>
          <Error />
          {errorMessage}
        </div>
      )}
    </div>
  );
}

function Loading() {
  return (
    <div className='skeleton-loader'>
      {Array.from({ length: 5 }).map((_, index) => (
        <div className='skeleton-item' key={index} />
      ))}
    </div>
  );
}

function Error() {
  return (
    <svg
      className={'ico-error'}
      fill='none'
      height='24'
      stroke='currentColor'
      stroke-linecap='round'
      stroke-linejoin='round'
      stroke-width='2'
      viewBox='0 0 24 24'
      width='24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M0 0h24v24H0z' fill='none' stroke='none' />
      <path d='M4 8v-2a2 2 0 0 1 2 -2h2' />
      <path d='M4 16v2a2 2 0 0 0 2 2h2' />
      <path d='M16 4h2a2 2 0 0 1 2 2v2' />
      <path d='M16 20h2a2 2 0 0 0 2 -2v-2' />
      <path d='M9 10h.01' />
      <path d='M15 10h.01' />
      <path d='M9.5 15.05a3.5 3.5 0 0 1 5 0' />
    </svg>
  );
}
