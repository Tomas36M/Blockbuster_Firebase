const functions = require("firebase-functions");
const admin = require('firebase-admin');
const express = require('express');
// const { ApolloServer } = require('apollo-server-express');
// const typeDefs = require('./graphql/typeDefs')
// const resolvers = require('./graphql/resolvers')
// import { ApolloServer } from 'apollo-server-express'
// import typeDefs from "./graphql/typeDefs";
// import resolvers from "./graphql/resolvers";

const app = express();

admin.initializeApp({
    credential: admin.credential.cert('./credentials.json'),
    databaseURL: "https://movies-devf-fullstack-default-rtdb.firebaseio.com"
});

const db = admin.firestore();

app.post('/api/movies', async (req, res) => {
    try {
        await db.collection('movies')
            .doc()
            .create({
                title: req.body.title,
                description: req.body.description,
                img: req.body.img,
                link: req.body.link,
                likes: 0,
                postBy: req.params.postBy
            })
        return res.status(204).json();
    } catch (err) {
        console.log(err);
        return res.status(500).send(err)
    }
})

app.get('/api/movies/:id', async (req, res) => {
    try {
        const doc = db.collection('movies').doc(req.params.id);
        const item = await doc.get();
        const response = item.data();
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
})

app.get('/api/movies', async (req, res) => {
    try {
        const doc = db.collection('movies');
        const querySnapshot = await doc.get();
        const docs = querySnapshot.docs
        const response = docs.map((doc) => ({
            id: doc.id,
            data: doc.data()
        }))
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

app.put("/api/movies/:id", async (req, res) => {
    try {
        const document = db.collection("movies").doc(req.params.id);
        await document.update({
            title: req.body.title
        });
        return res.status(200).json();
    } catch (error) {
        return res.status(500).json();
    }
});

app.delete("/api/movies/:id", async (req, res) => {
    try {
        const doc = db.collection("movies").doc(req.params.id);
        await doc.delete();
        return res.status(200).json();
    } catch (error) {
        return res.status(500).send(error);
    }
});

// const startServer = async () => {

//     const apolloServer = new ApolloServer({
//         typeDefs,
//         resolvers
//     })

//     await apolloServer.start();

//     apolloServer.applyMiddleware({ app });

//     app.listen(3000, () => {
//         console.log('Server running in port', 3000)
//     })

// }


// startServer();

exports.app = functions.https.onRequest(app)
