# マジックコードラーニング - クエスト回答集

このドキュメントには、各難易度のクエストに対する回答例が含まれています。

## 初級（Easy）クエスト

### 1. 魔法の数字（足し算）
2つの数値を受け取り、その合計を返す関数です。

```javascript
function magicAdd(a, b) {
  return a + b;
}
```

### 2. 魔法の数字（掛け算）
2つの数値を受け取り、その積を返す関数です。

```javascript
function magicMultiply(a, b) {
  return a * b;
}
```

### 3. 魔法の文字列
2つの文字列を結合する関数です。

```javascript
function magicConcat(str1, str2) {
  return str1 + str2;
}
```

## 中級（Medium）クエスト

### 1. 魔法の配列（合計）
配列内の全ての数値の合計を計算する関数です。

```javascript
function magicSum(numbers) {
  return numbers.reduce((sum, num) => sum + num, 0);
}
```

### 2. 魔法の配列（最大値）
配列内の最大値を見つける関数です。

```javascript
function magicMax(numbers) {
  return Math.max(...numbers);
}
```

### 3. 魔法のフィルター
配列から偶数のみを抽出する関数です。

```javascript
function magicFilter(numbers) {
  return numbers.filter(num => num % 2 === 0);
}
```

## 上級（Hard）クエスト

### 1. 魔法の回文
文字列が回文かどうかを判定する関数です。

```javascript
function magicPalindrome(text) {
  return text === text.split('').reverse().join('');
}
```

### 2. 魔法のソート
数値配列を昇順にソートする関数です。

```javascript
function magicSort(numbers) {
  return numbers.sort((a, b) => a - b);
}
```

### 3. 魔法のアナグラム
2つの文字列がアナグラムの関係にあるかを判定する関数です。

```javascript
function magicAnagram(str1, str2) {
  return str1.split('').sort().join('') === str2.split('').sort().join('');
}
```

## クエストクリア後の報酬

各クエストをクリアすると、以下の報酬が得られます：

1. 経験値の獲得
2. レベルアップの可能性
3. ボスへのダメージ

難易度が高いクエストほど、より多くの報酬を獲得できます。 