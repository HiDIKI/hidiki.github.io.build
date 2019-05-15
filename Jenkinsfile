pipeline {
  agent {
    docker { image 'kkarczmarczyk/node-yarn' }
  }
  stages {
    stage('Test') {
      when {
        not {
          branch 'master'
        }
      }
      steps {
        sh 'node --version'
        sh 'yarn --version'
        sh 'yarn'
        sh 'yarn build'
        sh 'sudo rm -rf  node_modules'
      }
    }
    stage('Pull') {
      when {
        branch 'master'
      }
      steps {
        git(url: 'https://github.com/HiDIKI/hidiki.github.io.build.git', branch: 'master', poll: true)
      }
    }
    stage('Build') {
      when {
        branch 'master'
      }
      steps {
        sh 'set -e'
        sh 'yarn'
        sh 'yarn build'
        sh 'cp ./google*.html ./docs'
      }
    }

    stage('Deploy') {
      when {
        branch 'master'
      }
      environment {
        GITHUB_CRED = credentials('github-cred')
      }
      steps {
        dir('docs') {
            sh 'git init'
            sh 'git remote add origin https://$GITHUB_CRED_USR:$GITHUB_CRED_PSW@github.com/HiDIKI/hidiki.github.io.git'
            sh 'git config user.name hidekuma'
            sh 'git config user.email d.hidekuma@gmail.com'
            sh 'git add -A'
            sh 'git commit -m "DEPLOY"'
            sh 'git push -f --set-upstream origin master'
        }
      }
    }
  }
  post {
    success {
      slackSend (color: '#00FF00', message: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
    }

    failure {
      slackSend (color: '#FF0000', message: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
    }
  }
}
