
import {createServer} from "node:http"
import {create, findlast, liste} from "./blockchain.js";
import {NotFoundError} from "./errors.js";

createServer(async (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        const url = new URL(req.url, `http://${req.headers.host}`)
        const endpoint = `${req.method}:${url.pathname}`

        let results
        let lastresult

        try {
            switch (endpoint) {
                case 'GET:/blockchain':
                    results = await liste(req, res, url)
                    //Sconsole.log(results)
                    break
                case 'POST:/blockchain':
                    results = await create(req, res)
                    lastresult = await findlast(req, res, url)
                    console.log(`POST : ${JSON.stringify(results)}`);
                    console.log(`dernier ajout : ${JSON.stringify(lastresult)}`);
                    break
                default :
                    results = Error;
                    res.writeHead(404)
            }
            if (results) {
                res.write(JSON.stringify(results))
            }
        } catch (erreur) {
            if (erreur instanceof NotFoundError) {
                res.writeHead(404)
            } else {
                throw erreur
            }
        }
        res.end()
    }
).listen(3000)
