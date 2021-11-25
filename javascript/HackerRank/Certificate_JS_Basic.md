# HackerRank JavaScript Basic Certification

## 1. Country Code

간단한 API 요청 문제입니다.

async로 WebAPI에 getCountryName 자체를 넘겨주면 결과가 더 빠르게 나왔습니다.

```js
async function getCountryName(code) {
  // write your code here
  // API endpoint: https://jsonmock.hackerrank.com/api/countries?page=<PAGE_NUMBER>
  let axios = require("axios");

  async function getCountry(page_number) {
    const res = await axios.get(
      `https://jsonmock.hackerrank.com/api/countries?page=${page_number}`
    );

    const current_page = Number(res.data.page);
    const total_pages = Number(res.data.total_pages);

    let name = "";

    /*
     * 2가지 방식으로 풀었습니다. 둘다 통과합니다.
     */
    // 1. indexing 사용
    const data = res.data.data; // Array
    for (let i = 0; i < data.length; i++) {
      if (data[i].alpha2Code === code) {
        name = data[i].name;
        break;
      }
    }

    // 2. forEach 사용
    data.forEach((country) => {
      if (country.alpha2Code === code) {
        name = country.name;
        return false; // forEach에서 break 역할
      }
    });

    if (name === "" && current_page < total_pages) {
      return getCountry(current_page + 1);
    }
    return name;
  }
  return getCountry(1);
}
```

## 2.

map과 filter를 사용해서 풀었습니다.

```js
function processOrderList(orderList, orderId, state) {
  // Write your code here
  if (state === "Processing") {
    // Change state to Processing
    orderList.map((order) => {
      order.id === orderId ? (order.state = "Processing") : order;
    });
  } else if (state === "Delivered") {
    // Delete order from the list having the id of orderId
    orderList = orderList.filter((order) => order.id !== orderId);
  }
  return orderList;
}
```

![image-20211119231115551](Certificate_JS_Basic.assets/image-20211119231115551.png)
