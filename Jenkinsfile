pipeline {
  agent {
    docker { image 'kkarczmarczyk/node-yarn' }
  }
  stages {
    stage('Test') {
      steps {
        sh 'node --version'
        sh 'yarn --version'
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
    stage('Deploy') {
      when {
        branch 'master'
      }
      steps {
        sh './deploy.sh'
      }
    }
  }
}
