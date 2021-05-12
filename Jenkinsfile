import java.text.SimpleDateFormat

pipeline {
    agent {
        docker {
            label 'web'
            image "backend/build:nodejs"
        }
    }
    options {
        disableConcurrentBuilds()
    }
    environment {
        BUILD_VERSION = ''
        LOCAL_BUILD_DIR = 'build'
    }
    stages {
        stage('Init') {
            steps {
                echo '---== Init Environment Variable ==---'
                echo "Git Branch: ${env.GIT_BRANCH} Commit: ${env.GIT_COMMIT}"
                script {
                    def dateFormat = new SimpleDateFormat("yyyyMMddHHmm").format(new Date())
                    BUILD_VERSION = "${dateFormat}.${env.BUILD_NUMBER}.${env.GIT_COMMIT.take(7)}"
                }
                echo "Build Version: ${BUILD_VERSION}"
                sh "git submodule update --init --recursive"
                // Clean Previous Build
                sh "rm -rf ${LOCAL_BUILD_DIR}"
                // Package Artifact
                sh "rm -f *.tar.gz"
            }
        }
        stage('Build') {
            steps {
                echo '---== Build Stage ==---'
                // Prepare Build Environment
                sh 'npm i -g yarn'
                sh 'yarn'
                sh 'yarn build'
            }
        }
        stage('Deploy') {
            environment {
                CLOUD_FRONT_DIST_ID = 'E21BOKH3LZRUBH'
                S3_BASE_URL = 's3://aiswap.com'
                S3_REGION = 'ap-northeast-1'
            }
            steps {
                echo '---== Deploy Stage ==---'
                withCredentials([usernamePassword(credentialsId: 'aws-deployer', usernameVariable: 'AWS_ACCESS_KEY_ID', passwordVariable: 'AWS_SECRET_ACCESS_KEY')]){
                    // Upload Build Files
                    sh "aws s3 sync ${LOCAL_BUILD_DIR} ${S3_BASE_URL} --acl public-read --delete"
                    sh "aws cloudfront create-invalidation --distribution-id ${CLOUD_FRONT_DIST_ID} --paths '/*'"
                }
            }
        }
    }
}
