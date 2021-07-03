# Jenkins CI/CD

[TOC]

## 처음부터 진행

### docker 설치

```
docker run -d -u root -p 9090:8080 --name=jenkins -v c:/Users/cjw11/dist:/var/jenkins_home/dist jenkins/jenkins
```

### Jenkins

```
docker logs jenkins 명령어로 비밀번호 확인
```



필요한 사항 설치 후, 9090으로 이동

jenkins plugin 설치

```
Bitbucket Pipeline for Blue Ocean
Dashboard for Blue Ocean
Personalization for Blue Ocean
Display URL for Blue Ocean
Server Sent Events(SSE) Gateway
Events API for Blue Ocean
Blue Ocean Pipeline Editor
i18n for Blue Ocean
Autofavorite for Blue Ocean
Blue Ocean
GitLab
Generic Webhook Trigger
Gitlab Authentication
Gitlab API
Gitlab Merge Request Builder
Config File Provider
NodeJS
```

**configure**

Gitlab API token 등록하고 저장

### NginX

```
mkdir dist
docker run --name nginx -d -p 80:80 -v c:/Users/cjw11/dist:/usr/share/nginx/html nginx
```

### 여기까지는 정상 작동. 이제부터 배포!

- http://localhost:9090/view/all/newJob 으로 이동. 파이프라인 생성.

- Build when a change is pushed to GitLab. GitLab webhook URL: http://localhost:9090/project/pipeline_test 체크한 뒤  Secret Key generate

  ![image-20210701230506701](README.assets/image-20210701230506701.png)

위와 같이 설정한다.

- 대망의 파이프라인.

```
pipeline {
    agent any
    tools{ nodejs "nodejs" }
    parameters {
        string(name: 'GIT_URL', defaultValue: 'https://cjw1102@naver.com:senare1137!@lab.ssafy.com/cjw1102/jenkins_deploy.git', description: 'GIT_URL')
        booleanParam(name: 'VERBOSE', defaultValue: false, description: '')
    }

    environment {
        GIT_BUSINESS_CD = 'master'
        GIT_CREDENTIAL_ID = 'cjw1102'
        VERBOSE_FLAG = '-q'
    }

    stages{
        stage('Preparation'){
            steps{
                script{
                    env.ymd = sh (returnStdout: true, script: ''' echo date '+%Y%m%d-%H%M%S' ''')
                }
                echo("params : ${env.ymd} " + params.tag)
            }
        }

        stage('Checkout'){
            steps{
                git(branch: "${env.GIT_BUSINESS_CD}",
                credentialsId: "${env.GIT_CREDENTIAL_ID}", url: params.GIT_URL, changelog: false, poll: false)
            }
        }

        stage('Build and Deploy'){
            steps{
                sh "rm -rf package-lock.json node_modules"
                sh "npm install"
                sh "npm run build"
                sh "cp -rf dist/* /var/jenkins_home/dist"
            }
        }
    }
}
```

- 이러면 배포를 누르면 nodeJS를 못찾는다는 오류가 뜬다.

![image-20210701231446815](README.assets/image-20210701231446815.png)

그러면 Config 가서NodeJS를 Add 해줘야 한다. tools에 있던 대로 이름은 nodejs. 

![image-20210701231553210](README.assets/image-20210701231553210.png)

## Jenkins 드디어 배포 성공함!

비밀번호 헛다리를 짚고 있었다.

![image-20210701234942152](README.assets/image-20210701234942152.png)

## 이전 진행사항

localhost로 webhook을 걸려니까 보안 에러가 떴다.

ngrok으로 돌렸으나 이번엔 403 Error... 배경지식이 없으니 뭐가 문제인지도 모르겠다. gitlab jenkins, docker jenkins pipeline script 등 온갖 뻘짓을 다해봤다.

### Pipeline 1th Try

```
pipeline {
    agent any
    stages {
        stage('prepare') {
            steps {
                sh "echo 'Ready'"
            }
        }
        stage('build') {
            steps {
                sh "echo 'build'"
            }
            post {
                success {
                    sh "echo 'success!'"
                }
            }
        }
        stage('Deploy') {
            steps{
                sh "echo 'Deploy!'"
            }
        }
    }
}
```

![image-20210701141609045](README.assets/image-20210701141609045.png)

### Pipeline 2nd Try

```
node {  
      stage('Build') { 
          checkout([$class: 'GitSCM', branches: [[name: 'master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: 'https://lab.ssafy.com/cjw1102/jenkins_practice.git']]])
      }
      stage('Deploy') {
          steps{
              sh "echo 'Deploy!'"
          }
      }
}

```

![image-20210701141802200](README.assets/image-20210701141802200.png)



![image-20210701142021083](README.assets/image-20210701142021083.png)

### 3rd

```
pipeline {
    agent any
    parameters {
        string(name: 'GIT_URL', defaultValue: 'http://cjw1102:senare1137!@lab.ssafy.com/cjw1102/jenkins_practice.git', description: 'GIT_URL')
        booleanParam(name: 'VERBOSE', defaultValue: false, description: '')
    }

    environment {
        GIT_BUSINESS_CD = 'master'
        GIT_CREDENTIAL_ID = 'cjw1102'
        VERBOSE_FLAG = '-q'
    }

    stages{
        stage('Preparation'){
            steps{
                script{
                    env.ymd = sh (returnStdout: true, script: ''' echo date '+%Y%m%d-%H%M%S' ''')
                }
                echo("params : ${env.ymd} " + params.tag)
            }
        }

        stage('Checkout'){
            steps{
                git(branch: "${env.GIT_BUSINESS_CD}",
                credentialsId: "${env.GIT_CREDENTIAL_ID}", url: params.GIT_URL, changelog: false, poll: false)
            }
        }

        stage('Build and Deploy'){
            steps{
                sh "rm -rf package-lock.json node_modules"
                sh "npm install"
                sh "npm run build"
                sh "cp -rf dist/* /var/www/html/"
            }
        }
    }
}
```

### 4th

```
pipeline {
    agent any

    stages{
        // checkout from github
        stage('Checkout'){
            steps {
                git branch: 'master', credentialsId: 'admin', url: 'https://cjw1102@naver.com:senare1137!@lab.ssafy.com/cjw1102/jenkins_practice/'
            }
        }
    }
}
```



## ngrok 해결

![image-20210701143202764](README.assets/image-20210701143202764.png)

jenkins의 gitlab webhook 부분에 있는 것처럼 project/[project_name] 으로 해야 했다. 빌드 성공.

## Screen Shot

![image-20210701140552534](README.assets/image-20210701140552534.png)

![image-20210701135831289](README.assets/image-20210701135831289.png)

![image-20210701140122801](README.assets/image-20210701140122801.png)

![image-20210701140104346](README.assets/image-20210701140104346.png)