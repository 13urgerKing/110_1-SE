# PVS 
## 安裝環境
### 前端
1. 安裝NodeJS
2. 在frontend目錄下執行以下指令安裝套件
```
# CLI介面(GitBash 或 CMD)
$ npm install
```

### 後端
1. 安裝JAVA OPEN JDK11並新增環境變數
```
# 變數名稱
JAVA_HOME
# 變數值(Java路徑)
C:\Program Files (x86)\AdoptOpenJDK\jdk-11
```
2. 安裝MAVEN並新增環境變數
```
# 變數名稱
MAVEN
# 變數值
%MAVEN_HOME%\bin

# 變數名稱
MAVEN_HOME
# 變數值 (自己電腦的安裝路徑)
C:\Program Files\apache-maven-3.6.3
```
3. 安裝資料庫
4. 修改application.yml內的postgresql參數
5. 在backend目錄下執行
```
# CLI介面(GitBash 或 CMD)
$ mvn clean install
```

### 資料庫
1. 安裝PostgreSQL
2. 新增一個名稱為PVS的Database

## 開啟步驟
1. 在frontend目錄下執行
```
# CLI介面(GitBash 或 CMD)
$ npm run start
```
2. 在backend目錄下執行
```
# CLI介面(GitBash 或 CMD)
$ mvn clean spring-boot:run
```

## 執行測試 
 進入/backend 執行
```
# CLI介面(GitBash 或 CMD)
$ mvn clean test
```
