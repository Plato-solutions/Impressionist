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
                sh 'cd .. && git branch: 'main', credentialsId: '39120abd-1899-4404-a04b-b50842b08537', url: 'https://github.com/Plato-solutions/impressionist-docs.git"
                // sh 'npm install'
                
                //sh 'npm run docs'

            }   
        }
    }
}
