/** The Tudor rose, defined once and reused by `<RoseIcon>` anywhere on the page. */
export function RoseDefs() {
  const petal = (r: number) => <path key={r} d="M0-48 L7-30 L-7-30Z" transform={`rotate(${r})`} />;
  const ring = (cy: number, r: number) =>
    [0, 72, 144, 216, 288].map((a) => <circle key={a} cx="0" cy={cy} r={r} transform={`rotate(${a})`} />);
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <symbol id="rose" viewBox="-50 -50 100 100">
          <g fill="#3f7a3a">{[36, 108, 180, 252, 324].map(petal)}</g>
          <g fill="#b3202a" stroke="#6e0f15" strokeWidth="1.5">
            {ring(-24, 20)}
          </g>
          <g fill="#f6efe0" stroke="#c9b893" strokeWidth="1.2" transform="rotate(36)">
            {ring(-12, 12)}
          </g>
          <circle r="8" fill="#e2b33c" stroke="#9c7618" strokeWidth="1.5" />
          <g fill="#9c7618">
            <circle r="1.6" cx="0" cy="-4" />
            <circle r="1.6" cx="4" cy="1" />
            <circle r="1.6" cx="-4" cy="1" />
            <circle r="1.6" cx="2" cy="4" />
            <circle r="1.6" cx="-2" cy="4" />
          </g>
        </symbol>
      </defs>
    </svg>
  );
}

export function RoseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} aria-hidden="true">
      <use href="#rose" />
    </svg>
  );
}
