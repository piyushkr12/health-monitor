pipeline{
    
        agent any
    
    stages{
        stage("Build the images"){
            steps{
                echo "========Creating the images========"
                sh "docker compose build --no-cache"
            }
            post{
                success{
                    echo "========Image build successfully========"
                    sh "docker images | grep health-monitor"

                }
                failure{
                    echo "========Build the images execution failed========"
                }
            }
        }
        stage("implementation of docker scout for image vulnerability scanning"){
            steps{
                withCredentials([usernamePassword(credentialsId: 'db951424-88df-42eb-b7cd-286c143801c0', passwordVariable: 'docker_password', usernameVariable: 'docker_username')]) {
                    sh "echo $docker_password | docker login -u $docker_username --password-stdin"

                    echo "========Scanning the images for vulnerabilities========"
                    echo "========Scanning the frontend image=  ======="
                    sh "docker scout cves piyushkr11/health-monitor:frontend"
                    echo "========Scanning the backend image========"
                    sh "docker scout cves piyushkr11/health-monitor:backend"
                    echo "========Scanning the ai-agent image========"
                    sh "docker scout cves piyushkr11/health-monitor:ai-agent"
                }
            }
        }
        stage("push the images to docker hub"){
            steps{
                

                    echo "========Pushing the images to docker hub========"
                    sh "docker push piyushkr11/health-monitor:frontend"
                    sh "docker push piyushkr11/health-monitor:backend"
                    sh "docker push piyushkr11/health-monitor:ai-agent"
                   
                
            }
        }
    }
    
}