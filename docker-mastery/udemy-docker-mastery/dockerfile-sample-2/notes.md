Test ngnix:
`docker container run -p 80:80 --rm ngnix`

Build our ngnix version with out source code:

`docker image build -t ngnix-with-html`
`docker container run -p 80:80 --rm ngnix-with-html`
