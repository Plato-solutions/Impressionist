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
        stage('checkout-and-store-docks'){
            steps {
                git branch: 'main', credentialsId: '02d6b683-971b-4bd4-8d60-cf60f081750f', url: 'https://github.com/Plato-solutions/Impressionist'
                sh 'npm i'
                sh 'mkdir -p ./docs/jsdoc-output/'
                sh 'chown -R node:node docs'
                sh 'ls -lah'
                sh 'ls -lah ./docs'
                sh 'ls -lah ./docs/jsdoc-output/'
                sh 'npm run docs'   
                sh 'cp /home/jenkins/agent/workspace/impresionist/docs/jsdoc-output/api.md /home/jenkins/agent/workspace/'
                git branch: 'devops-testing', credentialsId: '39120abd-1899-4404-a04b-b50842b08537', url: 'https://github.com/Plato-solutions/impressionist-docs.git'
                // sh 'npm install'
                //sh 'sleep 100000000'
                sh 'cp /home/jenkins/agent/workspace/api.md /home/jenkins/agent/workspace/impresionist'
                sh 'git status && git config --global user.email "jenkis@platoanalytics.com" && git config --global user.name "impressionist-docs" && git add api.md && git commit -m "test" &&  git push https://github.com/Plato-solutions/impressionist-docs.git'
                
                //sh 'npm run docs'

            }   
        }
    }
}
