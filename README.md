## Multi-tenant k8s app example

The goal is to demonstrate one of the ways to deploy a multi tenant app via k8s.

The app is a simple nodejs app that returns the current date and time. The format of the date and time depends on the tenant. The app is deployed as a docker image.

You can however run it locally without docker.
```bash
cd multi-tenant-app 
npm i
npm run start:dev
```

Then visit the following urls:
```bash
curl localhost:3000/date
```

The configuration of the app is done via environment variables. To deploy it for the first tenant, you can run the following command:
```bash
TENANT_ID=tenantOne npm run start:dev
```

And for the second one:
```bash
TENANT_ID=tenantTwo npm run start:dev
```

You can observe that the returned date format is different.

Our goal is to deploy this into k8, using microk8s.

We are going to use the same helm chart with different values file to deploy 2 deployments.
In our imaginary case, the second tenant has more usage so we are going to have two replacas for the second tenant. 

## Build the docker image
```bash
docker build -t multi-tenant .
```

## Import inside microk8s
```bash
docker save --output multi-tenant.tar multi-tenant
microk8s ctr image import  multi-tenant.tar

# Make sure it is imported
microk8s ctr images ls
```

Install the helm chart for the multi-tenant app.
This will create a deployment and a service for the multi-tenant app for each one of the two tenants.
```bash
microk8s.helm install -f multitenant-helm/values_tenantOne.yaml multi-tenant-app-tenantone multi-tenant-helm/
microk8s.helm install -f multitenant-helm/values_tenantTwo.yaml multi-tenant-app-tenanttwo multi-tenant-helm/
```

## Test the app
```bash
#Get the ClusterIP of the service out of the listed services
microk8s.kubectl get service

#Then verify the date format is different for each tenant
curl http://<ClusterIP>:3000/date
curl http://<ClusterIP>:3000/date
```

## Clean up
```bash
microk8s.helm delete multi-tenant-app-tenantone
microk8s.helm delete multi-tenant-app-tenanttwo
microk8s ctr images rm docker.io/library/multi-tenant:latest
```