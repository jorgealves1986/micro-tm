1 - Requirements:

1.1 - You need docker and kubernetes installed and running on your operating system.

1.2 - Make your operating system redirect taskmanager.dev to 127.0.0.1
On windows you can achieve this by going to C:\Windows\System32\drivers\etc, edit the "hosts" file and add this to the end of the file:
127.0.0.1 taskmanager.dev

1.3 - Install ingress-nginx on your kubernetes context:
Ingress-nginx instalation (https://kubernetes.github.io/ingress-nginx/deploy/):
For windows/mac: kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/cloud/deploy.yaml

1.4 - Create a json web token secret on kubernetes:
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=<the_actual_secret>

1.5 - Create a refresh json web token secret on kubernetes:
kubectl create secret generic jwt-refresh-secret --from-literal=JWT_REFRESH_KEY=<the_actual_secret>

2 - Start on development mode:

2.1 - Have skaffold installed on your operating system (https://skaffold.dev/).

2.2 - On the command line on the folder where skaffold.yaml file is, type "skaffold dev".

Notes:

- Hit ctrl+c to stop skaffold;
- Make sure your kubernetes pods are shutdown after stopping skaffold by typing "kubectl get pods", if they are not, type "skaffold delete";
- Sometimes things don't go well at the first try, if that is the case, follow the first 2 steps from theese notes then start skaffold again by typing "skaffold dev".
