# PVS 
## 安裝環境
### 前端
1. 安裝NodeJS
2. 在frontend目錄下執行npm install安裝套件

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
MAVEN_OPTS
# 變數值
-Xms256m -Xmx512m
```
3. 安裝資料庫
4. 修改application.yml內的postgresql參數
5. 在backend目錄下執行mvn clean install

### 資料庫
1. 安裝PostgreSQL
2. 新增一個名稱為PVS的Database

## 開啟步驟
1. 在frontend目錄下執行npm run start
2. 在backend目錄下執行mvn spring-boot:run

## 執行測試 
 進入/backend 執行 mvn test
