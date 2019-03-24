const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        const server = express();

        server.get('/api/todos', (req, res) => {
            const todos = [
                {id: 1, todo: "Apply for Enye"},
                {id: 2, todo: "Pass all coding challenges"},
                {id: 3, todo: "Get the slot!"}
            ]
            return res.send({todos})
        })
        
        server.get("*", (req, res) => {
            return handle(req, res);
        });

        server.listen(3000, err => {
            if (err) throw err;
            console.log("> Ready on http://localhost:3000");
        });
    })
    .catch(ex => {
        console.error(ex.stack)
        process.exit(1)
    });
