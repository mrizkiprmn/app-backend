def dockerhub = "mrizkiprmn/backend-jenkins"
def image_name = "${dockerhub}:${BRANCH_NAME}"
def builder

pipeline {

    agent any

    parameters {
        booleanParam(name: 'RUNTEST', defaultValue: 'true', description: 'Checklist for RUNTEST')
        choice(name: 'DEPLOY', choices: ['yes', 'no'], description: 'Deploy on Stagging')
    }

    stages {

        stage('Instal Dependencies') {
            steps {
                nodejs("node14") {
                    sh 'npm install'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    builder = docker.build("${dockerhub}:${BRANCH_NAME}", "--no-cache .")
                }
            }
        }

        stage('Testing Images') {
            when {
                expression {
                    params.RUNTEST
                }
            }
            steps {
                script {
                    builder.inside {
                        sh 'echo passed'
                    }
                }
            }
        }

        stage('Push Image') {
            steps {
                
                script {
                    builder.push()
                }
            }
        }

        stage('Deploy on Stagging') {
            when {
                expression {
                    params.DEPLOY == 'yes'
                }
            }
            steps {
                script {
                    if(BRANCH_NAME == 'master'){
                        sshPublisher(
                            publishers: [
                                sshPublisherDesc(
                                    configName: 'staggingserver',
                                    verbose: true,
                                    transfers: [
                                        sshTransfer(
                                            sourceFiles: 'docker-compose.yml',
                                            execCommand: "docker pull ${dockerhub}:${BRANCH_NAME}; cd ./home/rizki/app; docker-compose up -d --force-recreate",
                                            execTimeout: 120000,
                                        )
                                    ]
                                )
                            ]
                        )
                    }
                }
            }
        }
    }
}