# * Window에 도커 설치 
## 1. Hyper-V 설치
1. windows 기능 > windows 기능 켜기/끄기
2. Hyper-V 체크박스에 체크.
3. 설치완료 후, Hyper-V 실행하여 `Hyper-V 관리자` >  `PC 이름`이 표시 되는지 확인.
4. 만약 Hyper-V 관리자가 안나온다면, CMD에서 해당 커맨드 실행.
```bash
  C:\Windows\System32\virtmgmt.msc
```

## 2. Docker-for-windows 설치
 - 문제 없이 진행됨.

## 3. 도커 공유드라이브 설정
Windows 10에서 Docker Desktop를 사용시 도커가 일정 시간 공유 드라이브에 접근하지 않으면  공유 드라이브 접근 권한이 끊어지는 이슈.
1. `Windows + r` > lusrmgr.msc 입력
2. "사용자" 누른 후 사용자 목록이 나오는 곳에서 우클릭하여 "새 사용자(N)..." 
3. DockerUser를 만들고, 암호 사용 기간 제한 없음(W)에만 체크.
4. Docker에서`Reset Credentials` > 재인증.
5. 새로 만든 DockerUser 정보를 입력.

