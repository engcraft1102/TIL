// callback 적용 전, 문제가 일어나는 코드
function getData() {
  var data;
  $.get('https://~~', function(response) {
    data = response;
  })
  return data;
}
console.log(getData()); // undefined

// callback 적용
function getData(callback) {
  $.get('https://~~', function(response) {
    callback(response)
  })
}

getData(function(data) {
  console.log(data);
});
