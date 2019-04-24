---
customauthor:
  - name: Hidekuma
---
# * Kali linux에 도커 설치 
<Author/>
## 1. 설치 전 준비사항 3 STEP
1.`Docker pgp key` 추가
```sh
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -
```
::: tip pgp
'Pretty Good Privacy'의 약자로서, 컴퓨터 파일을 암호화하고 복호화하는 프로그램.
:::
2. `Docker packaging tool` 저장소 추가
```sh
echo 'deb https://download.docker.com/linux/debian stretch stable' > /etc/apt/sources.list.d/docker.list
```
3. 저장소 반영
```sh
sudo apt-get update
```

## 2. 패키징 툴로 설치 3 STEP
1. 오래된 버전이 있을 경우, 삭제하기
```sh
sudo apt-get remove docker docker-engine docker.io
```
2. 설치하기
```sh
sudo apt-get install docker-ce
```
3. 확인하기
```sh
docker version
```

## 3. 도커 컴포즈 설치 보너스
1. 안정적인 `lts`버전 설치
```sh
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```
::: tip lts
장기 지원 버전, 곧 LTS(Long Term Support)는, 일반적인 경우보다 장기간에 걸쳐 지원하도록 특별히 고안된 소프트웨어의 버전 또는 에디션.
:::
2. 컴포저 파일에 실행권한 부여
```sh
sudo chmod +x /usr/local/bin/docker-compose
```
3. 심볼릭 링크 걸어 커맨드라인에 사용하게 만들기
```sh
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```
4. 확인하기
```sh
docker-compose --version
```
