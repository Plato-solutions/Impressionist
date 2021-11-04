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
                sh 'echo "here steps to add "'
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
                git branch: 'devops-test', credentialsId: '39120abd-1899-4404-a04b-b50842b08537', url: 'git@github.com:Plato-solutions/Impressionist.git'
                sh 'git checkout devops-test && git config --global user.email "jenkis@platoanalytics.com" && git config --global user.name "impressionist-docs" && git add . && git commit -m "test" &&  git push --set-upstream origin devops-test'
            }
        }
    }
}
