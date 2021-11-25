## 1. Slideshow App

```jsx
import React, { useState } from 'react';

function Slides({slides}) {
  const [page, setPage] = useState(0)

  const prev = () => {
    setPage(page - 1)
  }
  const next = () => {
    setPage(page + 1)
  }
  const restart = () => {
    setPage(0)
  }


  return (
      <div>
          <div id="navigation" className="text-center">
              <button data-testid="button-restart" onClick={restart} disabled={page === 0} className="small outlined">Restart</button>
              <button data-testid="button-prev" onClick={prev} disabled={page === 0} className="small">Prev</button>
              <button data-testid="button-next" onClick={next} disabled={page === slides.length} className="small">Next</button>
          </div>
          <div id="slide" className="card text-center">
              <h1 data-testid="title">{slides[page].title}</h1>
              <p data-testid="text">{slides[page].text}</p>
          </div>
      </div>
  );
}
```

