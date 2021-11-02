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
        stage('Codecov Testing'){
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
                sh 'ls -lah'
                sh 'ls -lah ./docs'
                sh 'ls -lah ./docs/jsdoc-output/'
            }
            
        }
    }
}
