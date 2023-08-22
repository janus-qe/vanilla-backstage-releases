# Getting Started running the Backstage Instance

## Running Locally with the Optional Plugins

1. Create an `app-config.local.yaml` file that will be used for storing the environment variables that the showcase app needs
2. Copy the required code snippet from `app-config.yaml` into `app-config.local.yaml`. Note: Each plugin has a `# Plugin: <PLUGIN_NAME>` comment above the required code snippet(s).

  - Enable plugins (All plugins have a default of `false`)
  
    - `${K8S_ENABLED}`: Set to `true` to enable the Kubernetes backend plugin.
    - `${ARGOCD_ENABLED}` Set to `true` to enable the ArgoCD backend plugin.
    - `${KEYCLOAK_ENABLED}` Set to `true` to enable the Keycloak backend plugin.
    - `${OCM_ENABLED}` Set to `true` to enable the OCM backend plugin
  
  - Setup the GitHub plugins (GitHub Issues and GitHub Pull Request)
  
    - This [URL](https://backstage.io/docs/integrations/github/github-apps) can be used to quickly create a GitHub app, you can name the yaml file `github-app-backstage-showcase-credentials.local.yaml`
    - `${GITHUB_APP_CLIENT_ID}`: client id
    - `${GITHUB_APP_CLIENT_SECRET}`: client secret
    - `${GITHUB_APP_APP_ID}`: app id
    - `${GITHUB_APP_WEBHOOK_URL}`: webhook url (this can be a dummy url from https://smee.io/ since no plugins utilize the webhook at the moment)
    - `${GITHUB_APP_WEBHOOK_SECRET}`: webhook secret
    - `${GITHUB_APP_PRIVATE_KEY}`: github app private key (make sure to remove all white spaces from the token)
  
  - Setup the Jfrog Artifactory plugin
  
    - This [URL](https://github.com/janus-idp/backstage-plugins/tree/main/plugins/jfrog-artifactory#getting-started) explains how to use the Jfrog Artifactory plugin
    - `${ARTIFACTORY_URL}`: URL for the Jfrog Artifactory instance
    - `${ARTIFACTORY_TOKEN}`: API token
    - `${ARTIFACTORY_SECURE}`: Change to `false` in case of using self hosted artifactory instance with a self-signed certificate
  
    - Setup the ArgoCD instances(s)
  
      - If using a shared username and password across the instances, you can define them in the username and password variables and arbitrarily assign the urls and tokens
      - If using tokens for each individual instance, you can assign arbitrary variables to the tokens
      - `${ARGOCD_USERNAME}` Username for the instance(s)
      - `${ARGOCD_PASSWORD}` Password for the instance(s)
      - `${ARGOCD_INSTANCE1_URL}`: URL to the instance
      - `${ARGOCD_AUTH_TOKEN}`: token to the instance
      - `${ARGOCD_INSTANCE2_URL}`: URL to the instance
      - `${ARGOCD_AUTH_TOKEN2}`: token to the instance
  
    - Setup the Keycloak instance(s)
  
      - `${KEYCLOAK_BASE_URL}`: base URL of the Keycloak instance
      - `${KEYCLOAK_LOGIN_REALM}`: login realm
      - `${KEYCLOAK_REALM}`: realm
      - `${KEYCLOAK_CLIENT_ID}`: client id
      - `${KEYCLOAK_CLIENT_SECRET}`: client secret
  
    - Setup the Azure Cloud Registry (ACR) plugin
      - `${ACR_SERVER_API_URL}`: the Azure Container Registry server api url. ex: `https://mycontainerregistry.azurecr.io/acr/v1/`
      - `${ACR_AUTH_TOKEN}`: the authorization token (Can either be a `Basic` or `Bearer` token)
        - To generate a `Basic` token, Go to your Azure Container Registry portal, and go to the `Access Keys` tab.
          - Get the `username` and the `password` of the` Admin User`
          - Then use this [tool](https://www.debugbear.com/basic-auth-header-generator) to convert them into a token.
          - Then append `Basic ` in front of the token and set `${ACR_AUTH_TOKEN}` to it.
          - Ex: if `username` = john@example.com and `password` = abc123, then our `${ACR_AUTH_TOKEN}` is `Basic am9obkBleGFtcGxlLmNvbTphYmMxMjM=`
        - To generate a `Bearer` token, go to this [link](https://learn.microsoft.com/en-us/azure/container-registry/container-registry-authentication?tabs=azure-cli), then append `Bearer` in front of it and set `${ACR_AUTH_TOKEN}` to it.
      - `${ACR_SECURE}`: Change to "false" in case of using self hosted artifactory instance with a self-signed certificate
    - Setup the Ansible Automation Platform (AAP) plugin
      - `${AAP_BASE_URL}`: Base URL to the AAP instance
      - `${AAP_AUTH_TOKEN}`: Authorization Token for the AAP instance
      - `${AAP_OWNER}`: The user entity that will be the owner of the AAP catalog entities
      - `${AAP_SYSTEM}`: The system entity that will be applied to the AAP catalog entities

3. Run `yarn install` to install the dependencies
4. Start the application using `yarn dev`
5. Navigate to <http://localhost:3000>
