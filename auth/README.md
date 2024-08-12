# Auth Proxy

This is a very simple OAuth proxy that handles github authentication for the Decap CMS. Building the docker images will package a:

- Small flask app that handles the OAuth flow with github
- An nginx container that proxies requests to the auth service, and the backend GCS bucket hosting the statically generated blog content, and CMS files.

The kubernetes deployment for these services is located in the [gnomad-deployments](https://github.com/broadinstitute/gnomad-deployments) repository.

## Configuring the OAuth App

The auth proxy is configured as a GitHub OAuth app. In our deployment, the app is owned by the https://github.com/tgg-automation machine user. To create or modify the OAuth app, go to the [GitHub OAuth Apps page](https://github.com/settings/developers) (click "OAuth Apps" in the left sidebar).

- Set the homepage URL to: https://gnomad.broadinstitute.org/news
- Set the authorization callback URL to: https://gnomad.broadinstitute.org/news/auth/callback

You'll need to record the client ID and client secret for the OAuth app. They should be stored in the GCP secret manager, and then configured as ExternalSecrets in the [blog deployment](https://github.com/broadinstitute/gnomad-deployments/blob/main/blog/base/blog.oauth-secret.yaml) to sync the secrets to the kubernetes cluster.

The expected format of the secret is a JSON object, with a `client-id` and `client-secret` field:

```json
{
  "client-id": "your-client-id",
  "client-secret": "your-client-secret"
}
```

## Building and Deploying

This github repository is configured to build the blog and auth docker images after merging to main, when anything in the `auth/` has changed. When the builds are complete, they will be tagged with the short git SHA, and pushed to the `us-docker.pkg.dev/exac-gnomad/gnomad/gnomad-blog` and `us-docker.pkg.dev/exac-gnomad/gnomad/gnomad-blog-auth` repositories.

To deploy, update the image tags in the prod kustomization in the [blog deployment](https://github.com/broadinstitute/gnomad-deployments/blob/main/blog/prod/kustomization.yaml)
