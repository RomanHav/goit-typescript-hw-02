type clicked = {
  click: () => void,
};

export default function LoadMoreBtn({ click }: clicked): JSX.Element {
  return (
    <div>
      <button onClick={click}>Load more...</button>
    </div>
  );
}
