function Loading() {
  return (
    <div className="main-container">
      <div className="flex h-full w-full items-center justify-center">
        <div>
          <div className="w-fit cursor-default rounded bg-slate-50 px-20 py-10 text-darkblue outline outline-1 outline-darkblue">
            <p className="animate-bounce">loading...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
