# HackerRank 10 Days of JS

# Day 2

## If-Else - 인데 switch로 풀어본...

```javascript
function getGrade(score) {
    let grade;
    // Write your code here
    switch (true) {
        case 25 < score:
            grade = 'A'
            break;
        case 20 < score:
            grade = 'B'
            break;
        case 15 < score:
            grade = 'C'
            break;
        case 10 < score:
            grade = 'D'
            break;
        case 5 < score:
            grade = 'E'
            break;
        default:
            grade = 'F'
    }
    return grade;
}

```

- switch - case 문에서 범위를 조건으로 두려면 switch의 파라미터를 true로 설정해 주어야 합니다.

## Loops

```js
function vowelsAndConsonants(s) {
    for (let i=0; i<s.length; i++) {
        if (s[i].match(/[aeiou]/)) {
            console.log(s[i])
        }
    }
    for (let i=0; i<s.length; i++) {
        if (s[i].match(/[^aeiou]/)) {
            console.log(s[i])
        }
    }
}
```

# Day 3

## Array

```js
function getSecondLargest(nums) {
    // Complete the function
    nums = new Set(nums)
    nums = Array.from(nums)
    nums = nums.sort(comparator)
    return nums[1]
}

function comparator (a, b) {
    return b - a
}
```

## Try, Catch, and Finally

### 풀이 1

```js
function reverseString(s) {
    let result = s
    try {
        const tmp = s.split('')
        const N = tmp.length
        result = ''
        for (let i=N-1; i>-1; i--) {
            result += s[i]
        }
    } catch (e) {
        console.log (e.message)
    } finally {
        console.log(result)
    }
}
```

### 풀이2

```js

function reverseString(s) {
    try {
        s = s.split('').reverse().join('')
    } catch (e) {
        console.log (e.message)
    } finally {
        console.log(s)
    }
}
```

## Throw

```js
function isPositive(a) {
    
    if (a < 0) {
        throw new Error('Negative Error')
    } else if (a === 0) {
        throw new Error('Zero Error')
    } else {
        return 'YES'
    }
}
```

## Count Objects

```js
function getCount(objects) {
    let result = 0
    
    objects.forEach(object => {
        if (object.x === object.y) {
            result += 1
        }
    })
    return result
}
```

## Classes

```js
class Polygon {
    constructor(array) {
        this.array = array
    }
    
    perimeter() {
        let result = 0
        for (let i=0; i<this.array.length; i++) {
            result += this.array[i]
        }
        return result
    }
}
```

## Inheritance

익숙한 개념이 아닌 `Prototype`에 대해 공부해 둬야겠습니다.

```js
/*
 *  Write code that adds an 'area' method to the Rectangle class' prototype
 */
Rectangle.prototype.area = function () {
    return this.w * this.h
}

/*
 * Create a Square class that inherits from Rectangle and implement its class constructor
 */

class Square extends Rectangle {
    constructor(w) {
        super(w, w)
    }
}
```

## Template-literals

이 문제에 나온 것은 `tagged template literal`입니다. [블로그](https://eblee-repo.tistory.com/38)

```js
function sides(literals, ...expressions) {
    let A = expressions[0]
    let P = expressions[1]
    
    let x = (P + Math.sqrt(Math.pow(P,2) - 16*A))/4
    let y = (P - Math.sqrt(Math.pow(P,2) - 16*A))/4
    
    return [x, y].sort()
}
```

## Arrow Functions

map 함수와 삼항 연산자를 사용했습니다.

```js
function modifyArray(nums) {
    return nums.map(num => num%2 ? num * 3 : num * 2)
}
```
