# PVS 
## 安裝環境

1. 下載MySQL 將Root密碼設定為 ""(空)
2. 下載Java11 http://jdk.java.net/java-se-ri/11 
3. 設定 Java 環境變數 JAVA_HOME: C:\Program Files (x86)\AdoptOpenJDK\jdk-11
4. 安裝Node.js 
5. (建議) 安裝Git Bash

## 開啟步驟

1. 進入/frontend cmd或GitBash執行 npm start
2. 進入/backend/.target cmd或GitBash執行 java -jar springboot_pvs_app-1.0-SNAPSHOT.jar

## 執行測試 
 進入/backend 執行 mvn test

## 開發模式
 進入/backend 執行 mvn spring-boot:run 需要額外安裝PSQL
 因有使用 ORM 技術
 所以在PSQL內新增一個名稱為 pvs 的 db 即可使用
