# API Endpoints Design

## Base URL
```
http://localhost:5000/api/v1
```

## Authentication Endpoints

### POST /auth/register
ユーザー登録を行うエンドポイント

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "userId": "string",
    "username": "string",
    "email": "string"
  }
}
```

### POST /auth/login
ログインを行うエンドポイント

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "string",
    "user": {
      "userId": "string",
      "username": "string",
      "email": "string",
      "level": "number",
      "experience": "number"
    }
  }
}
```

## User Endpoints

### GET /users/profile
ユーザープロファイルを取得するエンドポイント

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "userId": "string",
    "username": "string",
    "email": "string",
    "level": "number",
    "experience": "number",
    "achievements": [
      {
        "id": "string",
        "name": "string",
        "description": "string",
        "unlockedAt": "date"
      }
    ],
    "completedQuests": [
      {
        "id": "string",
        "name": "string",
        "completedAt": "date"
      }
    ]
  }
}
```

### PUT /users/profile
ユーザープロファイルを更新するエンドポイント

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "username": "string",
  "email": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "userId": "string",
    "username": "string",
    "email": "string"
  }
}
```

## Learning Content Endpoints

### GET /learning/levels
学習レベル一覧を取得するエンドポイント

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "levels": [
      {
        "id": "string",
        "name": "string",
        "description": "string",
        "requiredLevel": "number",
        "stages": [
          {
            "id": "string",
            "name": "string",
            "description": "string",
            "quests": [
              {
                "id": "string",
                "name": "string",
                "description": "string",
                "type": "string",
                "difficulty": "number"
              }
            ]
          }
        ]
      }
    ]
  }
}
```

### GET /learning/quests/{questId}
特定のクエストの詳細を取得するエンドポイント

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "quest": {
      "id": "string",
      "name": "string",
      "description": "string",
      "type": "string",
      "difficulty": "number",
      "content": {
        "instructions": "string",
        "initialCode": "string",
        "testCases": [
          {
            "input": "string",
            "expectedOutput": "string"
          }
        ]
      }
    }
  }
}
```

### POST /learning/quests/{questId}/submit
クエストの回答を提出するエンドポイント

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "code": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "results": {
      "passed": "boolean",
      "score": "number",
      "testResults": [
        {
          "passed": "boolean",
          "input": "string",
          "expectedOutput": "string",
          "actualOutput": "string"
        }
      ],
      "experienceGained": "number"
    }
  }
}
```

## Progress Tracking Endpoints

### GET /progress
学習進捗を取得するエンドポイント

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "currentLevel": "number",
    "experience": "number",
    "nextLevelExperience": "number",
    "completedQuests": [
      {
        "id": "string",
        "name": "string",
        "completedAt": "date",
        "score": "number"
      }
    ],
    "achievements": [
      {
        "id": "string",
        "name": "string",
        "description": "string",
        "unlockedAt": "date"
      }
    ]
  }
}
```

## Achievement Endpoints

### GET /achievements
実績一覧を取得するエンドポイント

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "achievements": [
      {
        "id": "string",
        "name": "string",
        "description": "string",
        "requirements": "string",
        "unlocked": "boolean",
        "unlockedAt": "date"
      }
    ]
  }
}
```

## Error Responses

すべてのエンドポイントは、エラー時に以下の形式でレスポンスを返します：

```json
{
  "success": false,
  "error": {
    "code": "string",
    "message": "string"
  }
}
```

### 共通エラーコード
- 400: Bad Request - リクエストの形式が不正
- 401: Unauthorized - 認証が必要
- 403: Forbidden - 権限がない
- 404: Not Found - リソースが見つからない
- 500: Internal Server Error - サーバー内部エラー 