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
    <svg
      className='ico-loading'
      id='loading'
      viewBox='0 0 32 32'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g>
        <path d='M14 0 H18 V8 H14 z' opacity='.1' transform='rotate(0 16 16)'>
          <animate
            attributeName='opacity'
            begin='0'
            dur='1s'
            from='1'
            repeatCount='indefinite'
            to='.1'
          />
        </path>
        <path d='M14 0 H18 V8 H14 z' opacity='.1' transform='rotate(45 16 16)'>
          <animate
            attributeName='opacity'
            begin='0.125s'
            dur='1s'
            from='1'
            repeatCount='indefinite'
            to='.1'
          />
        </path>
        <path d='M14 0 H18 V8 H14 z' opacity='.1' transform='rotate(90 16 16)'>
          <animate
            attributeName='opacity'
            begin='0.25s'
            dur='1s'
            from='1'
            repeatCount='indefinite'
            to='.1'
          />
        </path>
        <path d='M14 0 H18 V8 H14 z' opacity='.1' transform='rotate(135 16 16)'>
          <animate
            attributeName='opacity'
            begin='0.375s'
            dur='1s'
            from='1'
            repeatCount='indefinite'
            to='.1'
          />
        </path>
        <path d='M14 0 H18 V8 H14 z' opacity='.1' transform='rotate(180 16 16)'>
          <animate
            attributeName='opacity'
            begin='0.5s'
            dur='1s'
            from='1'
            repeatCount='indefinite'
            to='.1'
          />
        </path>
        <path d='M14 0 H18 V8 H14 z' opacity='.1' transform='rotate(225 16 16)'>
          <animate
            attributeName='opacity'
            begin='0.675s'
            dur='1s'
            from='1'
            repeatCount='indefinite'
            to='.1'
          />
        </path>
        <path d='M14 0 H18 V8 H14 z' opacity='.1' transform='rotate(270 16 16)'>
          <animate
            attributeName='opacity'
            begin='0.75s'
            dur='1s'
            from='1'
            repeatCount='indefinite'
            to='.1'
          />
        </path>
        <path d='M14 0 H18 V8 H14 z' opacity='.1' transform='rotate(315 16 16)'>
          <animate
            attributeName='opacity'
            begin='0.875s'
            dur='1s'
            from='1'
            repeatCount='indefinite'
            to='.1'
          />
        </path>
      </g>
    </svg>
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
