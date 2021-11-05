pipeline {
    agent {
        kubernetes {
       
            yaml '''
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: shell
    image:  node:latest
    command:
    - sleep
    args:
    - infinity
'''
            defaultContainer 'shell'
        }
    }
    stages {
            stage('Clean Workspace'){
            steps {
                cleanWs(deleteDirs: true)
            }
        }
        stage('Checkout SCM'){
        steps {
            checkout scm
        }
        }
        stage('Codecov Functional Testing'){
            steps{
                sh 'echo "here steps to add"'
            }
        }
        stage('Codecov Code Quality'){
            steps{
                sh 'echo "here steps to add"'
            }
        }
       /* stage('Codecov Quality Gates') {
            steps{
                timeout(time: 1, unit: 'HOURS'){
                    script{
                        def qualityGate = waitForQualityGate()
                        if(qualityGate.status != 'OK') {
                            error "Project build failed due to quality gate failure: ${qualityGate.status}"
                        }
                    }
                }
            }
        }*/
        stage('Generate documentation'){
            steps{
                sh 'npm i'
                sh 'mkdir -p ./docs/jsdoc-output/'
                sh 'chown -R node:node docs'
                sh 'ls -lah ./docs/jsdoc-output/'
                sh 'npm run docs'
                sh 'ls -l ./docs/jsdoc-output/'
            }
        }
        stage("push to repo"){
            steps{
                git url: "git@github.com:AndrijanaStefanovska24/Impressionist.git",
                credentialsId: 'jenkins-test-key',
                branch: 'devops-test'
                sh 'git remote set-url origin git@github.com:AndrijanaStefanovska24/Impressionist.git'
                sh 'git config --global user.email "jenkis@platoanalytics.com" && git config --global user.name "Jenkins User" && git add . && git commit -m "test" &&  git push --set-upstream origin devops-test'
            }
        }
        
    }
}
