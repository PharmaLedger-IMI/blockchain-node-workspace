To Francisco:

1 - when we expose the apiadaptor/smartcontract/rpc address to 'the world', how do we expose the docker compose ip addresses? 
subnet 172.16.63.0/24? (it works locally, but won't globally') Do we map all necessary services to a single ip? Can we do it in docker compose?

-> Reverse proxy: nginx ou traefik na máquina host dos dockers, e depois forward das firewalls para o reverse proxy

2 - Single node + join blockchain network scripts for partners who want/need a node

-> Work in progress. É complicado porque a blockchain supporta permissioned nodes, ou seja, segundo a documentação tem-se de ter um transaction manager por node.
