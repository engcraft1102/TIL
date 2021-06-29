function setCookie(cname, cvalue, exdays) {
  const d = new Date()
  d.setTime(d.getTime() + (exdays*24*60*60*1000))
  const expires = "expires="+d.toUTCString()
  document.cookie = cname + "=" + cvalue + ";" + expires
}

function getCookie(cname) {
  const name = cname + "="
  const ca = document.cookie.split(';')

  for (let i=0; i<ca.length; i++) {
    let c = ca[i]
    // 왼쪽 trim
    while (c.charAt(0)==' ') c = c.substring(1)
    if (c.indexOf(name) != -1) return c.substring(name.length, c.length)
  }
  return ""
}

// cookie이라는 항목에 1을 7일동안 저장
setCookie('cookie',1,7)
// cookie라는 항목에 저장된 쿠키값 불러오기
getCookie('cookie')
