# * MySQL 스토리지 엔진
<Author name='Hidekuma' />
> 많은 스토리지 엔진 중, 대표적인 엔진 두 가지에 대해 비교를 해보기로 한다.

## 도커로 MySQL띄우기
MySQL을 직접 만지면서 공부하고 싶다면, 도커로 띄우는걸 추천한다.
```bash
$ docker run --name mysql -e MYSQL_ROOT_PASSWORD=1234 -d mysql
# 띄워지고 나면,
$ docker exec -it mysql /bin/bash
# 컨테이너 안으로 진입 후
$ root@b70dd00594fc:/# mysql -p
# 1234 입력
Enter password:

Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 12
Server version: 8.0.15 MySQL Community Server - GPL

Copyright (c) 2000, 2019, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> # MySQL 접속완료
```

## 스토리지 엔진의 종류
이제부터 설명할 두 엔진 외의 종류는 하기 커맨드로 조회 가능하다.
```sql
mysql> show ENGINES;

+--------------------+---------+----------------------------------------------------------------+--------------+------+------------+
| Engine             | Support | Comment                                                        | Transactions | XA   | Savepoints |
+--------------------+---------+----------------------------------------------------------------+--------------+------+------------+
| FEDERATED          | NO      | Federated MySQL storage engine                                 | NULL         | NULL | NULL       |
| MEMORY             | YES     | Hash based, stored in memory, useful for temporary tables      | NO           | NO   | NO         |
| InnoDB             | DEFAULT | Supports transactions, row-level locking, and foreign keys     | YES          | YES  | YES        |
| PERFORMANCE_SCHEMA | YES     | Performance Schema                                             | NO           | NO   | NO         |
| MyISAM             | YES     | MyISAM storage engine                                          | NO           | NO   | NO         |
| MRG_MYISAM         | YES     | Collection of identical MyISAM tables                          | NO           | NO   | NO         |
| BLACKHOLE          | YES     | /dev/null storage engine (anything you write to it disappears) | NO           | NO   | NO         |
| CSV                | YES     | CSV storage engine                                             | NO           | NO   | NO         |
| ARCHIVE            | YES     | Archive storage engine                                         | NO           | NO   | NO         |
+--------------------+---------+----------------------------------------------------------------+--------------+------+------------+
```

---

## 스토리지 엔진이란?
DB에 데이터를 CRUD(Create, Read, Update, Delete)하는 데 사용하는 기본 컴포넌트라고 생각하면 된다.
MySQL의 스토리지 엔진은 DBMS 고유의 사용자 인터페이스를 이용하는 방법과 포트번호를 통해 하는 방법을 제공한다. 따라서, 사용자가 내장된 엔진과 상호작용을 할 수 있는 자신만의 인터페이스를 포함한다. 
::: warning
DB내의 다중 엔진을 지원하나, Locking 수준이 다르거나 할 경우 오류가 발생할 수 있기 때문에 권장하진 않는다.
:::

## MyISAM
### MyISAM 장점
- 구조가 단순해, 속도 빠르다.
- 특히 읽기(READ)작업에 효과적이다. (테이블락)
- Full-text 검색이 가능하다.

### MyISAM 단점
- 테이블락으로 쓰기작업이 느림.
- 데이터 무결성이 보장되지 않는다.

### MyISAM 쓰임새
- 데이터 웨어하우스
- 로그정보
- OLAP
:::tip MyISAM의 각 테이블 별 파일
*.frm : 테이블 정의 파일, *.MYD : 테이블 데이터 파일, *.MYI : 테이블 인덱스 파일
:::

## InnoDB
### InnoDB 장점
- 로우락으로 쓰기작업에 탁월하다.
- 데이터 무결성 보장(트랜잭션, 외래키, 제약조건, 동시성 등) - ACID

### InnoDB 단점
- 많은 기능을 있어, 설계에 시간이 많이 든다.
- MyISAM에 비해 1~2배 큰 파일을 사용.
- 기능이 많은 만큼, 컴퓨템 자원을 많이 사용한다.

### InnoDB 쓰임새
- 유저정보, 빌링과 같이 무결성이 보장되어야 하는 경우
- 데이터 갱신이 잦은 애플리케이션
- OLTP

## MyISAM, InnoDB 비교정리
| 구분                 | MyISAM                          | InnoDB                        |
| :-:                  | :-:                             | :-:                           |
| Transactions         | NO                              | YES                           |
| Default 버전         | 5.5 이전                        | 5.5 이후                      |
| Data 저장 제한       | NO(논리/물리적 제한은 YES)      | Space당 64TB                  |
| 관리개념             | Index - MySQL, Data - OS 캐싱   | Index, Data - table space개념 |
| Data 압축            | YES                             | NO                            |
| 구조복잡성           | 단순                            | 복잡,헤비                     |
| FK                   | NO                              | YES                           |
| Locking              | Table level                     | Row level                     |
| Recovery             | 나쁨                            | 좋음                          |
| Index                | B-Tree, R-tree, Full-text Index | B-Tree, Clustered             |
| Index memory caching | YES                             | YES                           |
| CPU core             | 영향없음                        | 비례하여 성능상승             |

