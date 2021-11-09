pipeline {
    agent any
    stages {
         /*  stage('Clean Workspace'){
            steps {
                cleanWs(deleteDirs: true)
            }
        }*/
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
                sh 'git checkout devops-test'
                sh 'npm i'
                sh 'mkdir -p ./docs/jsdoc-output/'
                sh 'chown -R node:node docs'
                sh 'ls -lah ./docs/jsdoc-output/'
                sh 'npm run docs'
                sh 'ls -l ./docs/jsdoc-output/'
                sh 'git status && git config --global user.email "jenkins@jenkins.com" && git config --global user.name "Jenkins User" && git add . && git commit -m "test for jenkins" && git push'
            }
        }
        
    }
}
