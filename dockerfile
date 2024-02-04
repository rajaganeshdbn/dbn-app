FROM nginx:alpine
COPY ./packages/@databrainhq/frontend/dist /usr/share/nginx/html
COPY ./packages/@databrainhq/demo/dist /usr/share/nginx/html/demo
COPY docker.nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
