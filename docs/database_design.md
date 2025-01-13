# データベース設計書

## 1. 概要

### 1.1 設計方針
- NoSQLデータベース（MongoDB）の採用
- スケーラビリティを考慮した設計
- 柔軟なスキーマ設計による拡張性の確保
- パフォーマンスを考慮したインデックス設計

### 1.2 主要コレクション
1. ユーザー管理
2. 学習コンテンツ
3. 進捗管理
4. 実績システム
5. アイテム管理

## 2. コレクション詳細

### 2.1 users（ユーザー）
```json
{
  "_id": "ObjectId",
  "username": "String",
  "email": "String",
  "password": "String (hashed)",
  "profile": {
    "displayName": "String",
    "avatar": "String (URL)",
    "level": "Number",
    "totalExp": "Number",
    "title": "String",
    "createdAt": "Date",
    "lastLogin": "Date"
  },
  "settings": {
    "language": "String",
    "notifications": "Boolean",
    "theme": "String"
  },
  "stats": {
    "questsCompleted": "Number",
    "totalCodingTime": "Number",
    "successRate": "Number",
    "currentStreak": "Number"
  }
}
```

### 2.2 learning_content（学習コンテンツ）
```json
{
  "_id": "ObjectId",
  "level": "Number",
  "stage": "Number",
  "quest": "Number",
  "title": "String",
  "type": "String (enum: ['theory', 'practice', 'challenge'])",
  "content": {
    "story": "String",
    "description": "String",
    "objectives": ["String"],
    "hints": ["String"]
  },
  "code": {
    "initial": "String",
    "solution": "String",
    "testCases": [{
      "input": "String",
      "expectedOutput": "String",
      "description": "String"
    }]
  },
  "rewards": {
    "exp": "Number",
    "items": [{
      "itemId": "ObjectId",
      "probability": "Number"
    }]
  },
  "requirements": {
    "level": "Number",
    "quests": ["ObjectId"],
    "items": ["ObjectId"]
  }
}
```

### 2.3 progress（進捗管理）
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "contentId": "ObjectId",
  "status": "String (enum: ['not_started', 'in_progress', 'completed'])",
  "attempts": [{
    "timestamp": "Date",
    "code": "String",
    "result": "String (enum: ['success', 'failure'])",
    "executionTime": "Number",
    "memoryUsage": "Number",
    "errors": ["String"]
  }],
  "completion": {
    "date": "Date",
    "score": "Number",
    "timeSpent": "Number",
    "codeQuality": "Number"
  },
  "feedback": {
    "difficulty": "Number",
    "enjoyment": "Number",
    "comments": "String"
  }
}
```

### 2.4 achievements（実績システム）
```json
{
  "_id": "ObjectId",
  "title": "String",
  "description": "String",
  "category": "String (enum: ['coding', 'learning', 'social'])",
  "requirements": {
    "type": "String",
    "value": "Number",
    "conditions": ["String"]
  },
  "rewards": {
    "exp": "Number",
    "title": "String",
    "items": ["ObjectId"]
  },
  "icon": "String (URL)",
  "rarity": "String (enum: ['common', 'rare', 'epic', 'legendary'])"
}
```

### 2.5 user_achievements（ユーザー実績）
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "achievementId": "ObjectId",
  "unlockedAt": "Date",
  "progress": "Number",
  "claimed": "Boolean"
}
```

### 2.6 items（アイテム）
```json
{
  "_id": "ObjectId",
  "name": "String",
  "type": "String (enum: ['book', 'tool', 'accessory'])",
  "description": "String",
  "effects": [{
    "type": "String",
    "value": "Number",
    "duration": "Number"
  }],
  "rarity": "String",
  "icon": "String (URL)",
  "tradeable": "Boolean"
}
```

### 2.7 inventory（インベントリ）
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "items": [{
    "itemId": "ObjectId",
    "quantity": "Number",
    "acquired": "Date",
    "equipped": "Boolean"
  }]
}
```

## 3. インデックス設計

### 3.1 users
- username (unique)
- email (unique)
- "profile.level" (ascending)
- "stats.questsCompleted" (descending)

### 3.2 learning_content
- level (ascending)
- stage (ascending)
- quest (ascending)
- type (ascending)

### 3.3 progress
- userId (ascending)
- contentId (ascending)
- status (ascending)
- "completion.date" (descending)

### 3.4 achievements
- category (ascending)
- rarity (ascending)

### 3.5 inventory
- userId (ascending)
- "items.itemId" (ascending)

## 4. データ整合性ルール

### 4.1 バリデーションルール
- ユーザー名の最小/最大長
- メールアドレスの形式
- レベルの範囲（1-100）
- 経験値の最小値（0）
- スコアの範囲（0-100）

### 4.2 参照整合性
- ユーザーIDの存在確認
- コンテンツIDの存在確認
- アイテムIDの存在確認
- 実績IDの存在確認

## 5. セキュリティ設計

### 5.1 アクセス制御
- ユーザー情報の読み書き制限
- 進捗データの所有者チェック
- 管理者権限の設定
- APIアクセストークンの管理

### 5.2 データ保護
- パスワードのハッシュ化
- センシティブデータの暗号化
- バックアップ戦略
- 監査ログの記録

## 6. パフォーマンス最適化

### 6.1 クエリ最適化
- 頻出クエリのインデックス作成
- 複合インデックスの活用
- プロジェクション使用による転送データの最小化

### 6.2 キャッシュ戦略
- 学習コンテンツのキャッシュ
- ユーザープロフィールのキャッシュ
- 実績データのキャッシュ

## 7. スケーリング戦略

### 7.1 水平スケーリング
- シャーディングキーの選定
  - ユーザーID
  - コンテンツID
- レプリケーション設定

### 7.2 バックアップ戦略
- 定期的なフルバックアップ
- 増分バックアップ
- ポイントインタイムリカバリ 